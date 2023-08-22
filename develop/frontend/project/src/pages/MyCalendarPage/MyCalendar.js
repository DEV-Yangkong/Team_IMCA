import React, { useState } from 'react';
import styles from './MyCalendar.module.css';
import MyCalendarDate from '../../components/MyCalendarDatePage/MyCalendarDate';
import TodoBoard from '../../components/MyCalendarDatePage/TodoBoard';

const MyCalendar = () => {
  // todoitem 버튼 클릭시 추가
  const [todo, setTodo] = useState('');
  const [todoItem, setTodoItem] = useState([]);
  const [selectedDate, setSelectedDate] = useState('null'); // 추가: 선택된 날짜 상태
  const addTodo = () => {
    if (!selectedDate) {
      alert('날짜를 선택해주세요!'); //선택한 날짜 없을때 경고문
      return;
    }

    const newTodo = {
      id: Date.now(),
      content: todo,
      date: selectedDate,
    };
    setTodoItem([...todoItem, newTodo]);
    setTodo('');
  };

  return (
    <div className={styles.MyCalendar}>
      <div className={styles.MyCalendar_Container}>
        <div className={styles.MyCalendar_title}>MyCalendar</div>
        <div className={styles.MyCalendar_Wrapper}>
          <section className={styles.MyCalendar_left}>
            {/* 내캘린더 */}
            <MyCalendarDate
              onSelectDate={(date) => {
                console.log('selected date:', date);
                setSelectedDate(date);
              }}
            />
          </section>
          <section className={styles.MyCalendar_right}>
            <p className={styles.todoTitle}>
              {selectedDate ? `할일 - ${selectedDate}` : '날짜'}
            </p>
            {/* 캘린더 매모 */}

            <div className={styles.todoItemBox}>
              <TodoBoard
                todoItem={todoItem}
                setTodoItem={setTodoItem}
                selectedDate={selectedDate}
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
