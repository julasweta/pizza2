import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: (function () {
    const browserText = window.location.search;
    if (browserText) {
      let stringToArray = browserText
        .substring(1, browserText.length)
        .split("=");
      return stringToArray[0];
    } else {
      return 1;
    }
  })(),
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { setPage } = paginationSlice.actions;

export default paginationSlice.reducer;
