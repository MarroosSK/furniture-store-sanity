import { configureStore } from "@reduxjs/toolkit";
import eshopSlice from "./eshopSlice";
import wishlistSlice from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    eshop: eshopSlice,
    wishlist: wishlistSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
