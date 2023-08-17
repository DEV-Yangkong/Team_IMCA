import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem(props) {
  return <div className={styles.TodoItem}>{props.item}</div>;
}

export default TodoItem;
