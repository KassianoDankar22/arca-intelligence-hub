"use client"

import { useState } from "react"
import { Search, Filter, Phone, Mail, Eye, Edit, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Importar constantes
import {
  STATUS_LEADS,
  TEMPERATURAS_LEADS,
  FONTES_LEADS,
  CORES_STATUS,
  CORES_TEMPERATURA,
  EMOJIS_TEMPERATURA,
} from "@/constants"

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
  const [termoPesquisa, setTermoPesquisa] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("all")
  const [filtroFonte, setFiltroFonte] = useState("all")
  const [filtroTemperatura, setFiltroTemperatura] = useState("all")

  // Função para filtrar leads
  const filtrarLeads = () => {
    return leadsList.filter((lead) => {
      const correspondeNome = lead.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
      const correspondeEmail = lead.email.toLowerCase().includes(termoPesquisa.toLowerCase())
      const correspondeStatus = filtroStatus === "all" || lead.status === filtroStatus
      const correspondeFonte = filtroFonte === "all" || lead.fonte === filtroFonte
      const correspondeTemperatura = filtroTemperatura === "all" || lead.temperatura === filtroTemperatura

      return (correspondeNome || correspondeEmail) && correspondeStatus && correspondeFonte && correspondeTemperatura
    })
  }

  // Função para obter cor do status
  const obterCorStatus = (status: string) => {
    return CORES_STATUS[status as keyof typeof CORES_STATUS] || "bg-gray-500"
  }

  // Função para obter cor da temperatura
  const obterCorTemperatura = (temperatura: string) => {
    return CORES_TEMPERATURA[temperatura as keyof typeof CORES_TEMPERATURA] || "text-gray-500"
  }

  // Função para obter emoji da temperatura
  const obterEmojiTemperatura = (temperatura: string) => {
    return EMOJIS_TEMPERATURA[temperatura as keyof typeof EMOJIS_TEMPERATURA] || ""
  }

  // Função para ligar para lead
  const ligarParaLead = (telefone: string) => {
    window.open(`tel:${telefone}`)
    setNotification("Iniciando ligação...")
    setTimeout(() => setNotification(""), 3000)
  }

  // Função para enviar email para lead
  const enviarEmailParaLead = (email: string) => {
    window.open(`mailto:${email}`)
    setNotification("Abrindo cliente de email...")
    setTimeout(() => setNotification(""), 3000)
  }

  const leadsFiltered = filtrarLeads()

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Todos os Leads</h2>
          <p className="text-gray-600">Gerencie todos os seus leads em um só lugar</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {STATUS_LEADS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroFonte} onValueChange={setFiltroFonte}>
              <SelectTrigger>
                <SelectValue placeholder="Fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Fontes</SelectItem>
                {FONTES_LEADS.map((fonte) => (
                  <SelectItem key={fonte} value={fonte}>
                    {fonte}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroTemperatura} onValueChange={setFiltroTemperatura}>
              <SelectTrigger>
                <SelectValue placeholder="Qualificação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Qualificações</SelectItem>
                {TEMPERATURAS_LEADS.map((temp) => (
                  <SelectItem key={temp.value} value={temp.value}>
                    {temp.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setTermoPesquisa("")
                setFiltroStatus("all")
                setFiltroFonte("all")
                setFiltroTemperatura("all")
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({leadsFiltered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Lead</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Contato</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Fonte</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Interesse</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Orçamento</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Qualificação</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {leadsFiltered.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder-qlpn4.png?key=znm1m&height=40&width=40`} />
                          <AvatarFallback>
                            {lead.nome
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{lead.nome}</p>
                          {lead.observacoes && (
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">{lead.observacoes}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{lead.email}</p>
                        <p className="text-sm text-gray-500">{lead.telefone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{lead.fonte}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900">{lead.tipoInteresse}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        {lead.orcamento.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_LEADS.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${obterCorStatus(status)}`} />
                                {status}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm font-medium ${obterCorTemperatura(lead.temperatura)}`}>
                        {obterEmojiTemperatura(lead.temperatura)} {lead.temperatura}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-500">{lead.data}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => ligarParaLead(lead.telefone)} title="Ligar">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => enviarEmailParaLead(lead.email)}
                          title="Enviar Email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leadsFiltered.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum lead encontrado com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
