import React from 'react';
import TodoItem from './TodoItem';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getCalendarDetail } from '../../mycalendarApi';

function TodoBoard({ todoItem, setTodoItem, selectedDate }) {
  // const params = useParams();
  // const id = params.id;
  // console.log('id값이', id);
  // const {
  //   data: memoList,
  //   isLoading,
  //   isError,
  // } = useQuery(
  //   ['memoList', id],
  //   () => getCalendarDetail(id), // Pass the id to the getUserDetail function
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>; // Show a loading indicator
  // }

  // if (isError || !memoList) {
  //   return <div>Error loading data 투두보드.</div>; // Handle errors
  // }

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
