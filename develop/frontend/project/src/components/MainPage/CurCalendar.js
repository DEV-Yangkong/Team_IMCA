import './CurCalendar.css';

const CurCalendar = () => {
  return (
    <div className="current_calendar">
      <div className="current_calendar_header">
        <div className="current_date">8월 7일</div>
        <div className="whole_btn">전체 달력</div>
      </div>
      <div className="current_contents">
        <div className="current_contents_item">
          <div className="cur_content_info">
            <div className="cur_content info_title">제시의 일기 (뮤지컬)</div>
            <div className="cur_content info_period">
              2023.08.29 - 2023.10.29
            </div>
            <div className="cur_content info_place">대학로 드림아트센터</div>
          </div>
          <div className="cur_content_img">
            <img
              style={{ width: '100%', height: '78px' }}
              alt=""
              src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF222911_230728_110349.jpg"
            />
          </div>
        </div>
        <div className="current_contents_item">
          <div className="cur_content_info">
            <div className="cur_content info_title">제시의 일기 (뮤지컬)</div>
            <div className="cur_content info_period">
              2023.08.29 - 2023.10.29
            </div>
            <div className="cur_content info_place">대학로 드림아트센터</div>
          </div>
          <div className="cur_content_img">
            <img
              style={{ width: '100%', height: '78px' }}
              alt=""
              src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF222911_230728_110349.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurCalendar;

// 정보 map 돌리기
// map 돌릴 리스트는 main page에서 받아오기
