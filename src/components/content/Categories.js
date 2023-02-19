import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../../redux/slices/filterSlice";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { setPage } from "../../redux/slices/paginationSlice";

function Categories({ arrCategories }) {
  const {categories, sort} = useSelector((state) => state.filter);

  const { page } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();



  const onActive = (item) => {
    dispatch(setSearchValue(""));
    dispatch(setCategories(item));
    dispatch(setPage( 1));
  };

  return (
    <div className="categories">
      <ul>
        {arrCategories.map((item, index) => (
          <li
            className={categories === item ? "active" : ""}
            onClick={() => onActive(item)}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
