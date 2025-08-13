import { html, Page } from 'rune-ts';

export class ChapterPage extends Page<object> {
  override template() {
    return html`
      <div>
        <h1><a href="/">Home</a></h1>
      </div>
    `;
  }
}
