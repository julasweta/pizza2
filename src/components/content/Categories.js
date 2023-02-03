import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../../redux/slices/filterSlice";
import { setSearchValue } from "../../redux/slices/filterSlice";

function Categories({ arrCategories, page, setPage }) {

const categories = useSelector((state) => state.filter.categories);
const dispatch = useDispatch();

  const onActive = (item) => {
    dispatch(setSearchValue(""));
    dispatch(setCategories(item));
    setPage((page = 1));
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
