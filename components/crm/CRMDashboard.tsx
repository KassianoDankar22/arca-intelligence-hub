"use client"

import {
  Bell,
  BarChart3,
  User,
  Users,
  Phone,
  MessageSquare,
  FileText,
  Search,
  Home,
  CircleDollarSignIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface CRMDashboardProps {
  leadsList: any[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  sourceFilter: string
  setSourceFilter: (source: string) => void
  temperaturaFilter: string
  setTemperaturaFilter: (temp: string) => void
  handleViewLead: (lead: any) => void
  handleEditLead: (lead: any) => void
  handleCallLead: (lead: any) => void
  handleEmailLead: (lead: any) => void
  updateLeadStatus: (leadId: number, newStatus: string) => void
}

export function CRMDashboard({
  leadsList,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sourceFilter,
  setSourceFilter,
  temperaturaFilter,
  setTemperaturaFilter,
  handleViewLead,
  handleEditLead,
  handleCallLead,
  handleEmailLead,
  updateLeadStatus,
}: CRMDashboardProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{leadsList.length}</p>
                <p className="text-xs text-green-600">+12% este mês</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Oportunidades</p>
                <p className="text-2xl font-bold">
                  {
                    leadsList.filter(
                      (lead) =>
                        lead.status === "Qualificado" || lead.status === "Proposta" || lead.status === "Negociação",
                    ).length
                  }
                </p>
                <p className="text-xs text-green-600">+8% este mês</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendas Fechadas</p>
                <p className="text-2xl font-bold">{leadsList.filter((lead) => lead.status === "Fechado").length}</p>
                <p className="text-xs text-green-600">+15% este mês</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                <p className="text-2xl font-bold">
                  $
                  {leadsList
                    .filter((lead) => lead.status === "Fechado")
                    .reduce((sum, lead) => sum + lead.orcamento, 0)
                    .toLocaleString()}
                </p>
                <p className="text-xs text-green-600">+22% este mês</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <CircleDollarSignIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Pipeline de Vendas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const qualifiedLeads = leadsList.filter((l) => l.status === "Qualificado")
                  const propostaLeads = leadsList.filter((l) => l.status === "Proposta")
                  const negociacaoLeads = leadsList.filter((l) => l.status === "Negociação")
                  const fechadoLeads = leadsList.filter((l) => l.status === "Fechado")

                  const sumQualified = qualifiedLeads.reduce((sum, lead) => sum + lead.orcamento, 0)
                  const sumProposta = propostaLeads.reduce((sum, lead) => sum + lead.orcamento, 0)
                  const sumNegociacao = negociacaoLeads.reduce((sum, lead) => sum + lead.orcamento, 0)
                  const sumFechado = fechadoLeads.reduce((sum, lead) => sum + lead.orcamento, 0)

                  const totalPipelineValue = sumQualified + sumProposta + sumNegociacao + sumFechado

                  const getProgressWidth = (value: number) =>
                    totalPipelineValue > 0 ? (value / totalPipelineValue) * 100 : 0

                  return (
                    <div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold">Leads Qualificados</h4>
                          <p className="text-sm text-muted-foreground">{qualifiedLeads.length} leads</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            $
                            {sumQualified.toLocaleString("pt-BR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                            K
                          </p>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${getProgressWidth(sumQualified)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold">Propostas Enviadas</h4>
                          <p className="text-sm text-muted-foreground">{propostaLeads.length} propostas</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            $
                            {sumProposta.toLocaleString("pt-BR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                            K
                          </p>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-yellow-500 rounded-full"
                              style={{ width: `${getProgressWidth(sumProposta)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold">Negociação</h4>
                          <p className="text-sm text-muted-foreground">{negociacaoLeads.length} negociações</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            $
                            {sumNegociacao.toLocaleString("pt-BR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                            K
                          </p>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: `${getProgressWidth(sumNegociacao)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold">Fechamento</h4>
                          <p className="text-sm text-muted-foreground">{fechadoLeads.length} fechamentos</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            $
                            {sumFechado.toLocaleString("pt-BR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                            K
                          </p>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-purple-500 rounded-full"
                              style={{ width: `${getProgressWidth(sumFechado)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Novo lead adicionado</p>
                    <p className="text-xs text-muted-foreground">há 2 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Ligação realizada</p>
                    <p className="text-xs text-muted-foreground">há 5 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mensagem enviada</p>
                    <p className="text-xs text-muted-foreground">ontem</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Relatório gerado</p>
                    <p className="text-xs text-muted-foreground">há 3 dias</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Leads Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                className="px-4 py-2 border border-gray-300 rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
                className="px-4 py-2 border border-gray-300 rounded-lg"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <option value="">Todas as Fontes</option>
                <option value="Site">Site</option>
                <option value="Google">Google</option>
                <option value="Instagram">Instagram</option>
                <option value="Recomendacao">Recomendação</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fonte
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.telefone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.fonte}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.data}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleViewLead(lead)} className="text-blue-600 hover:text-blue-800">
                          Ver
                        </button>
                        <button onClick={() => handleEditLead(lead)} className="text-green-600 hover:text-green-800">
                          Editar
                        </button>
                        <button onClick={() => handleCallLead(lead)} className="text-green-600 hover:text-green-800">
                          Ligar
                        </button>
                        <button onClick={() => handleEmailLead(lead)} className="text-purple-600 hover:text-purple-800">
                          Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
