import React, { useState, useEffect } from "react";

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments for the movie
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/comments/${movieId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        console.log(data?.data?.comments);
        setComments(data.data.comments); // Adjust to match API response
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch comments at this time.");
        setLoading(false);
      }
    };

    if (movieId) fetchComments();
  }, [movieId]);

  // Handle new comment submission
  const handleAddComment = async () => {
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newComment,
          name: authorName,
          email: authorEmail,
          movie_id: movieId, // Ensure the movie_id is sent
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const addedComment = await response.json();
      setComments([...comments, addedComment.data]); // Adjust to match API response
      setNewComment("");
      setAuthorName("");
      setAuthorEmail("");
      setError("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Unable to add comment at this time.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Comments</h3>

      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="my-4">
        <input
          className="w-full p-2 mb-2 border rounded-md"
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border rounded-md"
          placeholder="Your email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          Submit
        </button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="p-3 border rounded-md bg-gray-100">
              <p className="text-sm text-gray-800">{comment.text}</p>
              <span className="text-xs text-gray-500">
                - {comment.name || "Anonymous"}
              </span>
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
