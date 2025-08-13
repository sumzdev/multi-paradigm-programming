export function lesson3() {
  // 3.3 Reimplementing `reverse` with a Generator
  // function reverse<T>(array: T[]): Iterator<T> {
  //   let index = array.length;
  //   return {
  //     next() {
  //       return index === 0
  //         ? { done: true, value: undefined }
  //         : { done: false, value: array[--index] };
  //     },
  //   };
  // }

  function* reverse<T>(array: T[]) {
    let i = array.length;
    while (i) {
      yield array[--i];
    }
  }

  const iter = reverse([1, 2, 3, 4]);
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
}