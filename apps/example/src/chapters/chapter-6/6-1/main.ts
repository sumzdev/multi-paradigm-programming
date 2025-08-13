import { append, concat, flat, forEach, map, pipe, reduce, toArray, zip } from '@fxts/core';

function code_6_1() {
  function upper(strs: TemplateStringsArray, ...vals: string[]) {
    console.log(strs); // ["a: ", ", b: ", "."]
    console.log(vals); // ["a", "b"]
    return strs[0]
      + vals[0].toUpperCase()
      + strs[1]
      + vals[1].toUpperCase()
      + strs[2];
  }

  const a = 'a';
  const b = 'b';

  const result = upper`a: ${a}, b: ${b}.`;
  console.log(result); // a: A, b: B.
}

function code_6_2() {
  function html(strs: TemplateStringsArray, ...vals: string[]) {
    vals.push('');
    return pipe(
      zip(strs, vals),
      toArray
    );
  }

  const a = 'A',
    b = 'B',
    c = 'C';

  const result = html`<b>${a}</b><i>${b}</i><em>${c}</em>`;

  console.log(result);
  // [["<b>", "A"], ["</b><i>", "B"], ["</i><em>", "C"], ["</em>", ""]]
}

function code_6_3() {
  function html(strs: TemplateStringsArray, ...vals: string[]) {
    vals.push('');
    return pipe(
      vals,
      zip(strs),
      flat,
      reduce((a, b) => a + b),
    );
  }

  const a = 'A',
    b = 'B',
    c = 'C';

  const result = html`<b>${a}</b><i>${b}</i><em>${c}</em>`;

  console.log(result);
  // <b>A</b><i>B</i><em>C</em>
}

function code_6_4() {
  const html = (strs: TemplateStringsArray, ...vals: string[]) =>
    pipe(
      concat(vals, ['']),
      zip(strs),
      flat,
      reduce((a, b) => a + b)
    );

  const a = 'A',
    b = 'B',
    c = 'C';

  const result = html`<b>${a}</b><i>${b}</i><em>${c}</em>`;
  console.log(result);
  // <b>A</b><i>B</i><em>C</em>
}

function code_6_4a() {
  const html = (strs: TemplateStringsArray, ...vals: string[]) =>
    pipe(
      vals,
      append(''),
      zip(strs),
      flat,
      reduce((a, b) => a + b)
    );

  const a = 'A',
    b = 'B',
    c = 'C';

  const result = html`<b>${a}</b><i>${b}</i><em>${c}</em>`;
  console.log(result);
  // <b>A</b><i>B</i><em>C</em>
}

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
};

const source = '(?:' + Object.keys(escapeMap).join('|') + ')';
const testRegexp = RegExp(source);
const replaceRegexp = RegExp(source, 'g');

function escapeHtml(val: unknown): string {
  const string = `${val}`;
  return testRegexp.test(string)
    ? string.replace(replaceRegexp, (match) => escapeMap[match])
    : string;
}

function code_6_6() {
  console.log(escapeHtml('<script>alert("XSS")</script>'));
  // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;

  console.log(escapeHtml('Hello & Welcome! "Have" a nice day <3'));
  // Hello &amp; Welcome! &quot;Have&quot; a nice day &lt;3
}

function code_6_7() {
  const html = (strs: TemplateStringsArray, ...vals: unknown[]) =>
    pipe(
      vals,
      map(escapeHtml),
      append(''),
      zip(strs),
      flat,
      reduce((a, b) => a + b)
    );

  const a = '<script>alert("XSS")</script>';
  const b = 'Hello & Welcome!';

  console.log(html`
    <ul>
      <li>${a}</li>
      <li>${b}</li>
    </ul>
  `);
  // <ul>
  //   <li>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</li>
  //   <li>Hello &amp; Welcome!</li>
  // </ul>
}

function code_6_8() {
  const html = (strs: TemplateStringsArray, ...vals: unknown[]) =>
    pipe(
      vals,
      map(escapeHtml),
      append(''),
      zip(strs),
      flat,
      reduce((a, b) => a + b)
    );

  type Menu = {
    name: string;
    price: number;
  };

  const menuHtml = ({ name, price }: Menu) => html`<li>${name} (${price})</li>`;

  const menu: Menu = { name: 'Choco Latte & Cookie', price: 8000 };

  const a = '<script>alert("XSS")</script>';
  const b = 'Hello & Welcome!';

  const result = html`
    <ul>
      <li>${a}</li>
      <li>${b}</li>
      ${menuHtml(menu)}
      ${html`<li>${html`<b>3-step nesting</b>`}</li>`}
    </ul>
  `;

  console.log(result);
  // <ul>
  //   <li>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</li>
  //   <li>Hello &amp; Welcome!</li>
  //   &lt;li&gt;Choco Latte &amp; Cookie (8000)&lt;/li&gt;
  //   &lt;li&gt;&lt;b&gt;3-step nesting&lt;/b&gt;&lt;/li&gt;
  // </ul>
}

function code_6_9_10_11_12_12a() {
  // [6-9]
  const html = (strs: TemplateStringsArray, ...vals: unknown[]) =>
    new Html(strs, vals);

  // [6-10]
  class Html {
    constructor(
      private strs: TemplateStringsArray,
      private vals: unknown[]
    ) {}

    private escape(val: unknown) {
      return val instanceof Html
        ? val.toHtml()
        : escapeHtml(val);
    }

    toHtml() {
      return pipe(
        this.vals,
        map(val => this.escape(val)),
        append(''),
        zip(this.strs),
        flat,
        reduce((a, b) => a + b)
      );
    }
  }

  type Menu = {
    name: string;
    price: number;
  };

  const menuHtml = ({ name, price }: Menu) => html`<li>${name} (${price})</li>`;

  // [6-11]
  const a = '<script>alert("XSS")</script>';
  const b = 'Hello & Welcome!';
  const menu: Menu = { name: 'Choco Latte & Cookie', price: 8000 };

  const result = html`
    <ul>
      <li>${a}</li>
      <li>${b}</li>
      ${menuHtml(menu)}
      ${html`<li>${html`<b>3-step nesting</b>`}</li>`}
    </ul>
  `;

  console.log(result.toHtml());
  // <ul>
  //   <li>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</li>
  //   <li>Hello &amp; Welcome!</li>
  //   <li>Choco Latte &amp; Cookie (8000)</li>
  //   <li><b>3-step nesting</b></li>
  // </ul>

  // [6-12]
  const menus: Menu[] = [
    { name: 'Americano', price: 4500 },
    { name: 'Cappuccino', price: 5000 },
    { name: 'Latte & cookie set', price: 8000 },
  ];

  const menuBoardHtml = (menus: Menu[]) => html`
    <div>
      <h1>Menu list</h1>
      <ul>
        ${menus.map(menuHtml).reduce((acc, a) => acc + a.toHtml(), '')}
      </ul>
    </div>
  `;

  console.log(menuBoardHtml(menus).toHtml());
  // <div>
  //   <h1>Menu list</h1>
  //   <ul>
  //     &lt;li&gt;Americano (4500)&lt;/li&gt;
  //     &lt;li&gt;Cappuccino (5000)&lt;/li&gt;
  //     &lt;li&gt;Latte &amp; cookie set (8000)&lt;/li&gt;
  //   </ul>
  // </div>

  // [6-12a]
  const menuBoardHtml2 = (menus: Menu[]) => html`
    <div>
      <h1>Menu list</h1>
      <ul>
        ${menus.map(menuHtml).reduce((a, b) => html`${a}${b}`)}
      </ul>
    </div>
  `;

  console.log(menuBoardHtml2(menus).toHtml());
  // <div>
  //   <h1>Menu list</h1>
  //   <ul>
  //     <li>Americano (4500)</li>
  //     <li>Cappuccino (5000)</li>
  //     <li>Latte &amp; cookie set (8000)</li>
  //   </ul>
  // </div>
}

function fillTemplate<T>(
  strs: TemplateStringsArray,
  vals: T[],
  transform: (val: T) => string
) {
  return pipe(
    vals,
    map(transform),
    append(''),
    zip(strs),
    flat,
    reduce((a, b) => a + b)
  );
}

class Html {
  constructor(
    private strs: TemplateStringsArray,
    private vals: unknown[]
  ) {}

  private combine(vals: unknown) {
    return Array.isArray(vals)
      ? vals.reduce((a, b) => html`${a}${b}`, html``)
      : vals;
  }

  private escape(val: unknown) {
    return val instanceof Html
      ? val.toHtml()
      : escapeHtml(val);
  }

  toHtml() {
    return fillTemplate(
      this.strs,
      this.vals,
      val => this.escape(this.combine(val)),
    );
  }
}

const html = (strs: TemplateStringsArray, ...vals: unknown[]) =>
  new Html(strs, vals);

function upper(strs: TemplateStringsArray, ...vals: string[]) {
  return fillTemplate(
    strs,
    vals,
    val => val.toUpperCase()
  );
}

function code_6_13_14() {
  type Menu = {
    name: string;
    price: number;
  };

  const menus: Menu[] = [
    { name: 'Americano', price: 4500 },
    { name: 'Cappuccino', price: 5000 },
    { name: 'Latte & cookie set', price: 8000 },
  ];

  const menuHtml = ({ name, price }: Menu) => html`<li>${name} (${price})</li>`;

  const menuBoardHtml = (menus: Menu[]) => html`
    <div>
      <h1>Menu list</h1>
      <ul>
        ${menus.map(menuHtml)}
      </ul>
    </div>
  `;

  console.log(menuBoardHtml(menus).toHtml());
  // <div>
  //   <h1>Menu list</h1>
  //   <ul>
  //     <li>Americano (4500)</li>
  //     <li>Cappuccino (5000)</li>
  //     <li>Latte &amp; cookie set (8000)</li>
  //   </ul>
  // </div>

  const a = 'a';
  const b = 'b';

  console.log(
    upper`a: ${a}, b: ${b}.`
  );
  // a: A, b: B.
}

function code_6_15_16() {
  abstract class View<T> {
    private _element: HTMLElement | null = null;

    constructor(public data: T) {}

    element() {
      if (this._element === null) {
        throw new Error("You must call render() before accessing the element.");
      } else {
        return this._element;
      }
    }

    abstract template(): Html;

    render(): HTMLElement {
      const wrapEl = document.createElement('div');
      wrapEl.innerHTML = this.template().toHtml();
      this._element = wrapEl.children[0] as HTMLElement;
      this._element.classList.add(this.constructor.name);
      this.onRender();
      return this._element;
    }

    protected onRender() {}
  }

  type User = {
    name: string;
    age: number;
  };

  class UserView extends View<User> {
    template(): Html {
      return html`
        <div>
          ${this.data.name} (${this.data.age})
          <button>x</button>
        </div>
      `;
    }

    protected override onRender() {
      this.element()
        .querySelector('button')!
        .addEventListener('click', () => this.remove());
    }

    private remove() {
      this.element().remove();
      alert(`Removed ${this.data.name}`);
    }
  }

  const users: User[] = [
    { name: 'Marty', age: 40 },
    { name: 'Jenna', age: 34 },
    { name: 'Ethan', age: 31 },
  ];

  console.log(
    new UserView(users[0]).render().outerHTML
  );
  // <div class="UserView">
  //   Marty (40)
  //   <button>x</button>
  // </div>

  users
    .map(user => new UserView(user))
    .map(view => view.render())
    .forEach(element => document.body.append(element));

  pipe(
    document.querySelectorAll('.UserView'),
    forEach(console.log)
  );
  // <div class="UserView">
  //   Marty (40)
  //   <button>x</button>
  // </div>
  // <div class="UserView">
  //   Jenna (34)
  //   <button>x</button>
  // </div>
  // <div class="UserView">
  //   Ethan (31)
  //   <button>x</button>
  // </div>
}

export function main() {
  code_6_1();
  code_6_2();
  code_6_3();
  code_6_4();
  code_6_4a();
  code_6_6();
  code_6_7();
  code_6_8();
  code_6_9_10_11_12_12a();
  code_6_13_14();
  code_6_15_16();
}
