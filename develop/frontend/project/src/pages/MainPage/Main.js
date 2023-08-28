import Calendar from 'react-calendar';
import MiniCalendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Main.css';
import {
  getAllData,
  getConcertBoxOffice,
  getActBoxOffice,
  dBData,
} from '../../api';
import dayjs from 'dayjs';
import Ranking from '../../components/MainPage/Ranking';
import CurCalendar from '../../components/MainPage/CurCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons'; // import Calendar from '@toast-ui/calendar';
import { useNavigate } from 'react-router-dom';
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
  Button,
} from '@chakra-ui/react';

import ModalDetail from '../../components/MainPage/ModalDetail';
import { BoardPageApi } from '../../communityApi';
import Pages from '../../components/CommunityPage/Pages';
import axios from 'axios';
import { useCookies } from 'react-cookie';
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
  const [boxOfficeView, setBoxOfficeView] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  // const [realData, setRealData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [allData, setAllData] = useState();
  // 헤더에 토큰 추가하여 인증 요청
  const [cookies] = useCookies(['access_token']);
  // 공연 데이터 가져오기
  const { data: allData } = useQuery(
    ['allData'],
    getAllData,
    {
      staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    },
    { onSuccess: (allData) => console.log(allData) },
  );

  // 공공api에서 가져온 데이터 db에 보낼 수 있도록 transform
  const transformData = (data) => {
    return data?.map((item) => {
      return {
        api_id: item.mt20id._text,
        start_date: dayjs(item.prfpdfrom._text).format('YYYYMMDD'),
        end_date: dayjs(item.prfpdto._text).format('YYYYMMDD'),
        poster: item.poster._text,
        place: item.fcltynm._text,
        name: item.prfnm._text,
      };
    });
  };
  // db로 post 요청
  const apiPostRequest = (data) => {
    if (data) {
      axios
        .post('http://imca.store/api/v1/apis/', data, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
          withCredentials: true,
        })
        .then((res) => console.log('db로 데이터 전송 완료', res))
        .catch((err) => console.log('db에 데이터 전송 실패', err));
    }
  };
  // ////// 중요 //////// db로 보내는 함수 /////////
  // useEffect(() => {
  //   const transformedData = transformData(allData);
  //   if (allData) {
  //     for (let item of transformedData) {
  //       apiPostRequest(item);
  //     }
  //   }

  //   // apiPostRequest(transformedData);
  // }, [allData]);

  // db에서 데이터 받아오기 - api.js로 옮겨놓은 상태
  // useEffect(() => {
  //   const realData = [];
  //   for (let page = 1; page <= 2; page++)
  //     axios
  //       .get('http://imca.store/api/v1/apis', {
  //         params: { page: 1 },
  //         headers: {
  //           Authorization: `Bearer ${cookies.access_token}`,
  //         },
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         console.log(`db에서 데이터 받아오기 ${page}`, res.data);
  //         realData.push(...res.data);
  //       })
  //       .catch((err) => console.log('db에서 데이터 못 받아옴', err));
  // }, []);

  // db에서 데이터 받아오기
  const { data: realData } = useQuery(
    ['realData', cookies.access_token],
    () => dBData(cookies.access_token),
    {
      staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    },
  );

  const navigate = useNavigate();

  // 박스 오피스 데이터 가져오기
  const { data: boxOfficeData } = useQuery(['boxOffice'], getConcertBoxOffice, {
    staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
  });
  const onHandleNext = () => {
    setBoxOfficeView(!boxOfficeView);
  };
  const onHandlePrev = () => {
    setBoxOfficeView(!boxOfficeView);
  };
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

  // 메인 달력 일정 추가 함수
  // - 공연 시작일과 종료일 사이에 해당하는 각각의 날짜에 일정을 표시한다.
  const mainTileContent = ({ date }) => {
    if (realData) {
      const currentDate = dayjs(date).format('YYYYMMDD');
      // mainTileContent 함수는 각각의 날짜마다 호출되므로, currentDate는 날짜마다 바뀜
      // 예를 들어, currentDate 가 2023.08.04일 경우, 그 날짜가 공연의 시작일~종료일 중 포함되는
      // 해당 공연이 matchingEvents에 담긴다.
      const matchingEvents = realData.filter(
        (item) =>
          currentDate >= dayjs(item.start_date).format('YYYYMMDD') &&
          currentDate <= dayjs(item.end_date).format('YYYYMMDD'),
      );
      // matchingEvents가 하나라도 있을 때 일정을 표시
      if (matchingEvents.length > 0) {
        return (
          <div className="date_contents_container ">
            {matchingEvents.map((event, index) => (
              <div
                key={index}
                className={'date_contents_' + `${index}`}
                style={{ marginBottom: 5 }}
                onClick={() => {
                  onOpen();
                  setSelectedEvent(event); // 비동기이기 때문에 아래의 콘솔이 먼저 찍힘
                  // console.log('selected Event', selectedEvent);
                  setSelectedDate(currentDate); // 내 캘린더에 보낼 selectedDate
                  // console.log(currentStrDate);
                }}
              >
                <div style={{ fontSize: 11, padding: 3 }}>
                  <span>{event.name?.replace(/\([^)]*\)/g, '')}</span>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
    return <div className="date_contents_container"></div>;
  };
  // 미니캘린더 상세 => 전체 달력으로 전환
  const onClickWholeCalendar = () => {
    setCurDate(false);
  };
  // 미니캘린더 전체 => 상세정보로 전환
  // const handleClickDay = (clickedDate) => {
  //   setDate(clickedDate);
  //   setCurDate(true);
  // };
  //
  // onClickDay 함수를 쓰지 않게 된 이유 - onChange도 날짜 클릭할때마다 value가 바뀌는 기능으로서 작용
  // const handleClickMainDay = (clickedDate) => {
  //   setMainDate(clickedDate);
  // };

  // 시작-종료 필터링해서 나온 일정들 새로운 배열에 추가 - 미니캘린더 dot용
  const dateStr = dayjs(date).format('YYYY-MM-DD'); // 달력의 각각의 날짜
  const start = dayjs(state.startDate).format('YYYY-MM-DD'); // 검색창에 입력한 시작일
  const end = dayjs(state.endDate).format('YYYY-MM-DD'); // 검색창에 입력한 종료일
  useEffect(() => {
    if (realData) {
      const filteredItems = [];

      for (const item of realData) {
        if (start <= item.start_date && item.end_date <= end) {
          filteredItems.push(item);
        }
      }

      setCurArray(filteredItems);
    }
    console.log('curArray', curArray);
  }, [realData, start, end]);

  // 검색버튼 눌렀을 때
  const handleSearch = () => {
    if (state.startDate && state.endDate) {
      setIsSearched(true);
    }
  };
  // 값이 하나라도 바뀌고, isSearched 가 true상태라면, 다시 검색버튼 눌렀을 때 true로
  // 만들어주기 위해 false로 바꿔놓는다(초기화)
  useEffect(() => {
    if (isSearched) {
      setIsSearched(false);
    }
  }, [state.startDate, state.endDate]);

  //미니 캘린더 일정 추가
  const tileContent = ({ date }) => {
    if (curArray && isSearched) {
      for (const item of curArray) {
        const currentDate = dayjs(date).format('YYYY.MM.DD');
        const startDate = dayjs(item.start_date).format('YYYY.MM.DD');
        const endDate = dayjs(item.end_date).format('YYYY.MM.DD');
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

  // 상세 페이지로
  const onGoDetail = (eventId) => {
    navigate(`/concert/${eventId}`, {
      state: { eventData: eventId },
    });
  };
  // 커뮤니티
  // const {
  //   data: pageList,
  //   isLoading,
  //   error,
  // } = useQuery(['pageList'], BoardPageApi);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // 저장기능(post)과 중복 저장 방지
  const onGoMyCalendar = async () => {
    const personalData = {
      start_date: dayjs(selectedEvent.start_date).format('YYYYMMDD'),
      end_date: dayjs(selectedEvent.end_date).format('YYYYMMDD'),
      selected_date: selectedDate,
      poster: selectedEvent.poster,
      place: selectedEvent.place,
      // runtime: selectedEvent.prfruntime?._text,
      // price: selectedEvent.pcseguidance?._text,
      name: selectedEvent.name,
    };
    await axios
      .get('http://imca.store/api/v1/calendar/menu', {
        params: { date: selectedDate },

        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length !== 0) {
          for (let item of res.data) {
            if (item.name === selectedEvent.name) {
              alert('이미 저장된 데이터입니다');
            } else {
              axios
                .post('http://imca.store/api/v1/calendar/', personalData, {
                  headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                  },
                  withCredentials: true,
                })
                .then((res) => {
                  console.log('데이터 전송 완료', res);
                  onClose();
                })
                .catch((err) => console.log('데이터 전송 에러', err));
            }
          }
        } else {
          axios
            .post('http://imca.store/api/v1/calendar/', personalData, {
              headers: {
                Authorization: `Bearer ${cookies.access_token}`,
              },
              withCredentials: true,
            })
            .then((res) => {
              console.log('데이터 전송 완료', res);
              onClose();
            })
            .catch((err) => console.log('데이터 전송 에러', err));
        }
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
                onGoDetail={() => onGoDetail(selectedEvent.api_id)}
              />
            </ModalBody>

            <ModalFooter>
              {/* <button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </button> */}
              <button onClick={onGoMyCalendar} className="modal_button">
                저장하기
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
      <section className="mini_calendar">
        <div className="add_container">
          <div style={{ overflowY: 'scroll', borderRadius: 10, height: 380 }}>
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
              </button>{' '}
            </div>

            {isSearched ? (
              realData?.map(
                (it, index) =>
                  start <= it.start_date &&
                  it.end_date <= end && (
                    <CurCalendar
                      onGoDetail={() => onGoDetail(it.api_id)}
                      key={index}
                      startDate={it.start_date}
                      endDate={it.end_date}
                      title={it.name}
                      place={it.place}
                      img={it.poster}
                    />
                  ),
              )
            ) : (
              <div
                style={{
                  display: 'flex',
                  padding: 10,
                  marginTop: 90,
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 20,
                    fontWeight: 'bold',
                    padding: 10,
                    borderRadius: '15px',
                    color: '#134f2c',
                    border: '1px solid #134f2c',
                  }}
                >
                  {' '}
                  기간별 공연을 검색하세요
                </span>
              </div>
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
                  it.start_date <= dateStr &&
                  dateStr <= it.end_date && (
                    <CurCalendar
                      key={index}
                      onGoDetail={() => onGoDetail(it.api_id)}
                      startDate={it.start_date}
                      endDate={it.end_date}
                      title={it.name}
                      place={it.place}
                      img={it.poster}
                    />
                  ),
              )}
            </div>
          ) : (
            <div className="mini_calendar_container">
              <MiniCalendar
                onChange={(e) => {
                  setDate(e);
                  setCurDate(true);
                }}
                value={date}
                formatDay={(locale, date) =>
                  date.toLocaleString('en', { day: 'numeric' })
                } //날짜에 숫자만 들어가게 하기
                tileContent={tileContent}
                next2Label={null} // 다음 년도 화살표
                prev2Label={null} // 이전 년도 화살표
                // onClickDay={handleClickDay}
              />
            </div>
          )}
        </div>
      </section>
      <section className="ranking">
        <Ranking
          title="박스오피스"
          boxOfArray={
            boxOfficeView
              ? boxOfficeData?.slice(5, 10)
              : boxOfficeData?.slice(0, 5)
          }
          onGoBoxOfficeDetail={onGoDetail}
          onHandleNext={onHandleNext}
          onHandlePrev={onHandlePrev}
        />
      </section>
      <section>
        <div className="big_calendar_container">
          <Calendar
            onChange={(e) => setMainDate(e)}
            value={mainDate}
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
            // onClickDay={handleClickMainDay}
          />
        </div>
      </section>
      {/* <section>
        <div className="mainPage_community_container">
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#134f2c' }}>
            커뮤니티
          </div>{' '}
          {pageList?.results?.slice(0, 8).map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                borderBottom: '1px solid rgb(185, 185, 185)',
                fontSize: 15,
                justifyContent: 'space-between',
              }}
            >
              {' '}
              <div>{item.title}</div>
              <div>{dayjs(item.created_at).format('YYYY.MM.DD')}</div>
            </div>
          ))}
        </div>
      </section> */}
      <section>
        <div className="mainPage_community_container">
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#134f2c' }}>
            콘텐츠
          </div>
        </div>
      </section>
    </div>
  );
};
export default Main;
