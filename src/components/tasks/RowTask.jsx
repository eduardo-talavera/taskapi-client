import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodoAction, getSingleTodoAction } from "../../redux/actions";
import { isAuthenticated } from "../../services/authService.js";
import { months } from '../../helpers/constants';


const RowTask = ({ todo }) => {
  // Vars
  const dispatch = useDispatch();
  const sidebar = document.getElementById('sidebar');
  const f = new Date(todo.createdAt);
  const { user, token } = isAuthenticated();

  // Functions
  const openSidebar = () => {
    dispatch(getSingleTodoAction(user, token, todo.id));
    sidebar.classList.add('open');
    if (sidebar.classList.contains('close')) {
      sidebar.classList.remove('close');
    }
  }

  return (
    <tr style={{cursor: 'pointer'}}>
      <th scope="row">
        {todo.completed ? (
          <i onClick={() => dispatch(toggleTodoAction(user, token, todo.id))} className="fas fa-check-circle text-success ml-2" style={{ fontSize: '20px' }}></i>
        ) : (
            <i onClick={() => dispatch(toggleTodoAction(user, token, todo.id))} className="far fa-check-circle ml-2" style={{ color: '#a3a8b3', fontSize: '20px' }}></i>
          )}
      </th>
      <td onClick={openSidebar} >{todo.title}</td>
      <td onClick={openSidebar} className="pl-5">{`${f.getDate()}/${months[f.getMonth()]}/${f.getFullYear()}`}</td>
      <td onClick={openSidebar} className="d-none d-md-table-cell">{todo.description}</td>
    </tr>
  );
}

export default RowTask;
