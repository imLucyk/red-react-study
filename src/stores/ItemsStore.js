import { configure, makeAutoObservable } from 'mobx';

configure({
  enforceActions: 'never',
  useProxies: 'never'
});

export default class ItemsStore {
  constructor() {
    makeAutoObservable(this);
  }

  items = [];
  item = {
    name: '',
    enter: '',
    expire: ''
  };

  itemsCreate() {
    this.items.push({
      name: this.item.name,
      enter: this.item.enter,
      expire: this.item.expire,
    });
    console.log('Done itemsCreate', this.items);
  }
}

export const itemsStore = new ItemsStore();
