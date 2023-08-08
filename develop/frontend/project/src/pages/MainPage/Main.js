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
const dummyDateList = [
  {
    start: '2023-08-05',
    end: '2023-08-10',
  },
  {
    start: '2023-08-02',
    end: '2023-08-10',
  },
  {
    start: '2023-08-05',
    end: '2023-08-10',
  },
];

const Main = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(false);
  const [musicalArray, setMusicalArray] = useState([]);
  const [curDayList, setCurDayList] = useState({
    startDate: '',
    endDate: '',
    title: '',
    place: '',
    img: '',
  });
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
  useEffect(() => {
    const curDayFunc = () => {
      console.log(dateStr);
      musicalArray.map((it) => {
        console.log(it.prfpdfrom._text);
        if (it.prfpdfrom._text <= dateStr && dateStr <= it.prfpdto._text) {
          setCurDayList({
            startDate: it.prfpdfrom._text,
            endDate: it.prfpdto._text,
            title: it.prfnm._text,
            place: it.fcltynm._text,
            img: it.poster._text,
          });
        }
      });
      console.log(curDayList);
    };
    curDayFunc();
  }, []);

  const hasMark = (date, markArray) => {
    return markArray.find((x) => x === dayjs(date).format('YYYY-MM-DD'));
  };

  const tileContent = ({ date, view }) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const hasMark1 = hasMark(dateStr, mark);
    const hasMark2 = hasMark(dateStr, mark2);

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
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const hasMark1 = hasMark(dateStr, mark);
    const hasMark2 = hasMark(dateStr, mark2);
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

  // const service = '585f52f2749f40d28894a4df722075be';
  // const service = 'b14e78c0be214bfab93cc4988904cbb9';
  // const service = '8e554316a3c34e3d9aae2b7c4f0a752b';
  // const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${service}&stdate=20230801&eddate=20230831&cpage=1&rows=20&shcate=GGGA&signgucode=11`;
  // useEffect(() => {
  //   axios.get(url).then((res) => res.data);
  // }, []);
  useEffect(() => {
    axios
      .get('http://localhost:8000/API/public', {
        params: {
          cpage: 1,
          rows: 5,
          shcate: 'GGGA',
          prfstate: '01',
        },
      })
      .then((res) => {
        // console.log(res.data);
        const options = { compact: true, spaces: 2 };
        const result = xml2js(res.data, options);
        console.log(result);
        setMusicalArray(result.dbs.db);
      })
      .catch((error) => console.log('err', error));
  }, []);
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
              {musicalArray.map(
                (it) =>
                  it.prfpdfrom._text <= dateStr &&
                  dateStr <= it.prfpdto._text && (
                    <CurCalendar
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
        <Ranking title="연극" />
        <Ranking title="뮤지컬" />
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
          />
        </div>
      </section>
    </div>
  );
};
export default Main;
