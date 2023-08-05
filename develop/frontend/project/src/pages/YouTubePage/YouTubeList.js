import React from 'react';
import { Link } from 'react-router-dom';
import './YouTubeList.css';

const YouTubeList = () => {
  // 유튜브 게시글 데이터
  const youtubePosts = [
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    {
      thumbnailUrl: 'https://i.ytimg.com/vi/AN5XBS8Cbz8/maxresdefault.jpg',
      title: '모델 주우재의 시청자 패션 조언하기',
      date: '2023-08-05',
      views: '10',
    },
    // ... 나머지 게시글 데이터도 마찬가지로 수정
  ];

  return (
    <div className="youtube-list">
      <h1>YouTube Contents</h1>
      <div className="post-list">
        {youtubePosts.map((post, index) => (
          <div className="post-item" key={index}>
            <Link to={`/youtube/${index}`} className="post-title-link">
              <img src={post.thumbnailUrl} alt={post.title} />
              <div className="post-title">{post.title}</div>
            </Link>
            <div className="post-info">
              <span className="post-date">{post.date}</span>
              <span className="post-views">조회수 {post.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeList;
