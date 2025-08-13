import {delay, map, range} from "@fxts/core";

function createAsyncTask(name: string, ms: number): () => Promise<string> {
  return () =>
    new Promise(resolve => {
      console.log(`Started: ${name}`);
      setTimeout(() => {
        console.log(`Finished: ${name}`);
        resolve(name);
      }, ms);
    });
}

async function code_6_20_21() {
  async function runTasksWithPool<T>(
    fs: (() => Promise<T>)[],
    poolSize: number
  ): Promise<T[]> {
    const results: T[] = [];
    const activePromises: Promise<void>[] = [];

    for (let i = 0; i < fs.length; i++) {
      const taskFactory = fs[i];
      const p = taskFactory()
        .then((fetchedValue) => {
          results[i] = fetchedValue;
        })
        .then(() => {
          const removeIndex = activePromises.indexOf(p);
          if (removeIndex > -1) {
            activePromises.splice(removeIndex, 1);
          }
        });

      activePromises.push(p);

      if (activePromises.length >= poolSize) {
        await Promise.race(activePromises);
      }
    }

    await Promise.all(activePromises);

    return results;
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await runTasksWithPool(tasks, poolSize);
  console.log("Results:", results);
}

class TaskRunner<T> {
  private _promise: Promise<T> | null = null;
  private _isDone = false;
  get promise() { return this._promise ?? this.run(); }
  get isDone() { return this._isDone; }

  constructor(private f: () => Promise<T>) {}

  async run() {
    if (this._promise) {
      return this._promise;
    } else {
      return this._promise = this.f().then(res => {
        this._isDone = true;
        return res;
      });
    }
  }
}

async function code_6_22() {
  async function runTasksWithPool<T>(
    fs: (() => Promise<T>)[],
    poolSize: number
  ): Promise<T[]> {
    const tasks = fs.map(f => new TaskRunner(f));

    let pool: TaskRunner<T>[] = [];
    for (const nextTask of tasks) {
      pool.push(nextTask);
      if (pool.length < poolSize) continue;
      await Promise.race(pool.map(task => task.run()));
      pool.splice(pool.findIndex(task => task.isDone), 1);
    }

    return Promise.all(tasks.map(task => task.promise));
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await runTasksWithPool(tasks, poolSize);
  console.log("Results:", results);
}

async function code_6_24() {
  class TaskPool<T> {
    private readonly tasks: TaskRunner<T>[];
    private readonly pool: TaskRunner<T>[] = [];
    public poolSize: number;

    constructor(fs: (() => Promise<T>)[], poolSize: number) {
      this.tasks = fs.map(f => new TaskRunner(f));
      this.poolSize = poolSize;
    }

    setPoolSize(poolSize: number) {
      this.poolSize = poolSize;
    }

    private canExpandPool() {
      return this.pool.length < this.poolSize;
    }

    async runAll() {
      const { pool, tasks } = this;

      let i = 0;
      const { length } = tasks;
      while (i < length) {
        const nextTask = tasks[i];
        pool.push(nextTask);
        const isNotLast = ++i < length;
        if (isNotLast && this.canExpandPool()) continue;
        await Promise.race(pool.map(task => task.run()));
        pool.splice(pool.findIndex(task => task.isDone), 1);
      }

      return Promise.all(tasks.map(task => task.promise));
    }
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await new TaskPool(tasks, poolSize).runAll();
  console.log("Results:", results);
}

async function code_6_25_26() {
  class TaskPool<T> {
    private readonly taskIterator: IterableIterator<TaskRunner<T>>;
    private readonly pool: TaskRunner<T>[] = [];
    public poolSize: number;

    // (1)
    constructor(fs: Iterable<() => Promise<T>>, poolSize: number) {
      this.taskIterator = map(f => new TaskRunner(f), fs); // (2)
      this.poolSize = poolSize;
    }

    setPoolSize(poolSize: number) {
      this.poolSize = poolSize;
    }

    private canExpandPool() {
      return this.pool.length < this.poolSize;
    }

    async runAll() {
      const { pool, taskIterator } = this;
      const tasks: TaskRunner<T>[] = [];

      while (true) { // (3)
        const { done, value: nextTask } = taskIterator.next();
        if (!done) {
          pool.push(nextTask);
          tasks.push(nextTask);
          if (this.canExpandPool()) continue;
        }
        if (done && pool.length === 0) break;
        await Promise.race(pool.map(task => task.run()));
        pool.splice(pool.findIndex(task => task.isDone), 1);
      }

      return Promise.all(tasks.map(task => task.promise));
    }
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await new TaskPool(tasks, poolSize).runAll();
  console.log("Results:", results);

  async function crawling(page: number) {
    console.log(`Starting analysis of page ${page}`)
    await delay(5_000);
    console.log(`Page ${page} saved successfully`);
    return page;
  }

  void new TaskPool(
    map(page => () => crawling(page), range(Infinity)),
    5
  ).runAll();
}

async function crawling(page: number) {
  console.log(`Starting analysis of page ${page}`)
  await delay(5_000);
  console.log(`Page ${page} saved successfully`);
  return page;
}

async function code_6_27_28() {
  class TaskPool<T> {
    private readonly taskIterator: IterableIterator<TaskRunner<T>>;
    private readonly pool: TaskRunner<T>[] = [];
    public poolSize: number;

    constructor(fs: Iterable<() => Promise<T>>, poolSize: number) {
      this.taskIterator = map(f => new TaskRunner(f), fs);
      this.poolSize = poolSize;
    }

    setPoolSize(poolSize: number) {
      this.poolSize = poolSize;
    }

    private canExpandPool() {
      return this.pool.length < this.poolSize;
    }

    private async run(errorHandle: (err: unknown) => unknown) {
      const { pool, taskIterator } = this;
      const tasks: TaskRunner<T>[] = [];

      while (true) {
        const { done, value: nextTask } = taskIterator.next();
        if (!done) {
          pool.push(nextTask);
          tasks.push(nextTask);
          if (this.canExpandPool()) continue;
        }
        if (done && pool.length === 0) break;
        await Promise.race(pool.map(task => task.run())).catch(errorHandle);
        pool.splice(pool.findIndex(task => task.isDone), 1);
      }

      return tasks.map(task => task.promise);
    }

    async runAll() {
      return Promise.all(await this.run(err => Promise.reject(err)));
    }

    async runAllSettled() {
      return Promise.allSettled(await this.run(() => undefined));
    }
  }

  const tasks = [
    createAsyncTask("A", 1000),
    () => createAsyncTask("B", 500)().then(() => Promise.reject('no!')),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  async function runAllTest() {
    try {
      const result = await new TaskPool(tasks, 2).runAll();
      console.log(result);
    } catch (e) {
      console.log(e); // "no!"
    }
  }

  await runAllTest();

  async function runAllSettledTest() {
    const result = await new TaskPool(tasks, 2).runAllSettled();
    console.log(result);
    // [
    //   {status: "fulfilled", value: "A"},
    //   {status: "rejected", reason: "no!"},
    //   {status:"fulfilled",value:"C"},
    //   {status:"fulfilled",value:"D"},
    //   {status:"fulfilled",value:"E"}
    // ]
  }

  await runAllSettledTest();

  async function runAllTest2() {
    try {
      const task = (page: number) => () =>
        page === 7
          ? Promise.reject(page)
          : crawling(page);

      await new TaskPool(map(task, range(Infinity)), 5).runAll();
    } catch (e) {
      console.log(`Crawling failed halfway! (Page ${e})`);
    }
  }

  await runAllTest2();

  await delay(10_000);
  console.log('------------');

  async function runAllSettledTest2() {
    const task = (page: number) => () =>
      page === 7
        ? Promise.reject(page)
        : crawling(page);

    const taskPool = new TaskPool(
      map(task, range(Infinity)), 5
    );

    void taskPool.runAllSettled();

    setTimeout(() => {
      taskPool.setPoolSize(10);
    }, 10_000);
  }

  void runAllSettledTest2();
}

export async function main() {
  await code_6_20_21();
  // await code_6_22();
  // await code_6_24();
  // await code_6_25_26();
  await code_6_27_28();
}
