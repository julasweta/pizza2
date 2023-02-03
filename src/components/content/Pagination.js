import React from 'react'

function Pagination({ pages, setPage, page }) {


  return (
    <div>
      <ul>
        <button
          className="btn__pagination fa"
          onClick={() => page > 1 && setPage(page - 1)}
        >
          &#8592;
        </button>
        {pages.map((item, index) => (
          <button
            className="btn__pagination"
            onClick={() => setPage(item)}
            key={index}
          >
            {item}
          </button>
        ))}
        <button
          className="btn__pagination fa "
          onClick={() => page < pages.length - 1 + 1 && setPage(page + 1)}
        >
          &#8594;
        </button>
      </ul>
    </div>
  );
}

export default Pagination;
