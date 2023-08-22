import { useState, useEffect } from 'react';
import styles from './Comment.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios'; // axios를 import

const Comment = () => {
  useEffect(() => {
    // 게시글의 댓글 및 대댓글 데이터를 가져오는 API 호출
    axios
      .get(
        `https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/review/`,
      )
      .then((response) => {
        setCommentsList(response.data); // API 응답 데이터를 commentsList 상태에 저장
        console.log('댓글 데이터:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  useEffect(() => {
    // 게시글의 댓글 및 대댓글 데이터를 가져오는 API 호출
    axios
      .get(
        `https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/bigreview/`,
      )
      .then((response) => {
        const allReviews = response.data; // 모든 댓글 데이터
        const commentsWithReplies = [];

        // 댓글을 추출하여 댓글과 대댓글을 구분하여 처리
        allReviews.forEach((review) => {
          if (!review.parent_review) {
            // 댓글인 경우
            const commentData = {
              id: review.id,
              content: review.content,
              작성시간: review.created_at,
              유저프로필: {
                // author: '유저', // 댓글 작성자 이름
                avatarUrl: 'USER_AVATAR_URL', // 댓글 작성자 프로필 이미지 URL
              },
              대댓글: [],
            };
            commentsWithReplies.push(commentData);
          } else {
            // 대댓글인 경우
            const parentComment = commentsWithReplies.find(
              (comment) => comment.id === review.parent_review,
            );
            if (parentComment) {
              parentComment.대댓글.push({
                id: review.id,
                content: review.content,
                작성시간: review.created_at,
                유저프로필: {
                  // author: '유저', // 대댓글 작성자 이름
                  avatarUrl: 'USER_AVATAR_URL', // 대댓글 작성자 프로필 이미지 URL
                },
              });
            }
          }
        });

        setCommentsList(commentsWithReplies); // 댓글 및 대댓글 정보를 commentsList 상태에 저장
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSaveComment = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const newComment = {
      내용: comment,
      작성시간: new Date().toISOString(),
      유저프로필: {
        // author: '새로운 유저',
        avatarUrl: 'NEW_USER_AVATAR_URL',
      },
      이미지Url: 'NEW_IMAGE_URL',
    };

    setCommentsList([...commentsList, newComment]);
    setComment('');
  };

  const handleSaveReply = (commentIndex, replyText) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const newReply = {
      내용: replyText,
      작성시간: new Date().toISOString(),
      유저프로필: {
        author: '새로운 유저', // 로그인된 유저의 이름으로 변경하거나 사용자 정보를 가져와서 사용 가능
        avatarUrl: 'NEW_USER_AVATAR_URL', // 유저의 프로필 이미지 URL로 변경하거나 사용자 정보를 가져와서 사용 가능
      },
    };

    // 해당 댓글에 대댓글 추가하기
    const updatedCommentsList = [...commentsList];
    updatedCommentsList[commentIndex].대댓글 =
      updatedCommentsList[commentIndex].대댓글 || [];
    updatedCommentsList[commentIndex].대댓글.push(newReply);

    setCommentsList(updatedCommentsList);
  };

  const handleReplyButtonClick = (commentIndex) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // 대댓글 작성 로직
    }
  };

  return (
    <div className={styles.Comment}>
      <div className={styles.CommentList}>
        {commentsList.map((comment, commentIndex) => (
          <div key={commentIndex} className={styles.CommentItem}>
            {/* 댓글 내용 표시 */}
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
                  {/* <p>{comment.유저프로필.author}</p> */}
                  <span className={styles.CommentTime}>{comment.작성시간}</span>
                </div>
                <div className={styles.CommentBottom}>
                  <p>{comment.내용}</p>
                </div>
              </div>
              {comment.이미지Url && (
                <div>
                  <img src={comment.이미지Url} alt="댓글 이미지" />
                </div>
              )}
            </div>

            {/* 대댓글 입력 폼 */}
            <div className={styles.ReplyBox}>
              <input
                type="text"
                className={styles.ReplyInput}
                placeholder="대댓글 작성"
                onChange={(e) => {
                  const replyText = e.target.value;
                  handleSaveReply(commentIndex, replyText);
                }}
                disabled={!isLoggedIn}
              />
              {/* 대댓글 작성 버튼 */}
              <button
                type="button"
                className={styles.ReplyButton}
                onClick={() => handleReplyButtonClick(commentIndex)}
              >
                {isLoggedIn ? '대댓글 작성' : '로그인 후 작성'}
              </button>
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
