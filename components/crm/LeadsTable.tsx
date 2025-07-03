"use client"

import type React from "react"
import { useState } from "react"
import { Search, Edit, Phone, Mail, Eye } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Definir interface para Lead
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

interface LeadsTableProps {
  leadsList: Lead[]
  updateLeadStatus: (leadId: number, newStatus: string) => void
  notification: string
  setNotification: (message: string) => void
}

export function LeadsTable({ leadsList, updateLeadStatus, notification, setNotification }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sourceFilter, setSourceFilter] = useState("")
  const [temperaturaFilter, setTemperaturaFilter] = useState("")

  const [showLeadModal, setShowLeadModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [actionType, setActionType] = useState<"view" | "edit" | "call" | "email" | "">("")

  const [leadFormData, setLeadFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    fonte: "",
    tipoInteresse: "",
    temperatura: "",
    orcamento: "",
    observacoes: "",
  })

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead)
    setActionType("view")
    setShowLeadModal(true)
  }

  const handleCallLead = (lead: Lead) => {
    setSelectedLead(lead)
    setActionType("call")
    setShowLeadModal(true)
  }

  const handleEmailLead = (lead: Lead) => {
    setSelectedLead(lead)
    setActionType("email")
    setShowLeadModal(true)
  }

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead)
    setLeadFormData({
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      fonte: lead.fonte,
      tipoInteresse: lead.tipoInteresse,
      temperatura: lead.temperatura,
      orcamento: lead.orcamento.toString(),
      observacoes: lead.observacoes || "",
    })
    setActionType("edit")
    setShowLeadModal(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLeadFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateLead = () => {
    if (selectedLead && leadFormData.nome && leadFormData.email) {
      const updatedLead = {
        ...selectedLead,
        nome: leadFormData.nome,
        email: leadFormData.email,
        telefone: leadFormData.telefone,
        fonte: leadFormData.fonte,
        tipoInteresse: leadFormData.tipoInteresse,
        temperatura: leadFormData.temperatura,
        orcamento: Number.parseFloat(leadFormData.orcamento.replace(/[^0-9.]/g, "")) || 0,
        observacoes: leadFormData.observacoes,
      }
      // This would typically call a prop function to update the parent's leadsList
      // For now, we'll just log and close the modal
      console.log("Updated Lead:", updatedLead)
      setNotification(`Lead ${updatedLead.nome} atualizado com sucesso!`)
      setShowLeadModal(false)
      setTimeout(() => setNotification(""), 3000)
    }
  }

  const filteredLeads = leadsList.filter((lead) => {
    const matchesSearch =
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || lead.status === statusFilter
    const matchesSource = sourceFilter === "" || lead.fonte === sourceFilter
    const matchesTemperatura = temperaturaFilter === "" || lead.temperatura === temperaturaFilter
    return matchesSearch && matchesStatus && matchesSource && matchesTemperatura
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar leads..."
            className="w-full rounded-2xl pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Todos os Status</option>
            <option value="Novo">Novo</option>
            <option value="Qualificado">Qualificado</option>
            <option value="Proposta">Proposta</option>
            <option value="Negociação">Negociação</option>
            <option value="Fechado">Fechado</option>
            <option value="Descartado">Descartado</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Todas as Fontes</option>
            <option value="Site">Site</option>
            <option value="Google">Google</option>
            <option value="Instagram">Instagram</option>
            <option value="Recomendacao">Recomendação</option>
          </select>

          <select
            value={temperaturaFilter}
            onChange={(e) => setTemperaturaFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Todas as Qualificações</option>
            <option value="Quente">🔥 Quente</option>
            <option value="Morno">🌡️ Morno</option>
            <option value="Frio">❄️ Frio</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {filteredLeads.length} de {leadsList.length} leads
        </p>
        {(searchTerm || statusFilter || sourceFilter || temperaturaFilter) && (
          <button
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("")
              setSourceFilter("")
              setTemperaturaFilter("")
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <div>
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[15%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="w-[15%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="w-[12%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="w-[10%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fonte
              </th>
              <th className="w-[12%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Interesse
              </th>
              <th className="w-[10%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                QUALIFICAÇÃO
              </th>
              <th className="w-[12%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orçamento
              </th>
              <th className="w-[10%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="w-[4%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.nome}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.telefone}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.fonte}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.tipoInteresse}</td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.temperatura === "Quente"
                        ? "bg-red-100 text-red-800"
                        : lead.temperatura === "Morno"
                          ? "bg-yellow-100 text-yellow-800"
                          : lead.temperatura === "Frio"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {lead.temperatura === "Quente"
                      ? "🔥 Quente"
                      : lead.temperatura === "Morno"
                        ? "🌡️ Morno"
                        : lead.temperatura === "Frio"
                          ? "❄️ Frio"
                          : "Não definido"}
                  </span>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lead.orcamento.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-none focus:ring-2 focus:ring-blue-500 ${
                      lead.status === "Novo"
                        ? "bg-blue-100 text-blue-800"
                        : lead.status === "Qualificado"
                          ? "bg-green-100 text-green-800"
                          : lead.status === "Proposta"
                            ? "bg-yellow-100 text-yellow-800"
                            : lead.status === "Negociação"
                              ? "bg-orange-100 text-orange-800"
                              : lead.status === "Fechado"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <option value="Novo">Novo</option>
                    <option value="Qualificado">Qualificado</option>
                    <option value="Proposta">Proposta</option>
                    <option value="Negociação">Negociação</option>
                    <option value="Fechado">Fechado</option>
                    <option value="Descartado">Descartado</option>
                  </select>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.data}</td>
                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewLead(lead)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-800"
                      onClick={() => handleEditLead(lead)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-800"
                      onClick={() => handleCallLead(lead)}
                    >
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Ligar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-purple-600 hover:text-purple-800"
                      onClick={() => handleEmailLead(lead)}
                    >
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {actionType === "view"
                  ? "Detalhes do Lead"
                  : actionType === "edit"
                    ? "Editar Lead"
                    : actionType === "call"
                      ? "Ligar para Lead"
                      : "Enviar Email"}
              </h3>
              <button onClick={() => setShowLeadModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {actionType === "view" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Nome</Label>
                    <p className="text-gray-900">{selectedLead.nome}</p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Email</Label>
                    <p className="text-gray-900">{selectedLead.email}</p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Telefone</Label>
                    <p className="text-gray-900">{selectedLead.telefone}</p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Fonte</Label>
                    <p className="text-gray-900">{selectedLead.fonte}</p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Tipo de Interesse</Label>
                    <p className="text-gray-900">{selectedLead.tipoInteresse}</p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Status</Label>
                    <p className="text-gray-900">{selectedLead.status}</p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Orçamento</Label>
                    <p className="text-gray-900">
                      {selectedLead.orcamento.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Data</Label>
                    <p className="text-gray-900">{selectedLead.data}</p>
                  </div>
                </div>
                {selectedLead.observacoes && (
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">Observações</Label>
                    <p className="text-gray-900">{selectedLead.observacoes}</p>
                  </div>
                )}
              </div>
            )}

            {actionType === "edit" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Nome *</Label>
                    <Input
                      type="text"
                      name="nome"
                      value={leadFormData.nome}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={leadFormData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Telefone</Label>
                    <Input
                      type="tel"
                      name="telefone"
                      value={leadFormData.telefone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Fonte</Label>
                    <select
                      name="fonte"
                      value={leadFormData.fonte}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Selecione a fonte</option>
                      <option value="Site">Site</option>
                      <option value="Google">Google</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Recomendacao">Recomendação</option>
                      <option value="Indicação">Indicação</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Interesse</Label>
                    <select
                      name="tipoInteresse"
                      value={leadFormData.tipoInteresse}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="Curta Temporada">Curta Temporada</option>
                      <option value="Longa Temporada">Longa Temporada</option>
                      <option value="Morar">Morar</option>
                      <option value="Investimento">Investimento</option>
                    </select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Qualificação</Label>
                    <select
                      name="temperatura"
                      value={leadFormData.temperatura}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Selecione a qualificação</option>
                      <option value="Quente">🔥 Quente</option>
                      <option value="Morno">🌡️ Morno</option>
                      <option value="Frio">❄️ Frio</option>
                    </select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Orçamento</Label>
                    <Input
                      type="text"
                      name="orcamento"
                      value={leadFormData.orcamento}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Observações</Label>
                  <Textarea
                    name="observacoes"
                    value={leadFormData.observacoes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {actionType === "call" && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Informações para Ligação</h4>
                  <p>
                    <strong>Nome:</strong> {selectedLead.nome}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {selectedLead.telefone}
                  </p>
                  <p>
                    <strong>Interesse:</strong> {selectedLead.tipoInteresse}
                  </p>
                  <p>
                    <strong>Orçamento:</strong>{" "}
                    {selectedLead.orcamento.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Notas da Ligação</Label>
                  <Textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Anote aqui os pontos importantes da conversa..."
                  />
                </div>
              </div>
            )}

            {actionType === "email" && (
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Para</Label>
                  <Input
                    type="email"
                    value={selectedLead.email}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Assunto</Label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Assunto do email"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</Label>
                  <Textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Olá ${selectedLead.nome},\n\nEspero que esteja bem. Gostaria de dar continuidade à nossa conversa sobre ${selectedLead.tipoInteresse}...\n\nAguardo seu retorno.\n\nAtenciosamente,\n[Seu Nome]`}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setShowLeadModal(false)} variant="outline">
                {actionType === "view" ? "Fechar" : "Cancelar"}
              </Button>
              {actionType === "edit" && <Button onClick={handleUpdateLead}>Salvar Alterações</Button>}
              {actionType === "call" && <Button>Salvar Notas</Button>}
              {actionType === "email" && <Button>Enviar Email</Button>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
