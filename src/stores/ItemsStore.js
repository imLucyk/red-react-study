import { configure, makeAutoObservable } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import { axiosError } from './common.js';

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
    axios.post('https://red-react-study-default-rtdb.firebaseio.com/items.json', {
      name: this.item.name,
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().add(7, 'days').format('YYYY-MM-DD'),
    }).then((response) => {
      console.log('Done itemsCreate', response);
      this.itemsRead();
    }).catch((error) => {
      axiosError(error);
    });
  }
  itemsRead() {
    axios.get('https://red-react-study-default-rtdb.firebaseio.com/items.json').then((response) => {
      console.log('Done itemsRead', response);
      const items = [];
      for (const uid in response.data) {
        const item = response.data[uid];
        item.key = uid;
        items.push(item);
      }
      console.log(items)
      this.items = items;
    }).catch((error) => {
      axiosError(error);
    });
  }
  itemsDelete(index) {
    this.items.splice(index, 1);
    console.log('Done itemsDelete', this.items);
  }
  itemsUpdate(index, item) {
    this.items[index] = item;
    console.log('Done itemsUpdate', this.items);
  }
}

export const itemsStore = new ItemsStore();
