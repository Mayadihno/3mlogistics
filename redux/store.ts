"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

import { setupListeners } from "@reduxjs/toolkit/query/react";
import cartSlice from "./slice/cartSlice";
import userApi from "./rtk/createUser";
import userSlice from "./slice/userSlice";
import orderApi from "./rtk/orderSlice";
import categoryApi from "./rtk/category";
import productApi from "./rtk/product";
import userProductApi from "./rtk/user";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "order", "user"],
  blacklist: [""],
};

const rootReducers = combineReducers({
  cart: cartSlice,
  user: userSlice,
  [userApi.reducerPath]: userApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [userProductApi.reducerPath]: userProductApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userApi.middleware,
      orderApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      userProductApi.middleware
    ),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
