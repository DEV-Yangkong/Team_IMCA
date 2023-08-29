import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { BoardPageApi } from '../../communityApi';

import styles from './BoardPage.module.css';

import Pages from '../../components/CommunityPage/Pages';
import Header from '../../components/CommunityPage/Header';
import Category from '../../components/CommunityPage/Category';
import Pagination from '../../components/CommunityPage/Pagination';

const BoardPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;

  // useSearchParams를 사용하여 URL 쿼리값 가져오기
  const [searchParams, setSearchParams] = useSearchParams();

  // page 값이 존재한다면 해당 값을 사용하고, 그렇지 않다면 1을 사용합니다.
  const currentPage = searchParams.get('page') || '1';

  // 구조분해 할당
  const {
    data: pageList,
    isLoading,
    error,
  } = useQuery(['pageList', category, currentPage], () =>
    BoardPageApi(category, currentPage),
  );

  const postCount = pageList?.count || 0;
  const itemsPerPage = pageList?.page_size || 0;
  const pageCount = pageList?.page_count || 0;

  const setPage = (newPage) => {
    setSearchParams({ page: newPage }); // setSearchParams를 사용하여 쿼리 값을 변경합니다.
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pagesToRender = pageList.results || [];

  const handleTitleClick = (id) => {
    navigate(`/${category}/detail/${id}`);
  };

  return (
    <div className={styles.BoardPage}>
      <Category />
      <Header postCount={postCount} />
      {pagesToRender.map((item) => (
        <Pages
          key={item.id}
          item={item}
          total={postCount}
          handleTitleClick={handleTitleClick}
        />
      ))}
      <div className={styles.EditorDiv}>
        <footer>
          <Pagination
            total={postCount}
            limit={itemsPerPage}
            page={parseInt(currentPage, 10)} // 현재 페이지 값을 숫자로 변환합니다.
            setPage={setPage}
            totalPage={pageCount}
          />
        </footer>
        <button
          className={styles.EditorButton}
          type="button"
          onClick={() => {
            navigate(`/edit/${category}`);
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default BoardPage;
