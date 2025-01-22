import React from "react";
import ReplyItem from "./ReplyItem";
const CommentItem = ({
    comment,
    movieId,
    setComments,
    setError,
    setReplyingToCommentId,
    replyingToCommentId,
    setReplyingToReplyId,
    replyingToReplyId,
    newReplies,
    setNewReplies,
    handleAddReply,
    handleAddNestedReply,
    loadingReplies,
    fetchReplies,
    fetchRepliesToReply,
  }) => {
  
    const handleReplyChange = (e, commentId) => {
      setNewReplies({
        ...newReplies,
        [commentId]: e.target.value,
      });
    };
  
    const handleShowReplies = async (commentId) => {
      if (!comment.replies && !loadingReplies[commentId]) {
        await fetchReplies(commentId);
      }
    };
  
    return (
      <div className="p-3 border rounded-md bg-gray-100">
        <p className="text-sm text-gray-800">{comment.text}</p>
        <span className="text-xs text-gray-500">- {comment.name || "Anonymous"}</span>
  
        {/* Reply Button */}
        {replyingToCommentId === comment._id ? (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Add a reply..."
              value={newReplies[comment._id] || ""}
              onChange={(e) => handleReplyChange(e, comment._id)}
            />
            <button
              onClick={() => handleAddReply(comment._id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Reply
            </button>
          </div>
        ) : (
          <button
            onClick={() => setReplyingToCommentId(comment._id)}
            className="mt-2 mx-2 text-sm text-blue-500"
          >
            Reply
          </button>
        )}
  
        {/* Show Replies Button */}
        {!comment.replies && !loadingReplies[comment._id] && (
          <button
            onClick={() => handleShowReplies(comment._id)}
            className="mt-2 mx-2 text-sm text-blue-500"
          >
            Show Replies
          </button>
        )}
  
        {/* Display Replies */}
        {Array.isArray(comment.replies) && (
          <div className="mt-4 space-y-2 pl-6">
            {comment.replies.map((reply) => (
              <ReplyItem
                key={reply._id}
                reply={reply}
                movieId={movieId}
                setComments={setComments}
                setError={setError}
                setReplyingToReplyId={setReplyingToReplyId}
                replyingToReplyId={replyingToReplyId}
                setNewReplies={setNewReplies}
                newReplies={newReplies}
                handleAddNestedReply={handleAddNestedReply}
                loadingReplies={loadingReplies}
                fetchRepliesToReply={fetchRepliesToReply}
              />
            ))}
          </div>
        )}
      </div>
    );
  };
  export default CommentItem;
  