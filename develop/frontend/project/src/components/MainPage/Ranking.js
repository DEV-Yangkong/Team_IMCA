import './Ranking.css';
import React from 'react';

const Ranking = ({ title }) => {
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
          <div className="act_ranking_item"></div>
          <div className="act_ranking_item"></div>
          <div className="act_ranking_item"></div>
        </div>
      </div>
    </div>
  );
};
export default Ranking;
