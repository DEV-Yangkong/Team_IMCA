import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Main.css';
import { getAllData, getConcertBoxOffice, getActBoxOffice } from '../../api';
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
  const [curDate, setCurDate] = useState(false);
  const [boxOfMusical, setBoxOfMusical] = useState([]);
  const [boxOfAct, setBoxOfAct] = useState([]);
  const [curMusicalList, setCurMusicalList] = useState([]);
  const [curActList, setCurActList] = useState([]);
  const [sumData, setSumData] = useState([]);
  const [state, setState] = useState({
    startDate: '',
    endDate: '',
    title: '',
  });
  const [curArray, setCurArray] = useState([]);
  const [detailArray, setDetailArray] = useState([]);
  // const [dataId, setDataId] = useState();
  // const getTileContent = ({ date }) => {
  //   const dateString = dayjs(date).format('YYYY-MM-DD'); // 'YYYY-MM-DD' 형태로 변환
  //   for (const { start, end } of dummyDateList) {
  //     if (dateString >= start && dateString <= end) {
  //       return <div className={styles.date - range}></div>;
  //     }
  //   }
  //   return null;
  // }; // 기간을 계산하여 커스텀컨텐츠 생성

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

  const allDataQuery = useQuery(
    ['allData', state.startDate, state.endDate],
    () => getAllData(state.startDate, state.endDate),
    {
      enabled: false, // 초기에는 비활성화 상태로 설정
    },
  );

  const handleChangeState = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }; // 검색 폼 상태변화 함수
  const handleSearch = () => {
    allDataQuery.refetch();
  }; // 검색버튼 눌렀을 때
  const allData = allDataQuery.data;

  // 박스 오피스 뮤지컬
  const { data: boxMusicalData } = useQuery(
    ['boxMusical'],
    getConcertBoxOffice,
  );
  // const { data: boxActData } = useQuery(['boxAct'], getActBoxOffice);

  useEffect(() => {
    // musicalData와 actData가 모두 로드된 후에 실행
    // if(musicalData && actData) {
    if (allData) {
      // const combinedData = musicalData.concat(actData);
      // setMusicalArray(musicalData);
      // setActArray(actData);
      setCurMusicalList(allData.map((it) => it.prfpdfrom._text));
      // setCurActList(actData.map((it) => it.prfpdfrom._text));
      // setSumData(combinedData);
    }
  }, [allData]);

  // 메인캘린더 일정 추가
  const mainTileContent = ({ date }) => {
    if (allData) {
      for (const item of allData) {
        const startDate = dayjs(item.prfpdfrom._text).format('YYYY.MM.DD');
        const endDate = dayjs(item.prfpdto._text).format('YYYY.MM.DD');
        if (
          startDate <= dayjs(date).format('YYYY.MM.DD') &&
          dayjs(date).format('YYYY.MM.DD') <= endDate
        ) {
          return (
            <div className="date_contents_container">
              <div className="date_contents date_contents_musical">
                <p>{item.prfnm._text}</p>
              </div>
            </div>
          );
        }
      }
    }
    return <div className="date_contents_container"></div>;
  };

  const onClickWholeCalendar = () => {
    setCurDate(false);
  };

  const handleClickDay = (clickedDate) => {
    setDate(clickedDate);
    setCurDate(true);
  };
  const dateStr = dayjs(date).format('YYYY.MM.DD');
  const start = dayjs(state.startDate).format('YYYY.MM.DD');
  const end = dayjs(state.endDate).format('YYYY.MM.DD');
  //상세정보 불러오기
  const service = 'cabed641996245acbfb041c7c10c6a16';
  // const url = `https://cors-anywhere.herokuapp.com/http://www.kopis.or.kr/openApi/restful/pblprfr/${dataId}?service=${service}`;
  const onDeTailSearch = (dataId) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://www.kopis.or.kr/openApi/restful/pblprfr/${dataId}?service=${service}`,
      )
      .then((res) => {
        const options = { compact: true, spaces: 2 };
        const result = xml2js(res.data, options);
        console.log('detailArray', result);
      });
  };
  // 시작-종료 필터링해서 나온 일정들 새로운 배열에 추가
  useEffect(() => {
    if (allData) {
      const filteredItems = [];

      for (const item of allData) {
        if (start <= item.prfpdfrom._text && item.prfpdto._text <= end) {
          filteredItems.push(item);
        }
      }

      setCurArray(filteredItems);
      console.log(filteredItems);
    }
  }, [allData, start, end]);
  //미니 캘린더 일정 추가
  const tileContent = ({ date }) => {
    if (curArray) {
      for (const item of curArray) {
        const startDate = dayjs(item.prfpdfrom._text).format('YYYY.MM.DD');
        const endDate = dayjs(item.prfpdto._text).format('YYYY.MM.DD');
        if (
          startDate <= dayjs(date).format('YYYY.MM.DD') &&
          dayjs(date).format('YYYY.MM.DD') <= endDate
        ) {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 3,
              }}
            >
              <div className="dot" />
            </div>
          );
        }
      }
    }
  };
  return (
    <div className="Main">
      <section className="mini_calendar">
        <div
          className="add_container"
          style={{ overflowY: 'scroll', height: 380 }}
        >
          <div>
            <div>기간별 공연 검색하기</div>

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

            {allData?.map(
              (it, index) =>
                start <= it.prfpdfrom._text &&
                it.prfpdto._text <= end && (
                  <CurCalendar
                    key={index}
                    startDate={it.prfpdfrom._text}
                    endDate={it.prfpdto._text}
                    title={it.prfnm._text}
                    place={it.fcltynm._text}
                    img={it.poster._text}
                    onDeTailSearch={() => onDeTailSearch(it.mt20id._text)}
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
              {allData?.map(
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
        <Ranking title="박스오피스" boxOfArray={boxMusicalData} />
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
