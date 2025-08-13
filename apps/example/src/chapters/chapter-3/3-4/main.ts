import { fx, head, take } from '../../../lib/fx2';

function code_3_41() {
  function find<A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      const { value, done } = iterator.next();
      if (done) break;
      if (f(value)) return value;
    }
    return undefined;
  }

  const result = find(a => a > 2, [1, 2, 3, 4]);
  console.log(result);
  // 3
}

function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    if (f(value)) yield value;
  }
}

function code_3_42_43() {
  function find<A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined {
    return filter(f, iterable).next().value;
    // or
    // const [head] = filter(f, iterable);
    // return head;
  }

  // [const result: number | undefined]
  const result = find(a => a > 2, [1, 2, 3, 4]);
  console.log(result);
  // 3

  const isOdd = (a: number) => a % 2 === 1;

  const result2 = find(isOdd, [2, 4, 6]); // [const result2: number | undefined]
  console.log(result2);
  // undefined
}

function code_3_44() {
  const head = <A>(
    iterable: Iterable<A>
  ): A | undefined => iterable[Symbol.iterator]().next().value;
  // or
  // const head = <A>([a]: Iterable<A>): A | undefined => a;

  const find = <A>(
    f: (a: A) => boolean,
    iterable: Iterable<A>
  ): A | undefined => head(filter(f, iterable));

  // [const result: number | undefined]
  const result = find(a => a > 2, [1, 2, 3, 4]);
  console.log(result);
  // 3

  const isOdd = a => a % 2 === 1;

  const result2 = find(isOdd, [2, 4, 6]); // [const result2: number | undefined]
  console.log(result2);
  // undefined
}

function code_3_46_47() {
  const find = <A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined =>
    fx(iterable)
      .filter(f)
      .to(head);

  // [const result: number | undefined]
  const result = find(a => a > 2, [1, 2, 3, 4]);
  console.log(result);
  // 3

  const isOdd = a => a % 2 === 1;

  const result2 = find(isOdd, [2, 4, 6]); // [const result2: number | undefined]
  console.log(result2);
  // undefined

  const desserts = [
    { name: 'Chocolate', price: 5000 },
    { name: 'Latte', price: 3500 },
    { name: 'Coffee', price: 3000 }
  ];

  // (1)
  const dessert = find(({ price }) => price < 2000, desserts);
  console.log(dessert?.name ?? 'T^T');
  // T^T

  // (2)
  const dessert2 = find(({ price }) => price < Infinity , desserts)!;
  console.log(dessert2.name);
  // Chocolate
}

const isOdd = (a: number) => a % 2 === 1;

function code_3_50_53() {
  function every<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
    return fx(iterable)
      .map(f)
      .reduce((a, b) => a && b, true); // [a: boolean], [b: boolean]
  }

  console.log(every(isOdd, [1, 3, 5]));
  // true
  console.log(every(isOdd, [1, 2, 5]));
  // false

  function some<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
    return fx(iterable)
      .map(f)
      .reduce((a, b) => a || b, false); // [a: boolean], [b: boolean]
  }

  console.log(some(isOdd, [2, 5, 6]));
  // true
  console.log(some(isOdd, [2, 4, 6]));
  // false
}

function code_3_54_55() {
  function some<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
    return fx(iterable)
      .map(f)
      .filter(a => a)
      .take(1)
      .reduce((a, b) => a || b, false); // [a: boolean], [b: boolean]
  }

  console.log(some(isOdd, [2, 5, 6]));
  // true
  console.log(some(isOdd, [2, 4, 6]));
  // false

  function every<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
    return fx(iterable)
      .map(f)
      .filter(a => !a)
      .take(1)
      .reduce((a, b) => a && b, true); // [a: boolean], [b: boolean]
  }

  console.log(every(isOdd, [1, 3, 5]));
  // true
  console.log(every(isOdd, [1, 2, 5]));
  // false
}

function accumulateWith<A>(
  accumulator: (a: boolean, b: boolean) => boolean,
  acc: boolean,
  taking: (a: boolean) => boolean,
  f: (a: A) => boolean,
  iterable: Iterable<A>
): boolean {
  return fx(iterable)
    .map(f)
    .filter(taking)
    .take(1)
    .reduce(accumulator, acc);
}

function every<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
  return accumulateWith((a, b) => a && b, true, a => !a, f, iterable);
}

function some<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
  return accumulateWith((a, b) => a || b, false, a => a, f, iterable);
}

function code_3_56() {
  console.log(every(isOdd, [1, 3, 5]));
  // true
  console.log(every(isOdd, [1, 2, 5]));
  // false

  console.log(some(isOdd, [2, 5, 6]));
  // true
  console.log(some(isOdd, [2, 4, 6]));
  // false
}

function* concat<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
  for (const iterable of iterables) yield* iterable;
}

function code_3_57() {
  const arr = [1, 2, 3, 4];
  const iter = concat(arr, [5]);
  console.log([...iter]);
  // [1, 2, 3, 4, 5]
}

function code_3_58() {
  const arr = [1, 2, 3, 4, 5];

  const arr2 = arr.concat([6, 7, 8, 9, 10]);
  console.log(arr2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  let acc = 0;
  for (const a of take(7, arr2)) {
    acc += a;
  }
  console.log(acc); // 28

  const iter = concat(arr, [6, 7, 8, 9, 10]);
  console.log(iter); // concat {<suspended>}
  let acc2 = 0;
  for (const a of take(7, iter)) {
    acc2 += a;
  }
  console.log(acc2); // 28
}

function code_3_59() {
  const arr = [1, 2, 3, 4, 5];

  arr.push(6, 7);
  let acc1 = 0;
  for (const a of arr) {
    acc1 += a;
  }
  console.log(acc1); // 28
  console.log(arr); // [1, 2, 3, 4, 5, 6, 7]

  arr.pop();
  arr.pop();

  arr.push(8, 9);
  let acc2 = 0;
  for (const a of arr) {
    acc2 += a;
  }
  console.log(acc2); // 32
  console.log(arr); // [1, 2, 3, 4, 5, 8, 9]

  arr.pop();
  arr.pop();
}

function code_3_59a() {
  const arr = [1, 2, 3, 4, 5];

  const iter1 = concat(arr, [6, 7]);
  let acc3 = 0;
  for (const a of iter1) {
    acc3 += a;
  }
  console.log(acc3); // 28
  console.log(arr); // [1, 2, 3, 4, 5];

  const iter2 = concat(arr, [8, 9]);
  let acc4 = 0;
  for (const a of iter2) {
    acc4 += a;
  }
  console.log(acc4); // 32
  console.log(arr); // [1, 2, 3, 4, 5]
}

function code_3_60() {
  const arr = ['2', '3', '4', '5'];
  arr.unshift('1');
  console.log(arr); // ['1', '2', '3', '4', '5']
  let result1 = '';
  for (const str of arr) {
    result1 += str;
  }
  console.log(result1); // '12345'
}

function code_3_60a() {
  const arr = ['2', '3', '4', '5'];
  const iter = concat(['1'], arr);
  console.log(arr); // ['2', '3', '4', '5']
  let result2 = '';
  for (const str of iter) {
    result2 += str;
  }
  console.log(result2); // '12345'
}

function code_3_61() {
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [6, 7, 8, 9, 10];
  const iter = take(3, concat(arr1, arr2));
  console.log([...iter]); // [1, 2, 3]
}

function code_3_62() {
  const arr = [3, 4, 5];
  console.log(some(n => n < 3, arr));
  // false

  const iter = concat([1, 2], arr);
  console.log(some(n => n < 3, iter));
  // true
}

export function main() {
  code_3_41();
  code_3_42_43();
  code_3_44();
  code_3_46_47();
  code_3_50_53();
  code_3_54_55();
  code_3_56();
  code_3_57();
  code_3_58();
  code_3_59();
  code_3_59a();
  code_3_60();
  code_3_60a();
  code_3_61();
  code_3_62();
}
