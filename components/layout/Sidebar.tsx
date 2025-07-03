"use client"

import { useState } from "react"
import { ChevronDown, HomeIcon, MessageCircle, Search, Settings, Star, X, Gauge, Home, BarChart3 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { UserIcon } from "@/components/ui/user-icon"
import { ChartColumnIncreasingIcon } from "@/components/ui/chart-column-increasing-icon"
import { CircleDollarSignIcon } from "@/components/ui/circle-dollar-sign-icon"
import { CircleHelpIcon } from "@/components/ui/circle-help-icon"

interface SidebarProps {
  activeTab: string
  setActiveTab: (value: string) => void
  activeCrmTab: string
  setActiveCrmTab: (value: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  savedROIsCount: number
  favoriteAgentsCount: number
  setShowRoiTool: (show: boolean) => void
  activeRoiView: "agents" | "my-rois" | "favorites" // Declare the variable here
  setActiveRoiView: (value: "agents" | "my-rois" | "favorites") => void
}

export function Sidebar({
  activeTab,
  setActiveTab,
  activeCrmTab,
  setActiveCrmTab,
  sidebarOpen,
  setSidebarOpen,
  savedROIsCount,
  favoriteAgentsCount,
  setShowRoiTool,
  activeRoiView, // Use the variable here
  setActiveRoiView,
}: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(true)

  // Sample data for sidebar navigation
  const sidebarItems = [
    {
      title: "Home",
      icon: <HomeIcon />,
      isActive: true,
      tabValue: "home",
    },
    {
      title: "Agents Arca",
      icon: <UserIcon />,
      badge: "14", // Updated from "13" to "14" to reflect the new agent
    },
    {
      title: "Arca AI Chat",
      icon: <MessageCircle />,
      tabValue: "files",
    },
    {
      title: "CRM",
      icon: <ChartColumnIncreasingIcon />,
      tabValue: "learn",
    },
    {
      title: "Financeiro",
      icon: <CircleDollarSignIcon />,
    },
    {
      title: "Suporte",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Uso e Limites",
      icon: <Gauge />,
    },
  ]

  const handleNavigateToAgentView = (view: "agents" | "my-rois" | "favorites") => {
    setActiveTab("apps")
    setActiveRoiView(view)
  }

  return (
    <>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-center p-4">
            <Image
              src="/logo-arca.png"
              alt="Arca Intelligence Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="absolute right-4">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                if (item.title === "Agents Arca") {
                  return (
                    <div key={item.title} className="mb-1">
                      <button
                        onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm text-gray-700">Agents Arca</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">14</span>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-600 transition-transform ${isAgentsOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {isAgentsOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          <button
                            onClick={() => handleNavigateToAgentView("agents")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 text-sm ${
                              activeRoiView === "agents"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <Home className="h-3.5 w-3.5" />
                            <span>Todos os Agents</span>
                          </button>

                          <button
                            onClick={() => handleNavigateToAgentView("my-rois")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between text-sm ${
                              activeRoiView === "my-rois"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <BarChart3 className="h-3.5 w-3.5" />
                              <span>Meus ROIs</span>
                            </div>
                            {savedROIsCount > 0 && (
                              <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {savedROIsCount}
                              </span>
                            )}
                          </button>

                          <button
                            onClick={() => handleNavigateToAgentView("favorites")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between text-sm ${
                              activeRoiView === "favorites"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Star className="h-3.5 w-3.5" />
                              <span>Favoritos</span>
                            </div>
                            {favoriteAgentsCount > 0 && (
                              <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {favoriteAgentsCount}
                              </span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                } else {
                  return (
                    <div key={item.title} className="mb-1">
                      <button
                        className={cn(
                          "flex w-full items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors",
                          item.tabValue === activeTab ? "bg-primary/10 text-primary" : "hover:bg-gray-100",
                        )}
                        onClick={() => {
                          if (item.tabValue) {
                            setActiveTab(item.tabValue)
                            if (item.tabValue === "learn") {
                              setActiveCrmTab("dashboard")
                            }
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {item.title === "Home" && <HomeIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Arca AI Chat" && <MessageCircle className="h-5 w-5 text-gray-600" />}
                          {item.title === "CRM" && <ChartColumnIncreasingIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Financeiro" && <CircleDollarSignIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Suporte" && <CircleHelpIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Uso e Limites" && <Gauge className="h-5 w-5 text-gray-600" />}
                          <span className="text-sm text-gray-700">{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </div>
                  )
                }
              })}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pro
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden h-full w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out md:flex",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-center p-4">
            <Image
              src="/logo-arca.png"
              alt="Arca Intelligence Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                if (item.title === "Agents Arca") {
                  return (
                    <div key={item.title} className="mb-1">
                      <button
                        onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm text-gray-700">Agents Arca</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">14</span>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-600 transition-transform ${isAgentsOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {isAgentsOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          <button
                            onClick={() => handleNavigateToAgentView("agents")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 text-sm ${
                              activeRoiView === "agents"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <Home className="h-3.5 w-3.5" />
                            <span>Todos os Agents</span>
                          </button>

                          <button
                            onClick={() => handleNavigateToAgentView("my-rois")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between text-sm ${
                              activeRoiView === "my-rois"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <BarChart3 className="h-3.5 w-3.5" />
                              <span>Meus ROIs</span>
                            </div>
                            {savedROIsCount > 0 && (
                              <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {savedROIsCount}
                              </span>
                            )}
                          </button>

                          <button
                            onClick={() => handleNavigateToAgentView("favorites")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between text-sm ${
                              activeRoiView === "favorites"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Star className="h-3.5 w-3.5" />
                              <span>Favoritos</span>
                            </div>
                            {favoriteAgentsCount > 0 && (
                              <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {favoriteAgentsCount}
                              </span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                } else {
                  return (
                    <div key={item.title} className="mb-1">
                      <button
                        className={cn(
                          "flex w-full items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors",
                          item.tabValue === activeTab ? "bg-primary/10 text-primary" : "hover:bg-gray-100",
                        )}
                        onClick={() => {
                          if (item.tabValue) {
                            setActiveTab(item.tabValue)
                            if (item.tabValue === "learn") {
                              setActiveCrmTab("dashboard")
                            }
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {item.title === "Home" && <HomeIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Arca AI Chat" && <MessageCircle className="h-5 w-5 text-gray-600" />}
                          {item.title === "CRM" && <ChartColumnIncreasingIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Financeiro" && <CircleDollarSignIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Suporte" && <CircleHelpIcon className="h-5 w-5 text-gray-600" />}
                          {item.title === "Uso e Limites" && <Gauge className="h-5 w-5 text-gray-600" />}
                          <span className="text-sm text-gray-700">{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </div>
                  )
                }
              })}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pro
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
