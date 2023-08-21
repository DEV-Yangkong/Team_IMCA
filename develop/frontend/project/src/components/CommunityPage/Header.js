import styles from './Header.module.css';
import React, { useState, useEffect } from 'react'; // useEffect를 추가
import { BoardPageApi } from '../../communityApi';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageList, setPageList] = useState([]); // pageList 상태 추가

  useEffect(() => {
    axios
      .get(
        'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/community_board/',
      )
      .then((response) => {
        setPageList(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching pageList:', error);
      });
  }, []);

  const handleSearch = () => {
    // 검색 처리 로직 작성
  };

  const postCount = pageList.length; // pageList의 길이로 게시물 수 계산

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
