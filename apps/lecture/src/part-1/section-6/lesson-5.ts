import {filter, forEach, map} from '../../lib/fx1';

export function lesson5() {
  // 6.5 Extensibility of the Iteration Protocol Designed with Interfaces
  document.body.innerHTML = `
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  `;

  const nodeList = document.querySelectorAll('li');

  // Use a for...of loop to iterate over the NodeList
  for (const node of nodeList) {
    console.log(node.textContent);
    // 1
    // 2
    // 3
    // 4
    // 5
  }

  forEach(console.log,
    filter(x => x % 2 === 1,
      map(node => parseInt(node.textContent!),
        document.querySelectorAll('li'))));

  forEach(element => element.remove(),
    filter(node => parseInt(node.textContent!) % 2 === 0,
      document.querySelectorAll('li')));

  console.log(document.querySelectorAll('li'));

  // const nodes = document.querySelectorAll('li');
  // console.log(nodes[0], nodes[1], nodes.length);
  // // <li>1</li> <li>3</li> 3
  //
  // nodes.forEach(node => console.log(node));
  // // <li>1</li>
  // // <li>3</li>
  // // <li>5</li>
  //
  // nodes.map(node => node.textContent);
  // // Uncaught TypeError: nodes.map is not a function
}
