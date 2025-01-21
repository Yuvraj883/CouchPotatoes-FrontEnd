import React, { useState, useEffect } from "react";

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // New comment text
  const [newReply, setNewReply] = useState(""); // New reply text
  const [loadingComments, setLoadingComments] = useState(false); // Loading state for comments
  const [loadingReplies, setLoadingReplies] = useState({}); // Track loading state for replies
  const [error, setError] = useState(""); // Error handling
  const [replyingToCommentId, setReplyingToCommentId] = useState(null); // Track which comment the user is replying to

  // Fetch comments for the movie
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const response = await fetch(`http://localhost:8000/comments/${movieId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data.data.comments || []);
        setLoadingComments(false);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch comments at this time.");
        setLoadingComments(false);
      }
    };

    if (movieId) fetchComments();
  }, [movieId]);

  // Function to fetch replies for a specific comment
  const fetchReplies = async (commentId) => {
    try {
      // Set loading state for the specific comment
      setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
  
      // Fetch replies from the backend
      const response = await fetch(`http://localhost:8000/comments/replies/${commentId}`);
      console.log("Response object:", response);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch replies: ${response.statusText}`);
      }
  
      // Parse the response JSON
      const data = await response.json();
      console.log("Parsed response data:", data);
  
      // Update the state with fetched replies
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: data.data || [] } // Update to match backend response structure
            : comment
        )
      );
  
      // Reset loading state for the specific comment
      setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
    } catch (err) {
      console.error("Error fetching replies:", err);
      setError("Unable to fetch replies at this time.");
      setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
    }
  };
  
  // Handle new comment submission
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("You must be logged in to post a comment.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          text: newComment,
          movie_id: movieId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const addedComment = await response.json();
      setComments([addedComment.data, ...comments]);
      setNewComment(""); // Reset the new comment input
      setError(""); // Clear any error
    } catch (err) {
      console.error(err);
      setError("Unable to add comment at this time.");
    }
  };

  // Handle new reply submission
  const handleAddReply = async (commentId) => {
    if (!newReply.trim()) {
      setError("Reply cannot be empty.");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("You must be logged in to post a reply.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/comments/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          text: newReply,
          comment_id: commentId,
          movie_id: movieId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add reply");
      }

      const addedReply = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [...(comment.replies || []), addedReply.data] }
            : comment
        )
      );
      setNewReply(""); // Reset the new reply input
      setReplyingToCommentId(null); // Reset the replying state
      setError(""); // Clear any error
    } catch (err) {
      console.error(err);
      setError("Unable to add reply at this time.");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Comments</h3>

      {loadingComments && <p className="text-gray-500">Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Post Comment Section */}
      <div className="my-4">
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="p-3 border rounded-md bg-gray-100">
              <p className="text-sm text-gray-800">{comment.text}</p>
              <span className="text-xs text-gray-500">
                - {comment.name || "Anonymous"}
              </span>

              {/* Reply Button */}
              {replyingToCommentId === comment._id ? (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="Add a reply..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
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
                  className="mt-2 text-sm text-blue-500"
                >
                  Reply
                </button>
              )}

              {/* Show "Show Replies" Button */}
              {!comment.replies && !loadingReplies[comment._id] && (
                <button
                  onClick={() => fetchReplies(comment._id)}
                  className="mt-2 text-sm text-blue-500"
                >
                  Show Replies
                </button>
              )}

              {/* Display Replies if fetched */}
              {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                <div className="mt-4 space-y-2 pl-6">
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="border-l-2 pl-4 text-sm">
                      <p className="text-gray-800">{reply.text}</p>
                      <span className="text-xs text-gray-500">
                        - {reply.name || "Anonymous"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
