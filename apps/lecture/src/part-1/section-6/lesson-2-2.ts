
export function lesson2_2() {
  // identity
  function identity<T>(arg: T): T {
    return arg;
  }

  const a = identity("hi");
  const b = identity(1);
  class User {}
  const c = identity(new User());
  const d = identity((n: number) => n % 2 === 1);

  // constant
  function constant<T>(a: T): () => T {
    return () => a;
  }

  const getFive = constant(5);
  const ten = getFive() + getFive();
  console.log(ten); // 10

  const getHi = constant("Hi");
  const hi2 = getHi() + getHi();
  console.log(hi2); // HiHi
}
