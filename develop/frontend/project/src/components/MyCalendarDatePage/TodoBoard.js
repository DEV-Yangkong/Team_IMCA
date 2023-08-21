import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard(props) {
  return (
    <div
      style={
        {
          // width: ' 450px',
          // display: 'flex',
          // flexDirection: 'column',
          // alignContent: 'center',
          // justifyContent: 'center',
        }
      }
    >
      {props.todoItem.map((item) => (
        <TodoItem item={item} />
      ))}
    </div>
  );
}

export default TodoBoard;
