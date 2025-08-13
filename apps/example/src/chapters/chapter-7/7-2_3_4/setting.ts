import { html, View } from 'rune-ts';
import { ToggleListController } from './lib/ToggleListController';
import {SwitchView} from "./lib/SwitchView";
import {ListView} from "./lib/ListView";

interface Setting {
  title: string;
  on: boolean;
}

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

class SettingListView extends ListView<SettingItemView> {
  ItemView = SettingItemView;
}

class SettingPage extends View<Setting[]> {
  private toggleAllView = new SwitchView();
  private listView = new SettingListView(this.data);

  private toggleListController = new ToggleListController(
    this.toggleAllView,
    this.listView,
    (itemView) => itemView.data.on, // getItemViewOn
    (itemView, bool) => itemView.switchView.setOn(bool) // setItemViewOn
  );

  override template() {
    return html`
      <div>
        <div class="header">
          <h2>Setting</h2>
          ${this.toggleListController.toggleAllView}
        </div>
        <div class="body">
          ${this.toggleListController.listView}
        </div>
      </div>
    `;
  }
}

export function main() {
  const settings: Setting[] = [
    {title: 'Wifi', on: true},
    {title: 'Bluetooth', on: false},
    {title: 'AirDrop', on: true},
  ];

  document.querySelector('#body')!.append(
    new SettingPage(settings).render()
  );
}