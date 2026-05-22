"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PortfolioData, defaultPortfolioData } from "../data/defaultData";

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  updateData: (newData: PortfolioData) => void;
  refetch: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Failed to load portfolio dynamic configurations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Set up real-time postMessage listener for split-screen live preview customizer edits
  useEffect(() => {
    const handlePreviewMessages = (event: MessageEvent) => {
      if (event.data && event.data.type === "PORTFOLIO_PREVIEW_UPDATE") {
        setData(event.data.payload);
      }
    };

    window.addEventListener("message", handlePreviewMessages);
    return () => window.removeEventListener("message", handlePreviewMessages);
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, updateData, refetch: fetchPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
