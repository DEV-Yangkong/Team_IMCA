import { useState, useEffect } from 'react';
import styles from './Comment.module.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { CommentApi } from '../../communityApi';
import { useQuery } from '@tanstack/react-query';

const Comment = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;
  console.log('cate', category);

  // 구조분해 할당
  // useQuery의 옵션으로 page를 전달
  const {
    data: commentList,
    isLoading,
    isError,
  } = useQuery(['commentList', category], () => CommentApi(category));
  console.log('commentList 데이터:', commentList); // 페이지 컴포넌트의 최상단에 추가

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (isError || !commentList) {
    return <div>Error loading data.</div>; // Handle errors
  }

  const handleSaveComment = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }

    // const newComment = {
    //   내용: comment,
    //   작성시간: new Date().toISOString(),
    //   유저프로필: {
    //     // author: '새로운 유저',
    //     avatarUrl: 'NEW_USER_AVATAR_URL',
    //   },
    //   이미지Url: 'NEW_IMAGE_URL',
    // };

    setCommentsList([...commentsList]);
    setComment('');
  };

  // const handleSaveReply = (commentIndex, replyText) => {
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //     return;
  //   }

  //   const newReply = {
  //     내용: replyText,
  //     작성시간: new Date().toISOString(),
  //     유저프로필: {
  //       author: '새로운 유저', // 로그인된 유저의 이름으로 변경하거나 사용자 정보를 가져와서 사용 가능
  //       avatarUrl: 'NEW_USER_AVATAR_URL', // 유저의 프로필 이미지 URL로 변경하거나 사용자 정보를 가져와서 사용 가능
  //     },
  //   };

  //   // 해당 댓글에 대댓글 추가하기
  //   const updatedCommentsList = [...commentsList];
  //   updatedCommentsList[commentIndex].대댓글 =
  //     updatedCommentsList[commentIndex].대댓글 || [];
  //   updatedCommentsList[commentIndex].대댓글.push(newReply);

  //   setCommentsList(updatedCommentsList);
  // };

  // const handleReplyButtonClick = (commentIndex) => {
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //   } else {
  //     // 대댓글 작성 로직
  //   }
  // };

  return (
    <div className={styles.Comment}>
      <div className={styles.CommentList}>
        {commentList.map((item) => (
          <div key={item.id} className={styles.CommentItem}>
            <div className={styles.CommentWrapper}>
              <div className={styles.profileBox}>
                {item.유저프로필 && (
                  <div className={styles.UserProfile}>
                    <img src={item.d} alt="유저 프로필" />
                  </div>
                )}
              </div>
              <div>
                <div className={styles.CommentTop}>
                  <p>{item.review_author}</p>
                  <span className={styles.CommentTime}>{item.created_at}</span>
                </div>
                <div className={styles.CommentBottom}>
                  <p>{item.review_content}</p>
                </div>
              </div>
              {/* {comment.이미지Url && (
                <div>
                  <img src={comment.이미지Url} alt="댓글 이미지" />
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.CommentBox}>
        <input
          type="text"
          className={styles.CommentInput}
          placeholder={isLoggedIn ? '댓글 달기' : '로그인이 필요합니다.'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onClick={() => {
            if (!isLoggedIn) {
              navigate('/login'); // 로그인 페이지로 이동
            }
          }}
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
