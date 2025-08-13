export function lesson1_2() {
  // 11.1 `zip` and Index Increment

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

  const obj2 = Object.fromEntries(entries);
  console.log(obj2);
  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}
