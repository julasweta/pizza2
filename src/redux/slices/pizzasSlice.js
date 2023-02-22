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
    //записуємо всі піци з бази даних
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
 //видаляємо окрему піцу
    deleteItem: (state, action) => {
      state.totalPrice = state.totalPrice - action.payload[2];
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

    //видаляємо всі піци
    deleteAll: (state, action) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },

    setTotalPrice: (state, action) => {
      state.totalPrice = state.totalPrice + action.payload;
    },

    setTotalCount: (state, action) => {
      state.totalCount = state.totalCount + action.payload;
    },
  },
});


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
