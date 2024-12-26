import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  currentPage: 1,
};

const CardSlice = createSlice({
  name: "CardData",
  initialState,
  reducers: {
    FetchCardList: (state, action) => {
      state.value = action.payload;
    },

    RemoveCard: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },

    setpage: (state, action) => {
      state.currentPage = action.payload; 
    },
  },
});
export const { FetchCardList, RemoveCard, setpage } = CardSlice.actions;
export default CardSlice.reducer;
