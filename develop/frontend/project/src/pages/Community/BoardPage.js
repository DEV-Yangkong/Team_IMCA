import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { BoardPageApi } from '../../communityApi';

import styles from './BoardPage.module.css';

import Pages from '../../components/CommunityPage/Pages';
import Header from '../../components/CommunityPage/Header';
import Category from '../../components/CommunityPage/Category';

const BoardPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;
  console.log('cate', category);

  // 구조분해 할당

  const {
    data: pageList,
    isLoading,
    error,
  } = useQuery(['pageList', category], () => BoardPageApi(category));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log('pageList', pageList);

  // pageList.results 배열이 있다면 해당 배열의 데이터를 매핑하여 렌더링
  const pagesToRender = pageList.results || [];

  return (
    <div className={styles.BoardPage}>
      <Category />
      <Header />
      {pagesToRender?.map((item) => (
        <Pages
          key={item.id} // 각 아이템에 고유한 키 값 지정
          item={item} // 데이터 전달
        />
      ))}
      <div className={styles.EditorDiv}>
        {/* <button
          className={styles.EditorButton}
          type="button"
          onClick={() => {
            if (!isLoggedIn) {
              navigate('/login'); // 로그인 페이지로 이동
            } else {
              navigate('/edit/:id'); // 글쓰기 페이지로 이동
            }
          }}
        >
          글쓰기
        </button> */}
        <button
          className={styles.EditorButton}
          type="button"
          onClick={() => {
            navigate('/edit/:id'); // 글쓰기 페이지로 이동
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default BoardPage;
