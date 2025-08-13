import { Page, html } from "rune-ts";


export class HomePage extends Page<object> {
  override template() {
    return html`
      <div>
        <h1><a href="/">Home</a></h1>
        <ul>
          <li><a href="/1-1">1-1</a></li>
          <li><a href="/1-2">1-2</a></li>
          <li><a href="/1-3">1-3</a></li>
          <li><a href="/1-4">1-4</a></li>
          <li><a href="/1-5">1-5</a></li>
          <li><a href="/2-1">2-1</a></li>
          <li><a href="/2-2">2-2</a></li>
          <li><a href="/2-3">2-3</a></li>
          <li><a href="/3-1">3-1</a></li>
          <li><a href="/3-3">3-3</a></li>
          <li><a href="/3-4">3-4</a></li>
          <li><a href="/4-1">4-1</a></li>
          <li><a href="/4-2">4-2</a></li>
          <li><a href="/4-3">4-3</a></li>
          <li><a href="/4-4">4-4</a></li>
          <li><a href="/5-1">5-1</a></li>
          <li><a href="/5-2">5-2</a></li>
          <li><a href="/5-3">5-3</a></li>
          <li><a href="/5-4">5-4</a></li>
          <li><a href="/6-1">6-1</a></li>
          <li><a href="/6-2">6-2</a></li>
          <li><a href="/7-1">7-1</a></li>
          <li><a href="/7-234">7-234</a></li>
          <li><a href="/7-5">7-5</a></li>
          <li><a href="/7-5-2">7-5-2</a></li>
        </ul>  
      </div>
    `;
  }
}
