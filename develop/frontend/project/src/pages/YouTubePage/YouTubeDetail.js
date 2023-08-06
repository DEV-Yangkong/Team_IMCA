import React from 'react';
import { useParams } from 'react-router-dom';

const YouTubeDetail = () => {
  const { postId } = useParams(); // URL에서 게시글 ID 추출

  // 선택한 게시글의 정보 (예시)
  const selectedPost = {
    // 게시글 정보 (썸네일, 제목, 날짜, 조회수, 좋아요, 댓글, 영상 URL 등)를 포함한 객체
    // 예: { thumbnailUrl: '...', title: '...', date: '...', views: '...', likes: '...', comments: '...', videoUrl: '...', ... }
  };

  return (
    <div className="youtube-detail">
      <h2>{selectedPost.title}</h2>
      <div className="video-container">
        {/* 유튜브 영상을 여기에 렌더링 */}
        {/* 예: <iframe width="560" height="315" src={selectedPost.videoUrl} title={selectedPost.title} frameBorder="0" allowFullScreen></iframe> */}
      </div>
      <div className="post-info">
        <span className="post-date">{selectedPost.date}</span>
        <span className="post-views">{selectedPost.views} views</span>
        <span className="post-likes">{selectedPost.likes} likes</span>
        <span className="post-comments">{selectedPost.comments} comments</span>
      </div>
      <a href={selectedPost.videoUrl} target="_blank" rel="noopener noreferrer">
        원본 동영상 보기
      </a>
      {/* 댓글 기능을 추가할 수 있음 */}
    </div>
  );
};

export default YouTubeDetail;
