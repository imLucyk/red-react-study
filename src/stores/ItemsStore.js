import { configure, makeAutoObservable } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import { axiosError } from './common.js';
import _ from 'lodash';
import { groceriesStore } from './GroceriesStore';
import { firebaseStore } from './FirebaseStore.js';

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

  async itemsCreate() {
    try {
      const response = await axios.post(`https://red-react-study-default-rtdb.firebaseio.com/${firebaseStore.firebaseUser.uid}/items.json`, {
        name: this.item.name,
        enter: moment().format('YYYY-MM-DD'),
        expire: moment().add(7, 'days').format('YYYY-MM-DD'),
      });
      console.log('Done itemsCreate', response);
      this.itemsRead();
    } catch(error) {
      axiosError(error);
    }
  }
  async itemsRead(orderByKey, orderByType) { // firebase가 배열에 취약해서, 오브젝트로 받기 때문에 다시 배열로 만들어 주어야 함.
    try {
      const [response, response2] = await Promise.all([
        axios.get(`https://red-react-study-default-rtdb.firebaseio.com/${firebaseStore.firebaseUser.uid}/items.json`),
        groceriesStore.groceriesRead()
      ]);
      console.log('Done itemsRead', response, response2);
      const items = [];
      for (const uid in response.data) {
        const item = response.data[uid];
        item.key = uid; // uid가 빠져서 다시 넣어줌..
        // groceries에서 동일한 key가 있는지 확인 하는 for문
        for (const uid2 in response2.data) {
          const grocery = response2.data[uid2];
          grocery.key = uid2;
          item.checked = item.key === grocery.key;
          if (item.checked === true) {
            break; // true가 나오면 멈춰라.
          }
        }
        items.push(item);
      }
      console.log(items)
      this.items = _.orderBy(items, orderByKey, orderByType);
    } catch(error) {
      axiosError(error);
    }
  }
  async itemsDelete(key) {
    try {
      const response = await axios.delete(`https://red-react-study-default-rtdb.firebaseio.com/${firebaseStore.firebaseUser.uid}/items/${key}.json`);
      console.log('Done itemsDelete', response);
      this.itemsRead();
    } catch(error) {
      axiosError(error);
    }
  }
  async itemsUpdate(key, item) {
    try {
      const response = await axios.patch(`https://red-react-study-default-rtdb.firebaseio.com/${firebaseStore.firebaseUser.uid}/items/${key}.json`, item);
      console.log('Done itemsUpdate', response);
      this.itemsRead();
    } catch(error) {
      axiosError(error);
    }
  }
}
export const itemsStore = new ItemsStore();
