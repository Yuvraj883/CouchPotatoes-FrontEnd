const ReplyItem = ({
    reply,
    setNewReplies,
    newReplies,
    setReplyingToReplyId,
    replyingToReplyId,
    handleAddNestedReply,
    loadingReplies,
    fetchRepliesToReply,
    movieId,
    setError
  }) => {
    const handleShowNestedReplies = async (replyId) => {
      if (!reply.replies && !loadingReplies[replyId]) {
        await fetchRepliesToReply(replyId);
      }
    };
  
    return (
      <div className="p-3 border-l-2 border-gray-200">
        <p className="text-sm text-gray-800">{reply.text}</p>
        <span className="text-xs text-gray-500">- {reply.name || "Anonymous"}</span>
  
        {/* Reply Button */}
        {replyingToReplyId === reply._id ? (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Add a reply..."
              value={newReplies[reply._id] || ""}
              onChange={(e) => setNewReplies((prev) => ({ ...prev, [reply._id]: e.target.value }))}
            />
            <button
              onClick={() => handleAddNestedReply(reply._id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Reply
            </button>
          </div>
        ) : (
          <button
            onClick={() => setReplyingToReplyId(reply._id)}
            className="mt-2 mx-2 text-sm text-blue-500"
          >
            Reply
          </button>
        )}
  
        {/* Show Replies Button */}
        {!reply.replies && !loadingReplies[reply._id] && (
          <button
            onClick={() => handleShowNestedReplies(reply._id)}
            className="mt-2 mx-2 text-sm text-blue-500"
          >
            Show Replies
          </button>
        )}
  
        {/* Display Nested Replies */}
        {Array.isArray(reply.replies) && reply.replies.length > 0 && (
          <div className="mt-4 space-y-2 pl-6">
            {reply.replies.map((nestedReply) => (
              <ReplyItem
                key={nestedReply._id}
                reply={nestedReply}
                setNewReplies={setNewReplies}
                newReplies={newReplies}
                setReplyingToReplyId={setReplyingToReplyId}
                replyingToReplyId={replyingToReplyId}
                handleAddNestedReply={handleAddNestedReply}
                loadingReplies={loadingReplies}
                fetchRepliesToReply={fetchRepliesToReply}
                movieId={movieId}
                setError={setError}
              />
            ))}
          </div>
        )}
      </div>
    );
  };
  export default ReplyItem;