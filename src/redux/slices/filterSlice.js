import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: (function () {
    const browserText = window.location.search;
    if (browserText) {
      let stringToArray = browserText
        .substring(1, browserText.length)
        .split("=");
      return stringToArray[2];
    } else {
      return "rating";
    }
  })(),

  categories: (function () {
    const browserText = window.location.search;
    if (browserText) {
      let stringToArray = browserText
        .substring(1, browserText.length)
        .split("=");
      if (stringToArray[1] === "Vsi") {
        return "Всі" ;
      }
      if (stringToArray[1] === "Meat") {
        return "Мясні" ;
      }
      if (stringToArray[1] === "Vega") {
        return "Вегетаріанські" ;
      }
      if (stringToArray[1] === "Hot") {
        return "Гострі" ;
      }
      if (stringToArray[1] === "Close") {
        return "Закриті" ;
      }
      if (stringToArray[1] === "Gril") {
        return "Гриль" ;
      } else {
        return "";
      }
    } else {
      return "Всі" ;
    }
  })(),

  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSort, setCategories, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
