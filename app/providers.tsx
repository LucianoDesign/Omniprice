"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode; // ReactNode represents any node that could be rendered in React, including numbers, strings, elements, or an array (or fragment) containing these types.
  }

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
          {children}
    </NextUIProvider>
  );
}
