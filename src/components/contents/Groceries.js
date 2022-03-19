import { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Groceries(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const spQ = searchParams.get('q') || '';
  console.log(spQ, location);
  
  const { groceriesStore } = props;
  const { groceries, grocery } = groceriesStore;
  const [ q, setQ ] = useState(spQ);
  // useEffect(() => {
  //   // useEffect는 html을 다 읽고 한번 호출됨.
  //   groceriesStore.groceriesRead('');
  // }, [groceriesStore]);
  useEffect(() => {
    console.log(spQ)
    groceriesStore.groceriesRead(spQ);
    setQ(spQ);
  }, [groceriesStore, spQ]);
  const modalToggle = function(grocery) {
    console.log(grocery, groceriesStore.grocery)
    grocery && (groceriesStore.grocery = {
      name: grocery.name,
      enter: grocery.enter,
      expire: grocery.expire,
      key: grocery.key
    })
    document.body.classList.toggle('o-hidden');
    document.getElementsByClassName('modal-background')[0].classList.toggle('active');
  };
  const groceriesSearch = function(event) {
    event.preventDefault();
    // groceriesStore.groceriesRead(q);
    navigate(`/groceries?q=${q}`);
  }
  return (
    <>
      <article>
        <form className="form-inputs" onSubmit={(event) => groceriesSearch(event)}>
          <input type="text" name="q" placeholder="Search" value={q} onChange={event => setQ(event.target.value)} />
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
      <div className="modal-background" onClick={() => modalToggle()}>
        <form className="modal" onClick={event => event.stopPropagation()}> {/* onClick event가 부모로 전파되는 것을 방지한다 */}
          <h3 className="modal-header">Edit</h3>
          <table className="modal-table">
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
          <div className="modal-footer">
            <button className="button-close" onClick={event => {event.preventDefault(); modalToggle()}}><span className="material-icons">close</span></button>
            <button className="button-update" onClick={event => {event.preventDefault(); groceriesStore.groceriesUpdate(grocery.key, grocery); modalToggle()}}><span className="material-icons">edit_note</span></button>
          </div>
        </form>
      </div>
    </>
  )
}

export default inject('groceriesStore')(observer(Groceries));
