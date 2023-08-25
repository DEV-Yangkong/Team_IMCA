import React, { useState } from 'react';
import styles from './MyCalendar.module.css';
import MyCalendarDate from '../../components/MyCalendarDatePage/MyCalendarDate';
import TodoBoard from '../../components/MyCalendarDatePage/TodoBoard';

const MyCalendar = () => {
  // todoitem 버튼 클릭시 추가
  const [todo, setTodo] = useState('');
  const [todoItem, setTodoItem] = useState([]); //메모담는배열
  const [selectedDate, setSelectedDate] = useState(null); // 추가: 선택된 날짜 상태

  const user = { login_id: '' };

  const addTodo = () => {
    if (!selectedDate) {
      alert('날짜를 선택해주세요!'); //선택한 날짜 없을때 경고문
      return;
    }

    const newTodo = {
      id: Date.now(),
      content: todo,
      date: selectedDate,
      userId: user.login_id,
    };

    //선택한 날짜에 해당하는 메모만 추가
    setTodoItem((prevTodoItems) => [...prevTodoItems, newTodo]);
    setTodo('');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); //리액트캘린더에서 선택한 날짜업데이트
  };

  const filterTodoItem = todoItem.filter((item) => item.date === selectedDate);

  return (
    <div className={styles.MyCalendar}>
      <div className={styles.MyCalendar_Container}>
        <div className={styles.MyCalendar_title}>MyCalendar</div>
        <div className={styles.MyCalendar_Wrapper}>
          <section className={styles.MyCalendar_left}>
            {/* 내캘린더 */}
            <MyCalendarDate onSelectDate={handleDateChange} />
          </section>
          <section className={styles.MyCalendar_right}>
            <p className={styles.todoTitle}>
              {selectedDate
                ? `
              - ${selectedDate} -`
                : '한 줄 메모'}
            </p>
            {/* 캘린더 매모 */}

            <div className={styles.todoItemBox}>
              <TodoBoard
                todoItem={filterTodoItem}
                setTodoItem={setTodoItem}
                selectedDate={selectedDate}
                user={user}
              />
            </div>
            <div className={styles.InputBox}>
              <textarea
                value={todo}
                type="text"
                className={styles.todoInput}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button className={styles.todoBtn} onClick={addTodo}>
                +
              </button>
              {/* <TodoModal /> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
