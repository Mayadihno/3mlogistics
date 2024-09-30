"use client";

import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./Spinner";
import { persistor, store } from "@/redux/store";
import FirstHeader from "@/components/header/FirstHeader";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div>
            <Spinner />
          </div>
        }
        persistor={persistor}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <FirstHeader />
        <Navbar />
        {children}
        <Footer />
      </PersistGate>
    </Provider>
  );
};

export default Providers;
