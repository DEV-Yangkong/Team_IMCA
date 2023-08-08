import './Ranking.css';

const Ranking = ({ title, boxOfArray }) => {
  return (
    <div className="Ranking">
      <div className="act_ranking_title">
        <div style={{ fontSize: '20px', color: '#134f2c', fontWeight: 'bold' }}>
          {title}
        </div>
        <div className="act_ranking_line">
          <div
            style={{
              border: '0.5px solid black',
              height: 1,
              backgroundColor: '#134f2c',
            }}
          ></div>
        </div>
      </div>

      <div className="act_ranking_container">
        <div className="act_ranking_wrapper">
          {/* <div className="act_ranking_item"></div>
          <div className="act_ranking_item"></div>
          <div className="act_ranking_item"></div> */}
          {boxOfArray?.map((it, index) => (
            <div
              key={index}
              className={'act_ranking_item_' + `${it.rnum._text}`}
            >
              <img
                style={{ width: '100%', height: '280px' }}
                alt=""
                src={'http://www.kopis.or.kr/' + `${it.poster._text}`}
              ></img>
              <div>{it.prfnm._text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Ranking;
