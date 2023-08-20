import Calendar from 'react-calendar';
import MiniCalendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Main.css';
import { getAllData, getConcertBoxOffice, getActBoxOffice } from '../../api';
import dayjs from 'dayjs';
import Ranking from '../../components/MainPage/Ranking';
import CurCalendar from '../../components/MainPage/CurCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons'; // import Calendar from '@toast-ui/calendar';
import { useNavigate } from 'react-router-dom';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useQuery } from '@tanstack/react-query';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ChakraProvider,
} from '@chakra-ui/react';
import ModalDetail from '../../components/MainPage/ModalDetail';
const Main = () => {
  const [date, setDate] = useState(new Date());
  const [mainDate, setMainDate] = useState(new Date());
  const [curDate, setCurDate] = useState(false);
  const [state, setState] = useState({
    startDate: '',
    endDate: '',
  });
  const [curArray, setCurArray] = useState([]);
  const [detailArray, setDetailArray] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 공연 데이터 가져오기
  const { data: allData } = useQuery(
    ['allData', state.startDate, state.endDate],
    () => getAllData(state.startDate, state.endDate),
  );
  const navigate = useNavigate();

  // 박스 오피스 데이터 가져오기
  const { data: boxOfficeData } = useQuery(['boxOffice'], getConcertBoxOffice);

  // 검색 폼 상태변화 함수
  // const handleChangeState = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };
  const handleChangeState = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dateStr = dayjs(date).format('YYYY.MM.DD');
  const start = dayjs(state.startDate).format('YYYY.MM.DD');
  const end = dayjs(state.endDate).format('YYYY.MM.DD');

  // 검색버튼 눌렀을 때
  const handleSearch = () => {
    setIsSearched(true);
  };
  // const allData = allDataQuery.data;

  const mainTileContent = ({ date }) => {
    if (allData) {
      const currentDate = dayjs(date).format('YYYY.MM.DD');
      const matchingEvents = allData.filter(
        (item) =>
          currentDate >= dayjs(item.prfpdfrom._text).format('YYYY.MM.DD') &&
          currentDate <= dayjs(item.prfpdto._text).format('YYYY.MM.DD'),
      );

      if (matchingEvents.length > 0) {
        return (
          <div className="date_contents_container ">
            {matchingEvents.map((event, index) => (
              <div
                className={'date_contents_' + `${index}`}
                style={{ marginBottom: 5 }}
                onClick={() => {
                  onOpen();
                  setSelectedEvent(event);
                }}
              >
                <div style={{ fontSize: 12, padding: 3 }}>
                  <span key={index}>
                    {index > 0 && ' '}
                    {event.prfnm._text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
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
  const handleClickMainDay = (clickedDate) => {
    setMainDate(clickedDate);
  };
  // 시작-종료 필터링해서 나온 일정들 새로운 배열에 추가 - 미니캘린더 dot용
  useEffect(() => {
    if (allData) {
      const filteredItems = [];

      for (const item of allData) {
        if (start <= item.prfpdfrom._text && item.prfpdto._text <= end) {
          filteredItems.push(item);
        }
      }

      setCurArray(filteredItems);
    }
  }, [allData, start, end]);
  //미니 캘린더 일정 추가
  const tileContent = ({ date }) => {
    if (curArray) {
      for (const item of curArray) {
        const currentDate = dayjs(date).format('YYYY.MM.DD');
        const startDate = dayjs(item.prfpdfrom._text).format('YYYY.MM.DD');
        const endDate = dayjs(item.prfpdto._text).format('YYYY.MM.DD');
        if (startDate <= currentDate && currentDate <= endDate) {
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
  const onGoDetail = (eventId) => {
    navigate(`/concert/${eventId}`, {
      state: { eventData: eventId },
    });
  };

  return (
    <div className="Main">
      <ChakraProvider>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              <ModalDetail
                selectedEvent={selectedEvent}
                onGoDetail={() => onGoDetail(selectedEvent.mt20id._text)}
              />
            </ModalBody>

            <ModalFooter>
              {/* <button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </button> */}
              <button className="modal_button">저장하기</button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
      <section className="mini_calendar">
        <div className="add_container">
          <div>
            <div
              style={{ display: 'flex', padding: 10, justifyContent: 'center' }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 20,
                  fontWeight: 'bold',
                  padding: 5,
                  // borderRadius: '15px',
                  color: '#134f2c',
                  // border: '1px solid #134f2c',
                }}
              >
                {' '}
                기간별 공연 검색하기
              </span>
            </div>

            <div className="select_date">
              <div>
                {' '}
                시작 :{' '}
                <input
                  className="select_input"
                  name="startDate"
                  type="date"
                  value={state.startDate}
                  onChange={handleChangeState}
                ></input>
              </div>
              <div>
                {' '}
                종료 :{' '}
                <input
                  className="select_input"
                  name="endDate"
                  type="date"
                  value={state.endDate}
                  onChange={handleChangeState}
                ></input>
              </div>{' '}
              <button className="select_button" onClick={handleSearch}>
                검색
              </button>
            </div>

            {isSearched &&
              allData?.map(
                (it, index) =>
                  start <= it.prfpdfrom._text &&
                  it.prfpdto._text <= end && (
                    <CurCalendar
                      onGoDetail={() => onGoDetail(it.mt20id._text)}
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
                <div className="current_date">{dateStr}</div>
                <div onClick={onClickWholeCalendar} className="whole_btn">
                  전체 달력
                </div>
              </div>
              {curArray?.map(
                (it, index) =>
                  it.prfpdfrom._text <= dateStr &&
                  dateStr <= it.prfpdto._text && (
                    <CurCalendar
                      onGoDetail={() => onGoDetail(it.mt20id._text)}
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
            <div className="mini_calendar_container">
              <MiniCalendar
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
            </div>
          )}
        </div>
      </section>
      <section className="ranking">
        <Ranking
          title="박스오피스"
          boxOfArray={boxOfficeData}
          onGoBoxOfficeDetail={onGoDetail}
        />
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
                style={{ color: '#134f2c' }}
              />
            }
            prevLabel={
              <FontAwesomeIcon
                size="2xl"
                icon={faCircleChevronLeft}
                style={{ color: '#134f2c' }}
              />
            }
            onClickDay={handleClickMainDay}
          />
        </div>
      </section>
    </div>
  );
};
export default Main;
