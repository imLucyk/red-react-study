import { makeAutoObservable } from 'mobx';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

firebase.initializeApp({
  apiKey: "AIzaSyB2vkwxX2wU0bneQSXLiYw8xsrPT7L5nQA",
  authDomain: "red-react-study.firebaseapp.com",
  databaseURL: "https://red-react-study-default-rtdb.firebaseio.com",
  projectId: "red-react-study",
  storageBucket: "red-react-study.appspot.com",
  messagingSenderId: "329885294282",
  appId: "1:329885294282:web:c9bb7fc67fcf96459a5e33"
});

export default class FirebaseStore {
  firebaseUser = undefined;
  firebaseLoginPromise = null;

  constructor() {
    makeAutoObservable(this);
    this.firebaseLoginPromise = new Promise(resolve => {
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        // class 안에서는 화살표 함수를 사용해야만 this에 접근할 수 있다.
        console.log(firebaseUser);
        if (firebaseUser) {
          this.firebaseUser = firebaseUser;
          alert((firebaseUser.displayName || 'Guest') + '님 반가워요!');
          resolve();
        } else {
          if (this.firebaseUser === undefined) {
            this.firebaseUser = null;
          } else {
            alert('로그아웃 되었습니다.');
            window.location.href = '/';
          };
        }
      });
    });
  }
}

export const firebaseStore = new FirebaseStore();
