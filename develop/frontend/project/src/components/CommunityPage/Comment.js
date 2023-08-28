import React, { useState } from 'react';
import styles from './Comment.module.css';
import { useQuery, useMutation, QueryCache } from '@tanstack/react-query';
import { CommentApi } from '../../communityApi';
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
      onSuccess: () => {
        QueryCache.invalidateQueries(['commentList', category, board_id]);
      },
    },
  );

  const addReplyCommentMutation = useMutation(
    (replyData) => CommentApi(category, replyData),
    {
      onSuccess: () => {
        QueryCache.invalidateQueries(['commentList', category, board_id]);
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

    addCommentMutation.mutate(commentData);

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

    addReplyCommentMutation.mutate(replyData);

    setReplyComment('');
    setExpandedReplyId(null); // 답글 작성 후 폼 숨기기
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
