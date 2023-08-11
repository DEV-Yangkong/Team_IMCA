import { useState } from 'react';
import styles from './Comment.module.css';
import React from 'react';

const Comment = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      내용: '첫 번째 댓글입니다.',
      작성시간: '2023-08-11 16:29',
      유저프로필: {
        name: '유저1',
        avatarUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBixXGAxXwds9JWvAmprb7bNCsR5iwQ2Jgg&usqp=CAU', // 유저 프로필 이미지 URL 추가
      },
      // 이미지Url: 'IMAGE_URL_1',
    },
    {
      내용: '두 번째 댓글입니다.',
      작성시간: '2023-08-11 17:45',
      유저프로필: {
        name: '유저2',
        avatarUrl:
          'https://file3.instiz.net/data/cached_img/upload/2019/04/20/16/d0078c541953af03ab779c93fa597d54.jpg', // 유저 프로필 이미지 URL 추가
      },
      // 이미지Url: 'IMAGE_URL_2',
    },
    {
      내용: '세 번째 댓글입니다.',
      작성시간: '2023-08-11 17:45',
      유저프로필: {
        name: '유저3',
        avatarUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyMURwVAlQb4XmKthJvVHw53WW6vA4pGVwUw&usqp=CAU', // 유저 프로필 이미지 URL 추가
      },
    },
  ]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSaveComment = () => {
    if (comment.length > 0) {
      const newComment = {
        내용: comment,
        작성시간: formatTimestamp(new Date()),
        유저프로필: {
          name: '새로운 유저',
          avatarUrl: 'NEW_USER_AVATAR_URL',
        },
        이미지Url: 'NEW_IMAGE_URL',
      };

      setCommentsList([...commentsList, newComment]);
      setComment('');
    } else {
      alert('댓글을 입력해주세요.');
    }
  };

  return (
    <div className={styles.Comment}>
      <div className={styles.CommentList}>
        {commentsList.map((comment, index) => (
          <div key={index} className={styles.CommentItem}>
            <div className={styles.CommentWrapper}>
              <div className={styles.profileBox}>
                {comment.유저프로필 && (
                  <div className={styles.UserProfile}>
                    <img src={comment.유저프로필.avatarUrl} alt="유저 프로필" />
                  </div>
                )}
              </div>
              <div>
                <div className={styles.CommentTop}>
                  <p>{comment.유저프로필.name}</p>
                  <span className={styles.CommentTime}>{comment.작성시간}</span>
                </div>
                <div className={styles.CommentBottom}>
                  <p>{comment.내용}</p>
                </div>
              </div>
              {comment.이미지Url && ( // 이미지 URL이 있을 때만 이미지를 표시
                <div>
                  <img src={comment.이미지Url} alt="댓글 이미지" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.CommentBox}>
        <input
          type="text"
          className={styles.CommentInput}
          placeholder="댓글 달기"
          value={comment}
          onChange={handleCommentChange}
        />
        <button
          type="button"
          className={styles.CommentButton}
          onClick={handleSaveComment}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default Comment;
