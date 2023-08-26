import { useState, useEffect } from 'react';
import styles from './Comment.module.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { CommentApi, replyCommentApi } from '../../communityApi';
import { QueryCache, useMutation, useQuery } from '@tanstack/react-query';
import { SaveApi } from '../../communityApi';

const Comment = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null); // Track the comment ID you're replying to
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;
  const board_id = params.id;
  console.log('params data', params);

  // 구조분해 할당
  // useQuery의 옵션으로 page를 전달
  const {
    data: commentList,
    isLoading,
    isError,
  } = useQuery(['commentList', category, board_id], () =>
    CommentApi(category, board_id),
  );
  console.log('datasdflkjsdlfj', commentList);

  const {
    data: replyList,
    isLoading: isReplyLoading,
    isError: isReplyError,
  } = useQuery(['replyList', category, board_id], () =>
    replyCommentApi(category, board_id),
  );

  const addReplyMutation = useMutation(
    (replyData) => replyCommentApi(category, replyData),
    {
      onSuccess: () => {
        // 대댓글 작성 후 댓글 목록과 대댓글 목록을 모두 업데이트해야 합니다.
        QueryCache.invalidateQueries(['commentList', category, board_id]);
        QueryCache.invalidateQueries(['replyList', category, board_id]);
        setReplyingTo(null); // 대댓글 작성 후 대댓글 상태 초기화
      },
    },
  );

  const handleAddReply = (commentId) => {
    if (replyingTo === commentId) {
      setReplyingTo(null); // 이미 선택한 댓글의 답글 버튼을 다시 누르면 대댓글 폼 닫기
      setComment(''); // 대댓글 입력 칸 비우기
    } else {
      setReplyingTo(commentId); // 대댓글 작성 폼을 보여주기 위해 대댓글을 작성할 댓글 ID 설정
      setComment(''); // 대댓글 입력 칸 비우기
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (isError || !commentList) {
    return <div>Error loading data.</div>; // Handle errors
  }

  const handleSaveComment = () => {
    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const postData = {
      // created_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(),
      // writer_profile_img: 'string', // 이 값은 실제 데이터에 맞게 변경해야 함
      review_content: comment, // 현재 댓글 내용을 사용
      // is_blocked: true, // 또는 false, 상황에 맞게 변경
    };

    SaveApi(category, board_id, postData);

    setCommentsList([...commentsList]);
    setComment('');
  };

  return (
    <div className={styles.Comment}>
      <div className={styles.CommentList}>
        {commentList.map((item) => (
          <div key={item.id} className={styles.CommentItem}>
            <div className={styles.CommentWrapper}>
              <div className={styles.profileBox}>
                <div className={styles.UserProfile}>
                  <img src={item.writer_profile_img} />
                </div>
              </div>
              <div className={styles.CommentContent}>
                <div className={styles.CommentTop}>
                  <p>{item.review_writer}</p>
                  <span className={styles.CommentTime}>{item.created_at}</span>
                </div>
                <div className={styles.CommentBottom}>
                  <p>{item.review_content}</p>
                </div>
                {/* 대댓글 표시 */}
                <div className={styles.ReplyList}>
                  {replyList.replies.map((reply) => (
                    <div key={reply.id} className={styles.ReplyItem}>
                      <div className={styles.ReplyContent}>
                        <p>{reply.review_writer}</p>
                        <p>{reply.review_content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className={styles.ReplyButton}
                  onClick={() => handleAddReply(item.id)}
                >
                  {replyingTo === item.id ? '취소' : '답글'}
                </button>
                <div>
                  {replyingTo === item.id && (
                    <div className={styles.ReplyBox}>
                      <input
                        type="text"
                        className={styles.CommentInput}
                        placeholder={'대댓글 작성'}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        type="button"
                        className={styles.CommentButton}
                        onClick={() => {
                          addReplyMutation.mutate({
                            commentId: replyingTo,
                            content: comment,
                          });
                        }}
                      >
                        저장
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.CommentBox}>
        <input
          type="text"
          className={styles.CommentInput}
          placeholder={'댓글 달기'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
