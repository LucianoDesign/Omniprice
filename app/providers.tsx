"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
interface ProvidersProps {
  children: ReactNode; // ReactNode represents any node that could be rendered in React, including numbers, strings, elements, or an array (or fragment) containing these types.
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
}
