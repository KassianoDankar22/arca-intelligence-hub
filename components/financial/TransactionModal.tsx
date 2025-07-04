"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Importar constantes
import { CATEGORIAS_FINANCEIRAS, TIPOS_TRANSACAO, STATUS_TRANSACAO } from "@/constants"

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

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transacao: Omit<Transacao, "id">) => void
}

export function TransactionModal({ isOpen, onClose, onSave }: TransactionModalProps) {
  const [dadosFormulario, setDadosFormulario] = useState({
    descricao: "",
    valor: "",
    tipo: "" as "Receita" | "Despesa" | "",
    categoria: "",
    data: new Date().toISOString().split("T")[0],
    status: "Pendente" as "Pendente" | "Pago" | "Cancelado",
    observacoes: "",
  })

  // Função para lidar com mudanças nos inputs
  const lidarComMudancaInput = (campo: string, valor: string) => {
    setDadosFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  // Função para salvar transação
  const salvarTransacao = () => {
    if (dadosFormulario.descricao && dadosFormulario.valor && dadosFormulario.tipo && dadosFormulario.categoria) {
      const novaTransacao = {
        descricao: dadosFormulario.descricao,
        valor: Number.parseFloat(dadosFormulario.valor.replace(/[^0-9.]/g, "")),
        tipo: dadosFormulario.tipo as "Receita" | "Despesa",
        categoria: dadosFormulario.categoria,
        data: dadosFormulario.data,
        status: dadosFormulario.status,
        observacoes: dadosFormulario.observacoes,
      }

      onSave(novaTransacao)
      limparFormulario()
      onClose()
    }
  }

  // Função para limpar formulário
  const limparFormulario = () => {
    setDadosFormulario({
      descricao: "",
      valor: "",
      tipo: "",
      categoria: "",
      data: new Date().toISOString().split("T")[0],
      status: "Pendente",
      observacoes: "",
    })
  }

  // Função para fechar modal
  const fecharModal = () => {
    limparFormulario()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={fecharModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="descricao">Descrição *</Label>
            <Input
              id="descricao"
              placeholder="Ex: Aluguel Apartamento 101"
              value={dadosFormulario.descricao}
              onChange={(e) => lidarComMudancaInput("descricao", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={dadosFormulario.tipo} onValueChange={(value) => lidarComMudancaInput("tipo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_TRANSACAO.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="valor">Valor *</Label>
              <Input
                id="valor"
                placeholder="R$ 0,00"
                value={dadosFormulario.valor}
                onChange={(e) => lidarComMudancaInput("valor", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="categoria">Categoria *</Label>
            <Select
              value={dadosFormulario.categoria}
              onValueChange={(value) => lidarComMudancaInput("categoria", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS_FINANCEIRAS.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={dadosFormulario.data}
                onChange={(e) => lidarComMudancaInput("data", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={dadosFormulario.status} onValueChange={(value) => lidarComMudancaInput("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_TRANSACAO.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações adicionais..."
              value={dadosFormulario.observacoes}
              onChange={(e) => lidarComMudancaInput("observacoes", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button onClick={salvarTransacao}>Salvar Transação</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
