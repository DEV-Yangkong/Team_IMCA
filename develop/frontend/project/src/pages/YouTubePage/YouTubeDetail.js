import React from 'react';
import { useParams } from 'react-router-dom';

const YouTubeDetail = ({ youtubePosts }) => {
  // postId를 URL 파라미터에서 가져옴
  const { postId } = useParams();

  // postId와 일치하는 포스트를 찾음
  const selectedPost = youtubePosts.find(
    (post) => post.id.toString() === postId,
  );

  if (!selectedPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="youtube-detail">
      <h2>{selectedPost.title}</h2>
      <div className="video-container">
        {/* 유튜브 영상을 여기에 렌더링 */}
        <iframe
          width="560"
          height="315"
          src={selectedPost.videoUrl}
          title={selectedPost.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
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
