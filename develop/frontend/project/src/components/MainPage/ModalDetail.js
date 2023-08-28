import { textDecoration } from '@chakra-ui/styled-system';

const ModalDetail = ({ selectedEvent, onGoDetail }) => {
  return (
    <>
      {selectedEvent && (
        <div style={{ padding: '10px 10px 0 10px' }}>
          <h2
            style={{
              fontWeight: 'bold',
              color: 'green',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            {selectedEvent.name}
          </h2>
          <img
            src={selectedEvent.poster}
            alt=""
            style={{ marginBottom: 10, width: 320, height: 450 }}
          />
          <p style={{ fontSize: 18, marginBottom: 10 }}>
            공연 날짜: {selectedEvent.start_date}~{selectedEvent.end_date}
          </p>
          <p style={{ fontSize: 18, marginBottom: 10 }}>
            공연 장소 : {selectedEvent.place}
          </p>
          <p
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={onGoDetail}
          >
            자세히 보기
          </p>
          {/* <p>
            <a
              href={`https://www.naver.com/search/${encodeURIComponent(
                selectedEvent.prfnm._text,
              )}`}
            >
              예매하기
            </a>
          </p> */}
          {/* 기타 해당 이벤트에 관련된 정보 표시 */}
        </div>
      )}
    </>
  );
};
export default ModalDetail;
