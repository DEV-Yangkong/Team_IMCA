import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './YouTubeList.module.css';
import 'font-awesome/css/font-awesome.min.css';

const RecentYouTubePosts = () => {
  const [youtubePosts, setYoutubePosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/youtube_video/',
          // 'http://127.0.0.1:8000/api/v1/youtube_videos/',
        );
        setYoutubePosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const isoDateString = dateString; // 예: '2023-08-08T11:59:01.894580+09:00'
    const formattedDateString = isoDateString.split('T')[0]; // '2023-08-08'
    return formattedDateString.replace(/\./g, '-'); // '.'을 '-'로 변경
  };

  const reversedFilteredPosts = [...youtubePosts].reverse();
  const recentPosts = reversedFilteredPosts.slice(0, 3);

  return (
    <div
      className={styles['post-list']}
      style={{ justifyContent: 'space-between', margin: 0 }}
    >
      {recentPosts.map((post) => (
        <div
          className={styles['post-item']}
          key={post.id}
          style={{ width: 390, margin: '0 0 80px 0' }}
        >
          <Link
            to={`/youtube/${post.id}`}
            className={styles['post-title-link']}
            // onClick={() => handleViewCountClick(post.id)}
          >
            <img src={post.thumbnail_url} alt={post.title} />
            <div className={styles['post-title']}>{post.title}</div>
          </Link>
          <div className={styles['post-info']}>
            <span className={styles['post-date']}>
              {formatDate(post.created_at)}
            </span>
            <span className={styles['post-views']}>
              조회수 {post.views_count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentYouTubePosts;
