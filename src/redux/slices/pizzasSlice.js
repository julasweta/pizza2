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
    //записуємо піци в кошик
    setItem: (state, action) => {
      const itemFind = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.sizes === action.payload.sizes
      );
      if (itemFind) {
        itemFind.count++;
      } else {
        state.items.push(action.payload);
      }
    },

    deleteItem: (state, action) => {
      state.totalPrice = state.totalPrice - action.payload[0].price;
      state.totalCount = state.totalCount - 1;
      const itemFind = state.items.find(
        (obj) =>
          obj.id === action.payload[0].id && obj.sizes === action.payload[1]
      );
      if (itemFind.count>1) {
        itemFind.count--;
      }else{
        state.items = state.items.filter(obj => obj.sizes != action.payload[1]  || obj.id != action.payload[0].id  )
      }
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
  deleteAll,
  setTotalPrice,
  setTotalCount,
} = pizzasSlice.actions;

export default pizzasSlice.reducer;
