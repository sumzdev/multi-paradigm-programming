import { html, View } from 'rune-ts';

export abstract class ListView<IV extends View<object>> extends View<IV['data'][]> {
  abstract ItemView: new (item: IV['data']) => IV;

  private _itemViews: IV[] | null = null;

  get itemViews() {
    if (this._itemViews === null) {
      this._itemViews = this.data.map(item => new this.ItemView(item));
    }
    return this._itemViews;
  }

  override template() {
    return html`
      <div>
        ${this.itemViews}
      </div>
    `;
  }

  append(item: IV['data']): this {
    const itemView = new this.ItemView(item);
    this.data.push(itemView.data);
    this.itemViews.push(itemView);
    this.element().append(itemView.render());
    console.log(this.data.length);
    return this;
  }

  set(items: IV['data'][]): this {
    let i = 0, j = 0;

    const oldItemsMap = new Map(
      this.data.map(item => [item, true])
    );

    while (i < this.data.length && j < items.length) {
      const oldItem = this.data[i];
      const newItem = items[j];

      if (oldItem === newItem) {
        i++;
        j++;
        continue;
      }

      if (oldItemsMap.has(newItem)) {
        this.itemViews[i].element().remove();
        this.itemViews.splice(i, 1);
        this.data.splice(i, 1);
      } else {
        const oldItemView = this.itemViews[i];
        const newItemView = new this.ItemView(newItem);

        oldItemView.element().before(newItemView.render());

        this.itemViews.splice(i, 0, newItemView);
        this.data.splice(i, 0, newItem);

        i++;
        j++;
      }
    }

    while (i < this.data.length) {
      const oldItemView = this.itemViews[i];
      oldItemView.element().remove();
      this.itemViews.splice(i, 1);
      this.data.splice(i, 1);
    }

    while (j < items.length) {
      const newItem = items[j];
      const newItemView = new this.ItemView(newItem);
      this.itemViews.push(newItemView);
      this.element().append(newItemView.render());
      this.data.push(newItem);
      j++;
    }

    return this;
  }
}