import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import paginationReducer from "./slices/paginationSlice";
import pizzasReducer from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pagination: paginationReducer,
    pizzas: pizzasReducer,
  },
});
