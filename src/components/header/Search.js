import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

function Search() {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();

  return (
    <div className="header__search">
      <i className="fa fa-search"></i>
      <input
        type="btn__search"
        id="site-search"
        name="search"
        placeholder="пошук піци..."
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        value={searchValue}
      ></input>
      {searchValue && (
        <i
          className="fa fa-close"
          onClick={() => dispatch(setSearchValue(""))}
        ></i>
      )}
    </div>
  );
}

export default Search;
