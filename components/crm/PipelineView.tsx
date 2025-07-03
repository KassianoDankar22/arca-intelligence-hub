"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Definir interface para Lead (copiado de creative.tsx para auto-suficiência do componente)
interface Lead {
  id: number
  nome: string
  email: string
  telefone: string
  fonte: string
  tipoInteresse: string
  orcamento: number
  status: string
  temperatura: string
  data: string
  observacoes?: string
}

interface PipelineViewProps {
  leadsList: Lead[]
  updateLeadStatus: (leadId: number, newStatus: string) => void
  // handleViewLead: (lead: Lead) => void; // Removed as per instruction to not touch existing functionality
  // handleEditLead: (lead: Lead) => void; // Removed as per instruction to not touch existing functionality
}

export function PipelineView({ leadsList, updateLeadStatus }: PipelineViewProps) {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState("")

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, lead: Lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnStatus: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(columnStatus)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
    e.preventDefault()
    if (draggedLead && draggedLead.status !== newStatus) {
      updateLeadStatus(draggedLead.id, newStatus)
    }
    setDraggedLead(null)
    setDragOverColumn("")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOverColumn("")
  }

  const pipelineStatuses = ["Novo", "Qualificado", "Proposta", "Negociação", "Fechado"]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Pipeline de Vendas Visual</h3>
        <div className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-medium">
            $
            {leadsList
              .filter((l) => l.status === "Qualificado" || l.status === "Proposta" || l.status === "Negociação")
              .reduce((sum, lead) => sum + lead.orcamento, 0)
              .toLocaleString()}
          </span>{" "}
          em negociações
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {pipelineStatuses.map((status) => (
          <div
            key={status}
            className={cn(
              "rounded-lg p-4",
              status === "Novo" && "bg-gray-50",
              status === "Qualificado" && "bg-blue-50",
              status === "Proposta" && "bg-yellow-50",
              status === "Negociação" && "bg-orange-50",
              status === "Fechado" && "bg-green-50",
              dragOverColumn === status ? "ring-2 ring-offset-2 ring-blue-500" : "",
            )}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4
                className={cn(
                  "font-medium",
                  status === "Novo" && "text-gray-900",
                  status === "Qualificado" && "text-blue-900",
                  status === "Proposta" && "text-yellow-900",
                  status === "Negociação" && "text-orange-900",
                  status === "Fechado" && "text-green-900",
                )}
              >
                {status === "Novo" && "Novos"}
                {status === "Qualificado" && "Qualificados"}
                {status === "Proposta" && "Proposta"}
                {status === "Negociação" && "Negociação"}
                {status === "Fechado" && "Fechado"}
              </h4>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  status === "Novo" && "bg-gray-200 text-gray-700",
                  status === "Qualificado" && "bg-blue-200 text-blue-700",
                  status === "Proposta" && "bg-yellow-200 text-yellow-700",
                  status === "Negociação" && "bg-orange-200 text-orange-700",
                  status === "Fechado" && "bg-green-200 text-green-700",
                )}
              >
                {leadsList.filter((l) => l.status === status).length}
              </span>
            </div>
            <div className="space-y-3">
              {leadsList
                .filter((l) => l.status === status)
                .map((lead) => (
                  <div
                    key={lead.id}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, lead)}
                    className={cn(
                      "bg-white p-3 rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow",
                      status === "Novo" && "border-gray-200",
                      status === "Qualificado" && "border-blue-200",
                      status === "Proposta" && "border-yellow-200",
                      status === "Negociação" && "border-orange-200",
                      status === "Fechado" && "border-green-200",
                    )}
                  >
                    <div className="mb-2 flex items-center">
                      <span
                        className={cn(
                          "mr-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                          status === "Novo" && "bg-blue-100 text-blue-600",
                          status === "Qualificado" && "bg-blue-100 text-blue-600",
                          status === "Proposta" && "bg-green-100 text-green-600",
                          status === "Negociação" && "bg-purple-100 text-purple-600",
                          status === "Fechado" && "bg-purple-100 text-purple-600",
                        )}
                      >
                        {lead.nome.charAt(0).toUpperCase()}
                        {lead.nome.split(" ").length > 1 ? lead.nome.split(" ")[1].charAt(0).toUpperCase() : ""}
                      </span>
                      <span className="text-sm font-medium">{lead.nome}</span>
                    </div>
                    <p className="mb-2 text-xs text-gray-500">{lead.tipoInteresse}</p>
                    <p className="text-sm font-semibold text-green-600">
                      {lead.orcamento.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    {lead.observacoes && (
                      <div
                        className={cn(
                          "mt-2 text-xs",
                          status === "Novo" && "text-gray-600",
                          status === "Qualificado" && "text-blue-600",
                          status === "Proposta" && "text-yellow-600",
                          status === "Negociação" && "text-orange-600",
                          status === "Fechado" && "text-green-600",
                        )}
                      >
                        {lead.observacoes}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Taxa de Conversão</div>
          <div className="text-2xl font-bold text-green-600">20%</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Tempo Médio</div>
          <div className="text-2xl font-bold text-blue-600">15 dias</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Ticket Médio</div>
          <div className="text-2xl font-bold text-purple-600">$390K</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Meta Mensal</div>
          <div className="text-2xl font-bold text-orange-600">$2.5M</div>
        </div>
      </div>
    </div>
  )
}
