import { useNavigate, useParams } from 'react-router-dom'; // useHistory 추가
import { getUserDetail } from '../../communityApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; // useMutation과 useQueryClient 추가

import styles from './Detail.module.css';

import { Link } from 'react-router-dom';

import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(['access_token']);

  const category = params.category;
  const id = params.id;
  // Remove the unnecessary author variable

  const {
    data: pageList, // Make sure 'pageList' is being populated correctly
    isLoading,
    isError,
  } = useQuery(['pageList', category, id], () => getUserDetail(category, id));

  const deleteUserDetail = async () => {
    try {
      await axios.delete(
        `http://imca.store/api/v1/community_board/category/${category}/detail/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        },
      );

      queryClient.invalidateQueries('pageList');
      navigate(`/${category}`);
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const deleteMutation = useMutation(deleteUserDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries('pageList');
    },
  });

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');

    if (confirmDelete) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !pageList || !pageList.writer) {
    return <div>Error loading data.</div>;
  }

  const { title, writer, created_at, views_count, photo, content } = pageList; // Destructure the data
  // const { nickname } = author;

  return (
    <div className={styles.Detail}>
      <div className={styles.detailHeader}>
        <p className={styles.detailTitle}>{title}</p>
      </div>
      <div className={styles.left}>
        <div>
          <div className={styles.detailUser}>
            <img src={`http://imca.store/${writer.profileImg}`} />
          </div>
        </div>
        <div className={styles.author}>
          <div className={styles.authorTop}>
            <div className={styles.detailId}>{writer.nickname}</div>
          </div>
          <div className={styles.authorBottom}>
            <div className={styles.detailDate}>{created_at}</div>
            <div className={styles.detailViews}>조회수 {views_count}</div>
            <Link
              to={`/${category}/modify/${id}`}
              className={styles.editButton}
            >
              수정하기
            </Link>
            <div className={styles.detailActions}>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteClick}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailContent}>
        {photo && (
          <div className={styles.detailImg}>
            <img src={photo} alt={title} />
          </div>
        )}
        <div className={styles.detailContent}>{content}</div>
      </div>
    </div>
  );
};

export default Detail;
