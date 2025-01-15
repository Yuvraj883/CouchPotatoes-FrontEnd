import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // Call the parent component's page change handler
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mx-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      
      {/* Display page numbers */}
      <span className="px-4 py-2 text-lg">
        {currentPage} / {totalPages}
      </span>

      <button
        className="px-4 py-2 mx-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
