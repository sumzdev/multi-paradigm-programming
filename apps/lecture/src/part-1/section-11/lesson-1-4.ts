import { range, zip } from '@fxts/core';

export function lesson1_4() {
  // 11.1 `zip` and Index Increment

  const strings = ['a', 'b', 'c', 'd'];
  const iter = zip(range(Infinity), strings);
  console.log(iter.next().value); // [0, 'a']
  console.log(iter.next().value); // [1, 'b']
  console.log(iter.next().value); // [2, 'c']
  console.log(iter.next().value); // [3, 'd']
  console.log(iter.next().value); // undefined
}