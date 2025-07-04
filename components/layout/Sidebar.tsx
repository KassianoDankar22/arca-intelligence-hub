"use client"

import { useState } from "react"
import {
  ChevronDown,
  Home,
  User,
  MessageCircle,
  Search,
  Settings,
  Star,
  X,
  BarChart3,
  DollarSign,
  HelpCircle,
  Activity,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
  activeRoiView: "agents" | "my-rois" | "favorites"
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
  activeRoiView,
  setActiveRoiView,
}: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(true)

  // Sample data for sidebar navigation
  const sidebarItems = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      isActive: true,
      tabValue: "home",
    },
    {
      title: "Agents Arca",
      icon: <User className="h-5 w-5" />,
      badge: "14",
    },
    {
      title: "Arca AI Chat",
      icon: <MessageCircle className="h-5 w-5" />,
      tabValue: "files",
    },
    {
      title: "CRM",
      icon: <BarChart3 className="h-5 w-5" />,
      tabValue: "learn",
    },
    {
      title: "Financeiro",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Suporte",
      icon: <HelpCircle className="h-5 w-5" />,
    },
    {
      title: "Uso e Limites",
      icon: <Activity className="h-5 w-5" />,
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
        <div className="flex h-full flex-col bg-white">
          <div className="flex h-full flex-col border-r">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-arca.png"
                  alt="Arca Intelligence Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="font-semibold text-lg text-gray-900">Arca AI</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full rounded-lg bg-gray-50 border-0 pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  if (item.title === "Agents Arca") {
                    return (
                      <div key={item.title} className="space-y-1">
                        <button
                          onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                              Agents Arca
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="h-5 px-2 text-xs font-medium bg-gray-100 text-gray-600"
                            >
                              14
                            </Badge>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-gray-400 transition-transform duration-200",
                                isAgentsOpen && "rotate-180",
                              )}
                            />
                          </div>
                        </button>

                        {isAgentsOpen && (
                          <div className="ml-8 space-y-1">
                            <button
                              onClick={() => handleNavigateToAgentView("agents")}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-3 text-sm font-medium",
                                activeRoiView === "agents"
                                  ? "bg-blue-50 text-blue-700 shadow-sm"
                                  : "hover:bg-gray-50 text-gray-600 hover:text-gray-900",
                              )}
                            >
                              <Home className="h-4 w-4" />
                              <span>Todos os Agents</span>
                            </button>

                            <button
                              onClick={() => handleNavigateToAgentView("my-rois")}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between text-sm font-medium",
                                activeRoiView === "my-rois"
                                  ? "bg-blue-50 text-blue-700 shadow-sm"
                                  : "hover:bg-gray-50 text-gray-600 hover:text-gray-900",
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <BarChart3 className="h-4 w-4" />
                                <span>Meus ROIs</span>
                              </div>
                              {savedROIsCount > 0 && (
                                <Badge className="h-5 px-2 text-xs font-medium bg-blue-600 text-white">
                                  {savedROIsCount}
                                </Badge>
                              )}
                            </button>

                            <button
                              onClick={() => handleNavigateToAgentView("favorites")}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between text-sm font-medium",
                                activeRoiView === "favorites"
                                  ? "bg-blue-50 text-blue-700 shadow-sm"
                                  : "hover:bg-gray-50 text-gray-600 hover:text-gray-900",
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <Star className="h-4 w-4" />
                                <span>Favoritos</span>
                              </div>
                              {favoriteAgentsCount > 0 && (
                                <Badge className="h-5 px-2 text-xs font-medium bg-amber-500 text-white">
                                  {favoriteAgentsCount}
                                </Badge>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  } else {
                    return (
                      <button
                        key={item.title}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                          item.tabValue === activeTab
                            ? "bg-blue-50 text-blue-700 shadow-sm"
                            : "hover:bg-gray-50 text-gray-700 hover:text-gray-900",
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
                          <span
                            className={cn(
                              "transition-colors",
                              item.tabValue === activeTab ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700",
                            )}
                          >
                            {item.icon}
                          </span>
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="h-5 px-2 text-xs font-medium bg-gray-100 text-gray-600">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    )
                  }
                })}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t p-4">
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span>Configurações</span>
                </button>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="text-xs font-medium">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">John Doe</div>
                    <div className="text-xs text-gray-500">Plano Pro</div>
                  </div>
                  <Badge variant="outline" className="h-5 px-2 text-xs font-medium">
                    Pro
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden h-full w-64 flex-col bg-white transition-transform duration-300 ease-in-out md:flex",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b justify-center py-[17px]">
            <Image
              src="/logo-arca.png"
              alt="Arca Intelligence Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full rounded-lg bg-gray-50 border-0 pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                if (item.title === "Agents Arca") {
                  return (
                    <div key={item.title} className="space-y-1">
                      <button
                        onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Agents Arca
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="h-5 px-2 text-xs font-medium bg-gray-100 text-gray-600">
                            14
                          </Badge>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-gray-400 transition-transform duration-200",
                              isAgentsOpen && "rotate-180",
                            )}
                          />
                        </div>
                      </button>

                      {isAgentsOpen && (
                        <div className="ml-8 space-y-1">
                          <button
                            onClick={() => handleNavigateToAgentView("agents")}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-3 text-sm font-medium",
                              activeRoiView === "agents"
                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                : "hover:bg-gray-50 text-gray-600 hover:text-gray-900",
                            )}
                          >
                            <span>Todos os Agents</span>
                          </button>

                          <button
                            onClick={() => handleNavigateToAgentView("my-rois")}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between text-sm font-medium",
                              activeRoiView === "my-rois"
                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                : "hover:bg-gray-50 text-gray-600 hover:text-gray-900",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span>Meus ROIs</span>
                            </div>
                            {savedROIsCount > 0 && (
                              <Badge className="h-5 px-2 text-xs font-medium bg-blue-600 text-white">
                                {savedROIsCount}
                              </Badge>
                            )}
                          </button>

                          <button
                            onClick={() => handleNavigateToAgentView("favorites")}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between text-sm font-medium",
                              activeRoiView === "favorites"
                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                : "hover:bg-gray-50 text-gray-600 hover:text-gray-900",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span>Favoritos</span>
                            </div>
                            {favoriteAgentsCount > 0 && (
                              <Badge className="h-5 px-2 text-xs font-medium bg-amber-500 text-white">
                                {favoriteAgentsCount}
                              </Badge>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                } else {
                  return (
                    <button
                      key={item.title}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                        item.tabValue === activeTab
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "hover:bg-gray-50 text-gray-700 hover:text-gray-900",
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
                        <span
                          className={cn(
                            "transition-colors",
                            item.tabValue === activeTab ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700",
                          )}
                        >
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="h-5 px-2 text-xs font-medium bg-gray-100 text-gray-600">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  )
                }
              })}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <Settings className="h-5 w-5 text-gray-500" />
                <span>Configurações</span>
              </button>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="text-xs font-medium">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">John Doe</div>
                  <div className="text-xs text-gray-500">Plano Pro</div>
                </div>
                <Badge variant="outline" className="h-5 px-2 text-xs font-medium">
                  Pro
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
