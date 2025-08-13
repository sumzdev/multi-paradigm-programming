import { code_1_45, main } from './main';
import { html, Page } from 'rune-ts';

export class Chapter1Section5 extends Page<object> {
  override template() {
    return html`
      <div>
        <h1><a href="/">Home</a></h1>
        ${code_1_45()}
      </div>
    `;
  }

  override onRender() {
    main();
  }
}
