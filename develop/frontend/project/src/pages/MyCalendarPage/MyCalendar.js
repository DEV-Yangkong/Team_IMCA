import React, { useEffect, useState } from 'react';
import styles from './MyCalendar.module.css';
import MyCalendarDate from '../../components/MyCalendarDatePage/MyCalendarDate';
import TodoBoard from '../../components/MyCalendarDatePage/TodoBoard';
import { useQuery } from '@tanstack/react-query';

import { getCalendarDetail, postCalendarInput } from '../../mycalendarApi';
import { useCookies } from 'react-cookie';

const MyCalendar = () => {
  const [cookies] = useCookies('access_token');
  // todoitem 버튼 클릭시 추가
  const [todo, setTodo] = useState('');
  const [todoItem, setTodoItem] = useState([]); //메모담는배열
  const [selectedDate, setSelectedDate] = useState(null); // 추가: 선택된 날짜 상태

  const { data: onGoMyCalendar } = useQuery(['onGoMyCalendar', cookies], () =>
    getCalendarDetail(cookies),
  );

  useEffect(() => {
    if (onGoMyCalendar) {
      console.log('onGoMycalendar 데이터 수신', onGoMyCalendar);
    }
  }, []);

  const data = {
    id: Date.now(),
    content: todo,
    date: selectedDate,
  };
  const addTodo = () => {
    if (!selectedDate) {
      alert('날짜를 선택해주세요!'); //선택한 날짜 없을때 경고문
      return;
    }
    postCalendarInput({ data })
      .then((response) => {
        setTodoItem(response.data);
        console.log('메모성공');
      })
      .catch((error) => {
        console.error('메모 보내기 실패', error);
      });

    console.log(data);

    //선택한 날짜에 해당하는 메모만 추가
    setTodoItem((prevTodoItems) => [...prevTodoItems, data]);
    setTodo('');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); //리액트캘린더에서 선택한 날짜업데이트
  };
  // const [memoData, setMemoData] = useState([]);
  // useEffect(() => {
  //   const id = '1';

  //   CalendarMemoData(id).then((data) => {
  //     setMemoData(data);
  //   });
  // }, []);
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
              />
            </div>
            <div className={styles.InputBox}>
              <input
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
