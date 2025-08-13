import { take, zip } from '@fxts/core';

export function lesson1_3() {
  // 11.1 `zip` and Index Increment

  const keys = ['name', 'job', 'location'];
  const values = ['Marty', 'Programmer', 'New York'];
  const entries = [...zip(keys, values)];
  console.log(entries);

  const iterator = zip(keys, values);
  console.log(iterator.next().value); // ['name', 'Marty']
  console.log(iterator.next().value); // ['job', 'Programmer']
  console.log(iterator.next().value); // ['location', 'New York']
  console.log(iterator.next().value); // undefined

  const obj = Object.fromEntries(
    take(3, zip(keys, values))
  );
  console.log(obj);
  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}
