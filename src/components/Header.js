import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';

function Header(props) {
  const location = useLocation();
  const { groceriesStore, firebaseStore } = props;
  const { counter } = groceriesStore;
  const { firebaseUser, firebaseLoginPromise } = firebaseStore;
  useEffect(() => {
    firebaseLoginPromise.then(() => {
      if (location.pathname === '/home') {
        groceriesStore.groceriesRead();
      }
    });
  }, [groceriesStore, location, firebaseLoginPromise]);

  const googleLogin = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const googleLogout = function() {
    firebase.auth().signOut();
  };

  // const emailSignup = function() {
  //   const email = 'guest@red-react-study.web.app';
  //   const password = 'guestguest';
  //   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  //     console.error(error);
  //     alert(error.message);
  //   });
  // };

  const emailSignin = function() {
    const email = 'guest@red-react-study.web.app';
    const password = 'guestguest';
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.error(error);
      alert(error.message);
    });
  };

  return (
    <header>
      <div className="logo">
        RED
      </div>
      <div>
        <NavLink to="home" className={({ isActive }) => isActive ? 'active' : ''}><span className="material-icons-outlined">home</span></NavLink>
      </div>
      <div>
        <NavLink to="items" className={({ isActive }) => isActive ? 'active' : ''}><span className="material-icons-outlined">shopping_cart</span></NavLink>
      </div>
      <div className="menu-groceries">
        <NavLink to="groceries" className={({ isActive }) => isActive ? 'active' : ''}><span className="material-icons">kitchen</span></NavLink>
        <div><span id="menu-groceries-counter">{counter}</span></div>
      </div>
      <div className="empty"></div>
      <div>
        <a href="#!" id="menu-a-account" onClick={(event) => {
          event.preventDefault();
          document.getElementsByClassName('account-menu')[0].classList.toggle('active'); 
        }}>
          <span className="material-icons-outlined">account_circle</span>
          <ul className="account-menu">
            {firebaseUser ? (
              <>
                <li>Hello {firebaseUser.displayName || 'Guest'}!</li>
                <li onClick={googleLogout}>Logout</li>
              </>
            ) : (
              <>
                <li onClick={emailSignin}>Guest</li>
                <li onClick={googleLogin}>Login</li>
              </>
            )}
          </ul>
        </a>
      </div>
    </header>
  )
}

export default inject('groceriesStore', 'firebaseStore')(observer(Header));
