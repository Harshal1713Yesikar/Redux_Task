import { configureStore } from "@reduxjs/toolkit";
import CardSlice from "./Action/Card";  

const store = configureStore({
  reducer: {
    finalCardList: CardSlice,  
  },
});

export default store;
