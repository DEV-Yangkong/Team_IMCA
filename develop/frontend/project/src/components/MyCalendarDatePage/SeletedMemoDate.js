import { useEffect, useState } from 'react';
import styles from './SelectedDate.module.css';

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
            {detailData && detailData[0]?.poster ? (
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                }}
                src={detailData[0]?.poster}
              />
            ) : (
              <div>loading</div>
            )}
          </div>
          {/* 공연 상세정보 */}
          <div className={styles.detail}>
            <div
              style={{
                width: '100%',
                borderRadius: '5px',
                backgroundColor: '#d8ebb5',
                fontSize: '25px',
                fontWeight: 'bold',
                padding: '3px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              {detailData && detailData[0]?.name}
            </div>
            <div
              style={{
                width: '100%',
                fontSize: '16px',
                // marginBottom: '10px',
                padding: '3px',
              }}
            >
              장소 : {detailData && detailData[0]?.place}
            </div>
            <div
              style={{
                width: '100%',
                fontSize: '16px',
                // marginBottom: '10px',
                padding: '3px',
              }}
            >
              시작일 : {detailData && detailData[0]?.start_date}
            </div>
            <div
              style={{
                width: '100%',
                fontSize: '16px',
                // marginBottom: '10px',
                padding: '3px',
              }}
            >
              종료일 : {detailData && detailData[0]?.end_date}
            </div>
            <div className={styles.memoList}>
              {memoList.map((item, index) => (
                <div className={styles.memoItem} key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.memoBox}>
          {/* 메모 목록나타내는 부분 */}

          <div className={styles.memoTextBox}>
            <textarea
              className={styles.memoInput}
              value={memo} // 메모 텍스트 출력
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요!" // textarea 값 변경 시 메모 상태 업데이트
            ></textarea>
            <button
              style={{
                width: '30px',
                height: '30px',
                marginRight: '20px',
                marginTop: '10px',
              }}
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
