export function lesson1() {
  // 11.1 `zip` and Index Increment

  const keys = ['name', 'job', 'location'];
  const values = ['Marty', 'Programmer', 'New York'];

  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }

  console.log(obj);
  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}