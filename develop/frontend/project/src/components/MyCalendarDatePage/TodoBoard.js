import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard(props) {
  return (
    <div>
      {props.todoItem.map((item) => (
        <TodoItem item={item} />
      ))}
    </div>
  );
}

export default TodoBoard;
