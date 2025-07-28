import React from 'react'

const PageNav = ({currentPage,totalPages,incrementer}) => {
  return ( 
    <div>
        
        <div className="flex justify-center gap-2 mt-15 mx-auto mb-10">
          <button
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={() => incrementer((prev) => prev - 1)}
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={() => incrementer((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      
    </div>
  )
}

export default PageNav
