import { html, Page } from 'rune-ts';

export class SectionPage extends Page<object> {
  title = '';
  link = '';
  lessons: (() => void)[] = [];

  get lessonsMap() {
    return new Map(this.lessons.map((f) => [f.name, f]));
  }

  override template() {
    return html`
      <div>
        <h1><a href="/">Home</a></h1>
        <h2><a href="${this.link}">${this.title}</a></h2>
        <ul>
          ${[...this.lessonsMap.keys()].map(
            (name) => html`
              <li style="padding: 8px;" class="${name}">
                <a href="?f=${name}">${name}</a>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }

  override onRender() {
    setTimeout(() => {
      const name = location.search.replace('?f=', '');
      if (name) {
        this.lessonsMap.get(name)!();
        this.element().querySelector<HTMLElement>(`.${name}`)!.style.background = 'yellow';
      }
    }, 100);
  }
}

