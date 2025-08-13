function code_2_1_2_3() {
  let a = 10;

  let message = "Hello, TypeScript!";

  const selected = true;
  // [const selected: true]

  let checked = true;
  // [let checked: boolean]
}

function code_2_4() {
  function add(a: number, b: number) {
    return a + b;
  }
}

function code_2_5() {
  function add(a: string, b: string) {
    return a + b;
  }
}

function code_2_6() {
  function add(a: string, b: string) {
    return parseInt(a) + parseInt(b);
  }
}

function code_2_7() {
  function add(a: string, b: string): number {
    return parseInt(a) + parseInt(b);
  }
}

function code_2_8() {
  let user = {
    name: "Marty",
    age: 30
  };
}

function code_2_9() {
  let strs = ['a', 'b', 'c'];
  strs.forEach(str => console.log(str.toUpperCase())); // [str: string]
}

function code_2_10() {
  function identity<T>(arg: T): T {
    return arg;
  }

  const a = identity("hi"); // [const a: "hi"]

  const b = identity(1); // [const b: 1]

  const c = identity<string>("a"); // [const c: string]

  const d = identity<number>(1); // [const d: number]

  class User {}
  const e = identity(new User()); // [const e: User]

  const f = identity((n: number) => n % 2 === 1); // [const f: (n: number) => boolean]
}

function code_2_11_12_13() {
  function add(a: number, b: number): number {
    return a + b;
  }

  const result: number = add(2, 3); // 5

  function double(a: number): number;
  function double(a: string): string;
  function double(a: number | string): number | string {
    if (typeof a === 'number') {
      return a * 2;
    } else {
      return a + a;
    }
  }

  const numResult: number = double(10); // 20
  const strResult: string = double('Hi'); // 'HiHi'

  const multiply = (a: number, b: number): number => a * b;

  const num: number = multiply(4, 5); // 20
}

function code_2_14_15() {
  const multiply = (a: number, b: number) => a * b;

  const num: number = multiply(4, 5); // 20

  type Add = (a: number, b: number) => number;

  const add: Add = (a, b) => a + b;
}

function code_2_16() {
  function constant<T>(a: T): () => T {
    return () => a;
  }

  const getFive = constant(5);
  const ten: number = getFive() + getFive();
  console.log(ten); // 10

  const getHi = constant("Hi");
  const hi2: string = getHi() + getHi();
  console.log(hi2); // HiHi
}

export function main() {
  code_2_1_2_3()
  code_2_4();
  code_2_5();
  code_2_6();
  code_2_7();
  code_2_8();
  code_2_9();
  code_2_10();
  code_2_11_12_13();
  code_2_14_15();
  code_2_16();
}
