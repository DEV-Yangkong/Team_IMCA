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
  const [memo_pk, setMemoPk] = useState(0);
  const [cookies] = useCookies('access_token');

  const calendarId = detailData.map((it) => it.id);

  const handleMemo = async (id) => {
    if (memo.trim() !== '') {
      const newMemo = { date: selectedDate, content: memo };
      setMemoList([...memoList, newMemo]); //새로운 메모 목록에 추가
      setMemo('');
    }
    const updateMemo = memo + '\n' + memo;
    setMemo(updateMemo); //메모상태 업데이트

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
        console.log('메모 전송 성공', res);
      })
      .catch((error) => console.log('ㅁㅔ모전송 실패', error));
  };

  // const handleMemo = () => {
  //   if (memo.trim() !== '') {
  //     const newMemo = { date: selectedDate, text: memo }; // 새로운 메모 객체 생성
  //     setMemoList([...memoList, newMemo]); // 새로운 메모 목록에 추가

  //     setMemo('');
  //   }
  //메모아이템 삭제
  const handleDelete = (id) => {
    const updateMemoList = memoList.filter((_, i) => i !== id);
    setMemoList(updateMemoList);

    axios
      .delete(
        `http://imca.store/api/v1/calendar/${id}/memo/${id}`,
        handleDelete,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => console.log('선택한 메모 삭제완료', res))
      .catch((error) => console.log('선택한 메모 삭제 실패', error));
  };

  useEffect(() => {
    const testList = [];
    calendarId.map((item) => {
      axios
        .get(`http://imca.store/api/v1/calendar/${item}/memo/`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((res) => {
          const memoData = res.data;
          // setMemoList(...memoData);
          testList.push(...memoData);
          console.log('메모불러오기 성공', res);
          console.log(testList, 'memoList');
        })
        .catch((error) => {
          console.log('err메모불러오기', error);
        });
    });
  }, [calendarId]);

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
                  {/* {testList?.map(
                    (memoItem, index) => memoItem.calendarId
                      // 선택한 날짜에 해당하는 메모만 표시
                      memoItem.date === selectedDate && (
                        <div className={styles.memoListBox} key={index}>
                          <div className={styles.memoItem}>
                            {memoItem.content}
                          </div>
                          <button
                            className={styles.memoDelete}
                            onClick={() => handleDelete(index, memo_pk)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      ),
                  )} */}
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
