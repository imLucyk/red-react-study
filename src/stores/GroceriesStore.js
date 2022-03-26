import { configure, makeAutoObservable } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import { axiosError } from './common.js';
import _ from 'lodash';

configure({
  enforceActions: 'never',
  useProxies: 'never'
});

export default class GroceriesStore {
  constructor() {
    makeAutoObservable(this);
  }

  groceries = [];
  grocery = {
    name: '',
    enter: '',
    expire: ''
  };
  counter = 0;

  groceriesCreate() {
    axios.post('https://red-react-study-default-rtdb.firebaseio.com/groceries.json', {
      name: this.grocery.name,
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().add(7, 'days').format('YYYY-MM-DD'),
    }).then((response) => {
      console.log('Done groceriesCreate', response);
      this.groceriesRead();
    }).catch((error) => {
      axiosError(error);
    });
  }
  groceriesRead(q, orderByKey, orderByType) { // firebase가 배열에 취약해서, 오브젝트로 받기 때문에 다시 배열로 만들어 주어야 함.
    axios.get('https://red-react-study-default-rtdb.firebaseio.com/groceries.json').then((response) => {
      console.log('Done groceriesRead', response);
      const groceries = [];
      let counter = 0;
      for (const uid in response.data) {
        const grocery = response.data[uid];
        if (!q || grocery.name.indexOf(q) >= 0) {
          grocery.key = uid; // uid가 빠져서 다시 넣어줌..
          groceries.push(grocery);
        }
        // 오늘 날짜 지난 groceries 갯수 계산 후 counter에 넣기.
        // grocery의 expire와 오늘 날짜가 필요.
        console.log(grocery.expire, moment().format('YYYY-MM-DD'))
        if (grocery.expire <= moment().format('YYYY-MM-DD')) {
          counter++;
        }
      }
      this.counter = counter;
      console.log(groceries)
      this.groceries = _.orderBy(groceries, orderByKey, orderByType);;
    }).catch((error) => {
      axiosError(error);
    });
  }
  groceriesDelete(key, from) {
    return axios.delete(`https://red-react-study-default-rtdb.firebaseio.com/groceries/${key}.json`).then((response) => {
      console.log('Done groceriesDelete', response);
      if (from !== 'items') {
        this.groceriesRead();
      }
    });
  }
  groceriesUpdate(key, grocery, from) {
    return axios.patch(`https://red-react-study-default-rtdb.firebaseio.com/groceries/${key}.json`, grocery).then((response) => {
      console.log('Done groceriesUpdate', response);
      if (from !== 'items') {
        this.groceriesRead();
      }
    })
  }
}

export const groceriesStore = new GroceriesStore();
