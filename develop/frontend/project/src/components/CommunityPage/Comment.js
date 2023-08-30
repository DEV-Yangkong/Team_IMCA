import React, { useState } from 'react';
import styles from './Comment.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentApi, SaveApi } from '../../communityApi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
const Comment = () => {
  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [expandedReplyId, setExpandedReplyId] = useState(null); // 추가된 부분
  const [modifyMode, setModifyMode] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const params = useParams();
  const category = params.category;
  const board_id = params.id;

  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();

  const { data: commentList } = useQuery(
    ['commentList', category, board_id],
    () => CommentApi(category, board_id),
  );

  const toggleModifyMode = (commentId) => {
    setModifyMode(modifyMode === commentId ? null : commentId);
  };

  const addCommentMutation = useMutation(
    (commentData) => CommentApi(category, commentData),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: () => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('commentList');
      },
    },
  );
  const handleAddComment = async () => {
    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }
    const commentData = {
      review_content: comment,
      review_board: board_id,
    };
    axios
      .post(
        `http://imca.store/api/v1/review/category_gather_review/${category}/${board_id}/`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
          withCredentials: true,
        },
      )
      .then((savedComment) => {
        console.log('반환된 댓글 객체:', savedComment);
        queryClient.invalidateQueries('commentList');
        // 이후 코드 계속
      })
      .catch((error) => {
        console.error('댓글 저장 에러:', error);
      });
    setComment('');
    setReplyComment('');
  };

  const addReplyCommentMutation = useMutation(
    (replyData) => CommentApi(category, replyData),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: () => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('commentList');
      },
    },
  );
  const handleAddReplyComment = (parentId) => {
    if (!replyComment) {
      alert('답글을 입력해주세요.');
      return;
    }
    const replyData = {
      bigreview_content: replyComment,
      bigreview_review: parentId,
    };
    axios
      .post(
        `http://imca.store/api/v1/review/category_gather_review/${category}/${board_id}/`,
        replyData,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
          withCredentials: true,
        },
      )
      .then((savedReply) => {
        console.log('새로운 답글 ID:', savedReply.id);
        // 저장된 답글의 ID가 유효한 경우에만 mutate 함수 호출
        addReplyCommentMutation.mutate();
        queryClient.invalidateQueries('commentList');
      })
      .catch((error) => {
        console.error('답글 저장 에러:', error);
      });
    setReplyComment('');
    setExpandedReplyId(null);
  };

  const handleUpdateComment = async () => {
    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const updatedCommentData = {
      review_content: comment,
      review_board: board_id,
    };

    try {
      const response = await axios.put(
        `http://imca.store/api/v1/review/category_gather_review/${category}/${board_id}/`,
        updatedCommentData,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
          withCredentials: true,
        },
      );

      console.log('수정된 댓글 객체:', response.data);
      queryClient.invalidateQueries('commentList');
      setComment('');
      setModifyMode(false);
    } catch (error) {
      console.error('댓글 수정 에러:', error);
    }
  };

  const deleteComment = async (commentId) => {
    const response = await axios.delete(
      `http://imca.store/api/v1/review/category_gather_review/${category}/${board_id}/`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      },
    );
    return response.data;
  };

  // Comment 컴포넌트 내부에서 삭제 함수 처리
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      queryClient.invalidateQueries('commentList');
    } catch (error) {
      console.error('댓글 삭제 에러:', error);
    }
  };

  const openDeleteAlert = (commentId) => {
    setSelectedCommentId(commentId);
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (shouldDelete) {
      handleDeleteComment(commentId); // 실제 삭제 함수 호출
    }
  };
  return (
    <div className={styles.Comment}>
      <div className={styles.CommentList}>
        {commentList?.map((item) => (
          <div key={item.id} className={styles.CommentItem}>
            <div className={styles.CommentWrapper}>
              <div className={styles.CommentImg}>
                {item.review_writer.profileImg && (
                  <div className={styles.UserProfile}>
                    <img
                      src={`http://imca.store/${item.review_writer.profileImg}`}
                    />
                  </div>
                )}
                <div>
                  <div className={styles.CommentTop}>
                    <p>{item.review_writer.nickname}</p>
                    <span className={styles.CommentTime}>
                      {item.created_at}
                    </span>
                  </div>
                  <div className={styles.CommentBottom}>
                    <p>{item.review_content}</p>
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
                  <button
                    className={styles.ReplyButton_top}
                    onClick={() => {
                      setComment(item.review_content); // Set the comment state to the existing content
                      toggleModifyMode(item.id);
                    }}
                  >
                    {modifyMode === item.id ? '취소' : '수정하기'}
                  </button>
                  <button
                    className={styles.DeleteButton}
                    onClick={() => openDeleteAlert(item.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
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
              {modifyMode === item.id && (
                <div className={styles.CommentBox}>
                  <input
                    type="text"
                    className={styles.modifyInput}
                    value={
                      modifyMode === item.id ? comment : item.review_content
                    } // 수정된 부분
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.CommentButton}
                    onClick={() => handleUpdateComment(item.id)}
                  >
                    수정
                  </button>
                </div>
              )}
              {item?.bigreviews && (
                <div className={styles.BigCommentList}>
                  {item?.bigreviews.map((bigreview) => (
                    <div key={bigreview.id} className={styles.BigCommentItem}>
                      <div className={styles.BigCommentWrapper}>
                        <div className={styles.CommentImg}>
                          <div className={styles.Arrow}>↳</div>
                          {bigreview.bigreview_writer.profileImg && (
                            <div className={styles.UserProfile}>
                              <img
                                src={`http://imca.store/${bigreview.bigreview_writer.profileImg}`}
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
