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
       return "rating"
     }
}()),
  categories: (function () {
     const browserText = window.location.search;
     if (browserText) {
       let stringToArray = browserText
         .substring(1, browserText.length)
         .split("=");

       if (stringToArray[1] === "vsi") {
         return "Всі";
       }
       if (stringToArray[1] === "meat") {
         return "Мясні";
       }
       if (stringToArray[1] === "vega") {
         return "Вегетаріанські";
       }
       if (stringToArray[1] === "hot") {
         return "Гострі";
       }
       if (stringToArray[1] === "close") {
         return "Закриті";
       } else {
         return "";
       }
     } else {
       return "";
     }
}())

  ,
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

 