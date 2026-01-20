"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProgress } from "@/lib/hooks/useProgress";

type ProgressContextType = ReturnType<typeof useProgress>;

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progressValue = useProgress();

  return (
    <ProgressContext.Provider value={progressValue}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgressContext must be used within a ProgressProvider");
  }
  return context;
}
