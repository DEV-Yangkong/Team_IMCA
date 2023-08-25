import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem(props) {
  const handleDelete = () => {
    const updateTodoItems = props.todoItem.filter(
      (item) =>
        item.id != props.item.id && item.props.userId === props.user.login_id,
    );
    props.setTodoItem(updateTodoItems);
  };
  console.log(props.todoItem);

  // const handleDelete = () => {
  //   if (props.todoItem) {
  //     const updateTodoItems = props.todoItem.filter(
  //       (item) => item.login_id !== props.item.login_id,
  //     );
  //     props.setTodoItem(updateTodoItems);
  //   }
  //   console.log(props.item);
  // };
  return (
    <div className={styles.TodoWrap}>
      <div key={props.item.id} className={styles.TodoItem}>
        {props.item.content}
      </div>
      <div className={styles.TodoBtn}>
        <button className={styles.TodoBtnDel} onClick={handleDelete}>
          -
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
