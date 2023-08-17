import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard(props) {
  // const todoBoard = {
  //   width: '450px',
  //   border: '1px solid #134f2c',
  //   borderRadius: '15px',
  //   padding: '15px',
  //   display: 'flex',
  // };

  return (
    <div>
      {props.todoItem.map((item) => (
        <TodoItem item={item} />
      ))}
    </div>
  );
}

export default TodoBoard;
