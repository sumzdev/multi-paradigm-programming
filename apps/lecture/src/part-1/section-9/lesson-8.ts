function* concat<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
  for (const iterable of iterables) yield* iterable;
}

export function lesson8() {
  const arr = [1, 2, 3, 4];
  const iter = concat(arr, [5, 6], [7, 8]);
  console.log([...iter]);
  code1();
  code2();
  code3();
  code4();
}

function code1() {
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

function code2() {
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

function code3() {
  const arr = ['2', '3', '4', '5'];
  arr.unshift('1');
  console.log(arr); // ['1', '2', '3', '4', '5']
  let result1 = '';
  for (const str of arr) {
    result1 += str;
  }
  console.log(result1); // '12345'
}

function code4() {
  const arr = ['2', '3', '4', '5'];
  const iter = concat(['1'], arr);
  console.log(arr); // ['2', '3', '4', '5']
  let result2 = '';
  for (const str of iter) {
    result2 += str;
  }
  console.log(result2); // '12345'
}