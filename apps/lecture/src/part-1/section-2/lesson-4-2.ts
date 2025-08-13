export function lesson4_2() {
  // 2.4 `reverse` Function That Creates a Reversed Iterator
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

  const arr = ['a', 'b', 'c', 'd'];
  arr.reverse();
  console.log(arr[0]);
  console.log(arr[1]);
  console.log(arr[2]);
  console.log(arr[3]);

  const arr2 = ['a', 'b', 'c', 'd'];
  const iter2 = reverse(arr2);
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());
}