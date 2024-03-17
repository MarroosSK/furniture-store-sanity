"use client";

import { FilterContextProvider } from "@/context/filter-context";
import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <FilterContextProvider>{children}</FilterContextProvider>
    </Provider>
  );
};

export default Layout;
