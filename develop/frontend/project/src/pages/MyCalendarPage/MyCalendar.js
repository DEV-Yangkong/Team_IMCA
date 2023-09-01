import React, { useEffect, useState } from 'react';
import styles from './MyCalendar.module.css';
import SelectedMemoDate from '../../components/MyCalendarDatePage/SeletedMemoDate';
import MyCalendarDate from '../../components/MyCalendarDatePage/MyCalendarDate';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCalendar, getCalendarDetail } from '../../mycalendarApi';
import { useCookies } from 'react-cookie';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHandPointLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  const [cookies] = useCookies('access_token');
  const navigate = useNavigate();
  const [mark, setMark] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // 추가: 선택된 날짜 상태
  const [selectDay, setSelectDay] = useState();
  const [detailData, setDetailData] = useState();

  const { data: onGoMyCalendar } = useQuery(['onGoMyCalendar', cookies], () =>
    getCalendar(cookies),
  );

  const formattedOnGoMyCalendar = onGoMyCalendar
    ? onGoMyCalendar.map((item) => ({
        ...item,
        selected_date: dayjs(item.selected_date).format('YYYY.MM.DD'),
      }))
    : [];
  // console.log(onGoMyCalendar, '온고 기본값');
  // console.log(formattedOnGoMyCalendar, '바뀐 온고값');

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date).format('YYYY.MM.DD')); //리액트캘린더에서 선택한 날짜업데이트
    const formattedDateDay = dayjs(date).format('YYYYMMDD'); // API에 보낼 형식으로 날짜를 변환
    // setSelectDay(formattedDateDay);
    axios
      .get('http://imcal.store/api/v1/calendar/menu/', {
        params: {
          date: formattedDateDay,
        },
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log('날짜 선택한 캘린더 데이터 수신 받음', res);
        setDetailData(res.data);
      })
      .catch((err) => {
        alert('로그인이 필요합니다!');
        navigate('/login');
        // console.log('날짜 선택한 캘린더 데이터 수신 거절', err);
      });
  };

  // const { data: detailData } = useQuery(
  //   ['detailData', cookies, selectDay],
  //   () => getCalendarDetail(cookies, selectDay),
  // );

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
              {selectedDate ? (
                `
              - ${selectedDate} -`
              ) : (
                <div className={styles.saveIcon}>
                  <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
                  <span> 저장된 공연 목록</span>
                </div>
              )}
            </p>

            {detailData && detailData[0]?.name ? ( //detailData가 있는 경우
              <SelectedMemoDate
                detailData={detailData}
                selectedDate={selectedDate}
              />
            ) : (
              <div
                style={{
                  fontSize: '20px',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIcon
                  style={{ padding: '10px' }}
                  icon={faHandPointLeft}
                />
                날짜를 선택해주세요!
              </div>
            )}
            {/* 캘린더 매모 */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
