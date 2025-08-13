export function forEach(f, iterable) {
  for (const value of iterable) {
    f(value);
  }
}

export function* map(f, iterable) {
  for (const value of iterable) {
    yield f(value);
  }
}

export function* filter(f, iterable) {
  for (const value of iterable) {
    if (f(value)) {
      yield value;
    }
  }
}

export function* naturals(end = Infinity) {
  let n = 1;
  while (n <= end) {
    yield n++;
  }
}
