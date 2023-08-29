import React, { useState } from 'react';
import styles from './Comment.module.css';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { CommentApi, SaveApi } from '../../communityApi';
import { useParams } from 'react-router-dom';

const Comment = () => {
  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [expandedReplyId, setExpandedReplyId] = useState(null); // 추가된 부분
  const params = useParams();
  const category = params.category;
  const board_id = params.id;

  const { data: commentList } = useQuery(
    ['commentList', category, board_id],
    () => CommentApi(category, board_id),
  );

  const addCommentMutation = useMutation(
    (commentData) => CommentApi(category, commentData),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: () => {
        // 새로운 쿼리를 무효화합니다.
        QueryClient.invalidateQueries(['commentList', category, board_id]);
      },
    },
  );

  const addReplyCommentMutation = useMutation(
    (replyData) => CommentApi(category, replyData),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: () => {
        // 새로운 쿼리를 무효화합니다.
        QueryClient.invalidateQueries(['commentList', category, board_id]);
      },
    },
  );

  const handleAddComment = () => {
    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const commentData = {
      review_content: comment,
    };

    SaveApi(category, commentData)
      .then((savedComment) => {
        console.log('반환된 댓글 객체:', savedComment);
        // 이후 코드 계속
      })
      .catch((error) => {
        console.error('댓글 저장 에러:', error);
      });

    setComment('');
    setReplyComment('');
  };

  const handleAddReplyComment = (parentId) => {
    if (!replyComment) {
      alert('답글을 입력해주세요.');
      return;
    }

    const replyData = {
      review_content: replyComment,
      parent_id: parentId,
    };

    SaveApi(category, replyData)
      .then((savedReply) => {
        if (savedReply.id !== undefined) {
          console.log('새로운 답글 ID:', savedReply.id);
          // 저장된 답글의 ID가 유효한 경우에만 mutate 함수 호출
          addReplyCommentMutation.mutate();
        } else {
          console.error('저장된 답글의 ID가 없습니다.');
        }
      })
      .catch((error) => {
        console.error('답글 저장 에러:', error);
      });

    setReplyComment('');
    setExpandedReplyId(null);
  };

  return (
    <div className={styles.Comment}>
      <div className={styles.CommentList}>
        {commentList?.map((item) => (
          <div key={item.id} className={styles.CommentItem}>
            <div className={styles.CommentWrapper}>
              {item.review_writer.profileImg && (
                <div className={styles.UserProfile}>
                  <img src={item.review_writer.profileImg} alt="유저 프로필" />
                </div>
              )}
              <div>
                <div className={styles.CommentTop}>
                  <p>{item.review_writer.nickname}</p>
                  <span className={styles.CommentTime}>{item.created_at}</span>
                </div>
                <div className={styles.CommentBottom}>
                  <p>{item.review_content}</p>
                </div>
              </div>
              <button
                className={styles.ReplyButton_top}
                onClick={() =>
                  setExpandedReplyId(
                    expandedReplyId === item.id ? null : item.id,
                  )
                }
              >
                {expandedReplyId === item.id ? '취소' : '답글 달기'}
              </button>
              {expandedReplyId === item.id && (
                <div className={styles.CommentForm}>
                  <input
                    type="text"
                    className={styles.ReplyInput}
                    placeholder="답글 달기"
                    value={replyComment}
                    onChange={(e) => setReplyComment(e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.ReplyButton}
                    onClick={() => handleAddReplyComment(item.id)}
                  >
                    저장
                  </button>
                </div>
              )}
              {item?.bigreviews && (
                <div className={styles.BigCommentList}>
                  {item?.bigreviews.map((bigreview) => (
                    <div key={bigreview.id} className={styles.BigCommentItem}>
                      <div className={styles.BigCommentWrapper}>
                        {bigreview.bigreview_writer.profileImg && (
                          <div className={styles.UserProfile}>
                            <img
                              src={bigreview.bigreview_writer.profileImg}
                              alt="빅리뷰 작성자 프로필"
                            />
                          </div>
                        )}
                        <div>
                          <div className={styles.BigCommentTop}>
                            <p>{bigreview.bigreview_writer.nickname}</p>
                            <span className={styles.BigCommentTime}>
                              {bigreview.created_at}
                            </span>
                          </div>
                          <div className={styles.BigCommentBottom}>
                            <p>{bigreview.bigreview_content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="button"
          className={styles.CommentButton}
          onClick={handleAddComment}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default Comment;
