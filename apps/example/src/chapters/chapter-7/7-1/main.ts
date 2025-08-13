import { html, View, CustomEventWithDetail } from "rune-ts";

type Toggle = { on: boolean; };

class Toggled extends CustomEventWithDetail<Toggle> {}

class SwitchView extends View<Toggle> {
  override template() {
    return html`
      <button class="${this.data.on ? 'on' : ''}">
        <span class="toggle"></span>
      </button>
    `;
  }

  protected override onRender() {
    this.addEventListener('click', () => this.toggle());
  }

  private toggle() {
    this.setOn(!this.data.on);
    this.dispatchEvent(Toggled, {bubbles: true, detail: this.data});
  }

  setOn(bool: boolean) {
    this.data.on = bool;
    this.element().classList.toggle('on', bool);
  }
}

type Setting = {
  title: string;
  on: boolean;
};

class SettingItemView extends View<Setting> {
  switchView = new SwitchView(this.data);

  override template() {
    return html`
      <div>
        <span class="title">${this.data.title}</span>
        ${this.switchView}
      </div>
    `;
  }
}

class SettingListView extends View<Setting[]> {
  itemViews = this.data.map(setting => new SettingItemView(setting));

  override template() {
    return html`
      <div>
        ${this.itemViews}
      </div>
    `;
  }
}

class SettingPage extends View<Setting[]> {
  private listView = new SettingListView(this.data);
  private toggleAllView = new SwitchView({on: this.isAllOn()});

  override template() {
    return html`
      <div>
        <div class="header">
          <h2>Setting</h2>
          ${this.toggleAllView}
        </div>
        <div class="body">
          ${this.listView}
        </div>
      </div>
    `;
  }

  protected override onRender() {
    this.toggleAllView.addEventListener(Toggled, e => this.toggleAll(e.detail.on));
    this.listView.addEventListener(Toggled, () => this.syncToggleAllView());
  }

  toggleAll(on: boolean) {
    this.listView.itemViews
      .filter((itemView) => itemView.data.on !== on)
      .forEach(itemView => itemView.switchView.setOn(on));
  }

  syncToggleAllView() {
    this.toggleAllView.setOn(this.isAllOn());
  }

  isAllOn() {
    return this.listView.itemViews.every(itemView => itemView.data.on);
  }
}

export function main() {
  const settings: Setting[] = [
    { title: 'Wi-Fi', on: false },
    { title: 'Bluetooth', on: true },
    { title: 'Sound', on: false },
  ];

  document.querySelector('#body')!.append(
    new SettingPage(settings).render()
  );
}
