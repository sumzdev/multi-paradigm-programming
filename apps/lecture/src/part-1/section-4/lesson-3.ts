export function lesson3() {
  // 4.3 Interactions Between the Language and Iterables — Spread Operator, Destructuring

  // Spread operator and iterables
  const array = [1, 2, 3];
  const array2 = [...array, 4, 5, 6];
  console.log(array2); // [1, 2, 3, 4, 5, 6]

  // Array from Set
  const set = new Set([1, 2, 3]);
  const array3 = [...set];
  console.log(array3); // [1, 2, 3]
  console.log(Array.from(set)); // [1, 2, 3]

  // Passing arguments by expanding with the spread operator
  function sum(...nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
  }

  const numbers = [1, 2, 3];
  console.log(sum(...numbers)); // 6

  // Destructuring assignment and iterables
  const array4 = [1, 2, 3, 4];
  const [first, second] = array4;
  console.log(first); // 1
  console.log(second); // 2

  const [head, ...tail] = array4;
  console.log(head); // 1
  console.log(tail); // [2, 3, 4]

  // Custom iterables and the spread operator
  function* naturals(end = Infinity) {
    let n = 1;
    while (n <= end) {
      yield n++;
    }
  }

  const array5 = [0, ...naturals(3)];
  console.log(array5); // [0, 1, 2, 3]
}