"use client"

import { useState, useCallback } from "react"
import type { Lead } from "@/types/crm"

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])

  const addLead = useCallback((newLead: Omit<Lead, "id" | "createdAt">) => {
    const id = crypto.randomUUID() // Generate a unique ID
    const createdAt = new Date()
    setLeads((prevLeads) => [...prevLeads, { id, createdAt, ...newLead }])
  }, [])

  const removeLead = useCallback((leadId: string) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId))
  }, [])

  return { leads, addLead, removeLead }
}
