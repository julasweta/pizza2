import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  activeSize: [0],
  activeType: 0,
  items: [],
  totalPrice: 0,
  totalCount: 0,
  
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizas: (state, action) => {
      state.pizzas = action.payload;
    },
    setActiveSize: (state, action) => {
      state.activeSize = action.payload;
    },
    setActiveType: (state, action) => {
      state.activeSize = action.payload;
    },
    setItem: (state, action) => {
      const itemFind = state.items.find(
        (obj) => obj.id === action.payload.id && obj.sizes === action.payload.sizes
      );

      if (itemFind) {
        itemFind.count++;
      } else {
        state.items.push(action.payload);
      }

      /* const pizzaFindAdd = state.pizzas.find((obj) =>
        obj.name === action.payload.title
      );
       if (pizzaFindAdd) {
         pizzaFindAdd.count++;
       } */

    },
    deleteItem: (state, action) => {
      state.totalPrice = state.totalPrice - action.payload.price;
      state.totalCount = state.totalCount - 1;
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id || item.sizes !== action.payload.sizes
      );
      const itemFind = state.items.find((obj) => obj.id === action.payload.id);
      if (itemFind) {
        itemFind.count--;
      }
      const pizzaFind = state.pizzas.find(
        (obj) => obj.id === action.payload.id
      );
      pizzaFind.count--;
    },
    deleteAll: (state, action) => {
      state.items = [];
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = state.totalPrice + action.payload.price;
    },
    setTotalCount: (state, action) => {
      state.totalCount = state.totalCount + action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPizas,
  setActiveSize,
  setActiveType,
  setItem,
  deleteItem,
  setTotalPrice,
  setTotalCount,
} = pizzasSlice.actions;

export default pizzasSlice.reducer;
