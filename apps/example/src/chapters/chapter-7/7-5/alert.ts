import { html, View, on } from 'rune-ts';

export class AlertView extends View<{ message: string }> {
  private resolve!: () => void; // (1)
  readonly promise = new Promise<void>(res => this.resolve = res); // (2)

  override template() {
    return html`
      <div>
        <div class="message">${this.data.message}</div>
        <button>OK</button>  
      </div>
    `;
  }

  @on('click', 'button') // (3)
  private close() {
    this.element().remove();
    this.resolve();
  }

  static open(message: string) { // (4)
    const view = new AlertView({ message });
    document.body.append(view.render());
    return view.promise;
  }
}

export class ConfirmView extends View<{ message: string }> {
  private resolve!: (bool: boolean) => void; // (1)
  readonly promise = new Promise<boolean>(res => this.resolve = res); // (2)

  override template() {
    return html`
      <div>
        <div class="message">${this.data.message}</div>
        <button class="cancel">Cancel</button>
        <button class="confirm">Confirm</button>  
      </div>
    `;
  }

  @on('click', 'button')
  private close(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement;
    this.element().remove();
    this.resolve(button.matches('.confirm'));
  }

  static open(message: string) {
    const view = new ConfirmView({ message });
    document.body.append(view.render());
    return view.promise;
  }
}

export async function main() {
  alert('Completed.');
  console.log('alert');

  await AlertView.open('Completed.');
  console.log('AlertView');

  if (confirm('Do you want to delete it?')) {
    console.log('Delete');
  } else {
    console.log('Cancel');
  }

  if (await ConfirmView.open('Completed.')) {
    console.log('Delete');
  } else {
    console.log('Cancel');
  }
}