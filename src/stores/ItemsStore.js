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
  itemsRead() { // firebase가 배열에 취약해서, 오브젝트로 받기 때문에 다시 배열로 만들어 주어야 함.
    axios.get('https://red-react-study-default-rtdb.firebaseio.com/items.json').then((response) => {
      console.log('Done itemsRead', response);
      const items = [];
      for (const uid in response.data) {
        const item = response.data[uid];
        item.key = uid; // uid가 빠져서 다시 넣어줌..
        items.push(item);
      }
      console.log(items)
      this.items = items;
    }).catch((error) => {
      axiosError(error);
    });
  }
  itemsDelete(key) {
    axios.delete(`https://red-react-study-default-rtdb.firebaseio.com/items/${key}.json`).then((response) => {
      console.log('Done itemsDelete', response);
      this.itemsRead();
    }).catch((error) => {
      axiosError(error);
    });
  }
  itemsUpdate(key, item) {
    axios.patch(`https://red-react-study-default-rtdb.firebaseio.com/items/${key}.json`, item).then((response) => {
      console.log('Done itemsUpdate', response);
      this.itemsRead();
    }).catch((error) => {
      axiosError(error);
    });
  }
}

export const itemsStore = new ItemsStore();
