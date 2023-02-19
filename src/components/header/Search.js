import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue,setCategories} from "../../redux/slices/filterSlice";

function Search() {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();

  const onClickClearFocus = () => {
    dispatch(setSearchValue(""));
    inputRef.current.focus()
  }

  const inputRef = useRef();



  const onSearsh = (e) => {
    dispatch(setSearchValue(e.target.value));

      dispatch(setCategories("Всі"));
  }

  return (
    <div className="header__search">
      <i className="fa fa-search"></i>
      <input
        type="btn__search"
        id="site-search"
        name="search"
        placeholder="пошук піци..."
        onChange={(e) => onSearsh(e)}
        value={searchValue}
        ref={inputRef}
      ></input>
      {searchValue && (
        <i
          className="fa fa-close"
          onClick={onClickClearFocus}
        ></i>
      )}
    </div>
  );
}

export default Search;
