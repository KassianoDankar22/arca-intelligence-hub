"use client"

import type React from "react"

import { useState } from "react"
import { X, DollarSign, Calendar, FileText, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: number
  description: string
  amount: number
  type: "receita" | "despesa"
  category: string
  date: string
}

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: Omit<Transaction, "id">) => void
}

export function TransactionModal({ isOpen, onClose, onSave }: TransactionModalProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "receita" as "receita" | "despesa",
    category: "",
    date: new Date().toISOString().split("T")[0],
  })

  const receitaCategories = ["Aluguel", "Venda de Imóvel", "Comissão", "Consultoria", "Outros Rendimentos"]

  const despesaCategories = ["Manutenção", "IPTU", "Seguro", "Condomínio", "Marketing", "Combustível", "Outros Gastos"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.description || !formData.amount || !formData.category) {
      return
    }

    onSave({
      description: formData.description,
      amount: Number.parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
    })

    // Reset form
    setFormData({
      description: "",
      amount: "",
      type: "receita",
      category: "",
      date: new Date().toISOString().split("T")[0],
    })

    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Nova Transação
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description" className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Descrição *
            </Label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Ex: Aluguel apartamento Orlando"
              required
            />
          </div>

          <div>
            <Label htmlFor="amount" className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4" />
              Valor *
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label className="mb-3 block">Tipo de Transação *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => {
                handleInputChange("type", value)
                handleInputChange("category", "") // Reset category when type changes
              }}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="receita" id="receita" />
                <Label htmlFor="receita" className="text-green-600 font-medium">
                  💰 Receita
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="despesa" id="despesa" />
                <Label htmlFor="despesa" className="text-red-600 font-medium">
                  💸 Despesa
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4" />
              Categoria *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {(formData.type === "receita" ? receitaCategories : despesaCategories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date" className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              Data *
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Salvar Transação
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
