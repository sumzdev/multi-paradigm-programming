export function lesson5_3() {
  // 2.5 Lazy Evaluation – The Efficiency of the `reverse` Function
  function reverse<T>(array: T[]): Iterator<T> {
    let index = array.length;
    return {
      next() {
        return index === 0
          ? { done: true, value: undefined }
          : { done: false, value: array[--index] }
      }
    }
  }

  const arr = ['A', 'B', 'C', 'D', 'E', 'F'];
  const reversed = [...arr].reverse();
  console.log(
    reversed[0],
    reversed[1],
    arr[0],
    arr[1]
  );
  // F E A B

  const arr2 = ['A', 'B', 'C', 'D', 'E', 'F'];
  const reversed2 = reverse(arr2);
  console.log(
    reversed2.next().value,
    reversed2.next().value,
    arr2[0],
    arr2[1]
  );
  // F E A B
}