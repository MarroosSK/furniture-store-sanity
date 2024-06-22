import { StoreProductProps } from "@/types/types";
import { getFromLocalStorage } from "@/utils/getLocalStorage";
import { createSlice } from "@reduxjs/toolkit";

interface StoreState {
  productData: StoreProductProps[];
}

const initialState: StoreState = {
  productData: getFromLocalStorage("cartData")
    ? JSON.parse(getFromLocalStorage("cartData") || "{}")
    : [],
};

export const eshopSlice = createSlice({
  name: "eshop",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.productData.findIndex(
        (item: any) => item._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        // if product exist, add +1
        const existingProduct = state.productData[existingProductIndex];
        if (existingProduct.myQuantity < action.payload.quantity) {
          // check limit of products
          existingProduct.myQuantity += 1;
        }
      } else {
        // if product isn't in cart, add +1
        state.productData.push({ ...action.payload, myQuantity: 1 });
      }
      //localStorage
      localStorage.setItem(
        "cartData",
        JSON.stringify(state.productData.map((item) => item))
      );
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: any) => item._id === action.payload._id
      );

      if (existingProduct) {
        // check if product reached maximum
        if (existingProduct.myQuantity < action.payload.quantity) {
          existingProduct.myQuantity++;
        }
      }
      //localStorage
      localStorage.setItem(
        "cartData",
        JSON.stringify(state.productData.map((item) => item))
      );
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: any) => item._id === action.payload._id
      );
      if (existingProduct?.myQuantity === 1) {
        existingProduct.myQuantity === 1;
      } else {
        existingProduct && existingProduct.myQuantity--;
      }
      //localStorage
      localStorage.setItem(
        "cartData",
        JSON.stringify(state.productData.map((item) => item))
      );
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
      //localStorage
      localStorage.setItem(
        "cartData",
        JSON.stringify(state.productData.map((item) => item))
      );
    },
    resetCart: (state) => {
      state.productData = [];
      //localStorage
      localStorage.setItem(
        "cartData",
        JSON.stringify((state.productData = []))
      );
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = eshopSlice.actions;
export default eshopSlice.reducer;
