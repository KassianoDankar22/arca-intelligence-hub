"use client"

import { useState } from "react"
import { Plus, DollarSign, TrendingUp, TrendingDown, Calendar, Tag, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TransactionModal } from "./TransactionModal"

interface Transaction {
  id: number
  description: string
  amount: number
  type: "receita" | "despesa"
  category: string
  date: string
}

interface FinancialDashboardProps {
  activeFinancialTab?: string
  setActiveFinancialTab?: (tab: string) => void
  showNewTransactionModal?: boolean
  setShowNewTransactionModal?: (show: boolean) => void
}

export function FinancialDashboard({
  activeFinancialTab = "overview",
  setActiveFinancialTab = () => {},
  showNewTransactionModal = false,
  setShowNewTransactionModal = () => {},
}: FinancialDashboardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: "Aluguel Apartamento Orlando",
      amount: 2500.0,
      type: "receita",
      category: "Aluguel",
      date: "2024-01-15",
    },
    {
      id: 2,
      description: "Manutenção Ar Condicionado",
      amount: 350.0,
      type: "despesa",
      category: "Manutenção",
      date: "2024-01-10",
    },
    {
      id: 3,
      description: "Comissão Venda Casa",
      amount: 8500.0,
      type: "receita",
      category: "Comissão",
      date: "2024-01-08",
    },
  ])

  const [showModal, setShowModal] = useState(false)

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now(), // Simple ID generation
    }
    setTransactions((prev) => [transaction, ...prev])
  }

  // Calculations
  const totalReceita = transactions.filter((t) => t.type === "receita").reduce((sum, t) => sum + t.amount, 0)

  const totalDespesas = transactions.filter((t) => t.type === "despesa").reduce((sum, t) => sum + t.amount, 0)

  const lucroLiquido = totalReceita - totalDespesas

  // Get last 5 transactions
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getCategoryColor = (category: string, type: string) => {
    if (type === "receita") {
      return "bg-green-100 text-green-800"
    }
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Financeiro</h1>
          <p className="text-gray-600">Controle suas receitas e despesas</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Transação
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalReceita)}</div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.type === "receita").length} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Despesas Totais</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalDespesas)}</div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.type === "despesa").length} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <DollarSign className={`h-4 w-4 ${lucroLiquido >= 0 ? "text-green-600" : "text-red-600"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${lucroLiquido >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(lucroLiquido)}
            </div>
            <p className="text-xs text-muted-foreground">
              {lucroLiquido >= 0 ? "Resultado positivo" : "Resultado negativo"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Transações Recentes
          </CardTitle>
          <CardDescription>Últimas 5 transações registradas</CardDescription>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma transação registrada ainda.</p>
              <p className="text-sm">Clique em "Nova Transação" para começar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${transaction.type === "receita" ? "bg-green-100" : "bg-red-100"}`}
                    >
                      {transaction.type === "receita" ? (
                        <ArrowUpCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getCategoryColor(transaction.category, transaction.type)}>
                          <Tag className="h-3 w-3 mr-1" />
                          {transaction.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      transaction.type === "receita" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "receita" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Placeholder for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>Gráfico será implementado em breve</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Gráfico de Pizza</p>
                <p className="text-sm">Em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>Gráfico será implementado em breve</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Gráfico de Linha</p>
                <p className="text-sm">Em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Modal */}
      <TransactionModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={addTransaction} />
    </div>
  )
}
