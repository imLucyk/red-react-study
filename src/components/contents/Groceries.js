import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

function Groceries(props) {
  console.log(props)
  const { groceriesStore } = props;
  const { groceries, grocery } = groceriesStore;
  useEffect(() => {
    // useEffect는 html을 다 읽고 한번 호출됨.
    groceriesStore.groceriesRead();
  }, [groceriesStore]);
  const modalToggle = function(grocery) {
    console.log(grocery, groceriesStore.grocery)
    grocery && (groceriesStore.grocery = {
      name: grocery.name,
      enter: grocery.enter,
      expire: grocery.expire
    })
    document.body.classList.toggle('o-hidden');
    document.getElementsByClassName('modal-background')[0].classList.toggle('active');
  }
  return (
    <>
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
                  <button className="button-update" onClick={()=>{modalToggle(grocery)}}><span className="material-icons">edit_note</span></button>
                </td>
                <td className="td-delete">
                  <button className="button-delete" onClick={()=>{groceriesStore.groceriesDelete(grocery.key)}}><span className="material-icons">delete</span></button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </article>
      <div class="modal-background" onClick={() => modalToggle()}>
        <form class="modal" onClick={event => event.stopPropagation()}> {/* onClick event가 부모로 전파되는 것을 방지한다 */}
          <h3 class="modal-header">Edit</h3>
          <table class="modal-table">
            <tbody>
              <tr>
                <th>
                  <span>Name</span>
                </th>
                <td>
                  <input type="text" name="grocery-name" placeholder="Name"
                    value={grocery.name}
                    onChange={event => {grocery.name = event.target.value}}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span>Enter</span>
                </th>
                <td>
                  <input type="date" name="grocery-enter" placeholder="YYYY-MM-DD" 
                    value={grocery.enter}
                    onChange={event => {grocery.enter = event.target.value}}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span>Expire</span>
                </th>
                <td>
                  <input type="date" name="grocery-expire" placeholder="YYYY-MM-DD"
                    value={grocery.expire}
                    onChange={event => {grocery.expire = event.target.value}}                  
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="modal-footer">
            <button class="button-close" type="button" onClick={() => modalToggle()}><span class="material-icons">close</span></button>
            <button class="button-update" onClick="return false;"><span class="material-icons">edit_note</span></button>
          </div>
        </form>
      </div>
    </>
  )
}

export default inject('groceriesStore')(observer(Groceries));
