"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BackgroundBeams } from "@/components/ui/background-beams"
import RoiToolInterface from "@/components/roi-tool-interface"

interface AgentsHubProps {
  showRoiTool: boolean
  setShowRoiTool: (show: boolean) => void
  activeRoiView: "agents" | "my-rois" | "favorites"
  setActiveRoiView: (view: "agents" | "my-rois" | "favorites") => void
  savedROIs: any[]
  setSavedROIs: React.Dispatch<React.SetStateAction<any[]>>
  favoriteAgents: string[]
  setFavoriteAgents: React.Dispatch<React.SetStateAction<string[]>>
  apps: any[]
  setActiveTab: (tab: string) => void
}

export function AgentsHub({
  showRoiTool,
  setShowRoiTool,
  activeRoiView,
  setActiveRoiView,
  savedROIs,
  setSavedROIs,
  favoriteAgents,
  setFavoriteAgents,
  apps,
  setActiveTab,
}: AgentsHubProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("Todas as Categorias")

  const handleNavigate = (view: "agents" | "my-rois" | "favorites") => {
    setActiveRoiView(view)
    setShowRoiTool(true)
    setActiveTab("apps")
  }

  return (
    <>
      {showRoiTool ? (
        <RoiToolInterface
          onBackClick={() => setShowRoiTool(false)}
          activeRoiView={activeRoiView}
          setActiveRoiView={setActiveRoiView}
          savedROIs={savedROIs}
          setSavedROIs={setSavedROIs}
          favoriteAgents={favoriteAgents}
          setFavoriteAgents={setFavoriteAgents}
        />
      ) : (
        <>
          <motion.div
            className="relative overflow-hidden rounded-xl p-6 md:p-10 text-white opacity-5 bg-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold">Agents Arca AI para Corretores</h2>
              <p className="mt-2 text-sm md:text-base text-white/80">
                Descubra agentes inteligentes para acelerar suas vendas no mercado imobiliário de Orlando.
              </p>
            </div>

            <BackgroundBeams className="absolute inset-0 z-0 pointer-events-none" />
          </motion.div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant={selectedCategory === "Todas as Categorias" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setSelectedCategory("Todas as Categorias")}
            >
              Todas as Categorias
            </Button>
            <Button
              variant={selectedCategory === "Análise" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setSelectedCategory("Análise")}
            >
              Análise
            </Button>
            <Button
              variant={selectedCategory === "Marketing" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setSelectedCategory("Marketing")}
            >
              Marketing
            </Button>
            <Button
              variant={selectedCategory === "Imagem" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setSelectedCategory("Imagem")}
            >
              Imagem
            </Button>
            <Button
              variant={selectedCategory === "Vídeo" ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setSelectedCategory("Vídeo")}
            >
              Vídeo
            </Button>
            <div className="flex-1"></div>
            <div className="relative w-full md:w-auto mt-3 md:mt-0">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Procurar Agents..." className="w-full rounded-2xl pl-9 md:w-[200px]" />
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Novos Lançamentos</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {apps
                .filter(
                  (app) => app.new && (selectedCategory === "Todas as Categorias" || app.category === selectedCategory),
                )
                .map((app) => (
                  <motion.div
                    key={app.name}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={
                      app.name === "TOM Gerador de ROI"
                        ? () => {
                            setShowRoiTool(true)
                            setActiveRoiView("agents")
                          }
                        : undefined
                    }
                    className={app.name === "TOM Gerador de ROI" ? "cursor-pointer" : ""}
                  >
                    <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                            {app.icon}
                          </div>
                          <Badge className="rounded-xl bg-amber-500">New</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription>{app.description}</CardDescription>
                        <div className="mt-2"></div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="secondary" className="w-full rounded-2xl">
                          Acessar
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Todos os Agents Arca AI</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {apps
                .filter((app) => selectedCategory === "Todas as Categorias" || app.category === selectedCategory)
                .map((app) => (
                  <motion.div
                    key={app.name}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={
                      app.name === "TOM Gerador de ROI"
                        ? () => {
                            setShowRoiTool(true)
                            setActiveRoiView("agents")
                          }
                        : undefined
                    }
                    className={app.name === "TOM Gerador de ROI" ? "cursor-pointer" : ""}
                  >
                    <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                            {app.icon}
                          </div>
                          <Badge variant="outline" className="rounded-xl">
                            {app.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription>{app.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="secondary" className="flex-1 rounded-2xl">
                          Acessar
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl bg-transparent">
                          <Star className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}
