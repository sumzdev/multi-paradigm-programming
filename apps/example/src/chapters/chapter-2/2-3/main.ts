import { map, filter, forEach, naturals, reduce, fx, FxIterable } from '../../../lib/fx2';

function code_2_28_29() {
  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    map<B>(f: (a: A) => B): FxIterable<B> {
      return new FxIterable(map((a) => f(a), this.iterable));
    }
  }

  const mapped = new FxIterable(['a', 'b'])
    .map(a => a.toUpperCase())
    .map(b => b + b);

  // [const mapped: FxIterable<string>]
  // [a: string]
  // [b: string]

  function fx<A>(iterable: Iterable<A>): FxIterable<A> {
    return new FxIterable(iterable);
  }

  const mapped2 = fx(['a', 'b'])
    .map(a => a.toUpperCase())
    .map(b => b + b);

  // [const mapped2: FxIterable<string>]
}

function code_2_30() {
  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    map<B>(f: (a: A) => B): FxIterable<B> {
      return new FxIterable(map(f, this.iterable));
    }

    filter(f: (a: A) => boolean): FxIterable<A> {
      return new FxIterable(filter(f, this.iterable));
    }

    forEach(f: (a: A) => void): void {
      return forEach(f, this.iterable);
    }
  }
}

function printNumber(n: number) {
  return console.log(n);
}

function code_2_30a_31_32() {
  function fx<A>(iterable: Iterable<A>): FxIterable<A> {
    return new FxIterable(iterable);
  }

  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    map<B>(f: (a: A) => B): FxIterable<B> {
      return fx(map(f, this.iterable));
    }

    filter(f: (a: A) => boolean): FxIterable<A> {
      return fx(filter(f, this.iterable));
    }

    forEach(f: (a: A) => void): void {
      return forEach(f, this.iterable);
    }
  }

  fx(['a', 'b'])
    .map(a => a.toUpperCase())
    .map(a => a + a)
    .forEach(a => console.log(a));
  // AA
  // BB

  fx(naturals(5))
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .forEach(printNumber);
  // 10
  // 30
  // 50
}


function code_2_34() {
  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    // ... 생략된 메서드들 ...

    reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc; // (1)
    reduce<Acc>(f: (a: A, b: A) => Acc): Acc; // (2)
    reduce<Acc>(f: (a: Acc | A, b: A) => Acc, acc?: Acc): Acc {
      return acc === undefined
        ? reduce(f, this.iterable) // (3)
        : reduce(f, acc, this.iterable); // (4)
    }
  }
}

function code_2_35() {
  // 초기값 없을 때
  const num = fx(naturals(5)) // FxIterable<number> (1, 2, 3, 4, 5)
    .filter(n => n % 2 === 1) // FxIterable<number> (1, 3, 5)
    .map(n => n * 10) // FxIterable<number> (10, 30, 50)
    .reduce((a, b) => a + b); // [a: number] [b: number]

  console.log(num); // [num: number]
  // 90

  // 초기값 있을 때
  const num2 = fx(naturals(5)) // FxIterable<number> (1, 2, 3, 4, 5)
    .filter(n => n % 2 === 1) // FxIterable<number> (1, 3, 5)
    .map(n => n * 10) // FxIterable<number> (10, 30, 50)
    .reduce((a, b) => a + b, 10); // [a: number] [b: number]

  console.log(num2); // [num2: number]
  // 100
}

function code_2_37a() {
  type Evaluatable<A, B> = [(...args: A[]) => B, ...A[]];

  function evaluation<A, B>(expr: Evaluatable<A, B>) {
    const [fn, ...args] = expr;
    return fn(...args);
  }

  const add = (a: number, b: number) => a + b;
  const result: number = evaluation([add, 1, 2]);
  console.log(result); // 3
}


function code_2_40() {
  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    // ... 생략된 메서드들 ...

    toArray(): A[] {
      return [...this.iterable];
    }
  }

  const [first, second] = fx([1, 2, 3, 4]).map(a => a + 10).toArray();
  console.log(first, second); // 11 12
}

function code_2_41() {
  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    [Symbol.iterator]() {
      return this.iterable[Symbol.iterator]();
    }

    // ... 생략된 메서드들 ...
  }

  const [first, second] = fx([1, 2, 3, 4]).map(a => a + 10);
  console.log(first, second); // 11 12
}

function code_2_47_48() {
  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    [Symbol.iterator]() {
      return this.iterable[Symbol.iterator]();
    }

    // ... 생략된 메서드들 ...

    filter(f: (a: A) => boolean): FxIterable<A> {
      return new FxIterable(filter(f, this.iterable));
    }

    reject(f: (a: A) => boolean): FxIterable<A> {
      return this.filter(a => !f(a));
    }
  }

  const isOdd = (a: number) => a % 2 === 1;

  const [first, second] = fx([1, 2, 3, 4, 5, 6])
    .map(a => a + 10)
    .reject(isOdd);

  console.log(first, second);
  // 12 14
}

function code_2_49() {
  const sorted = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .toArray()
    .sort((a, b) => a - b);

  console.log(sorted);
  // [10, 30, 30, 50, 50]

  const sorted2 = [...fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
  ]
    .sort((a, b) => a - b);

  console.log(sorted2);
  // [10, 30, 30, 50, 50]
}


function code_2_50() {
  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    [Symbol.iterator](): Iterator<A> {
      return this.iterable[Symbol.iterator]();
    }

    // ... 생략된 메서드들 ...

    to<R>(converter: (iterable: Iterable<A>) => R): R {
      return converter(this.iterable);
    }
  }

  const sorted = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .to(iterable => [...iterable])
    .sort((a, b) => a - b);

  console.log(sorted); // const sorted: number[]
  // [10, 30, 30, 50, 50]
}

function code_2_51() {
  function fx<A>(iterable: Iterable<A>): FxIterable<A> {
    return new FxIterable(iterable);
  }

  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    [Symbol.iterator]() {
      return this.iterable[Symbol.iterator]();
    }

    map<B>(f: (a: A) => B): FxIterable<B> {
      return fx(map(f, this));
    }

    filter(f: (a: A) => boolean): FxIterable<A> {
      return fx(filter(f, this));
    }

    reject(f: (a: A) => boolean): FxIterable<A> {
      return this.filter(a => !f(a));
    }

    forEach(f: (a: A) => void): void {
      return forEach(f, this);
    }

    reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc;
    reduce<Acc>(f: (a: A, b: A) => Acc): Acc;
    reduce<Acc>(f: (a: Acc | A, b: A) => Acc, acc?: Acc): Acc {
      return acc === undefined
        ? reduce(f, this)
        : reduce(f, acc, this);
    }

    toArray(): A[] {
      return [...this];
    }

    to<R>(converter: (iterable: Iterable<A>) => R): R {
      return converter(this);
    }
  }

  const sorted = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .to(iterable => [...iterable])
    .sort((a, b) => a - b);

  console.log(sorted); // const sorted: number[]
  // [10, 30, 30, 50, 50]
}

function code_2_52() {
  const set = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)  // [50, 30, 10, 50, 30]
    .to(iterable => new Set(iterable));

  console.log(set);
  // Set(3) {50, 30, 10}

  const size = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .to(iterable => new Set(iterable))
    .add(10)
    .add(20) // [Set<number>.add(value: number): Set<number>]
    .size;

  console.log(size); // [size: number]
  // 4
}

function code_2_53() {
  // ```javascript
  // const set = fx([5, 2, 3, 1, 4, 5, 3])
  //   .filter(n => n % 2 === 1)
  //   .map(n => n * 10)
  //   .to(iterable => new Set(iterable))
  //   .difference(new Set([10, 20]));
  //
  // console.log([...set]);
  // // [50, 30]
}

function code_2_54() {
  function fx<A>(iterable: Iterable<A>): FxIterable<A> {
    return new FxIterable(iterable);
  }

  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    [Symbol.iterator](): Iterator<A> {
      return this.iterable[Symbol.iterator]();
    }

    // ... 생략된 메서드들 ...

    chain<B>(f: (iterable: this) => Iterable<B>): FxIterable<B> {
      return fx(f(this)); // new FxIterable(f(this));
    }
  }
}

function code_2_55() {
  const result = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)                      // [50, 30, 10, 50, 30]
    .chain(iterable => new Set(iterable))  // Set으로 중복 제거, Set도 이터러블
    .reduce((a, b) => a + b); // [FxIterable<number>.reduce<number>(f: ...): number]

  console.log(result); // [result: number]
  // 90

  const result2 = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)                      // [50, 30, 10, 50, 30]
    .chain(iterable => new Set(iterable))  // Set으로 중복 제거, Set도 이터러블
    .map(n => n - 10)  // [FxIterable<number>.map<number>(f: ...): FxIterable<number>]
    .reduce((a, b) => `${a}, ${b}`);  // [FxIterable<number>.reduce<string>(f: ...): string]

  console.log(result2); // [result2: string]
  // "40, 20, 0"
}

export function main() {
  code_2_28_29();
  code_2_30();
  code_2_30a_31_32();
  code_2_34();
  code_2_35();
  code_2_37a();
  code_2_40();
  code_2_41();
  code_2_47_48();
  code_2_49();
  code_2_50();
  code_2_51();
  code_2_52();
  code_2_53();
  code_2_54();
  code_2_55();
}

