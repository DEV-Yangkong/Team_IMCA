import { useParams } from 'react-router-dom';
import { getUserDetail } from '../../communityApi';
import { useQuery } from '@tanstack/react-query';

import styles from './Detail.module.css';

import { useState, useEffect } from 'react';
import React from 'react';

const Detail = () => {
  const { id } = useParams();
  // Remove the unnecessary author variable

  const { data: detailData } = useQuery(['detailData', id], () =>
    getUserDetail(id),
  );

  console.log('detail data check', detailData);

  if (!detailData) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  const { title, author, file, created_at, views, photo, content } = detailData; // Destructure the data
  // const { nickname } = author;

  if (author && author.nickname) {
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
              <div className={styles.detailId}>{author.nickname}</div>
            </div>
            <div className={styles.authorBottom}>
              <div className={styles.detailDate}>{created_at}</div>
              <div className={styles.detailViews}>조회수 {views}</div>
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
  } else {
    return <div>Author data is missing or incomplete.</div>;
  }
};

export default Detail;
