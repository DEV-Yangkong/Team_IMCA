import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Main.css';
import { Data, getAllAct, getAllMusical, getMusicalBoxOffice } from '../../api';
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
import { useQuery } from '@tanstack/react-query';

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
  const [sumData, setSumData] = useState([]);
  const [state, setState] = useState({
    type: '',
    startDate: '',
    endDate: '',
  });
  const [showData, setShowData] = useState(false);
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

  // 공공 데이터 public musical
  // const { data: musicalData } = useQuery(
  //   ['allMusical'],
  //   getAllMusical(state.type, state.startDate, state.endDate),
  // );
  const musicalDataQuery = useQuery(
    ['allMusical', state.type, state.startDate, state.endDate],
    () => getAllMusical(state.type, state.startDate, state.endDate),
    {
      enabled: false, // 초기에는 비활성화 상태로 설정
    },
  );

  const handleChangeState = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSearch = () => {
    musicalDataQuery.refetch();
    setShowData(true);
  };
  const musicalData = musicalDataQuery.data;
  useEffect(() => {
    console.log(state.type, state.startDate, state.endDate);
  }, [state]);
  // 공공 데이터 public act
  // const { data: actData } = useQuery(['allAct'], getAllAct);

  // 박스 오피스 뮤지컬
  const { data: boxMusicalData } = useQuery(
    ['boxMusical'],
    getMusicalBoxOffice,
  );

  // 달력에 일정 표시 위한 새로운 배열 세팅 ( 시작 날짜 )
  // useEffect(() => {
  //   if (musicalData) {
  //     setMusicalArray(musicalData);
  //     setCurMusicalList(musicalArray.map((it) => it.prfpdfrom._text));
  //   }
  // }, [musicalArray]);

  // useEffect(() => {
  //   if (actData) {
  //     setActArray(actData);
  //     setCurActList(actArray.map((it) => it.prfpdfrom._text));
  //   }
  // }, [actArray]);
  useEffect(() => {
    // musicalData와 actData가 모두 로드된 후에 실행
    // if(musicalData && actData) {
    if (musicalData) {
      // const combinedData = musicalData.concat(actData);
      // setMusicalArray(musicalData);
      // setActArray(actData);
      setCurMusicalList(musicalData.map((it) => it.prfpdfrom._text));
      // setCurActList(actData.map((it) => it.prfpdfrom._text));
      // setSumData(combinedData);
    }
  }, [musicalData]);
  useEffect(() => {
    if (boxMusicalData) {
      setBoxOfMusical(boxMusicalData);
    }
  }, [boxOfMusical]);
  // 미니 캘린더에 시작 날짜 표시
  const hasMark = (date, markArray) => {
    return markArray.find((x) => x === dayjs(date).format('YYYY.MM.DD'));
  };
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
    // const hasMark2 = hasMark(dateStr, curActList);
    return (
      <div className="date_contents_container">
        {hasMark1 && (
          <div className="date_contents date_contents_musical">
            {' '}
            <p>뮤지컬</p>
          </div>
        )}{' '}
        {/* {hasMark2 && (
          <div className="date_contents date_contents_act">
            {' '}
            <p>연극</p>
          </div>
        )} */}
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
  // useEffect(() => {
  //   const text =
  //     '화요일 ~ 금요일(20:00), 토요일(16:00,19:00), 일요일(15:00,18:00)';

  //   // 정규표현식을 사용하여 '요' 앞에 오는 글자 추출
  //   const extractedChars = text.match(/(.)(?=요)/g);

  //   console.log(extractedChars); // ["화", "금", "토", "일"]
  // });
  const handleClickDay = (clickedDate) => {
    setDate(clickedDate);
    setCurDate(true);
  };
  const dateStr = dayjs(date).format('YYYY.MM.DD');
  const start = dayjs(state.startDate).format('YYYY.MM.DD');
  const end = dayjs(state.endDate).format('YYYY.MM.DD');
  return (
    <div className="Main">
      <section className="mini_calendar">
        <div
          className="add_container"
          style={{ overflowY: 'scroll', height: 380 }}
        >
          <div>
            <div className="typeOfConcert">
              <select
                name="type"
                onChange={handleChangeState}
                value={state.type}
              >
                <option value={'뮤지컬'}>뮤지컬</option>
                <option value={'연극'}>연극</option>
              </select>{' '}
            </div>
            <div className="selectStartDate">
              시작 :{' '}
              <input
                name="startDate"
                type="date"
                value={state.startDate}
                onChange={handleChangeState}
              ></input>
              종료 :{' '}
              <input
                name="endDate"
                type="date"
                value={state.endDate}
                onChange={handleChangeState}
              ></input>
            </div>
            <button onClick={handleSearch}>검색</button>
            {musicalData?.map(
              (it, index) =>
                it.prfpdfrom._text <= start &&
                end <= it.prfpdto._text && (
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
        </div>
        <div className="calendar_container">
          {curDate ? (
            <div className="current_calendar">
              <div className="current_calendar_header">
                <div className="current_date">8월 7일</div>
                <div onClick={onClickWholeCalendar} className="whole_btn">
                  전체 달력
                </div>
              </div>
              {musicalData?.map(
                (it, index) =>
                  it.prfpdfrom._text <= start &&
                  end <= it.prfpdto._text && (
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
              onClickDay={handleClickDay}
            />
          )}
        </div>
      </section>
      <section className="ranking">
        <Ranking title="연극" boxOfArray={boxOfAct} />
        <Ranking title="뮤지컬" boxOfArray={boxMusicalData} />
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
