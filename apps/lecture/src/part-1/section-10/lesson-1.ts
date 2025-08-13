export function lesson1() {
  // Section 10. Working with Real-World Data
  // 10.1 Handling numeric data in 2D arrays

  const numbers = [
    [1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10]
  ];

  const oddSquareSum = numbers
    .flat()
    .filter(a => a % 2 === 1)
    .map(a => a * a)
    .reduce((a, b) => a + b, 0);

  console.log(oddSquareSum); // 165
}
