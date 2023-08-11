import Category from '../../components/CommunityPage/Category';
import styles from './Community.module.css';
import React from 'react';

const Community = () => {
  return (
    <div className={styles.Community}>
      <Category />
      <div>
        <div className="commu_list">자유게시판</div>
        <div className="commu_list">공연후기</div>
        <div className="commu_list">동행 / 양도</div>
      </div>
    </div>
  );
};

export default Community;
