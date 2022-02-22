import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Items(props) {
  console.log(props)
  const { itemsStore } = props;
  const { items, item } = itemsStore;
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
          {items.map((item, index) => (
            <tr key={index}>
              <td><input type="checkbox" onChange={()=>{}} /></td>
              <td>{item.name}</td>
              <td>{item.enter}</td>
              <td className="td-expire"><input type="date" value={item.expire} onChange={()=>{}} /></td>
              <td className="td-delete">
                <button className="button-delete" onClick={()=>{}}><span className="material-icons">delete</span></button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default inject('itemsStore')(observer(Items));
