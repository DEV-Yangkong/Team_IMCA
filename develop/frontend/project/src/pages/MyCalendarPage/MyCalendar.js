import React, { useState } from 'react';
import styles from './MyCalendar.module.css';
import MyCalendarDate from '../../components/MyCalendarDatePage/MyCalendarDate';
import TodoBoard from '../../components/MyCalendarDatePage/TodoBoard';

// import TodoModal from '../../components/MyCalendarDatePage/TodoModal';

const MyCalendar = () => {
  // todoitem 버튼 클릭시 추가
  const [todo, setTodo] = useState('');
  const [todoItem, setTodoItem] = useState([]);
  const addTodo = () => {
    setTodoItem([...todoItem, todo]);
  };

  return (
    <div className={styles.MyCalendar}>
      <div className={styles.MyCalendar_Container}>
        <div className={styles.MyCalendar_title}>MyCalendar</div>
        <div className={styles.MyCalendar_Wrapper}>
          <section className={styles.MyCalendar_left}>
            {/* 내캘린더 */}
            <MyCalendarDate />
          </section>
          <section className={styles.MyCalendar_right}>
            <p className={styles.todoTitle}>날짜</p>
            {/* 캘린더 매모 */}
            <div className={styles.todoItemBox}>
              <TodoBoard todoItem={todoItem} />
            </div>
            <div>
              <textarea
                value={todo}
                type="text"
                className={styles.todoInput}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button className={styles.todoBtn} onClick={addTodo}>
                추가
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
