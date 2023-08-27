import { useEffect, useState } from 'react';
import styles from './SelectedDate.module.css';
import { getCalendarDetail } from '../../mycalendarApi';

const SelectedMemoDate = ({ selectedDate, detailData }) => {
  const [memo, setMemo] = useState(''); //입력메모
  const [memoList, setMemoList] = useState([]); //메모리스트

  const handleMemo = () => {
    if (memo.trim() !== '') {
      setMemoList([...memoList, memo]); //새로운 메모 목록에 추가
      setMemo('');
    }
    const updateMemo = memo + '\n' + memo;
    setMemo(updateMemo); //메모상태 업데이트
  };

  return (
    <div className={styles.container}>
      {/* 선택한 포스터 나열 */}
      <div className={styles.wrapper}>
        <div className={styles.contentBox}>
          {/* 포스터 */}
          <div className={styles.poster}>
            <img src={detailData[0]?.poster} />
            {/* <img src={calendarDetail?.poster} alt={calendarDetail?.name} /> */}
          </div>
          {/* 공연 상세정보 */}
          <div className={styles.detail}>
            <div>{detailData[0]?.selected_date}</div>
          </div>
        </div>
        <div className={styles.memoBox}>
          {/* 메모 목록나타내는 부분 */}
          <div className={styles.memoList}>
            {memoList.map((item, index) => (
              <div className={styles.memoItem} key={index}>
                {item}
              </div>
            ))}
          </div>
          <div className={styles.memoTextBox}>
            <textarea
              className={styles.memoInput}
              value={memo} // 메모 텍스트 출력
              onChange={(e) => setMemo(e.target.value)} // textarea 값 변경 시 메모 상태 업데이트
            ></textarea>
            <button
              style={{ width: '30px', height: '30px' }}
              onClick={() => {
                handleMemo();
                setMemo('');
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMemoDate;
