import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "rating",
  categories: "Всі",
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
