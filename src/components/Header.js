import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  const { groceriesStore } = props;
  const { counter } = groceriesStore;
  useEffect(() => {
    if (location.pathname === '/home') {
      groceriesStore.groceriesRead();
    }
  }, [groceriesStore, location]);
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
        <a href="#!" id="menu-a-account" onClick={()=>{}}>
          <span className="material-icons-outlined">account_circle</span>
          <ul className="account-menu">
            <li>Guest</li>
            <li>Login</li>
            <li>Hello 홍길동!</li>
            <li>Logout</li>
          </ul>
        </a>
      </div>
    </header>
  )
}

export default inject('groceriesStore')(observer(Header));
