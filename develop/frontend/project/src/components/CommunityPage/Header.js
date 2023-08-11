import styles from './Header.module.css';
import React from 'react';

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLine}>
        <p>자유게시판 121</p>
        {/* 121 숫자는 게시글이 추가 시 업데이트 되어야 함 */}
        <input
          className={styles.form_control}
          type="search"
          placeholder="Search"
          name="keyword"
          value=""
        />
      </div>
    </div>
  );
};

export default Header;
