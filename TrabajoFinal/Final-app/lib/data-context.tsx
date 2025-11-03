"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { ClusterData } from "./data-processor"

interface DataContextType {
  clusters: Record<string, ClusterData> | null
  setClusters: (clusters: Record<string, ClusterData> | null) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [clusters, setClusters] = useState<Record<string, ClusterData> | null>(null)

  return <DataContext.Provider value={{ clusters, setClusters }}>{children}</DataContext.Provider>
}

export function useDataContext() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useDataContext must be used within DataProvider")
  }
  return context
}
