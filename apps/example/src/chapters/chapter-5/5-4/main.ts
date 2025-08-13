import {
  chunk,
  filter,
  flat,
  fx, groupBy,
  indexBy,
  join,
  map,
  pipe,
  range,
  reject,
  take,
  toArray,
  zip,
} from '@fxts/core';

function code_5_51() {
  const queryString = "name=Marty%20Yoo&age=41&city=Seoul";

  const queryObject = queryString
    .split("&")
    .map((param) => param.split("="))
    .map(entry => entry.map(decodeURIComponent))
    .map(([key, val]) => ({ [key]: val }))
    .reduce((a, b) => Object.assign(a, b), {});

  console.log(queryObject);
  // {name: "Marty Yoo", age: "41", city: "Seoul"}
}

function code_5_52_53_54() {
  const params = { name: "Marty Yoo", age: "41", city: "Seoul" };

  const queryString =
    Object.entries(params)
      .map(entry => entry.map(encodeURIComponent))
      .map(([key, value]) => `${key}=${value}`)
      .reduce((a, b) => `${a}&${b}`);

  console.log(queryString);
  // "name=Marty%20Yoo&age=41&city=Seoul"

  const queryString2 =
    Object.entries(params)
      .map(entry => entry.map(encodeURIComponent))
      .map((entry) => entry.join('='))
      .join('&');

  console.log(queryString2);
  // "name=Marty%20Yoo&age=41&city=Seoul"

  const queryString3 = pipe(
    Object.entries(params),
    map(map(encodeURIComponent)),
    map(join('=')),
    join('&'),
  );

  console.log(queryString3);
  // "name=Indong%20Yoo&age=41&city=Seoul"
}
function code_5_55() {
  const tree = [
    { id: 1, children: [{ id: 2 }, { id: 3 }] },
    { id: 4, children: [{ id: 5 }] },
  ];

  const transformedTree = tree.map(({ id, children }) => ({
    name: `parent-${id}`,
    children: children.map(child => ({ name: `child-${child.id}` })),
  }));

  console.log(transformedTree);
  // [
  //   { name: "parent-1", children: [ { name: "child-2" }, { name: "child-3" } ] },
  //   { name: "parent-4", children: [ { name: "child-5" } ] }
  // ]
}

function code_5_56() {
  const getMonthEndDates = (monthEnd: Date) =>
    monthEnd.getDay() === 6
      ? []
      : range(
        monthEnd.getDate() - monthEnd.getDay(),
        monthEnd.getDate() + 1,
      );

  const generateCalendar = (prevMonthEnd: Date, currentMonthEnd: Date) =>
    pipe(
      flat([
        getMonthEndDates(prevMonthEnd),
        range(1, currentMonthEnd.getDate() + 1),
        range(1, 7 - currentMonthEnd.getDay())
      ]),
      chunk(7),
      toArray,
    );

  const formatCalendar = (calendarWeeks: number[][]) =>
    pipe(
      calendarWeeks,
      map(map(day => (day < 10 ? ` ${day}` : `${day}`))),
      map(join(' ')),
      join('\n'),
    );

  const renderCalendar = (year: number, month: number) =>
    pipe(
      generateCalendar(
        new Date(year, month - 1, 0),
        new Date(year, month, 0)
      ),
      formatCalendar,
      console.log
    );

  renderCalendar(2024, 10);
  // 29 30  1  2  3  4  5
  //  6  7  8  9 10 11 12
  // 13 14 15 16 17 18 19
  // 20 21 22 23 24 25 26
  // 27 28 29 30 31  1  2
}

function code_5_57() {
  const find = <A>(f: (a: A) => boolean, iterable: Iterable<A>) =>
    pipe(
      iterable,
      filter(f),
      take(1),
      ([found]) => found as A | undefined
    );

  const found1 = find(a => a > 3, [1, 2, 3, 4]);
  const found2 = find(a => a > 4, [1, 2, 3, 4]);
  console.log(found1); // 4
  console.log(found2); // undefined

  const some = <A>(f: (a: A) => boolean, iterable: Iterable<A>) =>
    pipe(
      iterable,
      filter(f),
      take(1),
      ([...arr]) => arr.length === 1,
    );

  console.log(some(a => a % 2 === 0, [1, 3, 5]));
  // false
  console.log(some(a => a % 2 === 1, [1, 3, 5]));
  // true

  const every = <A>(f: (a: A) => boolean, iterable: Iterable<A>) => pipe(
    iterable,
    reject(f),
    take(1),
    ([...arr]) => arr.length === 0,
  );

  console.log(every(a => a > 2, [1, 3, 5]));
  // false
  console.log(every(a => a > 0, [1, 3, 5]));
  // true
}

function code_5_64_66() {
  const comments = [
    {
      id: 1, text: "First comment", replies: [
        { id: 11, text: "Reply 1-1" }
      ]
    },
    {
      id: 2, text: "Second comment", replies: []
    },
    {
      id: 3, text: "Third comment", replies: [
        { id: 31, text: "Reply 3-1" },
        { id: 32, text: "Reply 3-2" }
      ]
    }
  ];

  fx(comments)
    .map(({ id, text, replies }) => [{ id, text }, ...replies])
    .flat()
    .forEach(console.log);

  // [
  //   { id: 1, text: "First comment" },
  //   { id: 11, text: "Reply 1-1" },
  //   { id: 2, text: "Second comment" },
  //   { id: 3, text: "Third comment" },
  //   { id: 31, text: "Reply 3-1" },
  //   { id: 32, text: "Reply 3-2" }
  // ]

  const keys = ['name', 'job', 'location'];
  const values = ['Marty', 'Programmer', 'New York'];

  const object =
    fx(zip(keys, values))
      .map(([key, val]) => ({ [key]: val }))
      .reduce((a, b) => Object.assign(a, b), {});

  // { name: 'Marty', job: 'Programmer', location: 'New York' }
}

function code_5_67() {
  const items = ["Apple", "Banana", "Cherry"];

  const itemsWithIds = pipe(
    zip(range(Infinity), items),
    map(([id, item]) => ({ id, item })),
    toArray
  );

  console.log(itemsWithIds);

  // [
  //   { id: 0, item: "Apple" },
  //   { id: 1, item: "Banana" },
  //   { id: 2, item: "Cherry" },
  // ]
}

function code_5_68() {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  const posts = [
    { id: 1, title: "FP", user_id: 1 },
    { id: 2, title: "OOP", user_id: 2 },
    { id: 3, title: "MPP", user_id: 2 },
  ];

  const usersById = indexBy(user => user.id, users);

  const postsWithUsers = posts.map(post => ({
    ...post,
    user: usersById[post.user_id],
  }));

  console.log(postsWithUsers);
  // [
  //   { id: 1, title: "FP", user_id: 1, user: { id: 1, name: "Alice" } },
  //   { id: 2, title: "OOP", user_id: 2, user: { id: 2, name: "Bob" } },
  //   { id: 3, title: "MPP", user_id: 2, user: { id: 2, name: "Bob" } },
  // ]
}

function code_5_69() {
  const posts = [
    { id: 1, title: "FP", user_id: 1 },
    { id: 2, title: "OOP", user_id: 2 },
    { id: 3, title: "MPP", user_id: 2 },
  ];

  const comments = [
    { id: 1, text: "Great post!", post_id: 1 },
    { id: 2, text: "Very informative.", post_id: 1 },
    { id: 3, text: "Thanks for sharing!", post_id: 2 },
  ];

  const commentsByPostId = groupBy(comment => comment.post_id, comments);

  const postsWithComments = posts.map(post => ({
    ...post,
    comments: commentsByPostId[post.id] || [],
  }));

  console.log(postsWithComments);
  // [
  //   {
  //     id: 1, title: "FP", user_id: 1, comments: [
  //      { id: 1, text: "Great post!", post_id: 1 },
  //      { id: 2, text: "Very informative.", post_id: 1 }
  //     ]
  //   },
  //   {
  //     id: 2, title: "OOP", user_id: 2, comments: [
  //       { id: 3, text: "Thanks for sharing!", post_id: 2 }
  //     ]
  //   },
  //   { id: 3, title: "MPP", user_id: 2, comments: [] },
  // ]
}

export async function main() {
  code_5_51();
  code_5_52_53_54();
  code_5_55();
  code_5_56();
  code_5_57();
  code_5_64_66();
  code_5_67();
  code_5_68();
  code_5_69();
}
