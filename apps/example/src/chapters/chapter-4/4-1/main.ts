function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

async function code_4_3() {
  function test() {
    console.time('test');

    delay(1000, 'Hello, world!')
      .then((result) => {
        // [result: string]
        console.log(result);
      })
      .then(() => {
        return delay(2000, 40);
      })
      .then((result) => {
        // [result: number]
        console.log(result);

        console.timeEnd('test');
      });
  }

  test();
  // Hello, world!
  // 40
  // main: 3002.367ms

  await delay(3500, undefined);
}

async function code_4_4() {
  async function test2() {
    console.time('test2');

    const result1 = await delay(1000, 'Hello, world!'); // [result1: string]
    console.log(result1);

    const result2 = await delay(2000, 40); // [result2: number]
    console.log(result2);

    console.timeEnd('test2');
  }

  await test2();
  // Hello, world!
  // 40
  // test2: 3002.519ms
}

async function code_4_5() {
  const promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'one'));

  const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'two'));

  await Promise.race([promise1, promise2]).then((value) => {
    console.log(value); // two
  });
}

function getRandomValue<T>(a: T, b: T): T {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? a : b;
}

interface User {
  name: string;
}

function getFriends(): Promise<User[]> {
  return delay(getRandomValue(60, 6_000), [
    { name: 'Marty' },
    { name: 'Michael' },
    { name: 'Sarah' },
  ]);
}

async function code_4_6() {
  const result = await Promise.race([getFriends(), delay(5000, 'timeout')]);

  if (result === 'timeout') {
    console.log('The current network environment is not stable.');
  } else {
    const friends = result as User[];
    console.log(
      'Friend list rendering:',
      friends.map(({ name }) => `<li>${name}</li>`),
    );
  }
}

async function code_4_7() {
  function toggleLoadingIndicator(show: boolean): void {
    if (show) {
      console.log('append loading...');
    } else {
      console.log('remove loading...');
    }
  }

  async function renderFriendsPicker(): Promise<void> {
    const friendsPromise = getFriends();

    const result = await Promise.race([friendsPromise, delay(100, 'isSlow')]);

    if (result === 'isSlow') {
      toggleLoadingIndicator(true);
      await friendsPromise;
      toggleLoadingIndicator(false);
    }

    const friends = await friendsPromise;
    console.log(
      'Friend list rendering:',
      friends.map(({ name }) => `<li>${name}</li>`),
    );
  }

  await renderFriendsPicker();
  // If the response is fast (random)
  // After 0.06 seconds
  // Friend list rendering: <li>Marty</li><li>Michael</li><li>Sarah</li>

  await renderFriendsPicker();
  // If the response is slow (random)
  // append loading...
  // After 6 seconds
  // remove loading...
  // Friend list rendering: <li>Marty</li><li>Michael</li><li>Sarah</li>
}

interface File {
  name: string;
  body: string;
  size: number;
}

function getFile(name: string, size = 1000): Promise<File> {
  return delay(size, { name, body: '...', size });
}

async function code_4_8() {
  const files = await Promise.all([
    getFile('img.png', 500),
    getFile('book.pdf', 1000),
    getFile('index.html', 1500),
  ]);

  console.log(files);
  // After about 1,500ms:
  // [
  //   { name: 'img.png', body: '...', size: 500 },
  //   { name: 'book.pdf', body: '...', size: 1000 },
  //   { name: 'index.html', body: '...', size: 1500 }
  // ]
}

async function code_4_9() {
  try {
    const files = await Promise.all([
      getFile('img.png'), // 기본 size: 1000, delay: 1000ms
      getFile('book.pdf'),
      getFile('index.html'),
      delay(500, Promise.reject('File download failed')),
    ]);
    console.log(files);
  } catch (error) {
    // After about 500ms:
    console.error(error); // 'File download failed'
  }
}

async function code_4_10() {
  const files = await Promise.allSettled([
    getFile('img.png'),
    getFile('book.pdf'),
    getFile('index.html'),
    Promise.reject('File download failed'),
  ]);

  console.log(files);
  // After about 1,000ms:
  // [
  //   { status: 'fulfilled', value: { name: 'img.png', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'book.pdf', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'index.html', body: '...', size: 1000 } },
  //   { status: 'rejected', reason: 'File download failed' }
  // ]
}

async function code_4_11() {
  const settlePromise = <T>(promise: Promise<T>) =>
    promise
      .then((value) => ({ status: 'fulfilled', value }))
      .catch((reason) => ({ status: 'rejected', reason }));

  const files = await Promise.all(
    [
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
      Promise.reject('File download failed'),
    ].map(settlePromise),
  );

  console.log(files);
  // [
  //   { status: 'fulfilled', value: { name: 'img.png', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'book.pdf', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'index.html', body: '...', size: 1000 } },
  //   { status: 'rejected', reason: 'File download failed' }
  // ]
}

async function code_4_12() {
  const files = await Promise.any([
    getFile('img.png', 1500),
    getFile('book.pdf', 700),
    getFile('index.html', 900),
    delay(100, Promise.reject('File download failed')),
  ]);

  console.log(files);
  // After about 700ms
  // { name: 'book.pdf', body: '...', size: 700 }

  const files2 = await Promise.any([
    delay(200, Promise.reject('File download failed')),
    delay(100, Promise.reject('File download failed')),
  ]);
  // After about 200ms
  // Uncaught (in promise) AggregateError: All promises were rejected
}

export async function main() {
  // await code_4_3();
  // await code_4_4();
  // await code_4_5();
  // await code_4_6();
  // await code_4_7();
  // await code_4_8();
  // await code_4_9();
  // await code_4_10();
  // await code_4_11();
  await code_4_12();
}
