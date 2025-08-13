import { Page, html } from "rune-ts";

export class HomePage extends Page<object> {
  override template() {
    return html`
      <div>
        <h1><a href="/apps/lecture/public">Home</a></h1>
        <h2>Multi-Paradigm Programming</h2>
        <h3>Part 1. Iterator</h3>
        <ul>
          <li><a href="/part-1/section-2">Section 2. The Iterator Pattern in OOP and First-Class Functions</a></li>
          <li><a href="/part-1/section-3">Section 3. Generator Functions for Building Iterators in Imperative Programming</a></li>
          <li><a href="/part-1/section-4">Section 4. Iteration Protocol</a></li>
          <li><a href="/part-1/section-5">Section 5. Functional Programming with Iterables</a></li>
          <li><a href="/part-1/section-6">Section 6. Functional Type System in a Multi-Paradigm Language</a></li>
          <li><a href="/part-1/section-7">Section 7. Combining Classes, Higher-Order Functions, Iterables, and the Type System</a></li>
          <li><a href="/part-1/section-8">Section 8. Classes as Lists: Learning from LISP</a></li>
          <li><a href="/part-1/section-9">Section 9. List Processing – Code as Data, Logic in a List</a></li>
          <li><a href="/part-1/section-10">Section 10. Working with Real-World Data</a></li>
          <li><a href="/part-1/section-11">Section 11. Applying to More Problems</a></li>
        </ul>
      </div>
    `;
  }

  protected override onRender() {
    const lis = document.querySelectorAll('li');
    const list = [...lis];
  }
}
