import styles from './Header.module.css';
import React, { useState, useEffect } from 'react'; // useEffect를 추가

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const Header = ({ postCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageList, setPageList] = useState([]); // pageList 상태 추가
  const { category } = useParams();
  const handleSearch = () => {
    // 예시 검색 처리 로직
  };

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLine}>
        <p>
          {category === 'free'
            ? '자유게시판'
            : category === 'after'
            ? '공연후기'
            : category === 'trade'
            ? '동행/양도'
            : ''}{' '}
          {postCount}
        </p>
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
