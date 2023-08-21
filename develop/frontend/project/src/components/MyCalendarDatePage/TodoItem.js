import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem(props) {
  return (
    <div className={styles.TodoWrap}>
      <div className={styles.TodoItem}>{props.item}</div>
      <div className={styles.TodoBtn}>
        <button className={styles.TodoBtnDel}>-</button>
      </div>
    </div>
  );
}

export default TodoItem;
