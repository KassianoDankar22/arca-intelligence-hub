"use client"

import { useState } from "react"
import type { User } from "@/types/common" // Importa a interface User

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    // Em uma aplicação real, aqui você faria a lógica de autenticação (API call, etc.)
    // Por enquanto, apenas define o usuário
    setUser(userData)
    console.log("Usuário logado:", userData.email)
  }

  const logout = () => {
    // Em uma aplicação real, aqui você faria a lógica de logout (limpar tokens, etc.)
    setUser(null)
    console.log("Usuário deslogado")
  }

  return { user, login, logout }
}
