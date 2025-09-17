import { append, concat, flat, forEach, map, pipe, reduce, toArray, zip } from '@fxts/core';
/**
 구현과 응용력을 한층 향상시킬 수 있는 연습 문제를 준비해보았습니다. [코드 4-7]서 한 단계 더 발전시켜 사용자 경험을 더욱 개선하기 위한 화면 렌더링 로직을 구현해봅시다.

  1. 빠른 응답 （100ms 내 완료）
  API 응답이 100ms 내로 이루어지면 초기에는 친구 목록 화면을 아래쪽부터 먼저 렌더링한 뒤 아래에서 위로 올라오는 애니메이션을 통해 화면에 표시하세요

  2. 지연된 응답（100ms 이상소요）
  API 응답이 100ms 이상 걸릴 경우 우선 제목과 로딩 표시만을 갖춘 친구 목록 창을 애니메이션으로 띄웁니다. 이후 응답이 완료되면 친구 목록을 렌더링하세요.
  만일 애니메이션 진행 중에 응답이 완료된다면 즉시 그리지 말고 애니메이션이 모두 종료된 뒤에 친구 목록을 렌더링합니다. UI가 끊기지 않고 부드럽게 전환되도록 처리하세요.

  이번 과제는 Promise를 보다 세밀하게 제어하는 방식을 연습하는 좋은 기회입니다. UI 렌더링 타이밍을 조절하면서 어떻게 하면 사용자 경험을 최대한 매끄럽게 만들 수 있을지 고민하고 구현해볼 수 있습니다.
 */
function toggleLoadingIndicator(show: boolean): void {
  if (show) {
    console.log('append loading...');
  } else {
    console.log('remove loading...');
  }
}

function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

interface User {
  name: string;
}
function getRandomValue<T>(a: T, b: T): T {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? a : b;
}

function getFriends(): Promise<User[]> {
  return delay(getRandomValue(60, 6_000), [
    { name: 'Marty' },
    { name: 'Michael' },
    { name: 'Sarah' },
  ]);
}

export function code_4_practice() {
  abstract class View<T> {
    private _element: HTMLElement | null = null;

    constructor(public data: T) {}

    element() {
      if (this._element === null) {
        throw new Error('You must call render() before accessing the element.');
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

  type Props = { name: string };

  class FriendList extends View<Props> {
    template(): Html {
      return html`
        <div>
          ${this.data.name}
          <button>x</button>
        </div>
      `;
    }

    async practice() {
      const friendsPromise = getFriends();

      const result = await Promise.race([friendsPromise, delay(100, 'isSlow')]);

      if (result === 'isSlow') {
        toggleLoadingIndicator(true);
        await friendsPromise;
        toggleLoadingIndicator(false);
      }

      const friends = await friendsPromise;

      console.log(
        'Friend list rendering:',
        friends.map(({ name }) => `<li>${name}</li>`),
      );

      // friends.map(({ name }) =>
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

  document.body.append(new FriendList({ name: 'Marty' }).render());
}

const html = (strs: TemplateStringsArray, ...vals: unknown[]) => new Html(strs, vals);

function fillTemplate<T>(strs: TemplateStringsArray, vals: T[], transform: (val: T) => string) {
  return pipe(
    vals,
    map(transform),
    append(''),
    zip(strs),
    flat,
    reduce((a, b) => a + b),
  );
}

class Html {
  constructor(
    private strs: TemplateStringsArray,
    private vals: unknown[],
  ) {}

  private combine(vals: unknown) {
    return Array.isArray(vals) ? vals.reduce((a, b) => html`${a}${b}`, html``) : vals;
  }

  private escape(val: unknown) {
    return val instanceof Html ? val.toHtml() : escapeHtml(val);
  }

  toHtml() {
    return fillTemplate(this.strs, this.vals, (val) => this.escape(this.combine(val)));
  }
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
