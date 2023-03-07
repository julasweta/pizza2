import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../../redux/slices/filterSlice";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { setPage } from "../../redux/slices/paginationSlice";

function Categories({ arrCategories }) {
  const {categories, sort} = useSelector((state) => state.filter);

  const dispatch = useDispatch();

console.log(categories);

  const onActive = (item) => {
    const returnUa = () =>{
      if(item === "Vsi")
      {return "Всі"}
      if(item === "Close")
      {return "Закриті"}
      if(item === "Gril")
      {return "Гриль"}
      if(item === "Vega")
      {return "Вегетаріанські"}
      if(item === "Hot")
      {return "Гострі"}
      if(item === "Meat")
      {return "Мясні"}
      else{
        return item
      }
    }
    dispatch(setSearchValue(""));
    dispatch(setCategories(returnUa()));
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
