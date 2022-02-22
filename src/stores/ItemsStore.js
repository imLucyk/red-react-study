import { configure, makeAutoObservable } from 'mobx';
import moment from 'moment';

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
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().add(7, 'days').format('YYYY-MM-DD'),
    });
    console.log('Done itemsCreate', this.items);
  }
}

export const itemsStore = new ItemsStore();
