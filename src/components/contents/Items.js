import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Items(props) {
  console.log(props)
  const { itemsStore, groceriesStore } = props;
  const { items, item } = itemsStore;
  const groceriesModify = function(event, item) {
    console.log(event, item)
    if (event.target.checked) {
      // 아이템을 불려온다 = item
      // 그로서리스에 복붙한다
      groceriesStore.groceriesUpdate(item.key, item);
    }
  };
  useEffect(() => {
    // useEffect는 html을 다 읽고 한번 호출됨.
    itemsStore.itemsRead();
  }, [itemsStore]);
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
                  <span className="material-icons active">arrow_drop_up</span>
                  <span className="material-icons">arrow_drop_down</span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Enter
                  <span className="material-icons">arrow_drop_up</span>
                  <span className="material-icons">arrow_drop_down</span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Expire
                  <span className="material-icons">arrow_drop_up</span>
                  <span className="material-icons">arrow_drop_down</span>
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
