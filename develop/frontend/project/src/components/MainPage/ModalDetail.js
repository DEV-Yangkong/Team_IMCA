import { textDecoration } from '@chakra-ui/styled-system';

const ModalDetail = ({ selectedEvent, onGoDetail }) => {
  return (
    <>
      {selectedEvent && (
        <div style={{ padding: 10 }}>
          <h2
            style={{
              fontWeight: 'bold',
              color: 'green',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            {selectedEvent.prfnm._text}
          </h2>
          <img
            src={selectedEvent.poster._text}
            alt=""
            style={{ marginBottom: 10, width: 320, height: 450 }}
          />
          <p style={{ fontSize: 18, marginBottom: 10 }}>
            공연 날짜: {selectedEvent.prfpdfrom._text}~
            {selectedEvent.prfpdto._text}
          </p>
          <p style={{ fontSize: 18, marginBottom: 10 }}>
            공연 장소 : {selectedEvent.fcltynm._text}
          </p>
          <p
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={onGoDetail}
          >
            자세히 보기
          </p>
          {/* 기타 해당 이벤트에 관련된 정보 표시 */}
        </div>
      )}
    </>
  );
};
export default ModalDetail;
