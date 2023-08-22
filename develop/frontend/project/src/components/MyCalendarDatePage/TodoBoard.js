import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard({ todoItem, setTodoItem, selectedDate }) {
  const filteredTodoItems = todoItem.filter(
    (item) => item.date === selectedDate,
  );
  console.log(todoItem);
  console.log('Selected Date in TodoBoard:', selectedDate);

  return (
    <div
    // style={
    //   {
    //     // width: ' 450px',
    //     // display: 'flex',
    //     // flexDirection: 'column',
    //     // alignContent: 'center',
    //     // justifyContent: 'center',
    //   }
    // }
    >
      {filteredTodoItems.map((item) => (
        <TodoItem key={item.id} item={item} setTodoItem={setTodoItem} />
      ))}
    </div>
  );
}

export default TodoBoard;
