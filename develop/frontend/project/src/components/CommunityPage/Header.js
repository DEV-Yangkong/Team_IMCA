import styles from './Header.module.css';
import React, { useState } from 'react';
import { dataList } from '../../pages/Community/BoardPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const postCount = dataList.length;

  const handleSearch = () => {
    // 검색 처리 로직 작성
  };

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLine}>
        <p>자유게시판 {postCount}</p>
        <div className={styles.searchInputContainer}>
          <input
            className={`${styles.form_control} ${styles.searchInput}`}
            type="search"
            placeholder="Search"
            name="keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className={styles.searchIcon}
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
