"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLeads } from "@/hooks/use-leads"
import type { Lead } from "@/types" // Importar a interface Lead

interface CRMContextType {
  leads: Lead[]
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void
  removeLead: (id: string) => void
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function CRMProvider({ children }: { children: ReactNode }) {
  const { leads, addLead, removeLead } = useLeads()

  return <CRMContext.Provider value={{ leads, addLead, removeLead }}>{children}</CRMContext.Provider>
}

export function useCRMContext() {
  const context = useContext(CRMContext)
  if (context === undefined) {
    throw new Error("useCRMContext must be used within a CRMProvider")
  }
  return context
}
