export function lesson2_1() {
  // 6.2 Type Inference, Function Types, and Generics

  let strings = ['a', 'b', 'c'];
  strings.forEach(str => console.log(str.toUpperCase()));

  let numbers = [1, 2, 3];
  numbers
    .map(n => n / 10)
    .map(n => n.toFixed(2))
    .forEach(str => console.log(str.replace("0.", "")));

  function double(a: number): number;
  function double(a: string): string;
  function double(a: number | string): number | string {
    if (typeof a === 'number') {
      return a * 2;
    } else {
      return a + a;
    }
  }

  const num = double(10);
  console.log(num); // 20
  const str = double('Hi');
  console.log(str); // 'HiHi'
}
