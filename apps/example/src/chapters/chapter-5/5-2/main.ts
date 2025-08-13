import {
  delay,
  filter,
  find,
  forEach,
  fx,
  head,
  map,
  pipe,
  range,
  reduce,
  toArray,
  toAsync,
  zip,
} from '@fxts/core';

function code_5_13() {
  const result = pipe(
    10,
    a => a + 4, // a = 10
    a => a / 2, // a = 14
  );

  console.log(result); // 7
}

function code_5_14() {
  const add = (a: number) => (b: number) => a + b;

  const result = add(10)(5);
  console.log(result);
  // 15

  const add10 = add(10);
  console.log(add10(5));
  // 15

  const result2: number = pipe(
    5,
    add(10),
    add(5),
  );
  console.log(result2);
  // 20
}

function code_5_15_16() {
  pipe(
    ['1', '2', '3', '4', '5'],
    map(a => parseInt(a)), // [a: string]
    filter(a => a % 2 === 1), // [a: number]
    forEach(console.log),
  );
  // 1
  // 3
  // 5

  pipe(
    ['1', '2', '3', '4', '5'],
    map(a => parseInt(a)), // [a: string]
    filter(a => a % 2 === 1), // [a: number]
    reduce((a, b) => a + b),
    console.log,
  );
  // 9
}

async function code_5_18_19() {
  const result = await pipe(
    Promise.resolve(5),
    a => a + 10,
    async a => {
      await delay(1000);
      return a * 2;
    },
    a => a - 5,
  );

  console.log(result);

  const arr = [1, 2, 3, 4, 5];

  // pipeline
  const result2 = await pipe(
    arr,
    toAsync,
    map(a => Promise.resolve(a + 10)),
    filter(a => a % 2 === 0),
    toArray,
    arr => arr.reverse(),
  );

  console.log(result2); // [result2: number[]]
  // [14, 12]

  // chaining
  const result3 = await fx(arr)
    .toAsync()
    .map(a => Promise.resolve(a + 10))
    .filter(a => a % 2 === 0)
    .toArray()
    .then(arr => arr.reverse());

  console.log(result3); // [result3: number[]]
  // [14, 12]
}

function code_5_20() {
  const keys = ['name', 'job', 'location'];
  const values = ['Marty', 'Programmer', 'New York'];

  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }

  console.log(obj);
  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}

function code_5_21() {
  const entries = [
    ['name', 'Marty'],
    ['job', 'Programmer'],
    ['location', 'New York']
  ];

  const obj = {};
  for (const [key, value] of entries) {
    obj[key] = value;
  }
  console.log(obj);
  // { name: 'Marty', job: 'Programmer', location: 'New York' }

  // 혹은
  const obj2 = Object.fromEntries(entries);
  console.log(obj2);
  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}

function code_5_22() {
  const keys = ['name', 'job', 'location'];
  const values = ['Marty', 'Programmer', 'New York'];

  const iterator = zip(keys, values);
  console.log(iterator.next()); // { done: false, value: [ 'name', 'Marty' ] }
  console.log(iterator.next()); // { done: false, value: [ 'job', 'Programmer' ] }
  console.log(iterator.next()); // { done: false, value: [ 'location', 'New York' ] }
  console.log(iterator.next()); // { done: true, value: undefined }

  const obj = Object.fromEntries(zip(keys, values));
  console.log(obj);
  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}

function code_5_23() {
  const keys = ['name', 'job', 'location'];
  const values = ['Marty', 'Programmer', 'New York'];

  pipe(
    zip(keys, values),
    Object.fromEntries,
    console.log,
  );
  // { name: 'Marty', job: 'Programmer', location: 'New York' }

  pipe(
    values,
    zip(keys),
    Object.fromEntries,
    console.log,
  );
  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}

function code_5_24() {
  const strings = ['a', 'b', 'c', 'd'];
  const iter = zip([0, 1, 2, 3], strings);
  console.log(iter.next()); // {done:false, value: [0, 'a']}
  console.log(iter.next()); // {done:false, value: [1, 'b']}
  console.log(iter.next()); // {done:false, value: [2, 'c']}
  console.log(iter.next()); // {done:false, value: [3, 'd']}
  console.log(iter.next()); // {done:true, value: undefined}
}

function code_5_25() {
  const iter = range(3);
  console.log(iter.next()); // { done: false, value: 0 }
  console.log(iter.next()); // { done: false, value: 1 }
  console.log(iter.next()); // { done: false, value: 2 }
  console.log(iter.next()); // { done: true, value: undefined }

  const strings = ['a', 'b', 'c', 'd', 'e'];
  const iter2 = zip(range(Infinity), strings);
  for (const a of iter2) {
    console.log(a);
  }
  // [0, 'a']
  // [1, 'b']
  // [2, 'c']
  // [3, 'd']
  // [4, 'e']
}

function code_5_26_27() {
  const count = (start = 1) => range(start, Infinity);

  function* repeatApply<A>(f: (acc: A) => A, acc: A) {
    while (true) yield acc = f(acc);
  }

  const nextCollatzValue = (num: number) =>
    num % 2 === 0
      ? num / 2
      : num * 3 + 1;

  // const collatzCount = (num: number) => pipe(
  //   zip(
  //     count(),
  //     repeatApply(nextCollatzValue, num),
  //   ),
  //   find(([cnt, val]) => val === 1),
  //   collatz => collatz!,
  //   head,
  // );

  const collatzCount = (num: number) => pipe(
    repeatApply(nextCollatzValue, num),
    zip(count()),
    find(([, val]) => val === 1),
    collatz => collatz!,
    head,
  );

  console.log(collatzCount(1)); // 3
  console.log(collatzCount(4)); // 2
  console.log(collatzCount(5)); // 5
  console.log(collatzCount(6)); // 8
  console.log(collatzCount(11)); // 14
}

function code_5_28() {
  fx([1, 2, 3, 0, 0, 0, 5, 6])
    .takeWhile(a => {
      console.log('takeWhile:', a, a >= 1);
      return a >= 1;
    })
    .forEach(a => console.log('forEach:', a));

  // takeWhile: 1 true
  // forEach: 1
  // takeWhile: 2 true
  // forEach: 2
  // takeWhile: 3 true
  // forEach: 3
  // takeWhile: 0 false

  fx([0, 10, 1, 3, 5, 0, 4, 2])
    .takeUntilInclusive(a => {
      console.log('takeUntilInclusive:', a, a === 5);
      return a === 5;
    })
    .forEach(a => console.log('forEach:', a));

  // takeUntilInclusive: 0 false
  // forEach: 0
  // takeUntilInclusive: 10 false
  // forEach: 10
  // takeUntilInclusive: 1 false
  // forEach: 1
  // takeUntilInclusive: 3 false
  // forEach: 3
  // takeUntilInclusive: 5 true
  // forEach: 5
}

export async function main() {
  code_5_13();
  code_5_14();
  code_5_15_16();
  await code_5_18_19();
  code_5_20();
  code_5_21();
  code_5_22();
  code_5_23();
  code_5_24();
  code_5_25();
  code_5_26_27();
  code_5_28();
}
