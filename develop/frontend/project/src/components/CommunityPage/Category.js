import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.css';

const Category = () => {
  return (
    <div className={styles.Category}>
      <ul className={styles.category_list}>
        <Link to="/free" style={{ textDecoration: 'none' }}>
          <li>자유게시판</li>
        </Link>
        <Link to="/after" style={{ textDecoration: 'none' }}>
          <li>공연후기</li>
        </Link>
        <Link to="/trade" style={{ textDecoration: 'none' }}>
          <li>동행 / 양도</li>
        </Link>
      </ul>
    </div>
  );
};

export default Category;
