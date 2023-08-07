import './CurCalendar.css';

const CurCalendar = ({ title, startDate, endDate, place, img }) => {
  return (
    <div className="current_contents">
      <div className="current_contents_item">
        <div className="cur_content_info">
          <div className="cur_content info_title">{title}</div>
          <div className="cur_content info_period">
            {startDate} - {endDate}
          </div>
          <div className="cur_content info_place">{place}</div>
        </div>
        <div className="cur_content_img">
          <img style={{ width: '100%', height: '90px' }} alt="" src={img} />
        </div>
      </div>
    </div>
  );
};
export default CurCalendar;

// 정보 map 돌리기
// map 돌릴 리스트는 main page에서 받아오기
// 현재 날짜에 상영되고 있는 애들만 데려오기
