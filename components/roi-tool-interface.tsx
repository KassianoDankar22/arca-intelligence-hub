"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  BarChart3Icon,
  LogOut,
  ChevronDown,
  Check,
  Loader2,
  FileDown,
  Eye,
  Trash2,
  Home,
  Star,
  BarChart3,
  Banknote,
  Percent,
  PiggyBank,
  Receipt,
  DollarSign,
  TrendingUp,
  Gauge,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarBorder } from "@/components/ui/star-border"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// Replace the entire `condominiumData` constant with the following updated data:
const condominiumData = {
  "solterra-resort": {
    name: "Solterra Resort",
    city: "Davenport",
    rates: { 4: 209.25, 5: 209.7, 6: 211.26, 7: 296.63, 9: 418.06, 14: 783.67 },
    estimatedHOA: 550,
  },
  "storey-lake-resort": {
    name: "Storey Lake Resort",
    city: "Kissimmee",
    rates: { 2: 128.28, 3: 175.53, 4: 188.44, 5: 196.93, 6: 304.51, 7: 596.05, 8: 371.21 },
    estimatedHOA: 600,
  },
  "paradise-palms-resort": {
    name: "Paradise Palms Resort",
    city: "Kissimmee",
    rates: { 4: 205.38, 5: 202.86, 6: 283.5 },
    estimatedHOA: 500,
  },
  "championsgate-resort": {
    name: "ChampionsGate Resort",
    city: "Davenport",
    rates: { 2: 103.15, 3: 118.88, 4: 190.6, 5: 205.21, 6: 315.04, 7: 302.87, 8: 355.95, 9: 473.55 },
    estimatedHOA: 650,
  },
  "windsor-island-resort": {
    name: "Windsor Island Resort",
    city: "Davenport",
    rates: { 5: 226.05, 6: 367.5, 7: 337.95, 8: 366.03, 9: 551.25, 10: 617.4 },
    estimatedHOA: 650,
  },
  "bella-vida-resort": {
    name: "Bella Vida Resort",
    city: "Kissimmee",
    rates: { 4: 216.56, 5: 238.22, 6: 259.88, 9: 469.33, 12: 499.33 },
    estimatedHOA: 450,
  },
  "emerald-island-resort": {
    name: "Emerald Island Resort",
    city: "Kissimmee",
    rates: { 4: 130.52, 5: 157.08, 6: 281.82, 7: 239.09 },
    estimatedHOA: 400,
  },
  "bridgewater-crossing": {
    name: "Bridgewater Crossing",
    city: "Davenport",
    rates: { 3: 206.75, 4: 188.27, 5: 265.65 },
    estimatedHOA: 300,
  },
  calabria: {
    name: "Calabria",
    city: "Kissimmee",
    rates: { 4: 208.15, 5: 263.91, 6: 343.2 },
    estimatedHOA: 400,
  },
  "compass-bay": {
    name: "Compass Bay",
    city: "Kissimmee",
    rates: { 4: 174.7 },
    estimatedHOA: 350,
  },
  "crescent-lakes": {
    name: "Crescent Lakes",
    city: "Kissimmee",
    rates: { 3: 161.07, 4: 223.02, 5: 283.73, 6: 318.42 },
    estimatedHOA: 250,
  },
  "crystal-cove-resort": {
    name: "Crystal Cove Resort",
    city: "Kissimmee",
    rates: { 4: 189.57, 5: 288.69 },
    estimatedHOA: 450,
  },
  "eagle-pointe": {
    name: "Eagle Pointe",
    city: "Kissimmee",
    rates: { 4: 130.1 },
    estimatedHOA: 250,
  },
  "encantada-resort": {
    name: "Encantada Resort",
    city: "Kissimmee",
    rates: { 2: 136.29, 3: 161.07, 4: 185.85 },
    estimatedHOA: 400,
  },
  "fiesta-key": {
    name: "Fiesta Key",
    city: "Kissimmee",
    rates: { 3: 147.0, 4: 199.5, 5: 241.5 },
    estimatedHOA: 350,
  },
  "formosa-valley": {
    name: "Formosa Valley",
    city: "Kissimmee",
    rates: { 4: 181.65, 5: 208.95 },
    estimatedHOA: 400,
  },
  "hampton-lakes": {
    name: "Hampton Lakes",
    city: "Davenport",
    rates: { 4: 150.15, 5: 141.8 },
    estimatedHOA: 300,
  },
  "indian-creek": {
    name: "Indian Creek",
    city: "Kissimmee",
    rates: { 4: 131.25, 5: 178.5 },
    estimatedHOA: 250,
  },
  "lake-berkley-resort": {
    name: "Lake Berkley Resort",
    city: "Kissimmee",
    rates: { 3: 141.75, 4: 136.5, 5: 168.0, 6: 313.95 },
    estimatedHOA: 450,
  },
  "le-reve": {
    name: "Le Reve",
    city: "Kissimmee",
    rates: { 4: 173.25, 5: 204.75, 6: 288.75 },
    estimatedHOA: 450,
  },
  "liberty-village": {
    name: "Liberty Village",
    city: "Kissimmee",
    rates: { 3: 157.5, 4: 157.5, 5: 157.5, 6: 315.0 },
    estimatedHOA: 250,
  },
  lindfields: {
    name: "Lindfields",
    city: "Kissimmee",
    rates: { 3: 115.5, 4: 197.4, 5: 246.75 },
    estimatedHOA: 250,
  },
  "lucaya-village": {
    name: "Lucaya Village",
    city: "Kissimmee",
    rates: { 3: 142.09, 4: 168.0 },
    estimatedHOA: 350,
  },
  "magic-village-views": {
    name: "Magic Village Views",
    city: "Kissimmee",
    rates: { 3: 124.67, 4: 195.5 },
    estimatedHOA: 600,
  },
  "magic-village-yards": {
    name: "Magic Village Yards",
    city: "Kissimmee",
    rates: { 3: 124.67, 4: 195.5 },
    estimatedHOA: 600,
  },
  "margaritaville-resort-orlando": {
    name: "Margaritaville Resort Orlando",
    city: "Kissimmee",
    rates: { 2: 159.39, 3: 144.9, 4: 156.45 },
    estimatedHOA: 650,
  },
  "oakwater-resort": {
    name: "Oakwater Resort",
    city: "Kissimmee",
    rates: { 3: 131.25, 4: 124.95 },
    estimatedHOA: 400,
  },
  "paradiso-grande": {
    name: "Paradiso Grande",
    city: "Kissimmee",
    rates: { 5: 308.02, 8: 588.48, 9: 507.15, 10: 630.0, 12: 1176.0, 15: 1414.35 },
    estimatedHOA: 700,
  },
  "regal-oaks-resort": {
    name: "Regal Oaks Resort",
    city: "Kissimmee",
    rates: { 2: 142.8, 3: 157.5, 4: 210.0 },
    estimatedHOA: 400,
  },
  "regal-palms-resort": {
    name: "Regal Palms Resort & Spa at Highlands Reserve",
    city: "Davenport",
    rates: { 3: 115.5, 4: 141.75, 5: 157.5 },
    estimatedHOA: 350,
  },
  "reunion-resort": {
    name: "Reunion Resort",
    city: "Kissimmee",
    rates: {
      3: 103.95,
      4: 141.75,
      5: 157.5,
      6: 240.45,
      7: 210.0,
      8: 336.0,
      9: 391.65,
      10: 613.2,
      11: 1060.5,
      12: 1399.65,
      13: 864.15,
      14: 1604.75,
    },
    estimatedHOA: 800,
  },
  seasons: {
    name: "Seasons",
    city: "Kissimmee",
    rates: { 3: 150.15, 4: 183.75, 5: 215.25, 6: 313.85, 7: 343.85 },
    estimatedHOA: 300,
  },
  "secret-lake-resort": {
    name: "Secret Lake Resort",
    city: "Kissimmee",
    rates: { 2: 126.0, 3: 147.0 },
    estimatedHOA: 300,
  },
  "solara-resort": {
    name: "Solara Resort",
    city: "Kissimmee",
    rates: { 4: 213.1, 5: 263.84, 6: 293.95, 7: 351.84, 8: 373.99, 9: 531.97 },
    estimatedHOA: 650,
  },
  "sonoma-resort": {
    name: "Sonoma Resort",
    city: "Kissimmee",
    rates: {
      5: 204.75,
      6: 283.5,
      7: 320.25,
      8: 304.83,
      9: 382.2,
      10: 414.75,
      11: 446.25,
      12: 477.75,
      13: 509.25,
      14: 540.75,
      15: 572.25,
    },
    estimatedHOA: 600,
  },
  "summerville-resort": {
    name: "Summerville Resort",
    city: "Kissimmee",
    rates: { 4: 136.5, 5: 157.5, 6: 178.5, 7: 199.5, 8: 220.5 },
    estimatedHOA: 450,
  },
  "sunset-lakes": {
    name: "Sunset Lakes",
    city: "Kissimmee",
    rates: { 4: 141.25, 5: 167.5, 6: 178.5, 7: 199.5, 8: 225.5 },
    estimatedHOA: 300,
  },
  "terra-esmeralda": {
    name: "Terra Esmeralda",
    city: "Kissimmee",
    rates: { 3: 147.0, 4: 168.0, 5: 199.5 },
    estimatedHOA: 400,
  },
  "terra-verde-resort": {
    name: "Terra Verde Resort",
    city: "Kissimmee",
    rates: { 3: 141.75, 4: 161.7, 5: 188.95, 6: 268.8, 7: 280.35 },
    estimatedHOA: 450,
  },
  "the-enclaves-at-festival": {
    name: "The Enclaves at Festival",
    city: "Davenport",
    rates: { 3: 141.75, 4: 168.0, 5: 199.5, 6: 231.0, 7: 262.5, 8: 294.0, 9: 315.0, 10: 336.0 },
    estimatedHOA: 400,
  },
  "the-hub-at-westside-reserve": {
    name: "The Hub at Westside Reserve",
    city: "Kissimmee",
    rates: { 3: 167.75 },
    estimatedHOA: 400,
  },
  "the-manors-at-westridge": {
    name: "The Manors at Westridge",
    city: "Davenport",
    rates: { 3: 136.5, 4: 168.0, 5: 199.5, 6: 231.0 },
    estimatedHOA: 300,
  },
  "the-palms-at-lake-davenport": {
    name: "The Palms at Lake Davenport",
    city: "Davenport",
    rates: { 3: 126.0, 4: 157.5, 5: 189.0, 6: 220.5 },
    estimatedHOA: 300,
  },
  "veranda-palms": {
    name: "Veranda Palms",
    city: "Kissimmee",
    rates: {
      4: 157.5,
      5: 189.0,
      6: 231.0,
      7: 262.5,
      8: 294.0,
      9: 315.0,
      10: 367.5,
      11: 420.0,
      12: 472.5,
      13: 525.0,
      14: 577.5,
    },
    estimatedHOA: 450,
  },
  "villas-at-seven-dwarfs": {
    name: "Villas at Seven Dwarfs",
    city: "Kissimmee",
    rates: { 3: 99.75, 4: 147.0 },
    estimatedHOA: 350,
  },
  "vista-cay": {
    name: "Vista Cay",
    city: "Orlando",
    rates: { 2: 115.5, 3: 147.0 },
    estimatedHOA: 400,
  },
  "west-lucaya": {
    name: "West Lucaya",
    city: "Kissimmee",
    rates: { 3: 142.09, 4: 168.0 },
    estimatedHOA: 400,
  },
  "wilshire-oaks": {
    name: "Wilshire Oaks",
    city: "Kissimmee",
    rates: { 4: 157.5, 5: 189.0, 6: 220.5 },
    estimatedHOA: 400,
  },
  "windsor-at-westside": {
    name: "Windsor at Westside",
    city: "Kissimmee",
    rates: { 5: 317.59, 6: 256.04, 7: 315.0, 8: 367.5 },
    estimatedHOA: 650,
  },
  "windsor-cay": {
    name: "Windsor Cay",
    city: "Clermont",
    rates: { 5: 263.34, 6: 299.75, 7: 349.16, 8: 396.72, 9: 464.0, 10: 527.0 },
    estimatedHOA: 650,
  },
  "windsor-hills-resort": {
    name: "Windsor Hills Resort",
    city: "Kissimmee",
    rates: { 4: 147.0, 5: 226.15, 6: 210.0 },
    estimatedHOA: 450,
  },
  "windsor-palms-resort": {
    name: "Windsor Palms Resort",
    city: "Kissimmee",
    rates: { 3: 136.5, 4: 168.0, 5: 199.5, 6: 263.79 },
    estimatedHOA: 450,
  },
  "crystal-cove": {
    name: "Crystal Cove",
    city: "Kissimmee",
    rates: { 3: 136.5, 4: 168.0, 5: 199.5, 6: 225.0 },
    estimatedHOA: 400,
  },
  "cumbrian-lakes": {
    name: "Cumbrian Lakes",
    city: "Kissimmee",
    rates: { 4: 152.25, 5: 189.0, 6: 231.0, 7: 260.5 },
    estimatedHOA: 300,
  },
  "encore-resort-at-reunion": {
    name: "Encore Resort at Reunion",
    city: "Kissimmee",
    rates: {
      3: 299.25,
      4: 342.3,
      5: 342.3,
      6: 247.8,
      7: 459.9,
      8: 380.42,
      9: 501.9,
      10: 517.65,
      11: 600.6,
      12: 704.55,
      13: 899.45,
    },
    estimatedHOA: 850,
  },
  "paradise-palms": {
    name: "Paradise Palms",
    city: "Kissimmee",
    rates: { 3: 136.5, 4: 168.0, 5: 199.5, 6: 231.0, 7: 262.5 },
    estimatedHOA: 500,
  },
  "regal-oaks": {
    name: "Regal Oaks",
    city: "Kissimmee",
    rates: { 2: 136.5, 3: 168.0, 4: 199.5 },
    estimatedHOA: 400,
  },
  reunion: {
    name: "Reunion",
    city: "Kissimmee",
    rates: {
      3: 105.0,
      4: 171.15,
      5: 172.2,
      6: 240.45,
      7: 210.0,
      8: 336.0,
      9: 391.65,
      10: 613.2,
      11: 1060.5,
      12: 1399.65,
      13: 864.15,
      14: 1604.75,
    },
    estimatedHOA: 800,
  },
  "sandy-ridge": {
    name: "Sandy Ridge",
    city: "Davenport",
    rates: { 3: 119.89, 4: 133.85, 5: 168.0, 6: 273.95 },
    estimatedHOA: 250,
  },
  "serenity-at-silver-creek": {
    name: "Serenity at Silver Creek",
    city: "Davenport",
    rates: { 3: 138.37, 4: 136.5, 5: 168.0, 6: 280.95 },
    estimatedHOA: 300,
  },
}

// Replace the getDynamicDailyRate function with improved debugging:
const getDynamicDailyRate = (condominium: string, bedroomsStr: string) => {
  const bedrooms = Number.parseInt(bedroomsStr) // Add this line to parse to number
  console.log("🔍 DEBUG - Buscando condomínio:", condominium, "quartos:", bedrooms)

  const condoData = condominiumData[condominium]
  console.log("📋 DEBUG - Dados encontrados:", condoData)

  if (!condoData) {
    console.log("❌ DEBUG - Condomínio não encontrado:", condominium)
    console.log("🏠 DEBUG - Condomínios disponíveis:", Object.keys(condominiumData))
    return 0
  }

  // Se não tem o número exato de quartos, usa o mais próximo
  if (!condoData.rates[bedrooms]) {
    const availableRooms = Object.keys(condoData.rates)
      .map(Number)
      .sort((a, b) => a - b)
    const closestRoom = availableRooms.reduce((prev, curr) =>
      Math.abs(curr - bedrooms) < Math.abs(prev - bedrooms) ? curr : prev,
    )

    console.log(`⚠️ ${bedrooms} quartos não encontrado. Usando ${closestRoom} quartos como base.`)

    const baseRate = condoData.rates[closestRoom]
    const adjustmentFactor = bedrooms / closestRoom
    const estimatedRate = baseRate * adjustmentFactor

    return Math.round(estimatedRate * 100) / 100
  }

  const baseRate = condoData.rates[bedrooms]
  const finalRate = Math.round(baseRate * 100) / 100

  console.log("✅ DEBUG - Taxa calculada:", finalRate, "base:", baseRate)

  return finalRate
}

const getInsuranceCost = (bedrooms) => {
  const table = {
    1: 150,
    2: 150,
    3: 175,
    4: 200,
    5: 250,
    6: 300,
    7: 350,
    8: 400,
    9: 450,
    10: 500,
    11: 600,
    12: 600,
    13: 750,
    14: 750,
    15: 750,
  }
  return table[bedrooms] || 200
}

const calculateROI = (data) => {
  if (!data || !data.purchasePrice || !data.condominio || !data.quartos) return null

  // PROTEÇÃO: Garantir que valores básicos existam e sejam numéricos
  const purchasePrice = Number.parseFloat(data.purchasePrice) || 0
  const bedrooms = Number.parseInt(data.quartos) || 4

  console.log("🔍 DEBUG - Data recebida:", data)

  const dailyRate = getDynamicDailyRate(data.condominio, data.quartos)
  const monthlyRevenue = dailyRate * 24
  const annualRevenue = monthlyRevenue * 12

  // Despesas mensais
  const adminFee = monthlyRevenue * 0.2
  const propertyTax = (purchasePrice * 0.015) / 12
  const insurance = getInsuranceCost(bedrooms)
  const electricity = bedrooms * 75
  const water = bedrooms * 30 + (data.piscinaPrivativa ? 50 : 0)
  const poolMaintenance = data.piscinaPrivativa ? 120 : 0
  const hoa = condominiumData[data.condominio]?.estimatedHOA || 600
  const totalMonthlyExpenses = adminFee + propertyTax + insurance + electricity + water + poolMaintenance + hoa

  // CORRIGIR: Cálculo seguro do investimento inicial
  let totalInvestment = 0

  // Entrada base (SEGURO)
  if (data.entradaType === "percentage" && data.entradaPercentageNumeric) {
    totalInvestment = purchasePrice * (Number.parseFloat(data.entradaPercentageNumeric) / 100)
  } else if (data.entradaType === "value" && data.entradaValueNumeric) {
    totalInvestment = Number.parseFloat(data.entradaValueNumeric)
  } else {
    // Fallback: 30% se não conseguir ler
    totalInvestment = purchasePrice * 0.3
    console.log("⚠️ Entrada: Usando fallback de 30% do preço de compra.")
  }

  console.log("💰 Entrada base calculada:", totalInvestment)

  // DECORAÇÃO (SEGURO)
  let decorationCost = 0
  if (data.incluirDecoracao) {
    if (data.valorDecoracaoNumeric && data.valorDecoracaoNumeric > 0) {
      decorationCost = Number.parseFloat(data.valorDecoracaoNumeric)
    } else if (data.percentualDecoracaoNumeric && data.percentualDecoracaoNumeric > 0) {
      // Usar % se não tiver valor fixo
      decorationCost = purchasePrice * (Number.parseFloat(data.percentualDecoracaoNumeric) / 100)
    } else {
      // Fallback se nem valor nem porcentagem de decoração forem fornecidos
      const defaultDecorationPercentage = 15
      decorationCost = purchasePrice * (defaultDecorationPercentage / 100)
      console.log("⚠️ Decoração: Usando fallback de 15% do preço de compra.")
    }
    totalInvestment += decorationCost
    console.log("🎨 Decoração adicionada:", decorationCost)
  }

  // FECHAMENTO (SEGURO)
  let closingCost = 0
  if (data.incluirFechamento) {
    const percentage = Number.parseFloat(data.percentualFechamentoNumeric) || 5
    closingCost = purchasePrice * (percentage / 100)
    totalInvestment += closingCost
    console.log("📋 Fechamento adicionado:", closingCost)
  }

  // PROTEÇÃO: Verificar se totalInvestment é válido
  if (!totalInvestment || totalInvestment <= 0 || isNaN(totalInvestment)) {
    console.log("❌ Erro no investimento total, usando fallback")
    totalInvestment = purchasePrice * 0.3 // 30% padrão
  }

  // Financiamento (SEGURO)
  let monthlyMortgage = 0
  if (data.paymentMethod === "financed") {
    const downPayment = purchasePrice * 0.3 // Sempre 30% para financiamento
    const loanAmount = purchasePrice - downPayment
    const monthlyRate = 0.07 / 12
    const years = Number.parseInt(data.financingYears) || 30
    const numPayments = years * 12

    if (loanAmount > 0) {
      monthlyMortgage =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    }
  }

  // Resultados (PROTEGIDOS)
  const monthlyNetIncome = monthlyRevenue - totalMonthlyExpenses - monthlyMortgage
  const annualNetIncome = monthlyNetIncome * 12
  const annualAppreciation = purchasePrice * 0.06
  const totalAnnualReturn = annualNetIncome + annualAppreciation

  // PROTEÇÃO contra divisão por zero
  const roi = totalInvestment > 0 ? (totalAnnualReturn / totalInvestment) * 100 : 0
  const netRentalYield = purchasePrice > 0 ? (annualNetIncome / purchasePrice) * 100 : 0
  const capRate = purchasePrice > 0 ? ((annualRevenue - totalMonthlyExpenses * 12) / purchasePrice) * 100 : 0

  console.log("📊 RESULTADO FINAL:")
  console.log("Investimento total:", totalInvestment)
  console.log("ROI:", roi)
  console.log("Retorno anual:", totalAnnualReturn)

  return {
    dailyRate: dailyRate || 0,
    monthlyRevenue: monthlyRevenue || 0,
    annualRevenue: annualRevenue || 0,
    adminFee: adminFee || 0,
    propertyTax: propertyTax || 0,
    insurance: insurance || 0,
    electricity: electricity || 0,
    water: water || 0,
    poolMaintenance: poolMaintenance || 0,
    hoa: hoa || 0,
    totalMonthlyExpenses: totalMonthlyExpenses || 0,
    monthlyMortgage: monthlyMortgage || 0,
    totalInvestment: totalInvestment || 0,
    monthlyNetIncome: monthlyNetIncome || 0,
    annualNetIncome: annualNetIncome || 0,
    annualAppreciation: annualAppreciation || 0,
    roi: roi || 0,
    netRentalYield: netRentalYield || 0,
    capRate: capRate || 0,
    totalAnnualReturn: totalAnnualReturn || 0,
    decorationCost: decorationCost || 0,
    closingCost: closingCost || 0,
  }
}

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

// Helper function to format percentage
const formatPercentage = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string; description?: string }>
  placeholder?: string
  label?: string
  readOnly?: boolean // Add readOnly prop here
}

function AutocompleteInput({ value, onChange, options, placeholder, label, readOnly }: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState(options)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value)
    setInputValue(selectedOption ? selectedOption.label : "")
  }, [value, options])

  useEffect(() => {
    const filtered = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    setFilteredOptions(filtered)
  }, [inputValue, options])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsOpen(true)
    if (!e.target.value) {
      onChange("")
    }
  }

  const handleOptionSelect = (option: { label: string; value: string }) => {
    setInputValue(option.label)
    onChange(option.value)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  return (
    <div ref={containerRef} className="relative">
      {label && <Label className="text-sm text-gray-600 mb-1 block">{label}</Label>}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="h-10 rounded-lg border-gray-200 pr-8"
          readOnly={readOnly} // Apply readOnly prop here
        />
        <ChevronDown
          className={cn(
            "absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                "px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between",
                value === option.value && "bg-blue-50 text-blue-600",
              )}
              onClick={() => handleOptionSelect(option)}
            >
              <div>
                <div className="font-medium">{option.label}</div>
                {option.description && <div className="text-xs text-gray-500">{option.description}</div>}
              </div>
              {value === option.value && <Check className="h-4 w-4 text-blue-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const apps = [
  {
    name: "TOM Gerador de ROI",
    description: "Análise para imóveis de curta temporada em Orlando",
    category: "Análise",
    icon: <Gauge className="h-6 w-6" />,
  },
  {
    name: "Calculadora Financeira",
    description: "Planeje seus investimentos com precisão",
    category: "Finanças",
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    name: "Simulador de Impostos",
    description: "Calcule seus impostos de forma fácil e rápida",
    category: "Finanças",
    icon: <Percent className="h-6 w-6" />,
  },
  {
    name: "Consultor Imobiliário",
    description: "Encontre o imóvel perfeito para você",
    category: "Consultoria",
    icon: <Home className="h-6 w-6" />,
  },
]

interface RoiToolInterfaceProps {
  onBackClick: () => void
  activeRoiView: "agents" | "my-rois" | "favorites"
  setActiveRoiView: (view: "agents" | "my-rois" | "favorites") => void
  savedROIs: any[]
  setSavedROIs: (rois: any[]) => void
  favoriteAgents: string[]
  setFavoriteAgents: (agents: string[]) => void
}

const condominios = [
  { label: "Solterra Resort", value: "solterra-resort" },
  { label: "Storey Lake Resort", value: "storey-lake-resort" },
  { label: "Paradise Palms Resort", value: "paradise-palms-resort" },
  { label: "ChampionsGate Resort", value: "championsgate-resort" },
  { label: "Windsor Island Resort", value: "windsor-island-resort" },
  { label: "Bella Vida Resort", value: "bella-vida-resort" },
  { label: "Emerald Island Resort", value: "emerald-island-resort" },
  { label: "Bridgewater Crossing", value: "bridgewater-crossing" },
  { label: "Calabria", value: "calabria" },
  { label: "Compass Bay", value: "compass-bay" },
  { label: "Crescent Lakes", value: "crescent-lakes" },
  { label: "Crystal Cove Resort", value: "crystal-cove-resort" },
  { label: "Eagle Pointe", value: "eagle-pointe" },
  { label: "Encantada Resort", value: "encantada-resort" },
  { label: "Fiesta Key", value: "fiesta-key" },
  { label: "Formosa Valley", value: "formosa-valley" },
  { label: "Hampton Lakes", value: "hampton-lakes" },
  { label: "Indian Creek", value: "indian-creek" },
  { label: "Lake Berkley Resort", value: "lake-berkley-resort" },
  { label: "Le Reve", value: "le-reve" },
  { label: "Liberty Village", value: "liberty-village" },
  { label: "Lindfields", value: "lindfields" },
  { label: "Lucaya Village", value: "lucaya-village" },
  { label: "Magic Village Views", value: "magic-village-views" },
  { label: "Magic Village Yards", value: "magic-village-yards" },
  { label: "Margaritaville Resort Orlando", value: "margaritaville-resort-orlando" },
  { label: "Oakwater Resort", value: "oakwater-resort" },
  { label: "Paradise Palms", value: "paradise-palms" },
  { label: "Paradiso Grande", value: "paradiso-grande" },
  { label: "Regal Oaks Resort", value: "regal-oaks-resort" },
  { label: "Regal Palms Resort & Spa at Highlands Reserve", value: "regal-palms-resort" }, // Corrected slug
  { label: "Reunion Resort", value: "reunion-resort" },
  { label: "Seasons", value: "seasons" },
  { label: "Secret Lake Resort", value: "secret-lake-resort" },
  { label: "Solara Resort", value: "solara-resort" },
  { label: "Sonoma Resort", value: "sonoma-resort" },
  { label: "Summerville Resort", value: "summerville-resort" },
  { label: "Sunset Lakes", value: "sunset-lakes" },
  { label: "Terra Esmeralda", value: "terra-esmeralda" },
  { label: "Terra Verde Resort", value: "terra-verde-resort" },
  { label: "The Enclaves at Festival", value: "the-enclaves-at-festival" }, // Corrected slug
  { label: "The Hub at Westside Reserve", value: "the-hub-at-westside-reserve" }, // Corrected slug
  { label: "The Manors at Westridge", value: "the-manors-at-westridge" }, // Corrected slug
  { label: "The Palms at Lake Davenport", value: "the-palms-at-lake-davenport" }, // Corrected slug
  { label: "Veranda Palms", value: "veranda-palms" },
  { label: "Villas at Seven Dwarfs", value: "villas-at-seven-dwarfs" },
  { label: "Vista Cay", value: "vista-cay" },
  { label: "West Lucaya", value: "west-lucaya" },
  { label: "Wilshire Oaks", value: "wilshire-oaks" },
  { label: "Windsor at Westside", value: "windsor-at-westside" },
  { label: "Windsor Cay", value: "windsor-cay" },
  { label: "Windsor Hills Resort", value: "windsor-hills-resort" },
  { label: "Windsor Palms Resort", value: "windsor-palms-resort" },
  { label: "Crystal Cove", value: "crystal-cove" },
  { label: "Cumbrian Lakes", value: "cumbrian-lakes" },
  { label: "Encore Resort at Reunion", value: "encore-resort-at-reunion" },
  { label: "Regal Oaks", value: "regal-oaks" },
  { label: "Reunion", value: "reunion" },
  { label: "Sandy Ridge", value: "sandy-ridge" },
  { label: "Serenity at Silver Creek", value: "serenity-at-silver-creek" },
]

const locations = [
  { label: "Davenport", value: "davenport" },
  { label: "Kissimmee", value: "kissimmee" },
  { label: "Orlando", value: "orlando" },
  { label: "Clermont", value: "clermont" },
]

const condosWithLocations = {
  "Solterra Resort": "Davenport",
  "Storey Lake Resort": "Kissimmee",
  "Paradise Palms Resort": "Kissimmee",
  "ChampionsGate Resort": "Davenport",
  "Windsor Island Resort": "Davenport",
  "Bella Vida Resort": "Kissimmee",
  "Emerald Island Resort": "Kissimmee",
  "Bridgewater Crossing": "Davenport",
  Calabria: "Kissimmee",
  "Compass Bay": "Kissimmee",
  "Crescent Lakes": "Kissimmee",
  "Crystal Cove Resort": "Kissimmee",
  "Eagle Pointe": "Kissimmee",
  "Encantada Resort": "Kissimmee",
  "Fiesta Key": "Kissimmee",
  "Formosa Valley": "Kissimmee",
  "Hampton Lakes": "Davenport",
  "Indian Creek": "Kissimmee",
  "Lake Berkley Resort": "Kissimmee",
  "Le Reve": "Kissimmee",
  "Liberty Village": "Kissimmee",
  Lindfields: "Kissimmee",
  "Lucaya Village": "Kissimmee",
  "Magic Village Views": "Kissimmee",
  "Magic Village Yards": "Kissimmee",
  "Margaritaville Resort Orlando": "Kissimmee",
  "Oakwater Resort": "Kissimmee",
  "Paradise Palms": "Kissimmee",
  "Paradiso Grande": "Kissimmee",
  "Regal Oaks Resort": "Kissimmee",
  "Regal Palms Resort & Spa at Highlands Reserve": "Davenport",
  "Reunion Resort": "Kissimmee",
  Seasons: "Kissimmee",
  "Secret Lake Resort": "Kissimmee",
  "Solara Resort": "Kissimmee",
  "Sonoma Resort": "Kissimmee",
  "Summerville Resort": "Kissimmee",
  "Sunset Lakes": "Kissimmee",
  "Terra Esmeralda": "Kissimmee",
  "Terra Verde Resort": "Kissimmee",
  "The Enclaves at Festival": "Davenport",
  "The Hub at Westside Reserve": "Kissimmee",
  "The Manors at Westridge": "Davenport",
  "The Palms at Lake Davenport": "Davenport",
  "Veranda Palms": "Kissimmee",
  "Villas at Seven Dwarfs": "Kissimmee",
  "Vista Cay": "Orlando",
  "West Lucaya": "Kissimmee",
  "Wilshire Oaks": "Kissimmee",
  "Windsor at Westside": "Kissimmee",
  "Windsor Cay": "Clermont",
  "Windsor Hills Resort": "Kissimmee",
  "Windsor Palms Resort": "Kissimmee",
  "Crystal Cove": "Kissimmee",
  "Cumbrian Lakes": "Kissimmee",
  "Encore Resort at Reunion": "Kissimmee",
  "Regal Oaks": "Kissimmee",
  Reunion: "Kissimmee",
  "Sandy Ridge": "Davenport",
  "Serenity at Silver Creek": "Davenport",
}

export default function RoiToolInterface({
  onBackClick,
  activeRoiView,
  setActiveRoiView,
  savedROIs,
  setSavedROIs,
  favoriteAgents,
  setFavoriteAgents,
}: RoiToolInterfaceProps) {
  const [condominio, setCondominio] = useState<string>("")
  const [modeloImovel, setModeloImovel] = useState<string>("")
  const [quartos, setQuartos] = useState<string>("1")
  const [piscinaPrivativa, setPiscinaPrivativa] = useState<boolean>(false)
  const [localizacao, setLocalizacao] = useState<string>("")
  const [entradaType, setEntradaType] = useState<"value" | "percentage">("value")
  const [incluirDecoracao, setIncluirDecoracao] = useState<boolean>(false)
  const [valorDecoracaoDisplay, setValorDecoracaoDisplay] = useState<string>("")
  const [valorDecoracaoNumeric, setValorDecoracaoNumeric] = useState<number | null>(null)
  const [percentualDecoracaoDisplay, setPercentualDecoracaoDisplay] = useState<string>("")
  const [percentualDecoracaoNumeric, setPercentualDecoracaoNumeric] = useState<number | null>(null)
  const [incluirFechamento, setIncluirFechamento] = useState<boolean>(false)
  const [percentualFechamentoDisplay, setPercentualFechamentoDisplay] = useState<string>("")
  const [percentualFechamentoNumeric, setPercentualFechamentoNumeric] = useState<number | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [purchasePriceDisplay, setPurchasePriceDisplay] = useState<string>("")
  const [purchasePriceValue, setPurchasePriceValue] = useState<number | null>(null)
  const [entradaValueDisplay, setEntradaValueDisplay] = useState<string>("")
  const [entradaValueNumeric, setEntradaValueNumeric] = useState<number | null>(null)
  const [entradaPercentageDisplay, setEntradaPercentageDisplay] = useState<string>("")
  const [entradaPercentageNumeric, setEntradaPercentageNumeric] = useState<number | null>(null)
  const [lastDecorationInputType, setLastDecorationInputType] = useState<"value" | "percentage" | null>(null)
  const [formErrors, setFormErrors] = useState<{
    purchasePrice?: string
    condominio?: string
    quartos?: string
    entrada?: string
  }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [viewState, setViewState] = useState<"form" | "loading" | "results">("form")
  const [loadingMessage, setLoadingMessage] = useState("Verificando dados...")
  const [formData, setFormData] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const [isFavorite, setIsFavorite] = useState(favoriteAgents.includes("tom-roi")) // Estado para o botão de favoritar
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "financed">("financed")
  const [financingYears, setFinancingYears] = useState<string>("30")

  // Helper components to ensure icons are rendered as valid React children
  const RenderTrash2 = (props: React.SVGProps<SVGSVGElement>) => <Trash2 {...props} />
  const RenderEye = (props: React.SVGProps<SVGSVGElement>) => <Eye {...props} />

  useEffect(() => {
    setIsFavorite(favoriteAgents.includes("tom-roi"))
  }, [favoriteAgents])

  const handleToggleFavorite = () => {
    if (isFavorite) {
      setFavoriteAgents((prev) => prev.filter((agent) => agent !== "tom-roi"))
    } else {
      setFavoriteAgents((prev) => [...prev, "tom-roi"])
    }
    setIsFavorite(!isFavorite)
  }

  // Adicione a função `exportToPDF` before do `return` principal do componente `RoiToolInterface`:
  const exportToPDF = async () => {
    // Captura o elemento do dashboard
    const dashboardElement = document.getElementById("dashboard-content")

    if (!dashboardElement) return

    try {
      // Mostra loading enquanto gera o PDF
      alert("Gerando PDF... Por favor, aguarde.")

      // Captura o dashboard como imagem
      const canvas = await html2canvas(dashboardElement, {
        scale: 1.5, // Changed from 2 to 1.5
        useCORS: true,
        logging: false,
        windowWidth: 1200,
        windowHeight: dashboardElement.scrollHeight,
      })

      // Cria o PDF
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true, // Added compression
      })

      // Calcula as dimensões para caber em uma página
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 10

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio - 20)

      // Nome do arquivo com data e condomínio
      const condominioNome = condominios.find((c) => c.value === formData?.condominio)?.label || "Analise"
      const fileName = `ROI_${condominioNome.replace(/\s+/g, "_")}_${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.pdf`

      pdf.save(fileName)
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      alert("Erro ao gerar PDF. Por favor, tente novamente.")
    }
  }

  // All the existing handler functions remain the same
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0])
    }
  }

  const handlePurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const cleanedValue = rawValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
    e.target.value = cleanedValue
    const numericValue = Number.parseFloat(cleanedValue)

    if (!isNaN(numericValue)) {
      setPurchasePriceValue(numericValue)
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      setPurchasePriceDisplay(formatter.format(numericValue))
    } else {
      setPurchasePriceValue(null)
      setPurchasePriceDisplay("")
    }
  }

  const handleEntradaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const cleanedValue = rawValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
    e.target.value = cleanedValue
    const numericValue = Number.parseFloat(cleanedValue)

    if (!isNaN(numericValue)) {
      setEntradaValueNumeric(numericValue)
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      setEntradaValueDisplay(formatter.format(numericValue))
    } else {
      setEntradaValueNumeric(null)
      setEntradaValueDisplay("")
    }
  }

  const handleEntradaPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const cleanedValue = rawValue.replace(/[^0-9.]/g, "")
    e.target.value = cleanedValue
    let numericValue = Number.parseFloat(cleanedValue)

    if (!isNaN(numericValue)) {
      if (numericValue > 100) numericValue = 100
      if (numericValue < 0) numericValue = 0

      setEntradaPercentageNumeric(numericValue)
      setEntradaPercentageDisplay(`${numericValue}%`)
    } else {
      setEntradaPercentageNumeric(null)
      setEntradaPercentageDisplay("")
    }
  }

  const handleValorDecoracaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const cleanedValue = rawValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
    e.target.value = cleanedValue
    const numericValue = Number.parseFloat(cleanedValue)

    setValorDecoracaoNumeric(isNaN(numericValue) ? null : numericValue)
    setValorDecoracaoDisplay(
      isNaN(numericValue)
        ? cleanedValue
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(numericValue),
    )

    setLastDecorationInputType("value")

    if (!isNaN(numericValue) && purchasePriceValue !== null && purchasePriceValue > 0) {
      const newPercentual = (numericValue / purchasePriceValue) * 100
      setPercentualDecoracaoNumeric(newPercentual)
      setPercentualDecoracaoDisplay(`${newPercentual.toFixed(2)}%`)
    } else {
      setPercentualDecoracaoNumeric(null)
      setPercentualDecoracaoDisplay("")
    }
  }

  const handlePercentualDecoracaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const cleanedValue = rawValue.replace(/[^0-9.]/g, "")
    e.target.value = cleanedValue
    let numericValue = Number.parseFloat(cleanedValue)

    if (!isNaN(numericValue)) {
      if (numericValue > 100) numericValue = 100
      if (numericValue < 0) numericValue = 0
    }

    setPercentualDecoracaoNumeric(isNaN(numericValue) ? null : numericValue)
    setPercentualDecoracaoDisplay(isNaN(numericValue) ? cleanedValue : `${numericValue}%`)

    setLastDecorationInputType("percentage")

    if (!isNaN(numericValue) && purchasePriceValue !== null && purchasePriceValue > 0) {
      const newValor = (numericValue / 100) * purchasePriceValue
      setValorDecoracaoNumeric(newValor)
      setValorDecoracaoDisplay(
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(newValor),
      )
    } else {
      setValorDecoracaoNumeric(null)
      setValorDecoracaoDisplay("")
    }
  }

  const handlePercentualFechamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const cleanedValue = rawValue.replace(/[^0-9.]/g, "")
    e.target.value = cleanedValue
    let numericValue = Number.parseFloat(cleanedValue)

    if (!isNaN(numericValue)) {
      if (numericValue > 100) numericValue = 100
      if (numericValue < 0) numericValue = 0

      setPercentualFechamentoNumeric(numericValue)
      setPercentualFechamentoDisplay(`${numericValue}%`)
    } else {
      setPercentualFechamentoNumeric(null)
      setPercentualFechamentoDisplay("")
    }
  }

  useEffect(() => {
    const formatCurrency = (num: number | null) => {
      if (num === null || isNaN(num)) return ""
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num)
    }

    const formatPercentage = (num: number | null) => {
      if (num === null || isNaN(num)) return ""
      return `${num.toFixed(2)}%`
    }

    if (!incluirDecoracao || purchasePriceValue === null || purchasePriceValue <= 0) {
      setValorDecoracaoNumeric(null)
      setValorDecoracaoDisplay("")
      setPercentualDecoracaoNumeric(null)
      setPercentualDecoracaoDisplay("")
      if (!incluirDecoracao) {
        // Only reset last input type if switch is explicitly turned off
        setLastDecorationInputType(null)
      }
      return
    }

    if (lastDecorationInputType === "percentage" && percentualDecoracaoNumeric !== null) {
      const newValor = (percentualDecoracaoNumeric / 100) * purchasePriceValue
      setValorDecoracaoNumeric(newValor)
      setValorDecoracaoDisplay(formatCurrency(newValor))
    } else if (lastDecorationInputType === "value" && valorDecoracaoNumeric !== null) {
      const newPercentual = (valorDecoracaoNumeric / purchasePriceValue) * 100
      setPercentualDecoracaoNumeric(newPercentual)
      setPercentualDecoracaoDisplay(formatPercentage(newPercentual))
    } else {
      // If no explicit input was given, or previous values were invalid, clear them
      setValorDecoracaoNumeric(null)
      setValorDecoracaoDisplay("")
      setPercentualDecoracaoNumeric(null)
      setPercentualDecoracaoDisplay("")
    }
  }, [incluirDecoracao, purchasePriceValue, lastDecorationInputType, valorDecoracaoNumeric, percentualDecoracaoNumeric])

  const validateForm = () => {
    const errors: typeof formErrors = {}

    if (!purchasePriceValue || purchasePriceValue <= 0) {
      errors.purchasePrice = "Preço de compra é obrigatório"
    }

    if (!condominio) {
      errors.condominio = "Condomínio é obrigatório"
    }

    if (!quartos || Number.parseInt(quartos) < 1) {
      errors.quartos = "Número de quartos é obrigatório"
    }

    if (entradaType === "value" && (!entradaValueNumeric || entradaValueNumeric <= 0)) {
      errors.entrada = "Valor da entrada é obrigatório"
    } else if (entradaType === "percentage" && (!entradaPercentageNumeric || entradaPercentageNumeric <= 0)) {
      errors.entrada = "Porcentagem da entrada é obrigatória"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Armazena dados do formulário
      setFormData({
        purchasePrice: purchasePriceValue,
        condominio,
        localizacao,
        modeloImovel,
        quartos,
        piscinaPrivativa,
        entradaType,
        entradaValue: entradaType === "value" ? entradaValueNumeric : entradaPercentageNumeric,
        entradaPercentageNumeric: entradaPercentageNumeric, // Passar para calculateROI
        incluirDecoracao,
        valorDecoracaoNumeric: valorDecoracaoNumeric, // Passar para calculateROI
        percentualDecoracaoNumeric: percentualDecoracaoNumeric, // Passar para calculateROI
        incluirFechamento,
        percentualFechamentoNumeric: percentualFechamentoNumeric, // Passar para calculateROI
        logoFile,
        poolMaintenanceCost: piscinaPrivativa ? 150 : 0, // Add this line
        paymentMethod,
        financingYears: paymentMethod === "financed" ? financingYears : null,
      })

      // Cria um ID único para o ROI
      const newROI = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias
        condominio: condominios.find((c) => c.value === condominio)?.label || "",
        localizacao: locations.find((l) => l.value === localizacao)?.label || "",
        quartos,
        purchasePrice: purchasePriceValue,
        data: {
          purchasePrice: purchasePriceValue,
          condominio,
          localizacao,
          modeloImovel,
          quartos,
          piscinaPrivativa,
          entradaType,
          entradaValue: entradaType === "value" ? entradaValueNumeric : entradaPercentageNumeric,
          entradaPercentageNumeric: entradaPercentageNumeric, // Passar para calculateROI
          incluirDecoracao,
          valorDecoracaoNumeric: valorDecoracaoNumeric, // Passar para calculateROI
          percentualDecoracaoNumeric: percentualDecoracaoNumeric, // Passar para calculateROI
          incluirFechamento,
          percentualFechamentoNumeric: percentualFechamentoNumeric, // Passar para calculateROI
          logoFile,
          paymentMethod, // Adicione esta linha
          financingYears: paymentMethod === "financed" ? financingYears : null, // Adicione esta linha
        },
      }

      // Salva no estado (futuramente será no Supabase)
      setSavedROIs((prev) => [...prev, newROI])

      // Inicia o loading
      setViewState("loading")
      setProgress(0)

      // Simula progresso do loading
      simulateLoading()
    }
  }

  const simulateLoading = () => {
    const messages = [
      "Analisando dados do mercado local...",
      "Analisando comparáveis na região...",
      "Calculando taxa de ocupação média...",
      "Verificando sazonalidade turística...",
      "Processando despesas operacionais...",
      "Analisando histórico de valorização...",
      "Calculando Cap Rate projetado...",
      "Gerando fluxo de caixa detalhado...",
      "Comparando métricas de mercado...",
      "Preparando apresentação completa...",
    ]

    setLoadingMessage(messages[0])
    let currentProgress = 0
    let messageIndex = 0

    // Simula progresso mais realista
    const progressInterval = setInterval(() => {
      // Incremento variável para parecer mais natural
      const increment = Math.random() * 3 + 0.5 // Entre 0.5% e 3.5%
      currentProgress = Math.min(currentProgress + increment, 99)

      setProgress(Math.floor(currentProgress))

      // Muda mensagem baseado no progresso
      const newMessageIndex = Math.floor(currentProgress / 10)
      if (newMessageIndex !== messageIndex && newMessageIndex < messages.length) {
        messageIndex = newMessageIndex
        setLoadingMessage(messages[messageIndex])
      }

      // Quando chegar perto de 100%, finaliza
      if (currentProgress >= 99) {
        clearInterval(progressInterval)

        // Pequena pausa antes de completar 100%
        setTimeout(() => {
          setProgress(100)
          setLoadingMessage("Preparando apresentação completa...")

          // Aguarda um momento com 100% antes de mudar de tela
          setTimeout(() => {
            setViewState("results") // This will eventually go to the results dashboard
          }, 800)
        }, 500)
      }
    }, 100) // Atualiza a cada 100ms para movimento suave
  }

  useEffect(() => {
    if (paymentMethod === "cash") {
      setEntradaType("percentage")
      setEntradaPercentageNumeric(100)
      setEntradaPercentageDisplay("100%")
    }
  }, [paymentMethod])

  const filteredFavoriteAgents = apps.filter((app) => favoriteAgents.includes(app.name))

  return (
    <>
      {/* View do Formulário - Agents Arca */}
      {activeRoiView === "agents" && (
        <>
          {viewState === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 mt-0 relative"
            >
              {/* Botões no canto superior direito */}
              <div className="flex justify-center mt-4 mb-4 md:absolute md:top-[-64px] md:right-0 md:mt-0 md:mb-0 z-10">
                <div className="flex gap-3">
                  {/* Botão Meus ROIs */}
                  <Button
                    variant="outline"
                    onClick={() => setActiveRoiView("my-rois")} // Corrigido para setActiveRoiView
                    className="rounded-2xl bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 h-10 px-4 flex items-center"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Meus ROIs
                    {savedROIs.length > 0 && (
                      <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {savedROIs.length}
                      </span>
                    )}
                  </Button>

                  {/* Botão Voltar para Agents */}
                  <Button
                    variant="outline"
                    onClick={onBackClick}
                    className="rounded-2xl bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 h-10 px-4"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Voltar para Agents Arca
                  </Button>
                </div>
              </div>
              {/* Main Split Screen Layout */}
              <div className="flex flex-col lg:flex-row min-h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-white">
                {/* Left Side - Glass Effect Card with Avatar */}
                <div className="lg:w-2/5 relative p-8 flex flex-col items-center justify-center text-center space-y-6">
                  {/* Glass effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 backdrop-blur-sm bg-sky-50 opacity-30"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-2.5">
                    <div className="w-24 h-24 lg:w-[200px] lg:h-[200px] rounded-full bg-white/30 backdrop-blur-md shadow-xl border border-white/20 flex items-center justify-center">
                      <img
                        src="/avatar-tom-new.png"
                        alt="Avatar TOM"
                        className="w-20 h-20 lg:w-[180px] lg:h-[180px] rounded-full object-cover shadow-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-bold text-gray-800 text-2xl lg:text-3xl">TOM Gerador de ROI</h2>
                      <p className="text-gray-600 max-w-xs text-base lg:text-lg leading-6">
                        Análise de Imóveis de Curta Temporada em Orlando
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Optimized Form */}
                <div className="lg:w-3/5 p-6 lg:p-8 overflow-y-auto bg-[rgba(255,253,253,1)]">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <p className="text-sm text-gray-500 mb-4">* Campos obrigatórios</p>
                    {/* Informações do Imóvel */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold border-b border-gray-100 pb-2 text-slate-700">
                        Informações do Imóvel
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <Label htmlFor="purchase-price" className="text-sm text-gray-600 mb-1 block">
                            Preço de Compra (USD) <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="purchase-price"
                            type="text"
                            placeholder="Ex: $840,400"
                            className="h-10 rounded-lg border-gray-200"
                            value={purchasePriceDisplay}
                            onChange={handlePurchasePriceChange}
                          />
                          {formErrors.purchasePrice && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.purchasePrice}</p>
                          )}
                        </div>

                        <div>
                          <AutocompleteInput
                            label={
                              <>
                                Condomínio <span className="text-red-500 ml-1">*</span>
                              </>
                            }
                            placeholder="Selecione o condomínio"
                            value={condominio}
                            onChange={(selectedValue) => {
                              setCondominio(selectedValue)
                              const selectedCondoLabel = condominios.find((c) => c.value === selectedValue)?.label
                              if (selectedCondoLabel && condosWithLocations[selectedCondoLabel]) {
                                const locationLabel = condosWithLocations[selectedCondoLabel]
                                const correspondingLocation = locations.find((loc) => loc.label === locationLabel)
                                if (correspondingLocation) {
                                  setLocalizacao(correspondingLocation.value)
                                } else {
                                  setLocalizacao("")
                                }
                              } else {
                                setLocalizacao("")
                              }
                            }}
                            options={condominios}
                          />
                          {formErrors.condominio && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.condominio}</p>
                          )}
                        </div>

                        <div>
                          <AutocompleteInput
                            label="Localização"
                            placeholder="Localização automática"
                            value={localizacao}
                            onChange={setLocalizacao}
                            options={locations}
                            readOnly
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:col-span-2">
                          <div className="md:col-span-1">
                            <Label htmlFor="modelo-imovel" className="text-sm text-gray-600 mb-1 block">
                              Modelo do Imóvel
                            </Label>
                            <Input
                              id="modelo-imovel"
                              type="text"
                              placeholder="Ex: Single Family, Townhouse"
                              className="h-10 rounded-lg border-gray-200"
                              value={modeloImovel}
                              onChange={(e) => setModeloImovel(e.target.value)}
                            />
                          </div>

                          <div className="md:col-span-1">
                            <Label htmlFor="quartos" className="text-sm text-gray-600 mb-1 block">
                              Quartos <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="quartos"
                              type="number"
                              placeholder="Digite a quantidade de quartos"
                              className="h-10 rounded-lg border-gray-200"
                              value={quartos}
                              onChange={(e) => {
                                const rawValue = e.target.value
                                let numericValue = Number.parseInt(rawValue, 10)

                                if (isNaN(numericValue)) {
                                  setQuartos("")
                                } else {
                                  numericValue = Math.max(1, Math.min(15, numericValue))
                                  setQuartos(String(numericValue))
                                }
                              }}
                              min="1"
                              max="15"
                            />
                            {formErrors.quartos && <p className="text-red-500 text-xs mt-1">{formErrors.quartos}</p>}
                          </div>

                          <div className="md:col-span-1 flex flex-col justify-end">
                            <Label htmlFor="piscina-privativa" className="text-sm text-gray-600 mb-1 block">
                              Piscina Privativa?
                            </Label>
                            <div className="h-10 flex items-center justify-start">
                              <Switch
                                id="piscina-privativa"
                                checked={piscinaPrivativa}
                                onCheckedChange={setPiscinaPrivativa}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Custos Iniciais */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold border-b border-gray-100 pb-2 text-slate-700">
                        Custos Iniciais
                      </h3>

                      <div className="space-y-3">
                        {/* Método de Pagamento */}
                        <div className="mb-4">
                          <Label className="text-sm text-gray-600 mb-2 block">
                            Forma de Pagamento <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Tabs
                            value={paymentMethod}
                            onValueChange={(value) => setPaymentMethod(value as "cash" | "financed")}
                          >
                            <TabsList className="grid w-full grid-cols-2 h-10 p-1 bg-gray-100 rounded-xl shadow-inner">
                              <TabsTrigger
                                value="cash"
                                className="text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-semibold transition-all"
                              >
                                À Vista
                              </TabsTrigger>
                              <TabsTrigger
                                value="financed"
                                className="text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-semibold transition-all"
                              >
                                Financiado
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>

                        {/* Tempo de Financiamento - Aparece apenas se escolher Financiado */}
                        {paymentMethod === "financed" && (
                          <div className="mb-4 pl-4 border-l-2 border-blue-200">
                            <Label htmlFor="financing-years" className="text-sm text-gray-600 mb-1 block">
                              Tempo de Financiamento (anos)
                            </Label>
                            <Input
                              id="financing-years"
                              type="number"
                              value={financingYears}
                              onChange={(e) => {
                                const value = e.target.value
                                const numericValue = Number.parseInt(value, 10)

                                if (value === "" || (numericValue >= 1 && numericValue <= 30)) {
                                  setFinancingYears(value)
                                }
                              }}
                              placeholder="Ex: 30"
                              min="1"
                              max="30"
                              className="h-10 rounded-lg border-gray-200"
                            />
                          </div>
                        )}
                        <div>
                          <Label className="text-sm text-gray-600 mb-1 block">
                            Entrada <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Tabs
                            value={entradaType}
                            onValueChange={(value) => setEntradaType(value as "value" | "percentage")}
                          >
                            <TabsList className="grid w-full grid-cols-2 h-10 p-1 bg-gray-100 rounded-xl shadow-inner">
                              <TabsTrigger
                                value="value"
                                className="text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-semibold transition-all"
                              >
                                Valor ($)
                              </TabsTrigger>
                              <TabsTrigger
                                value="percentage"
                                className="text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-semibold transition-all"
                              >
                                Porcentagem (%)
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="value" className="mt-2">
                              <Input
                                type="text"
                                placeholder="Valor da entrada em USD"
                                className="h-10 rounded-lg border-gray-200"
                                value={entradaValueDisplay}
                                onChange={handleEntradaValueChange}
                              />
                            </TabsContent>
                            <TabsContent value="percentage" className="mt-2">
                              <Input
                                type="text"
                                placeholder="Porcentagem da entrada"
                                value={entradaPercentageDisplay}
                                onChange={handleEntradaPercentageChange}
                                className="h-10 rounded-lg border-gray-200"
                              />
                            </TabsContent>
                          </Tabs>
                          {formErrors.entrada && <p className="text-red-500 text-xs mt-1">{formErrors.entrada}</p>}
                        </div>

                        {incluirDecoracao && (
                          <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="incluir-decoracao" className="text-sm text-gray-600">
                                Incluir Custos de Decoração?
                              </Label>
                              <Switch
                                id="incluir-decoracao"
                                checked={incluirDecoracao}
                                onCheckedChange={setIncluirDecoracao}
                              />
                            </div>
                            <div>
                              <Label htmlFor="valor-decoracao" className="text-sm text-gray-600 mb-1 block">
                                Valor da Decoração (USD)
                              </Label>
                              <Input
                                id="valor-decoracao"
                                type="text"
                                placeholder="Ex: $30,000"
                                value={valorDecoracaoDisplay}
                                onChange={handleValorDecoracaoChange}
                                className="h-10 rounded-lg border-gray-200"
                              />
                            </div>
                            <div>
                              <Label htmlFor="percentual-decoracao" className="text-sm text-gray-600 mb-1 block">
                                % sobre valor do imóvel
                              </Label>
                              <Input
                                id="percentual-decoracao"
                                type="text"
                                placeholder="Ex: 5%"
                                value={percentualDecoracaoDisplay}
                                onChange={handlePercentualDecoracaoChange}
                                className="h-10 rounded-lg border-gray-200"
                              />
                            </div>
                          </div>
                        )}
                        {!incluirDecoracao && (
                          <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="incluir-decoracao" className="text-sm text-gray-600">
                                Incluir Custos de Decoração?
                              </Label>
                              <Switch
                                id="incluir-decoracao"
                                checked={incluirDecoracao}
                                onCheckedChange={setIncluirDecoracao}
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="incluir-fechamento" className="text-sm text-gray-600">
                              Incluir Custos de Fechamento?
                            </Label>
                            <Switch
                              id="incluir-fechamento"
                              checked={incluirFechamento}
                              onCheckedChange={setIncluirFechamento}
                            />
                          </div>
                          {incluirFechamento && (
                            <div className="pl-4 border-l-2 border-blue-200">
                              <Label htmlFor="percentual-fechamento" className="text-sm text-gray-600 mb-1 block">
                                % de Fechamento
                              </Label>
                              <Input
                                id="percentual-fechamento"
                                type="text"
                                placeholder="Ex: 2%"
                                value={percentualFechamentoDisplay}
                                onChange={handlePercentualFechamentoChange}
                                className="h-10 rounded-lg border-gray-200"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Outros */}
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="logo-upload" className="text-sm text-gray-600 mb-1 block">
                          Logo do Corretor (Opcional)
                        </Label>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="custom-file-upload-button"
                        >
                          <svg
                            aria-hidden="true"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeWidth="2"
                              stroke="#ffffff"
                              d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            ></path>
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="2"
                              stroke="#ffffff"
                              d="M17 15V18M17 21V18M17 18H14M17 18H20"
                            ></path>
                          </svg>
                          ESCOLHER ARQUIVO
                        </button>
                        {logoFile && <p className="text-xs text-gray-500 mt-1">Arquivo selecionado: {logoFile.name}</p>}
                        <p className="text-xs text-gray-500 mt-1">Arquivos aceitos: JPEG, PNG, SVG, até 5MB.</p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <StarBorder as="button" type="submit" className="w-full h-12" color="#3B82F6">
                        Gerar Análise de ROI
                      </StarBorder>
                    </div>
                    <div className="mt-4 text-center text-xs font-extralight text-slate-500">
                      Os dados gerados pela Arca AI são estimativas para auxiliar sua análise. Confira informações
                      importantes antes de tomar decisões.
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* Modal de Loading */}
          {viewState === "loading" && (
            <>
              {/* Overlay com blur */}
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={(e) => e.preventDefault()}
              />

              {/* Modal de Loading */}
              <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto"
                >
                  <div className="text-center space-y-6">
                    {/* Ícone de Loading Animado */}
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
                      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-full">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                      </div>
                    </div>

                    {/* Mensagem de Loading */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">Gerando análise de investimento</h3>
                      <p className="text-gray-600 text-sm animate-pulse">{loadingMessage}</p>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>

                    {/* Porcentagem */}
                    <p className="text-sm text-gray-500 font-medium">{progress}% concluído</p>
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* View dos Resultados */}
          {viewState === "results" &&
            (() => {
              const calculations = calculateROI(formData)
              if (!calculations) return <div>Erro nos cálculos</div>

              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-7xl mx-auto p-6"
                >
                  {/* Header com botão Nova Análise */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Análise de Retorno do Investimento</h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <Button
                        variant="outline"
                        onClick={exportToPDF}
                        className="rounded-xl bg-white shadow-sm border-gray-200 hover:bg-gray-50"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Exportar PDF
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setViewState("form")
                          setActiveRoiView("agents")
                        }}
                        className="rounded-xl bg-white shadow-sm border-gray-200 hover:bg-gray-50"
                      >
                        <BarChart3Icon className="mr-2 h-4 w-4" />
                        Nova Análise
                      </Button>
                    </div>
                  </div>

                  {/* Container principal dos resultados */}
                  <div id="dashboard-content" className="bg-white rounded-2xl shadow-xl p-6">
                    {" "}
                    {/* Changed p-8 to p-6 */}
                    {/* Header com informações do imóvel */}
                    <div className="relative p-4 rounded-xl mb-6 overflow-hidden">
                      {" "}
                      {/* Changed p-6 to p-4, mb-8 to mb-6 */}
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('https://i.imgur.com/cWIVQhM.jpg')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-700/80 opacity-30 bg-gray-500" />
                      <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left">
                        <div className="flex items-center gap-4">
                          {formData?.logoFile && (
                            <div className="bg-white rounded-lg p-2 shadow-lg">
                              <img
                                src={URL.createObjectURL(formData.logoFile) || "/placeholder.svg"}
                                alt="Logo do Corretor"
                                className="h-16 w-auto object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <h2 className="text-lg md:text-xl font-bold mb-1 text-white">
                              {condominios.find((c) => c.value === formData?.condominio)?.label || "Condomínio"}
                            </h2>
                            <p className="text-white/90 text-xs md:text-sm">
                              {locations.find((l) => l.value === formData?.localizacao)?.label || "Localização"} •
                              {formData?.modeloImovel || "Tipo de Imóvel"} • {formData?.quartos || "0"} quartos
                              {formData?.piscinaPrivativa ? " • Com piscina" : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-center md:text-right mt-4 md:mt-0">
                          <p className="text-xs md:text-sm text-white/80">Valor do Imóvel</p>
                          <p className="text-2xl md:text-3xl font-bold text-white">
                            {formData?.purchasePrice
                              ? new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                }).format(formData.purchasePrice)
                              : "$0"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Cards Principais - ROI e Retorno Anual */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {" "}
                      {/* Changed gap-6 to gap-4, mb-8 to mb-6 */}
                      <div className="bg-gradient-to-br from-white to-gray-100 p-4 rounded-2xl text-gray-800 shadow-lg">
                        {" "}
                        {/* Changed p-8 to p-4 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-lg bg-slate-100">
                            <TrendingUp className="h-6 w-6" />
                          </div>
                          <span className="text-sm font-medium px-3 py-1 rounded-full bg-slate-200">ROI</span>
                        </div>
                        <div className="text-4xl font-bold mb-2 text-slate-500">{calculations.roi.toFixed(1)}%</div>
                        <p className="text-gray-600">Retorno sobre valor investido</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl text-white shadow-lg">
                        {" "}
                        {/* Changed p-8 to p-4 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-white/20 p-3 rounded-lg">
                            <DollarSign className="h-6 w-6" />
                          </div>
                          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                            RETORNO ANUAL TOTAL
                          </span>
                        </div>
                        <div className="text-4xl font-bold mb-2">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          }).format(calculations.totalAnnualReturn)}
                        </div>
                        <p className="text-green-100">Aluguel + valorização anual</p>
                      </div>
                    </div>
                    {/* Seção de Métricas Detalhadas */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                      {" "}
                      {/* Changed gap-6 to gap-4, mb-8 to mb-6 */}
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        {" "}
                        {/* Changed p-6 to p-4 */}
                        <div className="flex items-center mb-4">
                          <Home className="h-5 w-5 text-gray-600 mr-2" />
                          <h3 className="font-semibold text-gray-800">FINANCIAMENTO</h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Valor do imóvel</p>
                            <p className="font-semibold text-lg">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                              }).format(formData?.purchasePrice || 0)}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-sm text-gray-500">
                                Entrada (
                                {formData?.entradaType === "percentage"
                                  ? (formData?.entradaPercentageNumeric || 0) + "%"
                                  : "Valor fixo"}
                                )
                              </p>
                              <p className="font-semibold">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                }).format(
                                  calculations?.totalInvestment -
                                    (calculations?.decorationCost || 0) -
                                    (calculations?.closingCost || 0),
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Taxa de juros</p>
                              <p className="font-semibold">7.0%</p>
                            </div>
                          </div>

                          {/* Custos Adicionais */}
                          {(formData?.incluirDecoracao || formData?.incluirFechamento) && (
                            <div className="border-t pt-3 mt-3">
                              <p className="text-sm text-gray-600 font-medium mb-2">Custos Adicionais:</p>

                              {formData?.incluirDecoracao && (
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm text-gray-500">
                                    Decoração (
                                    {formData?.valorDecoracaoNumeric
                                      ? "Valor fixo"
                                      : (formData?.percentualDecoracaoNumeric || 15) + "% do imóvel"}
                                    )
                                  </span>
                                  <span className="font-semibold text-blue-600">
                                    +
                                    {new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                    }).format(calculations.decorationCost)}
                                  </span>
                                </div>
                              )}

                              {formData?.incluirFechamento && (
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm text-gray-500">
                                    Custos de Fechamento ({formData?.percentualFechamentoNumeric || 5}%)
                                  </span>
                                  <span className="font-semibold text-blue-600">
                                    +
                                    {new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                    }).format(calculations.closingCost)}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-sm text-gray-500">Parcela mensal</p>
                              <p className="font-semibold text-red-600">
                                {calculations?.monthlyMortgage
                                  ? new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                    }).format(calculations.monthlyMortgage)
                                  : "$0.00"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Prazo</p>
                              <p className="font-semibold">{formData?.financingYears || 30} anos</p>
                            </div>
                          </div>

                          {/* Investimento Total */}
                          <div className="border-t pt-3 mt-3">
                            <p className="text-sm text-gray-500">Investimento Total</p>
                            <p className="font-bold text-xl text-blue-900">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                              }).format(calculations.totalInvestment)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        {" "}
                        {/* Changed p-6 to p-4 */}
                        <div className="flex items-center mb-4">
                          <Receipt className="h-5 w-5 text-gray-600 mr-2" />
                          <h3 className="font-semibold text-gray-800">RECEITA DE ALUGUEL</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-sm text-gray-500">Diária média</p>
                              <p className="font-semibold text-lg">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                }).format(calculations.dailyRate)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Ocupação</p>
                              <p className="font-semibold text-lg">80%</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Aluguel mensal</p>
                            <p className="font-semibold text-green-600 text-xl">
                              +
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              }).format(calculations.monthlyRevenue)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Aluguel anual</p>
                            <p className="font-semibold text-green-600 text-xl">
                              +
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              }).format(calculations.annualRevenue)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        {" "}
                        {/* Changed p-6 to p-4 */}
                        <div className="flex items-center mb-4">
                          <Banknote className="h-5 w-5 text-gray-600 mr-2" />
                          <h3 className="font-semibold text-gray-800">DESPESAS MENSAIS</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {" "}
                            {/* Changed text-sm to text-xs */}
                            <div>
                              <p className="text-gray-500">Admin (20%)</p>
                              <p className="font-semibold text-red-600">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                }).format(calculations.adminFee)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">IPTU</p>
                              <p className="font-semibold text-red-600">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                }).format(calculations.propertyTax)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Seguro</p>
                              <p className="font-semibold text-red-600">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                }).format(calculations.insurance)}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {" "}
                            {/* Changed text-sm to text-xs */}
                            <div>
                              <p className="text-gray-500">Energia</p>
                              <p className="font-semibold text-red-600">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                }).format(calculations.electricity)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Água</p>
                              <p className="font-semibold text-red-600">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                }).format(calculations.water)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">HOA</p>
                              <p className="font-semibold text-red-600">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                }).format(calculations.hoa)}
                              </p>
                            </div>
                          </div>
                          {calculations.poolMaintenance > 0 && (
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              {" "}
                              {/* Changed text-sm to text-xs */}
                              <div>
                                <p className="text-gray-500">Manutenção Piscina</p>
                                <p className="font-semibold text-red-600">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                  }).format(calculations.poolMaintenance)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="border-t pt-3">
                          <p className="text-sm text-gray-500">Total despesas operacionais</p>
                          <p className="font-bold text-red-600 text-xl">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                            }).format(calculations.totalMonthlyExpenses)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Métricas de Performance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <PiggyBank className="h-5 w-5 text-purple-600" />
                          <span className="text-xs font-medium text-purple-600">MENSAL</span>
                        </div>
                        <p className="text-sm text-purple-700 mb-1">Fluxo de Caixa Líquido</p>
                        <p className="text-2xl font-bold text-purple-900">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          }).format(calculations.monthlyNetIncome)}
                        </p>
                        <p className="text-xs text-purple-600 mt-1">Após despesas e financiamento</p>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <BarChart3 className="h-5 w-5 text-green-600" />
                          <span className="text-xs font-medium text-green-600">ANUAL</span>
                        </div>
                        <p className="text-sm text-green-700 mb-1">Fluxo de Caixa Líquido</p>
                        <p className="text-2xl font-bold text-green-900">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          }).format(calculations.annualNetIncome)}
                        </p>
                        <p className="text-xs text-green-600 mt-1">Soma anual do fluxo mensal</p>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <Percent className="h-5 w-5 text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">YIELD</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-1">Net Rental Yield</p>
                        <p className="text-2xl font-bold text-blue-900">{calculations.netRentalYield.toFixed(1)}%</p>
                        <p className="text-xs text-blue-600 mt-1">Baseado no aluguel líquido</p>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <TrendingUp className="h-5 w-5 text-orange-600" />
                          <span className="text-xs font-medium text-orange-600">ENTRADA</span>
                        </div>
                        <p className="text-sm text-orange-700 mb-1">ROI só sobre Entrada</p>
                        <p className="text-2xl font-bold text-orange-900">{calculations.roi.toFixed(1)}%</p>
                        <p className="text-xs text-orange-600 mt-1">Para comparação com outros</p>
                      </div>
                    </div>
                    {/* Métricas Adicionais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl">
                        <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          VALORIZAÇÃO ANUAL
                        </h3>
                        <p className="text-3xl font-bold text-amber-900 mb-1">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          }).format(calculations.annualAppreciation)}
                        </p>
                        <p className="text-sm text-amber-700">6.0% de valorização do imóvel</p>
                      </div>

                      <div className="bg-gradient-to-r from-rose-50 to-rose-100 p-6 rounded-xl">
                        <h3 className="font-semibold text-rose-900 mb-3 flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          NET CAP RATE
                        </h3>
                        <p className="text-3xl font-bold text-rose-900 mb-1">{calculations.capRate.toFixed(1)}%</p>
                        <p className="text-sm text-rose-700">Taxa de capitalização líquida</p>
                      </div>
                    </div>
                    {/* Disclaimer */}
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-600">
                        Esta análise é uma estimativa e deve ser usada apenas para fins informativos. As condições de
                        mercado podem variar.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Análise gerada em {new Date().toLocaleDateString("pt-BR")} por Arca AI
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })()}
        </>
      )}

      {/* View Meus ROIs */}
      {activeRoiView === "my-rois" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-7xl mx-auto p-6"
        >
          {/* Header com navegação */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Meus ROIs Salvos</h1>
          </div>

          {savedROIs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum ROI salvo ainda</h3>
              <p className="text-gray-500 mb-6">Gere sua primeira análise de ROI para vê-la aqui</p>
              <Button
                onClick={() => setActiveRoiView("agents")}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Criar Análise de ROI
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedROIs.map((roi: any) => {
                // Adicionado 'any' para tipagem temporária
                const daysLeft = Math.ceil(
                  (new Date(roi.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <motion.div
                    key={roi.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                      <h3 className="font-semibold text-lg">{roi.condominio}</h3>
                      <p className="text-blue-100 text-sm">{roi.localizacao}</p>
                    </div>

                    <div className="p-6">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Valor:</span>
                          <span className="font-medium">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                            }).format(roi.purchasePrice)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Quartos:</span>
                          <span className="font-medium">{roi.quartos}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Criado em:</span>
                          <span className="font-medium">{new Date(roi.createdAt).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-xs text-yellow-700">
                          Expira em {daysLeft} {daysLeft === 1 ? "dia" : "dias"}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Carrega os dados do ROI
                            setFormData(roi.data)
                            setViewState("results")
                            setActiveRoiView("agents")
                          }}
                          className="flex-1 rounded-xl"
                        >
                          <RenderEye className="h-4 w-4 mr-1" />
                          Visualizar
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Remove o ROI
                            setSavedROIs((prev) => prev.filter((r) => r.id !== roi.id))
                          }}
                          className="text-red-600 hover:bg-red-50 rounded-xl"
                        >
                          <RenderTrash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* View Favoritos */}
      {activeRoiView === "favorites" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-7xl mx-auto p-6"
        >
          {/* Header com navegação */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Agents Favoritos</h1>
          </div>

          {filteredFavoriteAgents.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum Agent favorito ainda</h3>
              <p className="text-gray-500 mb-6">
                Marque seus Agents preferidos com a estrela para acessá-los rapidamente aqui
              </p>
              <Button
                onClick={() => setActiveRoiView("agents")}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
              >
                Ver Todos os Agents
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cards dos agents favoritos */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gauge className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">TOM Gerador de ROI</h3>
                <p className="text-gray-600 text-sm mb-4">Análise para imóveis de curta temporada em Orlando</p>
                <div className="flex gap-2">
                  <Button onClick={() => setActiveRoiView("agents")} className="flex-1 rounded-xl">
                    Acessar
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setFavoriteAgents((prev) => prev.filter((id) => id !== "tom-roi"))
                    }}
                    className="rounded-xl text-amber-500 hover:bg-amber-50"
                  >
                    <Star className="h-4 w-4" fill="currentColor" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  )
}
