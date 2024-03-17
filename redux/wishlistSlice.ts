import { ProductProps, StoreProductProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

//get localStorageData
const items =
  localStorage.getItem("wishlistData") !== null
    ? JSON.parse(localStorage.getItem("wishlistData") as string)
    : [];

interface StoreState {
  productData: StoreProductProps[];
}

const initialState: StoreState = {
  productData: items,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingProductIndex = state.productData.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex === -1) {
        //if product is not on wishlist, add it
        state.productData.push(action.payload);
      }
      //localStorage
      localStorage.setItem(
        "wishlistData",
        JSON.stringify(state.productData.map((item) => item))
      );
    },
    deleteFromWishlist: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload._id
      );
      //localStorage
      localStorage.setItem(
        "wishlistData",
        JSON.stringify(state.productData.map((item) => item))
      );
    },
    resetWishlist: (state) => {
      state.productData = [];

      //localStorage
      localStorage.setItem(
        "wishlistData",
        JSON.stringify((state.productData = []))
      );
    },
  },
});

export const { addToWishlist, deleteFromWishlist, resetWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
