import './MusicalList.css';

const MusicalList = ({ img, title, startDate, endDate, place }) => {
  return (
    <div className="MusicalList">
      <div className="musical_wrapper">
        <div>
          <img className="musical_poster" alt="" src={img} />
        </div>
        <div>{title}</div>
        <div>
          <span>{startDate}</span>
          <span>{endDate}</span>
        </div>
        <div>{place}</div>
      </div>
    </div>
  );
};

export default MusicalList;
