"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import type { User } from "@/types/common"

// Define o tipo para o valor do contexto de autenticação
interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Componente AuthProvider que fornece o contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth() // Usa o hook useAuth

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// Hook personalizado para consumir o contexto de autenticação
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
