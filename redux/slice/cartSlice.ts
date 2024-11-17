import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface CartItem {
  _id: string;
  name: string;
  image: string | StaticImageData;
  price: number;
  discountPrice?: number;
  category?: string;
  stock?: string;
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
    },
    updateCartItemQty: (
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item) {
        item.qty = qty;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateCartItemQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
