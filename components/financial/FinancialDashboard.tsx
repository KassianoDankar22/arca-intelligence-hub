"use client"

import { useState } from "react"
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Importar constantes
import { CATEGORIAS_FINANCEIRAS, TIPOS_TRANSACAO, STATUS_TRANSACAO } from "@/constants"

// Importar modal de transação
import { TransactionModal } from "./TransactionModal"

interface Transacao {
  id: number
  descricao: string
  valor: number
  tipo: "Receita" | "Despesa"
  categoria: string
  data: string
  status: "Pendente" | "Pago" | "Cancelado"
  observacoes?: string
}

interface FinancialDashboardProps {
  activeFinancialTab: string
  setActiveFinancialTab: (tab: string) => void
  showNewTransactionModal: boolean
  setShowNewTransactionModal: (show: boolean) => void
}

// Dados mockados para demonstração
const transacoesMockadas: Transacao[] = [
  {
    id: 1,
    descricao: "Aluguel Apartamento 101",
    valor: 2500,
    tipo: "Receita",
    categoria: "Aluguel",
    data: "2024-01-15",
    status: "Pago",
    observacoes: "Pagamento via PIX",
  },
  {
    id: 2,
    descricao: "Manutenção Ar Condicionado",
    valor: 350,
    tipo: "Despesa",
    categoria: "Manutenção",
    data: "2024-01-14",
    status: "Pago",
  },
  {
    id: 3,
    descricao: "IPTU Anual",
    valor: 1200,
    tipo: "Despesa",
    categoria: "IPTU",
    data: "2024-01-10",
    status: "Pendente",
  },
  {
    id: 4,
    descricao: "Seguro Residencial",
    valor: 800,
    tipo: "Despesa",
    categoria: "Seguro",
    data: "2024-01-08",
    status: "Pago",
  },
  {
    id: 5,
    descricao: "Aluguel Apartamento 102",
    valor: 2800,
    tipo: "Receita",
    categoria: "Aluguel",
    data: "2024-01-15",
    status: "Pago",
  },
]

export function FinancialDashboard({
  activeFinancialTab,
  setActiveFinancialTab,
  showNewTransactionModal,
  setShowNewTransactionModal,
}: FinancialDashboardProps) {
  const [listaTransacoes, setListaTransacoes] = useState<Transacao[]>(transacoesMockadas)
  const [filtroTipo, setFiltroTipo] = useState("Todos os Tipos")
  const [filtroCategoria, setFiltroCategoria] = useState("Todas as Categorias")
  const [filtroStatus, setFiltroStatus] = useState("Todos os Status")

  // Função para calcular métricas
  const calcularMetricas = () => {
    const receitaTotal = listaTransacoes
      .filter((t) => t.tipo === "Receita" && t.status === "Pago")
      .reduce((sum, t) => sum + t.valor, 0)

    const despesaTotal = listaTransacoes
      .filter((t) => t.tipo === "Despesa" && t.status === "Pago")
      .reduce((sum, t) => sum + t.valor, 0)

    const lucroLiquido = receitaTotal - despesaTotal

    const transacoesPendentes = listaTransacoes
      .filter((t) => t.status === "Pendente")
      .reduce((sum, t) => sum + t.valor, 0)

    return {
      receitaTotal,
      despesaTotal,
      lucroLiquido,
      transacoesPendentes,
    }
  }

  // Função para filtrar transações
  const filtrarTransacoes = () => {
    return listaTransacoes.filter((transacao) => {
      const correspondeTipo = filtroTipo === "Todos os Tipos" || transacao.tipo === filtroTipo
      const correspondeCategoria = filtroCategoria === "Todas as Categorias" || transacao.categoria === filtroCategoria
      const correspondeStatus = filtroStatus === "Todos os Status" || transacao.status === filtroStatus

      return correspondeTipo && correspondeCategoria && correspondeStatus
    })
  }

  // Função para adicionar nova transação
  const adicionarNovaTransacao = (dadosTransacao: Omit<Transacao, "id">) => {
    const novaTransacao: Transacao = {
      ...dadosTransacao,
      id: Date.now(),
    }
    setListaTransacoes((prev) => [novaTransacao, ...prev])
  }

  // Função para obter cor do status
  const obterCorStatus = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const metricas = calcularMetricas()
  const transacoesFiltradas = filtrarTransacoes()

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Módulo Financeiro</h1>
          <p className="text-gray-600">Gerencie suas receitas e despesas</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setShowNewTransactionModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeFinancialTab} onValueChange={setActiveFinancialTab}>
        <TabsList className="grid w-full max-w-[400px] grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {metricas.receitaTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesa Total</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {metricas.despesaTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <p className="text-xs text-muted-foreground">-5% em relação ao mês passado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${metricas.lucroLiquido >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {metricas.lucroLiquido.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Margem de {((metricas.lucroLiquido / metricas.receitaTotal) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {metricas.transacoesPendentes.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {listaTransacoes.filter((t) => t.status === "Pendente").length} transações
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transações Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listaTransacoes.slice(0, 5).map((transacao) => (
                  <div key={transacao.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transacao.tipo === "Receita" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {transacao.tipo === "Receita" ? (
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <p className="text-sm text-gray-500">
                          {transacao.categoria} • {transacao.data}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transacao.tipo === "Receita" ? "text-green-600" : "text-red-600"}`}>
                        {transacao.tipo === "Receita" ? "+" : "-"}
                        {transacao.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                      <Badge className={obterCorStatus(transacao.status)}>{transacao.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos os Tipos">Todos os Tipos</SelectItem>
                    {TIPOS_TRANSACAO.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas as Categorias">Todas as Categorias</SelectItem>
                    {CATEGORIAS_FINANCEIRAS.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos os Status">Todos os Status</SelectItem>
                    {STATUS_TRANSACAO.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setFiltroTipo("Todos os Tipos")
                    setFiltroCategoria("Todas as Categorias")
                    setFiltroStatus("Todos os Status")
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Transações */}
          <Card>
            <CardHeader>
              <CardTitle>Todas as Transações ({transacoesFiltradas.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transacoesFiltradas.map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transacao.tipo === "Receita" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {transacao.tipo === "Receita" ? (
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transacao.descricao}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{transacao.categoria}</Badge>
                          <span className="text-sm text-gray-500">{transacao.data}</span>
                        </div>
                        {transacao.observacoes && <p className="text-sm text-gray-500 mt-1">{transacao.observacoes}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transacao.tipo === "Receita" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transacao.tipo === "Receita" ? "+" : "-"}
                        {transacao.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                      <Badge className={obterCorStatus(transacao.status)}>{transacao.status}</Badge>
                    </div>
                  </div>
                ))}

                {transacoesFiltradas.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhuma transação encontrada com os filtros aplicados.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Relatórios em Desenvolvimento</h3>
                <p className="text-gray-500 mb-4">
                  Em breve você terá acesso a relatórios detalhados com gráficos e análises avançadas.
                </p>
                <Button variant="outline">Solicitar Acesso Antecipado</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Nova Transação */}
      <TransactionModal
        isOpen={showNewTransactionModal}
        onClose={() => setShowNewTransactionModal(false)}
        onSave={adicionarNovaTransacao}
      />
    </div>
  )
}
