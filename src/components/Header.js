function Header(props) {
  return (
    <header>
      <div class="logo">
        RED
      </div>
      <div>
        <a href="./index.html" id="menu-a-home" class="active"><span class="material-icons-outlined">home</span></a>
      </div>
      <div>
        <a href="./items.html" id="menu-a-items"><span class="material-icons-outlined">shopping_cart</span></a>
      </div>
      <div class="menu-groceries">
        <a href="./groceries.html" id="menu-a-groceries"><span class="material-icons">kitchen</span></a>
        <div><span id="menu-groceries-counter">1</span></div>
      </div>
      <div class="empty"></div>
      <div>
        <a href="#!" id="menu-a-account" onclick="accountToggle(); return false;">
          <span class="material-icons-outlined">account_circle</span>
          <ul class="account-menu">
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

export default Header;
