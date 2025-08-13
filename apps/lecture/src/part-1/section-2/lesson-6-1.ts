export function lesson6_1() {
  // 2.6 Lazy Evaluation – A `map` Function That Returns an Iterator
  function reverse<T>(array: T[]): Iterator<T> {
    let index = array.length;
    return {
      next() {
        console.log('reverse');
        return index === 0
          ? { done: true, value: undefined }
          : { done: false, value: array[--index] }
      }
    }
  }

  function map<A, B>(f: (a: A) => B, iterator: Iterator<A>): Iterator<B> {
    return {
      next() {
        console.log('map');
        const { done, value } = iterator.next();
        return done
          ? { done, value }
          : { done, value: f(value) };
      }
    }
  }

  const reversed = reverse([1, 2, 3, 4, 5, 6, 7, 8]);
  // console.log(reversed.next().value, reversed.next().value);

  const mapped = map(a => a * 10, reversed);
  console.log(mapped.next().value, mapped.next().value);
  // 80 70
}