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
    this.items = [{
      name: '홍길동',
      enter: '2022-01-01',
      expire: '2022-01-07',
    }, {
      name: '춘향이',
      enter: '2022-01-01',
      expire: '2022-01-07',
    }];
    console.log('Done itemsRead', this.items);
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
