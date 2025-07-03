"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  DollarSign,
  CreditCard,
  FileText,
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart,
  ListFilter,
  Download,
  FileWarning,
  LineChart,
  PieChart,
} from "lucide-react"

interface FinancialDashboardProps {
  activeFinancialTab: string
  setActiveFinancialTab: (tab: string) => void
  showNewTransactionModal: boolean
  setShowNewTransactionModal: (show: boolean) => void
}

export function FinancialDashboard({
  activeFinancialTab,
  setActiveFinancialTab,
  showNewTransactionModal,
  setShowNewTransactionModal,
}: FinancialDashboardProps) {
  const [transactionFormData, setTransactionFormData] = useState({
    type: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  })

  const handleTransactionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTransactionFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTransactionFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveTransaction = () => {
    // Placeholder for saving transaction logic
    console.log("Saving transaction:", transactionFormData)
    setShowNewTransactionModal(false)
    setTransactionFormData({
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Financeiro</h1>
          <p className="text-gray-600">Controle completo das suas finanças imobiliárias</p>
        </div>
        <Button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowNewTransactionModal(true)}
        >
          <Plus className="h-4 w-4" />
          Nova Transação
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200 text-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {"+12.5% este mês"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200 text-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0</div>
            <p className="text-xs text-red-600 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              {"-3.2% este mês"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200 text-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0</div>
            <p className="text-xs text-blue-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {"ROI médio: 15.8%"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <TabsList className="grid w-full grid-cols-4 rounded-lg p-1 text-slate-500">
          <TabsTrigger
            value="overview"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            onClick={() => setActiveFinancialTab("overview")}
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            onClick={() => setActiveFinancialTab("transactions")}
          >
            Transações
          </TabsTrigger>
          <TabsTrigger
            value="properties"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            onClick={() => setActiveFinancialTab("properties")}
          >
            Propriedades
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            onClick={() => setActiveFinancialTab("reports")}
          >
            Relatórios
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Tabs Content */}
      <Tabs value={activeFinancialTab} onValueChange={setActiveFinancialTab} className="w-full">
        <TabsContent value="overview" className="space-y-6 mt-0">
          {/* Recent Transactions Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Wallet className="h-6 w-6 text-gray-700" />
                Transações Recentes
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-lg bg-transparent">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
                <Button variant="outline" className="rounded-lg bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
            <Card className="rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <FileWarning className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-700">Nenhuma transação encontrada</p>
              <p className="text-sm text-gray-500">Comece adicionando suas primeiras transações financeiras</p>
            </Card>
          </section>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <PieChart className="h-6 w-6 text-gray-700" />
                Distribuição por Categoria
              </h2>
              <div className="flex flex-col items-center justify-center min-h-[200px] text-center text-gray-500">
                <BarChart className="h-12 w-12 text-gray-400 mb-4" />
                <p>Gráfico em desenvolvimento</p>
              </div>
            </Card>
            <Card className="rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <LineChart className="h-6 w-6 text-gray-700" />
                Evolução Mensal
              </h2>
              <div className="flex flex-col items-center justify-center min-h-[200px] text-center text-gray-500">
                <LineChart className="h-12 w-12 text-gray-400 mb-4" />
                <p>Gráfico de tendências</p>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="mt-0">
          <Card className="rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
            <p className="text-lg font-semibold text-gray-700">Gerenciamento de Transações</p>
            <p className="text-sm text-gray-500">Funcionalidade em desenvolvimento.</p>
          </Card>
        </TabsContent>
        <TabsContent value="properties" className="mt-0">
          <Card className="rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
            <p className="text-lg font-semibold text-gray-700">Visão Geral de Propriedades</p>
            <p className="text-sm text-gray-500">Funcionalidade em desenvolvimento.</p>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="mt-0">
          <Card className="rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
            <p className="text-lg font-semibold text-gray-700">Relatórios Financeiros</p>
            <p className="text-sm text-gray-500">Funcionalidade em desenvolvimento.</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Transaction Modal */}
      <Dialog open={showNewTransactionModal} onOpenChange={setShowNewTransactionModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Transação</DialogTitle>
            <DialogDescription>Adicione uma nova receita ou despesa.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                name="type"
                value={transactionFormData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Valor
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={transactionFormData.amount}
                onChange={handleTransactionInputChange}
                className="col-span-3"
                placeholder="R$ 0.00"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Select
                name="category"
                value={transactionFormData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aluguel">Aluguel</SelectItem>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="impostos">Impostos</SelectItem>
                  <SelectItem value="comissao">Comissão</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={transactionFormData.date}
                onChange={handleTransactionInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                name="description"
                value={transactionFormData.description}
                onChange={handleTransactionInputChange}
                className="col-span-3"
                placeholder="Descrição da transação"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNewTransactionModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTransaction}>Salvar Transação</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
