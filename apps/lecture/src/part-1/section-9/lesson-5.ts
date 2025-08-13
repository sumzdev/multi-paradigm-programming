export function lesson5() {
  // 9.5 The `find` Function and Safe Composition

  function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
    for (const a of iterable) {
      if (f(a)) yield a;
    }
  }

  function head<A>(iterable: Iterable<A>): A | undefined {
    const [first] = iterable;
    return first;
  }

  function find<A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined {
    return head(filter(f, iterable));
  }

  const result = find(a => a > 2, [1, 2, 3, 4]);
  console.log(result);
  // 3

  const result2 = find(a => a % 2 === 1, [2, 4, 6]);
  console.log(result2);
  // undefined

  type Menu = {
    name: string,
    price: number,
  }

  const desserts: Menu[] = [
    { name: 'Chocolate', price: 5000 },
    { name: 'Latte', price: 3500 },
    { name: 'Coffee', price: 3000 }
  ];

  const dessert = find(({ price }) => price < 2000, desserts);
  console.log(dessert?.name ?? 'T^T');
  // T^T

  const dessert2 = find(({ price }) => price < Infinity , desserts)!;
  console.log(dessert2.name);
  // Chocolate
}
