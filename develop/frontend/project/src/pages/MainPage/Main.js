import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Main.css';
import { Data } from '../../api';
import dayjs from 'dayjs';
import Ranking from '../../components/MainPage/Ranking';
import CurCalendar from '../../components/MainPage/CurCalendar';
import axios from 'axios';
import { xml2js } from 'xml-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleChevronRight } from '@fortawesome/free-regular-svg-icons'; // import Calendar from '@toast-ui/calendar';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons'; // import Calendar from '@toast-ui/calendar';

import { far } from '@fortawesome/free-regular-svg-icons';

const Main = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(false);
  const [musicalArray, setMusicalArray] = useState([]);
  const [actArray, setActArray] = useState([]);
  const [boxOfMusical, setBoxOfMusical] = useState([]);
  const [boxOfAct, setBoxOfAct] = useState([]);
  const [curMusicalList, setCurMusicalList] = useState([]);
  const [curActList, setCurActList] = useState([]);
  const [sumList, setSumList] = useState([]);
  // const getTileContent = ({ date }) => {
  //   const dateString = dayjs(date).format('YYYY-MM-DD'); // 'YYYY-MM-DD' 형태로 변환
  //   for (const { start, end } of dummyDateList) {
  //     if (dateString >= start && dateString <= end) {
  //       return <div className={styles.date - range}></div>;
  //     }
  //   }
  //   return null;
  // }; // 기간을 계산하여 커스텀컨텐츠 생성

  // const mark = ['2023-08-12', '2023-08-20', '2023-08-25'];

  // const tileClassName = ({ date, view }) => {
  //   if (view === 'month') {
  //     const dateString = date.toISOString().substring(0, 10);

  //     let tileClass = '';

  //     if (firstEventDates.includes(dateString)) {
  //       tileClass += 'react-calendar__tile--hasFirstEvent';
  //     }

  //     if (secondEventDates.includes(dateString)) {
  //       tileClass += ' react-calendar__tile--hasSecondEvent';
  //     }

  //     return tileClass;
  //   }
  // };
  //   dummyDateList.map((it) => {
  //     if (dateString === it.start) {
  //       return <div className="start-date"></div>;
  //     }
  //   });
  // };
  // 날짜 클릭 시 해당 날짜를 상태로 저장하는 함수

  // 연극, 뮤지컬 일정 배열 (중복 요소 어떻게 제거?)
  const mark = ['2023-08-12', '2023-08-20', '2023-08-25'];
  const mark2 = ['2023-08-12', '2023-08-15', '2023-08-16', '2023-08-17'];

  // const callApi = async () => {
  //   axios.get('http://localhost:5000/api').then((res) => {
  //     console.log(res.data.dbs.db);
  //     setMusicalArray(res.data.dbs.db);
  //   });
  // };
  // useEffect(() => {
  //   callApi();
  // }, []);
  const dateStr = dayjs(date).format('YYYY.MM.DD');

  // useEffect(() => {
  //   const curDayFunc = () => {
  //     const newCurDayList = musicalArray.map((it) => it.prfpdfrom._text);
  //     setCurDayList(newCurDayList);
  //   };
  //   curDayFunc();
  // }, []);

  // 공공 데이터 public musical
  useEffect(() => {
    axios
      .get('http://localhost:8000/API/public', {
        params: {
          cpage: 1,
          rows: 30,
          shcate: 'GGGA',
          prfstate: '01',
          prfpdfrom: '20230801',
          prfpdto: '20230831',
        },
      })
      .then((res) => {
        // console.log(res.data);
        const options = { compact: true, spaces: 2 };
        const result = xml2js(res.data, options);
        setMusicalArray(result.dbs.db);
        console.log('musicalArray', musicalArray);
      })
      .catch((error) => console.log('err', error));
  }, []);
  // 공공 데이터 public act
  useEffect(() => {
    axios
      .get('http://localhost:8000/API/public', {
        params: {
          cpage: 1,
          rows: 30,
          shcate: 'AAAA',
          prfstate: '01',
          prfpdfrom: '20230801',
          prfpdto: '20230831',
        },
      })
      .then((res) => {
        // console.log(res.data);
        const options = { compact: true, spaces: 2 };
        const result = xml2js(res.data, options);
        setActArray(result.dbs.db);
        console.log('actArray', actArray);
      })
      .catch((error) => console.log('err', error));
  }, []);
  console.log(actArray.concat(musicalArray));
  // 달력에 일정 표시 위한 새로운 배열 세팅 ( 시작 날짜 )
  useEffect(() => {
    setCurMusicalList(musicalArray.map((it) => it.prfpdfrom._text));
  }, [musicalArray]);
  useEffect(() => {
    setCurActList(actArray.map((it) => it.prfpdfrom._text));
  }, [actArray]);

  const hasMark = (date, markArray) => {
    return markArray.find((x) => x === dayjs(date).format('YYYY.MM.DD'));
  };
  // 미니 캘린더에 시작 날짜 표시
  const tileContent = ({ date, view }) => {
    const dateStr = dayjs(date).format('YYYY.MM.DD');
    const hasMark1 = hasMark(dateStr, curMusicalList);
    const hasMark2 = hasMark(dateStr, curActList);

    return (
      <>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}
        >
          {hasMark1 && <div className="dot" />}
          {hasMark2 && <div className="triangle" />}
        </div>
      </>
    );
  };
  // 메인 캘린더 날짜별 요소 추가, 일정 데이터 받아와서 들어가야함
  const mainTileContent = ({ date, view }) => {
    const dateStr = dayjs(date).format('YYYY.MM.DD');
    const hasMark1 = hasMark(dateStr, curMusicalList);
    const hasMark2 = hasMark(dateStr, curActList);
    return (
      <div className="date_contents_container">
        {hasMark1 && (
          <div className="date_contents date_contents_musical">
            {' '}
            <p>뮤지컬</p>
          </div>
        )}{' '}
        {hasMark2 && (
          <div className="date_contents date_contents_act">
            {' '}
            <p>연극</p>
          </div>
        )}
      </div>
    );
  };
  const onClickWholeCalendar = () => {
    setCurDate(false);
  };
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8000/API/boxoffice', {
  //       params: {
  //         catecode: 'GGGA',
  //       },
  //     })
  //     .then((res) => {
  //       const options = { compact: true, spaces: 2 };
  //       const result = xml2js(res.data, options);
  //       console.log('boxofficeM', result);
  //       setBoxOfMusical(result.boxofs.boxof.slice(0, 5));
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8000/API/boxoffice', {
  //       params: {
  //         catecode: 'AAAA',
  //       },
  //     })
  //     .then((res) => {
  //       const options = { compact: true, spaces: 2 };
  //       const result = xml2js(res.data, options);
  //       console.log('boxofficeA', result);
  //       setBoxOfAct(result.boxofs.boxof.slice(0, 5));
  //     });
  // }, []);
  useEffect(() => {
    const text =
      '화요일 ~ 금요일(20:00), 토요일(16:00,19:00), 일요일(15:00,18:00)';

    // 정규표현식을 사용하여 '요' 앞에 오는 글자 추출
    const extractedChars = text.match(/(.)(?=요)/g);

    console.log(extractedChars); // ["화", "금", "토", "일"]
  });
  return (
    <div className="Main">
      <section className="mini_calendar">
        <div className="add_container"></div>
        <div className="calendar_container">
          {curDate ? (
            <div className="current_calendar">
              <div className="current_calendar_header">
                <div className="current_date">8월 7일</div>
                <div onClick={onClickWholeCalendar} className="whole_btn">
                  전체 달력
                </div>
              </div>
              {actArray
                .concat(musicalArray)
                .map(
                  (it, index) =>
                    it.prfpdfrom._text <= dateStr &&
                    dateStr <= it.prfpdto._text && (
                      <CurCalendar
                        key={index}
                        startDate={it.prfpdfrom._text}
                        endDate={it.prfpdto._text}
                        title={it.prfnm._text}
                        place={it.fcltynm._text}
                        img={it.poster._text}
                      />
                    ),
                )}
            </div>
          ) : (
            <Calendar
              onChange={setDate}
              value={date}
              formatDay={(locale, date) =>
                date.toLocaleString('en', { day: 'numeric' })
              } //날짜에 숫자만 들어가게 하기
              tileContent={tileContent}
              next2Label={null} // 다음 년도 화살표
              prev2Label={null} // 이전 년도 화살표
              onClickDay={() => setCurDate(true)}
            />
          )}
        </div>
      </section>
      <section className="ranking">
        <Ranking title="연극" boxOfArray={boxOfAct} />
        <Ranking title="뮤지컬" boxOfArray={boxOfMusical} />
      </section>
      <section>
        <div className="big_calendar_container">
          <Calendar
            onChange={setDate}
            value={date}
            formatDay={(locale, date) =>
              date.toLocaleString('en', { day: 'numeric' })
            } //날짜에 숫자만 들어가게 하기
            tileContent={mainTileContent}
            next2Label={null}
            prev2Label={null}
            nextLabel={
              <FontAwesomeIcon
                size="2xl"
                icon={faCircleChevronRight}
                style={{ color: 'rgba(5, 182, 49, 0.8)' }}
              />
            }
            prevLabel={
              <FontAwesomeIcon
                size="2xl"
                icon={faCircleChevronLeft}
                style={{ color: 'rgba(5, 182, 49, 0.8)' }}
              />
            }
          />
        </div>
      </section>
    </div>
  );
};
export default Main;
