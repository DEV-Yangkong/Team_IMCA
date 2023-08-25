import { useState } from 'react';

const SelectedDate = () => {
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
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* 선택한 포스터 나열 */}
      <div
        style={{
          width: '100%',
          height: '300px',
          border: '1px solid blue',
          overflowY: 'scroll',
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
              width: '40%',
              height: '200px',
              border: '1px solid pink',
            }}
          ></div>
          {/* 공연 상세정보 */}
          <div
            style={{
              width: ' 50%',
              height: '200px',
              border: '1px solid pink',
            }}
          ></div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
            fontSize: '14px',
            overflow: 'scroll',
          }}
        >
          {/* 메모 목록나타내는 부분 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              margin: '10px auto',
            }}
          >
            {memoList.map((item, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid black',
                  padding: '5px',
                  margin: '5px',
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', width: '100%', margin: '0 auto' }}>
            <textarea
              style={{
                width: '100%',
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

export default SelectedDate;
