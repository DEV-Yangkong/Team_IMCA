import styles from './Header.module.css';
import React, { useState, useEffect } from 'react'; // useEffect를 추가
import { BoardPageApi } from '../../communityApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageList, setPageList] = useState([]); // pageList 상태 추가

  useEffect(() => {
    // API 호출 로직
    BoardPageApi() // 적절한 API 엔드포인트로 변경해야 함
      .then((response) => response.json())
      .then((data) => {
        setPageList(data); // API에서 가져온 데이터를 pageList 상태에 저장
      })
      .catch((error) => {
        console.error('Error fetching pageList:', error);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출되도록 빈 배열을 전달

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
