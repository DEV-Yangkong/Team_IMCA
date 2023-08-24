import { useParams } from 'react-router-dom';
import { getUserDetail } from '../../communityApi';
import { useQuery } from '@tanstack/react-query';

import styles from './Detail.module.css';

import React from 'react';

const Detail = () => {
  const params = useParams();
  const category = params.category;
  const id = params.id;
  console.log('category', category);
  console.log('id', id);
  // Remove the unnecessary author variable

  const {
    data: pageList,
    isLoading,
    isError,
  } = useQuery(
    ['pageList', category, id],
    () => getUserDetail(category, id), // Pass the id to the getUserDetail function
  );

  console.log('detail data check', pageList);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (isError || !pageList) {
    return <div>Error loading data.</div>; // Handle errors
  }

  const { title, writer, file, created_at, views_count, photo, content } =
    pageList; // Destructure the data
  // const { nickname } = author;

  return (
    <div className={styles.Detail}>
      <div className={styles.detailHeader}>
        <p className={styles.detailTitle}>{title}</p>
      </div>
      <div className={styles.left}>
        <div>
          <div className={styles.detailUser}>
            <img src={file} />
          </div>
        </div>
        <div className={styles.author}>
          <div className={styles.authorTop}>
            <div className={styles.detailId}>{writer}</div>
          </div>
          <div className={styles.authorBottom}>
            <div className={styles.detailDate}>{created_at}</div>
            <div className={styles.detailViews}>조회수 {views_count}</div>
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
