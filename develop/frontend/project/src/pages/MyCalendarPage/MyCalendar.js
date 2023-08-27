import React, { useEffect, useState } from 'react';
import styles from './MyCalendar.module.css';
import MyCalendarDate from '../../components/MyCalendarDatePage/MyCalendarDate';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCalendar, getCalendarDetail } from '../../mycalendarApi';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import SelectBoard from '../../components/MyCalendarDatePage/SelectBoard';

const MyCalendar = () => {
  const [cookies] = useCookies('access_token');
  // todoitem 버튼 클릭시 추가
  // const [todo, setTodo] = useState('');
  // const [todoItem, setTodoItem] = useState([]); //메모담는배열
  const [mark, setMark] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYYMMDD')); // 추가: 선택된 날짜 상태
  const [selectDay, setSelectDay] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const { data: onGoMyCalendar } = useQuery(['onGoMyCalendar', cookies], () =>
    getCalendar(cookies),
  );

  const formattedOnGoMyCalendar = onGoMyCalendar
    ? onGoMyCalendar.map((item) => ({
        ...item,
        selected_date: dayjs(item.selected_date).format('YYYY.MM.DD'),
      }))
    : [];
  console.log(onGoMyCalendar, '온고 기본값');
  console.log(formattedOnGoMyCalendar, '바뀐 온고값');

  const handleDateChange = async (date) => {
    setSelectedDate(dayjs(date).format('YYYYMMDD')); //리액트캘린더에서 선택한 날짜업데이트
    const formattedDateDay = dayjs(date).format('YYYYMMDD'); // API에 보낼 형식으로 날짜를 변환
    console.log(formattedDateDay);
    setSelectDay(formattedDateDay);
    await axios
      .get('http://imca.store/api/v1/calendar/menu/', {
        params: {
          date: formattedDateDay,
        },
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log('날짜 선택한 캘린더 데이터 수신 받음', res);
        setDetailData(res.data);
      })
      .catch((err) => {
        console.log('날짜 선택한 캘린더 데이터 수신 거절', err);
        throw err; // 에러처리
      });
    return detailData;
  };

  // const { data: detailData } = useQuery(
  //   ['detailData', selectDay, cookies],
  //   () => getCalendarDetail(cookies, selectDay),
  // );
  // console.log('gmldms', detailData);
  return (
    <div className={styles.MyCalendar}>
      <div className={styles.MyCalendar_Container}>
        <div className={styles.MyCalendar_title}>MyCalendar</div>
        <div className={styles.MyCalendar_Wrapper}>
          <section className={styles.MyCalendar_left}>
            {/* 내캘린더 */}
            <MyCalendarDate
              handleDateChange={handleDateChange}
              onGoMyCalendar={onGoMyCalendar}
            />
          </section>
          <section className={styles.MyCalendar_right}>
            <p className={styles.todoTitle}>
              {selectedDate
                ? `
              - ${selectedDate} -`
                : '저장한 공연 목록'}
            </p>
            {/* <p>{detailData && detailData[0].selected_date}</p> */}
            {/* 캘린더 매모 */}

            <SelectBoard selectedDate={selectedDate} detailData={detailData} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
