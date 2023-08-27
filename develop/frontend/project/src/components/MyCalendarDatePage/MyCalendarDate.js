import './MyCalendarDate.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import { getCalendarDetail } from '../../mycalendarApi';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

const MyCalendarDate = ({ onGoMyCalendar, handleDateChange }) => {
  const [date, setDate] = useState(new Date());

  // onGoMyCalendar get해온 데이터 날짜 누르면 정보 출력
  // const handleDateChange = (date) => {
  //   const formattedDateDay = dayjs(date).format('YYYYMMDD'); // API에 보낼 형식으로 날짜를 변환
  //   console.log(formattedDateDay);
  //   setSelectDay(formattedDateDay);
  // };
  // const { data: detailData } = useQuery(['detailData'], () =>
  //   getCalendarDetail(selectDay),
  // );

  const tileContent = ({ date }) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    if (onGoMyCalendar) {
      for (let item of onGoMyCalendar) {
        if (item.selected_date === formattedDate) {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 3,
              }}
            >
              <div
                className="dot"
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'orange',
                  borderRadius: '50%',
                }}
              />
            </div>
          );
        }
      }
    }
  };

  return (
    <div className="myCalendar_container">
      <Calendar
        onChange={(e) => {
          console.log('e', e);
          setDate(e);
          handleDateChange(e);
        }}
        // onClickDay={() => handleDateChange(date)}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        } //날짜에 숫자만 들어가게 하기
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
};
export default MyCalendarDate;
