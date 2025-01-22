import React, { useState } from 'react';

const CommentsComponent = ({ comments }) => {
  const [visibleComments, setVisibleComments] = useState(5);

  const handleViewMore = () => {
    setVisibleComments(prev => prev + 5);
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.slice(0, visibleComments).map(comment => (
        <div key={comment._id} style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
          <p>
            <strong>{comment.name}</strong> ({new Date(comment.date).toLocaleDateString()})
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
      {visibleComments < comments.length && (
        <button onClick={handleViewMore} style={{ marginTop: '16px', padding: '8px 16px' }}>
          View More
        </button>
      )}
    </div>
  );
};

export default CommentsComponent;
