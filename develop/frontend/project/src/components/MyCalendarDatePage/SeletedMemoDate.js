import { useEffect, useState } from 'react';
import styles from './SelectedDate.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const SelectedMemoDate = ({ detailData, selectedDate, id }) => {
  const [memo, setMemo] = useState(''); //입력메모
  const [memoList, setMemoList] = useState([]); //메모리스트
  // const { id } = useParams();
  // const [memo_pk, setMemoPk] = useState(0);
  const [cookies] = useCookies('access_token');

  const calendarId = detailData.map((it) => it.id);

  const handleMemo = async (id) => {
    if (memo.trim() !== '') {
      const newMemo = { date: selectedDate, content: memo };
      setMemoList([...memoList, newMemo]); //새로운 메모 목록에 추가
      setMemo('');
    }
    const updateMemo = memo + '\n' + memo;
    setMemo(updateMemo); //메모상태 줄바꿈업데이트

    await axios
      .post(
        `http://imca.store/api/v1/calendar/${id}/memo/`,
        { content: memo },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        // console.log('메모 전송 성공', res);
        window.location.reload();
      })
      .catch((error) => console.log('ㅁㅔ모전송 실패', error));
  };

  const handleDelete = (calendar, id) => {
    axios
      .delete(`http://imca.store/api/v1/calendar/${calendar}/memo/${id}/`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log('선택한 메모 삭제완료', res);
      })
      .catch((error) => {
        alert('삭제완료');

        window.location.reload();
        // console.log('선택한 메모 삭제 실패', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      for (const id of calendarId) {
        try {
          const response = await axios.get(
            `http://imca.store/api/v1/calendar/${id}/memo/`,
            {
              headers: {
                Authorization: `Bearer ${cookies.access_token}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          );
          newData.push(...response.data); // 응답 데이터를 배열에 추가

          // console.log(newData, '메모추가업데이트');
        } catch (error) {
          alert('불러오기 실패');
          // console.log(`Error fetching data for calendar ID ${id}:`, error);
        }
      }
      setMemoList(newData); // 모든 응답 데이터를 저장
    };
    fetchData();
  }, [calendarId[0]]); // calendarId가 변할 때마다 호출

  return (
    <div className={styles.container}>
      {/* 선택한 포스터 나열 */}
      {/* 저장한 공연 개수만큼 렌더링해주기 */}
      {detailData?.map((item) => (
        <>
          <div className={styles.wrapper} key={item.id}>
            <div className={styles.contentBox}>
              {/* 포스터 */}
              <div className={styles.poster}>
                {detailData && item.poster ? (
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '10px',
                    }}
                    src={item?.poster}
                  />
                ) : (
                  <div>loading</div>
                )}
              </div>
              {/* 공연 상세정보 */}
              <div className={styles.detail}>
                <div
                  style={{
                    width: '97%',
                    borderRadius: '5px',
                    backgroundColor: '#d8ebb5',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    padding: '3px',
                    marginTop: '10px',
                    marginBottom: '10px',
                  }}
                >
                  {detailData && item?.name}
                </div>
                <div
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    // marginBottom: '10px',
                    padding: '3px',
                  }}
                >
                  장소 : {detailData && item?.place}
                </div>
                <div
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    // marginBottom: '10px',
                    padding: '3px',
                  }}
                >
                  시작일 : {detailData && item?.start_date}
                </div>
                <div
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    // marginBottom: '10px',
                    padding: '3px',
                  }}
                >
                  종료일 : {detailData && item?.end_date}
                </div>
                {/* 메모리스트나열 */}

                <div className={styles.memoList}>
                  {memoList
                    ? memoList?.map(
                        (memoItem, index) =>
                          // 선택한 날짜에 해당하는 메모만 표시
                          memoItem.calendar === item.id && (
                            <div className={styles.memoListBox} key={index}>
                              <div className={styles.memoItem}>
                                {memoItem.content}
                              </div>
                              <button
                                className={styles.memoDelete}
                                onClick={() =>
                                  handleDelete(memoItem.calendar, memoItem.id)
                                }
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                            </div>
                          ),
                      )
                    : ''}
                </div>
              </div>
            </div>
            <div className={styles.memoBox}>
              <div className={styles.memoTextBox}>
                <textarea
                  className={styles.memoInput}
                  value={memo} // 메모 텍스트 출력
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="기억하고 싶은 메모를 입력하세요!" // textarea 값 변경 시 메모 상태 업데이트
                ></textarea>
                <button
                  className={styles.memoBtn}
                  onClick={() => {
                    handleMemo(item.id);
                    setMemo('');
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default SelectedMemoDate;
