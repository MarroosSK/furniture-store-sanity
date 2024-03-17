import { ProductProps, StoreProductProps } from "@/types/types";
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
        // Ak produkt existuje v košíku, zvýšte množstvo produktu o 1
        const existingProduct = state.productData[existingProductIndex];
        if (existingProduct.myQuantity < action.payload.quantity) {
          // Kontrola prekročenia maximálneho počtu kusov
          existingProduct.myQuantity += 1;
        }
      } else {
        // Ak produkt nie je v košíku, pridajte nový produkt s množstvom 1
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
        // Kontrola, či existujúci produkt nie je už na maximum
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
