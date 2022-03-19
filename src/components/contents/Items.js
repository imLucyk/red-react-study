import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Items(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderByKey = searchParams.get('orderByKey') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';
  console.log(orderByKey, orderByType)
  const { itemsStore, groceriesStore } = props;
  const { items, item } = itemsStore;
  const groceriesModify = async function(event, item) {
    console.log(event, item)
    if (event.target.checked) {
      // 아이템을 불려온다 = item
      // 그로서리스에 복붙한다
      await groceriesStore.groceriesUpdate(item.key, item, 'items');
      alert('냉장고에 넣었습니다.');
    } else {
      await groceriesStore.groceriesDelete(item.key, 'items');
      alert('취소 되었습니다.');
    }
  };
  useEffect(() => {
    // useEffect는 html을 다 읽고 한번 호출됨.
    itemsStore.itemsRead(orderByKey, orderByType);
  }, [itemsStore, orderByKey, orderByType]);
  const activeOrderBy = (key, type) => {
    if (key === orderByKey && type === orderByType) {
      return ' active';
    } else {
      return '';
    }
  }
  return (
    <article>
      <form className="form-inputs" onSubmit={(event) => {event.preventDefault(); itemsStore.itemsCreate()}}>
        <input type="text" name="name" placeholder="Create"
          value={item.name} onChange={(event) => {item.name = event.target.value}}
        />
        <button className="button-create"><span className="material-icons">edit</span></button>
      </form>
      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th>Move</th>
              <th>
                <span className="title-names">
                  Name
                  <span className={`material-icons${activeOrderBy('name', 'asc')}`}><NavLink to={"?orderByKey=name&orderByType=asc"}>arrow_drop_up</NavLink></span>
                  <span className={`material-icons${activeOrderBy('name', 'desc')}`}><NavLink to={"?orderByKey=name&orderByType=desc"}>arrow_drop_down</NavLink></span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Enter
                  <span className={`material-icons${activeOrderBy('enter', 'asc')}`}><NavLink to={"?orderByKey=enter&orderByType=asc"}>arrow_drop_up</NavLink></span>
                  <span className={`material-icons${activeOrderBy('enter', 'desc')}`}><NavLink to={"?orderByKey=enter&orderByType=desc"}>arrow_drop_down</NavLink></span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Expire
                  <span className={`material-icons${activeOrderBy('expire', 'asc')}`}><NavLink to={"?orderByKey=expire&orderByType=asc"}>arrow_drop_up</NavLink></span>
                  <span className={`material-icons${activeOrderBy('expire', 'desc')}`}><NavLink to={"?orderByKey=expire&orderByType=desc"}>arrow_drop_down</NavLink></span>
                </span>
              </th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item) => (
            <tr key={item.key}>
              <td><input type="checkbox" onChange={event => groceriesModify(event, item)} /></td>
              <td>{item.name}</td>
              <td>{item.enter}</td>
              <td className="td-expire"><input type="date"
                value={item.expire}
                onChange={event => {item.expire = event.target.value; itemsStore.itemsUpdate(item.key, item)}}
              /></td>
              <td className="td-delete">
                <button className="button-delete" onClick={() => itemsStore.itemsDelete(item.key)}><span className="material-icons">delete</span></button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default inject('itemsStore', 'groceriesStore')(observer(Items));
