import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../redux/slices/paginationSlice";

function Pagination({ pages }) {
  const { page } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        <button
          className="btn__pagination fa"
          onClick={() => page > 1 && dispatch(setPage(page - 1))}
        >
          &#8592;
        </button>
        {pages.map((item, index) => (
          <button
            className="btn__pagination"
            onClick={() => dispatch(setPage(item))}
            key={index}
          >
            {item}
          </button>
        ))}
        <button
          className="btn__pagination fa "
          onClick={() =>
            page < pages.length - 1 + 1 && dispatch(setPage(page + 1))
          }
        >
          &#8594;
        </button>
      </ul>
    </div>
  );
}

export default Pagination;
