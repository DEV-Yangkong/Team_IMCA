import { useState } from 'react';

const SelectedDate = () => {
  const [memo, setMemo] = useState(''); //입력메모
  const [memoList, setMemoList] = useState([]); //메모리스트

  const handleMemo = () => {
    if (memo.trim() !== '') {
      setMemoList([...memoList, memo]);
    }
    const updateMemo = memo + '\n' + memo;
    setMemo(updateMemo); //메모상태 업데이트
  };
  return (
    <div style={{ backgroundColor: 'gray', width: '100%', height: '100%' }}>
      {/* 선택한 포스터 나열 */}
      <div
        style={{
          width: '100%',
          height: '300px',
          border: '1px solid blue',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '10px auto',
          }}
        >
          {/* 포스터 */}
          <div
            style={{
              width: '200px',
              height: '200px',
              border: '1px solid pink',
            }}
          ></div>
          {/* 공연 상세정보 */}
          <div
            style={{
              width: ' 280px',
              height: '200px',
              border: '1px solid pink',
            }}
          ></div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <textarea
            style={{
              width: '90%',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              margin: '10px auto',
            }}
            value={memo} // 메모 텍스트 출력
            onChange={(e) => setMemo(e.target.value)} // textarea 값 변경 시 메모 상태 업데이트
          ></textarea>
          <button
            style={{ width: '30px', height: '30px' }}
            onClick={handleMemo}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedDate;
