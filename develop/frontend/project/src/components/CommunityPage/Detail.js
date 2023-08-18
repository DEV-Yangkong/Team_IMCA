import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios'; // axios를 import

const Detail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null); // 게시글 정보를 저장할 상태 변수
  // 배열에 일치한 ID를 찾아줌
  // const post = dataList.find((post) => post.id === parseInt(id));
  // const profileImg = post.user.profileImg;
  useEffect(() => {
    // API 호출
    axios
      .get(
        `https://port-0-imca-3prof2llkuol0db.sel4.cloudtype.app/api/v1/community_board/${id}`,
      )
      .then((response) => {
        setPost(response.data); // API 응답 데이터를 post 상태에 저장
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // 게시글 정보가 아직 로딩 중인 경우
  }

  console.log(id.content);

  return (
    <div className={styles.Detail}>
      <div className={styles.detailHeader}>
        <p className={styles.detailTitle}>{post.title}</p>
      </div>
      <div className={styles.left}>
        <div>
          <div className={styles.detailUser}>
            <img src={post.file} />
          </div>
        </div>
        <div className={styles.author}>
          <div className={styles.authorTop}>
            <div className={styles.detailId}>{post.author.nickname}</div>
          </div>
          <div className={styles.authorBottom}>
            <div className={styles.detailDate}>{post.created_at}</div>
            <div className={styles.detailViews}>조회수 {post.reviews_num}</div>
          </div>
        </div>
      </div>
      <div className={styles.detailContent}>
        {post.photo && (
          <div className={styles.detailImg}>
            <img src={post.photo} alt={post.title} />
          </div>
        )}
        <div className={styles.detailContent}>{post.content}</div>
      </div>
    </div>
  );
};

export default Detail;
