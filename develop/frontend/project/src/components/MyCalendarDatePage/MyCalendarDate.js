import './MyCalendarDate.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import { getCalendarDetail } from '../../mycalendarApi';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

const MyCalendarDate = ({ onSelectDate }) => {
  const [cookies] = useCookies('access_token');

  const [date, setDate] = useState(new Date());
  // const [mark, setMark] = useState('');

  const [state, setState] = useState({
    markDate: '',
  });

  const { data: onGoMyCalendar } = useQuery(
    ['onGoMyCalendar', date, cookies],
    () => getCalendarDetail(cookies),
  );
  // const {} = detailData;

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    onSelectDate(formattedDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(2); // 연도의 뒤 2자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로
    const day = date.getDate().toString().padStart(2, '0'); // 일을 두 자리로
    return `${year}.${month}.${day}`;
  };

  //캘린더 일정 추가
  const tileContent = ({ date, onGoMyCalendar }) => {
    const formattedDate = dayjs(date).format('YYYY.MM.DD');

    if (onGoMyCalendar) {
      for (const item of onGoMyCalendar) {
        if (item.date === formattedDate) {
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
        onChange={handleDateChange}
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
