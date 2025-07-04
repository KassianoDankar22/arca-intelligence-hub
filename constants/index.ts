// Status de leads
export const STATUS_LEADS = ["Novo", "Qualificado", "Proposta", "Negociação", "Fechado"] as const

// Temperaturas de leads com emojis
export const TEMPERATURAS_LEADS = [
  { value: "Frio", label: "❄️ Frio", emoji: "❄️" },
  { value: "Morno", label: "🌡️ Morno", emoji: "🌡️" },
  { value: "Quente", label: "🔥 Quente", emoji: "🔥" },
] as const

// Fontes de leads
export const FONTES_LEADS = [
  "Site",
  "Google",
  "Instagram",
  "Facebook",
  "Recomendacao",
  "Indicação",
  "WhatsApp",
  "Outros",
] as const

// Tipos de interesse
export const TIPOS_INTERESSE = ["Curta Temporada", "Longa Temporada", "Morar", "Investimento"] as const

// Categorias financeiras
export const CATEGORIAS_FINANCEIRAS = [
  "Aluguel",
  "Manutenção",
  "IPTU",
  "Seguro",
  "Condomínio",
  "Energia",
  "Água",
  "Internet",
  "Limpeza",
  "Decoração",
  "Marketing",
  "Comissão",
  "Taxa Cartão",
  "Outros",
] as const

// Tipos de transação
export const TIPOS_TRANSACAO = ["Receita", "Despesa"] as const

// Status de transação
export const STATUS_TRANSACAO = ["Pendente", "Pago", "Cancelado"] as const

// Cores para status de leads
export const CORES_STATUS = {
  Novo: "bg-blue-500",
  Qualificado: "bg-green-500",
  Proposta: "bg-yellow-500",
  Negociação: "bg-orange-500",
  Fechado: "bg-emerald-500",
} as const

// Cores para temperaturas
export const CORES_TEMPERATURA = {
  Frio: "text-blue-500",
  Morno: "text-yellow-500",
  Quente: "text-red-500",
} as const

// Emojis para temperaturas
export const EMOJIS_TEMPERATURA = {
  Frio: "❄️",
  Morno: "🌡️",
  Quente: "🔥",
} as const
