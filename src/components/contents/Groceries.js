import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Groceries(props) {
  console.log(props)
  const { groceriesStore } = props;
  const { groceries } = groceriesStore;
  useEffect(() => {
    // useEffect는 html을 다 읽고 한번 호출됨.
    groceriesStore.groceriesRead();
  }, [groceriesStore]);
  return (
    <article>
      <form className="form-inputs">
        <input type="text" name="q" placeholder="Search" />
        <button className="button-search"><span className="material-icons">search</span></button>
      </form>
      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th>No</th>
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
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
          {groceries.map((grocery, index) => (
            <tr key={grocery.key}>
              <td>{index + 1}</td>
              <td>{grocery.name}</td>
              <td>{grocery.enter}</td>
              <td>{grocery.expire}</td>
              <td className="td-update">
                <button className="button-update" onClick={()=>{}}><span className="material-icons">edit_note</span></button>
              </td>
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

export default inject('groceriesStore')(observer(Groceries));
