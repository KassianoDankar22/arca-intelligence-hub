"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

import { AuroraBackground } from "@/components/ui/aurora-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RainbowButton } from "@/components/ui/rainbow-button" // Importar o novo componente
import { FcGoogle } from "react-icons/fc" // Adicione esta importação
export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <AuroraBackground>
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-4">
        <div className="w-full bg-white/30 dark:bg-zinc-800/40 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-10 border border-white/20 dark:border-zinc-700/50">
          <div className="flex justify-center mb-8">
            <div className="mix-blend-normal">
              <img src="/logo-arca.png" alt="Logo da Arca" width={48} height={48} className="h-12 w-auto mx-auto" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Fazer login</h1>
            <p className="text-slate-700 dark:text-slate-300 mt-2 text-sm">
              Entre com sua conta para acessar a plataforma.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-3 py-3 h-12 text-sm bg-white/50 dark:bg-zinc-700/50 border-slate-300 dark:border-zinc-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Senha
                </Label>
                <button
                  type="button"
                  onClick={() => alert("Funcionalidade 'Esqueci minha senha' em desenvolvimento")}
                  className="text-xs font-medium hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 text-slate-500"
                >
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-3 h-12 text-sm bg-white/50 dark:bg-zinc-700/50 border-slate-300 dark:border-zinc-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <RainbowButton type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </RainbowButton>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-300/70 dark:border-zinc-600/70" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/30 dark:bg-zinc-800/40 px-2 text-slate-600 dark:text-slate-400 backdrop-blur-sm rounded-sm">
                OU
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full h-12 text-sm font-medium border-slate-300 dark:border-zinc-600 text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-zinc-700/40 hover:bg-slate-50/50 dark:hover:bg-zinc-600/50 rounded-xl shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <FcGoogle size={20} />
            Continuar com o Google
          </Button>
        </div>

        <div className="mt-8 text-center text-xs text-slate-700 dark:text-slate-400">
          <p>
            Primeiro acesso?{" "}
            <button
              type="button"
              onClick={() => alert("Funcionalidade 'Criar conta' em desenvolvimento")}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Criar conta
            </button>
          </p>
          <p className="mt-4 leading-relaxed">
            Ao fazer login, você concorda com nossos
            <br />
            <button
              type="button"
              onClick={() => alert("Termos de Serviço")}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
            >
              Termos de Serviço
            </button>{" "}
            e{" "}
            <button
              type="button"
              onClick={() => alert("Política de Privacidade")}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
            >
              Política de Privacidade
            </button>
            .
          </p>
        </div>
      </div>
    </AuroraBackground>
  )
}
