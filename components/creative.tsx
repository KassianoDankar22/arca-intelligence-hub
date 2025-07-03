"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  Brush,
  Camera,
  ChevronDown,
  Code,
  FileText,
  Heart,
  HomeIcon,
  ImageIcon,
  Layers,
  ArrowDownUpIcon,
  LayoutGrid,
  Menu,
  MessageSquare,
  MessageCircle,
  Palette,
  PanelLeft,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
  Video,
  Type,
  CuboidIcon,
  X,
  Gauge,
  Home,
  BarChart3,
  User,
  Plus,
  Phone,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserIcon } from "@/components/ui/user-icon"
import { ChartColumnIncreasingIcon } from "@/components/ui/chart-column-increasing-icon"
import { CircleDollarSignIcon } from "@/components/ui/circle-dollar-sign-icon"
import { CircleHelpIcon } from "@/components/ui/circle-help-icon"
import { BackgroundBeams } from "@/components/ui/background-beams"
import RoiToolInterface from "@/components/roi-tool-interface"
import { AIAssistantInterface } from "@/components/ui/ai-assistant-interface"
import { StarBorder } from "@/components/ui/star-border"

// Sample data for apps
const apps = [
  {
    name: "PixelMaster",
    icon: <ImageIcon className="text-violet-500" />,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "VectorPro",
    icon: <Brush className="text-orange-500" />,
    description: "Professional vector graphics creation",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "VideoStudio",
    icon: <Video className="text-pink-500" />,
    description: "Cinematic video editing and production",
    category: "Video",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "MotionFX",
    icon: <Sparkles className="text-blue-500" />,
    description: "Stunning visual effects and animations",
    category: "Video",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "PageCraft",
    icon: <Layers className="text-red-500" />,
    description: "Professional page design and layout",
    category: "Creative",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "UXFlow",
    icon: <ArrowDownUpIcon className="text-sky-600" />,
    description: "Intuitive user experience design",
    category: "Design",
    recent: false,
    new: true,
    progress: 85,
  },
  {
    name: "PhotoLab",
    icon: <Camera className="text-teal-500" />,
    description: "Advanced photo editing and organization",
    category: "Photography",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "DocMaster",
    icon: <FileText className="text-red-600" />,
    description: "Document editing and management",
    category: "Document",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "WebCanvas",
    icon: <Code className="text-emerald-500" />,
    description: "Web design and development",
    category: "Web",
    recent: false,
    new: true,
    progress: 70,
  },
  {
    name: "3DStudio",
    icon: <CuboidIcon className="text-indigo-500" />,
    description: "3D modeling and rendering",
    category: "3D",
    recent: false,
    new: true,
    progress: 60,
  },
  {
    name: "FontForge",
    icon: <Type className="text-amber-500" />,
    description: "Typography and font creation",
    category: "Typography",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "ColorPalette",
    icon: <Palette className="text-purple-500" />,
    description: "Color scheme creation and management",
    category: "Design",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "TOM Gerador de ROI",
    icon: <Gauge className="text-cyan-500" />,
    description: "Análise para imóveis de curta temporada em Orlando",
    category: "Análise",
    recent: false,
    new: true,
    progress: 100,
  },
]

// Sample data for recent files
const recentFiles = [
  {
    name: "Brand Redesign.pxm",
    app: "PixelMaster",
    modified: "2 hours ago",
    icon: <ImageIcon className="text-violet-500" />,
    shared: true,
    size: "24.5 MB",
    collaborators: 3,
  },
  {
    name: "Company Logo.vec",
    app: "VectorPro",
    modified: "Yesterday",
    icon: <Brush className="text-orange-500" />,
    shared: true,
    size: "8.2 MB",
    collaborators: 2,
  },
  {
    name: "Product Launch Video.vid",
    app: "VideoStudio",
    modified: "3 days ago",
    icon: <Video className="text-pink-500" />,
    shared: false,
    size: "1.2 GB",
    collaborators: 0,
  },
  {
    name: "UI Animation.mfx",
    app: "MotionFX",
    modified: "Last week",
    icon: <Sparkles className="text-blue-500" />,
    shared: true,
    size: "345 MB",
    collaborators: 4,
  },
  {
    name: "Magazine Layout.pgc",
    app: "PageCraft",
    modified: "2 weeks ago",
    icon: <Layers className="text-red-500" />,
    shared: false,
    size: "42.8 MB",
    collaborators: 0,
  },
  {
    name: "Mobile App Design.uxf",
    app: "UXFlow",
    modified: "3 weeks ago",
    icon: <LayoutGrid className="text-fuchsia-500" />,
    shared: true,
    size: "18.3 MB",
    collaborators: 5,
  },
  {
    name: "Product Photography.phl",
    app: "PhotoLab",
    modified: "3 weeks ago",
    icon: <Camera className="text-teal-500" />,
    shared: false,
    size: "156 MB",
    collaborators: 0,
  },
]

// Sample data for projects
const projects = [
  {
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    progress: 75,
    dueDate: "June 15, 2025",
    members: 4,
    files: 23,
  },
  {
    name: "Mobile App Launch",
    description: "Design and assets for new mobile application",
    progress: 60,
    dueDate: "July 30, 2025",
    members: 6,
    files: 42,
  },
  {
    name: "Brand Identity",
    description: "New brand guidelines and assets",
    progress: 90,
    dueDate: "May 25, 2025",
    members: 3,
    files: 18,
  },
  {
    name: "Marketing Campaign",
    description: "Summer promotion materials",
    progress: 40,
    dueDate: "August 10, 2025",
    members: 5,
    files: 31,
  },
]

// Sample data for tutorials
const tutorials = [
  {
    title: "Mastering Digital Illustration",
    description: "Learn advanced techniques for creating stunning digital art",
    duration: "1h 45m",
    level: "Advanced",
    instructor: "Sarah Chen",
    category: "Illustration",
    views: "24K",
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Essential principles for creating intuitive user interfaces",
    duration: "2h 20m",
    level: "Intermediate",
    instructor: "Michael Rodriguez",
    category: "Design",
    views: "56K",
  },
  {
    title: "Video Editing Masterclass",
    description: "Professional techniques for cinematic video editing",
    duration: "3h 10m",
    level: "Advanced",
    instructor: "James Wilson",
    category: "Video",
    views: "32K",
  },
  {
    title: "Typography Essentials",
    description: "Create beautiful and effective typography for any project",
    duration: "1h 30m",
    level: "Beginner",
    instructor: "Emma Thompson",
    category: "Typography",
    views: "18K",
  },
  {
    title: "Color Theory for Designers",
    description: "Understanding color relationships and psychology",
    duration: "2h 05m",
    level: "Intermediate",
    instructor: "David Kim",
    category: "Design",
    views: "41K",
  },
]

// Sample data for community posts
const communityPosts = [
  {
    title: "Minimalist Logo Design",
    author: "Alex Morgan",
    likes: 342,
    comments: 28,
    image: "/placeholder.svg?height=300&width=400",
    time: "2 days ago",
  },
  {
    title: "3D Character Concept",
    author: "Priya Sharma",
    likes: 518,
    comments: 47,
    image: "/placeholder.svg?height=300&width=400",
    time: "1 week ago",
  },
  {
    title: "UI Dashboard Redesign",
    author: "Thomas Wright",
    likes: 276,
    comments: 32,
    image: "/placeholder.svg?height=300&width=400",
    time: "3 days ago",
  },
  {
    title: "Product Photography Setup",
    author: "Olivia Chen",
    likes: 189,
    comments: 15,
    image: "/placeholder.svg?height=300&width=400",
    time: "5 days ago",
  },
]

// Sample data for sidebar navigation
const sidebarItems = [
  {
    title: "Home",
    icon: <HomeIcon />,
    isActive: true,
    tabValue: "home",
  },
  {
    title: "Agents Arca", // Este item será renderizado de forma customizada
    icon: <UserIcon />,
    badge: "13", // Mudança aqui: de apps.length para "13"
  },
  {
    title: "Arca AI Chat",
    icon: <MessageCircle />,
    tabValue: "files", // Corresponds to the "files" tab
  },
  {
    title: "CRM",
    icon: <ChartColumnIncreasingIcon />,
    tabValue: "learn", // Corresponds to the "learn" tab
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

export function DesignaliCreative() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sourceFilter, setSourceFilter] = useState("")
  const [notification, setNotification] = useState("") // Novo estado para notificações

  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState(5)
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(true) // Começa aberto
  const [savedROIs, setSavedROIs] = useState<any[]>([])
  const [favoriteAgents, setFavoriteAgents] = useState<string[]>([])
  const [activeRoiView, setActiveRoiView] = useState<"agents" | "my-rois" | "favorites">("agents")
  const [showRoiTool, setShowRoiTool] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias")
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const [activeCrmTab, setActiveCrmTab] = useState("dashboard") // Adicionar esta linha
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null) // Usar 'any' ou definir uma interface para Lead
  const [actionType, setActionType] = useState("") // 'view', 'call', 'email', 'edit'
  const [showReportModal, setShowReportModal] = useState(false) // Novo estado para o modal de relatório
  // Add state for the temperature filter
  const [temperaturaFilter, setTemperaturaFilter] = useState("")
  const [newAppointmentTitle, setNewAppointmentTitle] = useState("")
  const [newAppointmentDate, setNewAppointmentDate] = useState("")
  const [newAppointmentTime, setNewAppointmentTime] = useState("")
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const [leadsList, setLeadsList] = useState([
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      telefone: "(11) 99999-9999",
      fonte: "Instagram",
      tipoInteresse: "Curta Temporada",
      orcamento: 450000,
      status: "Qualificado",
      temperatura: "Quente",
      data: "30/06/2024",
      observacoes: "Cliente interessado em propriedade próxima aos parques",
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@email.com",
      telefone: "(21) 88888-8888",
      fonte: "Site",
      tipoInteresse: "Longa Temporada",
      orcamento: 320000,
      status: "Proposta",
      temperatura: "Morno",
      data: "29/06/2024",
      observacoes: "Prefere imóveis já mobiliados",
    },
    {
      id: 3,
      nome: "Ana Costa",
      email: "ana@email.com",
      telefone: "(31) 77777-7777",
      fonte: "Google",
      tipoInteresse: "Morar",
      orcamento: 280000,
      status: "Fechado",
      temperatura: "Quente",
      data: "28/06/2024",
      observacoes: "",
    },
    {
      id: 4,
      nome: "Carlos Lima",
      email: "carlos@email.com",
      telefone: "(41) 66666-6666",
      fonte: "Recomendacao",
      tipoInteresse: "Curta Temporada",
      orcamento: 380000,
      status: "Negociação",
      temperatura: "Frio",
      data: "27/06/2024",
      observacoes: "",
    },
  ])

  const [leadFormData, setLeadFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    fonte: "",
    tipoInteresse: "",
    temperatura: "", // NOVO CAMPO
    orcamento: "",
    observacoes: "",
  })

  // Função para gerar dados do relatório
  const generateReportData = () => {
    const totalLeads = leadsList.length
    const leadsPorStatus = {
      novo: leadsList.filter((l) => l.status === "Novo").length,
      qualificado: leadsList.filter((l) => l.status === "Qualificado").length,
      proposta: leadsList.filter((l) => l.status === "Proposta").length,
      negociacao: leadsList.filter((l) => l.status === "Negociação").length,
      fechado: leadsList.filter((l) => l.status === "Fechado").length,
    }

    const leadsPorFonte = leadsList.reduce(
      (acc, lead) => {
        acc[lead.fonte] = (acc[lead.fonte] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const leadsPorTemperatura = {
      quente: leadsList.filter((l) => l.temperatura === "Quente").length,
      morno: leadsList.filter((l) => l.temperatura === "Morno").length,
      frio: leadsList.filter((l) => l.temperatura === "Frio").length,
    }

    const valorTotal = leadsList.reduce((sum, lead) => sum + lead.orcamento, 0)
    const valorMedio = totalLeads > 0 ? valorTotal / totalLeads : 0
    const taxaConversao = totalLeads > 0 ? ((leadsPorStatus.fechado / totalLeads) * 100).toFixed(1) : 0

    return {
      totalLeads,
      leadsPorStatus,
      leadsPorFonte,
      leadsPorTemperatura, // ADICIONE ESTA LINHA
      valorTotal,
      valorMedio,
      taxaConversao,
    }
  }

  // Função para atualizar o status do lead
  const updateLeadStatus = (leadId: number, newStatus: string) => {
    setLeadsList((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))

    const leadName = leadsList.find((l) => l.id === leadId)?.nome
    setNotification(`Status de ${leadName} alterado para ${newStatus}`)

    // Limpar notificação após 3 segundos
    setTimeout(() => setNotification(""), 3000)
  }

  const filteredLeads = leadsList.filter((lead) => {
    const matchesSearch =
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || lead.status === statusFilter
    const matchesSource = sourceFilter === "" || lead.fonte === sourceFilter
    const matchesTemperatura = temperaturaFilter === "" || lead.temperatura === temperaturaFilter

    return matchesSearch && matchesStatus && matchesSource && matchesTemperatura
  })

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  // useEffect para simular expiração de ROIs, agora no componente pai
  useEffect(() => {
    const interval = setInterval(
      () => {
        setSavedROIs((prev) => prev.filter((roi) => new Date(roi.expiresAt) > new Date()))
      },
      60 * 60 * 1000,
    ) // 1 hora

    return () => clearInterval(interval)
  }, [])

  const handleNavigate = (view: "agents" | "my-rois" | "favorites") => {
    setActiveRoiView(view)
    setShowRoiTool(true)
    setActiveTab("apps")
  }

  const handleSaveLead = () => {
    if (leadFormData.nome && leadFormData.email) {
      const novoLead = {
        id: leadsList.length + 1,
        nome: leadFormData.nome,
        email: leadFormData.email,
        telefone: leadFormData.telefone,
        fonte: leadFormData.fonte,
        tipoInteresse: leadFormData.tipoInteresse,
        temperatura: leadFormData.temperatura, // Novo campo
        orcamento: Number.parseFloat(leadFormData.orcamento.replace(/[^0-9.]/g, "")) || 0,
        status: "Novo",
        data: new Date().toLocaleDateString("pt-BR"),
        observacoes: leadFormData.observacoes,
      }

      setLeadsList((prev) => [novoLead, ...prev])
      setShowNewLeadModal(false)

      // Limpar formulário
      setLeadFormData({
        nome: "",
        email: "",
        telefone: "",
        fonte: "",
        tipoInteresse: "",
        temperatura: "", // Novo campo
        orcamento: "",
        observacoes: "",
      })
    }
  }

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead)
    setActionType("view")
    setShowLeadModal(true)
  }

  const handleCallLead = (lead: any) => {
    setSelectedLead(lead)
    setActionType("call")
    setShowLeadModal(true)
  }

  const handleEmailLead = (lead: any) => {
    setSelectedLead(lead)
    setActionType("email")
    setShowLeadModal(true)
  }

  const handleEditLead = (lead: any) => {
    setSelectedLead(lead)
    setLeadFormData({
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      fonte: lead.fonte,
      tipoInteresse: lead.tipoInteresse,
      temperatura: lead.temperatura,
      orcamento: lead.orcamento.toString(), // Convert number to string for input
      observacoes: lead.observacoes || "",
    })
    setActionType("edit")
    setShowLeadModal(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLeadFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Placeholder for handleUpdateLead - will be implemented in the next step
  const handleUpdateLead = () => {
    console.log("Update Lead function will be implemented next!")
    // Logic to update the lead in leadsList
    // setLeadsList((prev) => prev.map((lead) => (lead.id === selectedLead.id ? { ...lead, ...leadFormData } : lead)));
    // setShowLeadModal(false);
    // setNotification(`Lead ${selectedLead.nome} atualizado com sucesso!`);
    // setTimeout(() => setNotification(""), 3000);
  }

  const [draggedLead, setDraggedLead] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState("")

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e, columnStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(columnStatus)
  }

  const handleDragLeave = () => {
    setDragOverColumn("")
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    if (draggedLead && draggedLead.status !== newStatus) {
      updateLeadStatus(draggedLead.id, newStatus)
    }
    setDraggedLead(null)
    setDragOverColumn("")
  }

  const toggleTaskCompletion = (taskIndex: number) => {
    setCompletedTasks((prev) => {
      if (prev.includes(taskIndex)) {
        return prev.filter((index) => index !== taskIndex)
      } else {
        return [...prev, taskIndex]
      }
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

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
                      {/* Botão principal Agents Arca */}
                      <button
                        onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm text-gray-700">Agents Arca</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">13</span>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-600 transition-transform ${isAgentsOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {/* Dropdown content */}
                      {isAgentsOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          {/* Todos os Agents */}
                          <button
                            onClick={() => handleNavigate("agents")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 text-sm ${
                              activeRoiView === "agents"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <Home className="h-3.5 w-3.5" />
                            <span>Todos os Agents</span>
                          </button>

                          {/* Meus ROIs */}
                          <button
                            onClick={() => handleNavigate("my-rois")}
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
                            {savedROIs.length > 0 && (
                              <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {savedROIs.length}
                              </span>
                            )}
                          </button>

                          {/* Favoritos */}
                          <button
                            onClick={() => handleNavigate("favorites")}
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
                            {favoriteAgents.length > 0 && (
                              <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {favoriteAgents.length}
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
                          item.isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-100",
                        )}
                        onClick={() => item.tabValue && setActiveTab(item.tabValue)}
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
          "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="p-4 px-24">
            <Image
              src="/logo-arca.png"
              alt="Logo da Arca Intelligence"
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
                      {/* Botão principal Agents Arca */}
                      <button
                        onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm text-gray-700">Agents Arca</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">13</span>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-600 transition-transform ${isAgentsOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {/* Dropdown content */}
                      {isAgentsOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          {/* Todos os Agents */}
                          <button
                            onClick={() => handleNavigate("agents")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 text-sm ${
                              activeRoiView === "agents"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <span>Todos os Agents</span>
                          </button>

                          {/* Meus ROIs */}
                          <button
                            onClick={() => handleNavigate("my-rois")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between text-sm ${
                              activeRoiView === "my-rois"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span>Meus ROIs</span>
                            </div>
                            {savedROIs.length > 0 && (
                              <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {savedROIs.length}
                              </span>
                            )}
                          </button>

                          {/* Favoritos */}
                          <button
                            onClick={() => handleNavigate("favorites")}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between text-sm ${
                              activeRoiView === "favorites"
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span>Favoritos</span>
                            </div>
                            {favoriteAgents.length > 0 && (
                              <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {favoriteAgents.length}
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
                          item.isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-100",
                        )}
                        onClick={() => item.tabValue && setActiveTab(item.tabValue)}
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

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            {/* Updated title and subtitle */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <div title="Messages">
                <Button variant="ghost" size="icon" className="rounded-2xl">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>

              <div title="Notifications">
                <Button variant="ghost" size="icon" className="rounded-2xl relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {notifications}
                    </span>
                  )}
                </Button>
              </div>

              <Avatar className="h-9 w-9 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Tabs
            defaultValue="home"
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
              // Reset showRoiTool to false when navigating to any tab other than the ROI tool itself
              if (value !== "apps") {
                // Changed from "roi-tool" to "apps" as ROI tool is now part of apps tab
                setShowRoiTool(false)
                setActiveRoiView("agents") // Reset ROI view when leaving apps tab
              }
            }}
            className="w-full"
          >
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[600px] grid-cols-4 rounded-2xl p-1 text-slate-500">
                <TabsTrigger value="home" className="rounded-xl data-[state=active]:rounded-xl">
                  Home
                </TabsTrigger>
                <TabsTrigger value="apps" className="rounded-xl data-[state=active]:rounded-xl">
                  Agents Arca
                </TabsTrigger>
                <TabsTrigger value="files" className="rounded-xl data-[state=active]:rounded-xl">
                  Arca AI Chat
                </TabsTrigger>
                <TabsTrigger value="learn" className="rounded-xl data-[state=active]:rounded-xl">
                  CRM
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex gap-2">
                {activeTab === "files" && ( // Add this conditional rendering
                  <StarBorder as="button" onClick={() => setActiveTab("files")} className="" color="#3B82F6">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Histórico do Chat
                  </StarBorder>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="home" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative overflow-hidden rounded-3xl px-8 py-2 bg-slate-500 opacity-40 text-slate-100"
                    >
                      <div className="relative z-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                          <div className="space-y-4">
                            <h2 className="text-3xl font-bold">Bom dia, Corretor!</h2>
                            <p className="max-w-[600px] text-slate-100">
                              Domine o mercado imobiliário de Orlando com nossa suíte de soluções inteligentes para
                              corretores.
                            </p>
                            <div className="flex flex-wrap gap-3"></div>
                          </div>
                          <div className="hidden lg:block">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="relative h-40 w-40"
                            >
                              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
                              <div className="absolute inset-4 rounded-full bg-white/20" />
                              <div className="absolute inset-8 rounded-full bg-white/30" />
                              <div className="absolute inset-12 rounded-full bg-white/40" />
                              <div className="absolute inset-16 rounded-full bg-white/50" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      <BackgroundBeams className="absolute inset-0 z-0 pointer-events-none" />
                    </motion.div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Recent Apps</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        View All
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {apps
                        .filter((app) => app.recent)
                        .map((app) => (
                          <motion.div key={app.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                            <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                                    {app.icon}
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                                    <Star className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <CardTitle className="text-lg">{app.name}</CardTitle>
                                <CardDescription>{app.description}</CardDescription>
                              </CardContent>
                              <CardFooter>
                                <Button variant="secondary" className="w-full rounded-2xl">
                                  Open
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </section>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Recent Files</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          View All
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {recentFiles.slice(0, 4).map((file) => (
                            <motion.div
                              key={file.name}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="flex items-center justify-between p-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                  {file.icon}
                                </div>
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {file.app} • {file.modified}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {file.shared && (
                                  <Badge variant="outline" className="rounded-xl">
                                    <Users className="mr-1 h-3 w-3" />
                                    {file.collaborators}
                                  </Badge>
                                )}
                                <Button variant="ghost" size="sm" className="rounded-xl">
                                  Open
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Active Projects</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          View All
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {projects.slice(0, 3).map((project) => (
                            <motion.div
                              key={project.name}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{project.name}</h3>
                                <Badge variant="outline" className="rounded-xl">
                                  Due {project.dueDate}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-2 bg-blue-500 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Users className="mr-1 h-4 w-4" />
                                  {project.members} members
                                </div>
                                <div className="flex items-center">
                                  <FileText className="mr-1 h-4 w-4" />
                                  {project.files} files
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Community Highlights</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        Explore
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {communityPosts.map((post) => (
                        <motion.div key={post.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl">
                            <div className="aspect-[4/3] overflow-hidden bg-muted">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{post.title}</h3>
                              <p className="text-sm text-muted-foreground">by {post.author}</p>
                              <div className="mt-2 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <Heart className="h-4 w-4 text-red-500" />
                                  {post.likes}
                                  <MessageSquare className="ml-2 h-4 w-4" />
                                  {post.comments}
                                </div>
                                <span className="text-muted-foreground">{post.time}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="apps" className="space-y-8 mt-0">
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
                        {/* Conteúdo acima da animação */}
                        <div className="relative z-10 max-w-2xl">
                          <h2 className="text-2xl md:text-4xl font-bold">Agents Arca AI para Corretores</h2>
                          <p className="mt-2 text-sm md:text-base text-white/80">
                            Descubra agentes inteligentes para acelerar suas vendas no mercado imobiliário de Orlando.
                          </p>
                        </div>

                        {/* Fundo animado apenas dentro do banner */}
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
                          <Input
                            type="search"
                            placeholder="Procurar Agents..."
                            className="w-full rounded-2xl pl-9 md:w-[200px]"
                          />
                        </div>
                      </div>

                      <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Novos Lançamentos</h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                          {apps
                            .filter(
                              (app) =>
                                app.new &&
                                (selectedCategory === "Todas as Categorias" || app.category === selectedCategory),
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
                            .filter(
                              (app) => selectedCategory === "Todas as Categorias" || app.category === selectedCategory,
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
                </TabsContent>

                <TabsContent value="files" className="space-y-8 mt-0 h-full w-full max-w-full">
                  <AIAssistantInterface />
                </TabsContent>

                <TabsContent value="learn" className="space-y-8 mt-0">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800">CRM Dashboard</h1>
                        <p className="text-gray-600">Gerencie seus leads e oportunidades</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowReportModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 17v-2m3 2v-4m3 2v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Relatório
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                          onClick={() => setShowNewLeadModal(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Novo Lead
                        </button>
                      </div>
                    </div>

                    {/* Notificação de sucesso */}
                    {notification && (
                      <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
                        <span>{notification}</span>
                        <button onClick={() => setNotification("")} className="text-green-700 hover:text-green-900">
                          ✕
                        </button>
                      </div>
                    )}

                    {/* Navegação por abas do CRM */}
                    <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setActiveCrmTab("dashboard")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeCrmTab === "dashboard"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => setActiveCrmTab("leads")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeCrmTab === "leads"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        Todos os Leads
                      </button>
                      <button
                        onClick={() => setActiveCrmTab("pipeline")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeCrmTab === "pipeline"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        Pipeline
                      </button>
                      <button
                        onClick={() => setActiveCrmTab("agenda")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeCrmTab === "agenda"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        Agenda
                      </button>
                    </div>

                    {activeCrmTab === "dashboard" && (
                      <div>
                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                          <Card className="rounded-2xl">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                                  <p className="text-2xl font-bold">{leadsList.length}</p>
                                  <p className="text-xs text-green-600">+12% este mês</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                  <Users className="h-6 w-6 text-blue-600" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="rounded-2xl">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Oportunidades</p>
                                  <p className="text-2xl font-bold">
                                    {
                                      leadsList.filter(
                                        (lead) =>
                                          lead.status === "Qualificado" ||
                                          lead.status === "Proposta" ||
                                          lead.status === "Negociação",
                                      ).length
                                    }
                                  </p>
                                  <p className="text-xs text-green-600">+8% este mês</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                  <BarChart3 className="h-6 w-6 text-green-600" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="rounded-2xl">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Vendas Fechadas</p>
                                  <p className="text-2xl font-bold">
                                    {leadsList.filter((lead) => lead.status === "Fechado").length}
                                  </p>
                                  <p className="text-xs text-green-600">+15% este mês</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                  <Home className="h-6 w-6 text-purple-600" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="rounded-2xl">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                                  <p className="text-2xl font-bold">
                                    $
                                    {leadsList
                                      .filter((lead) => lead.status === "Fechado")
                                      .reduce((sum, lead) => sum + lead.orcamento, 0)
                                      .toLocaleString()}
                                  </p>
                                  <p className="text-xs text-green-600">+22% este mês</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                  <CircleDollarSignIcon className="h-6 w-6 text-orange-600" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                          {/* Pipeline */}
                          <div className="lg:col-span-2">
                            <Card className="rounded-2xl">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <BarChart3 className="h-5 w-5" />
                                  Pipeline de Vendas
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {(() => {
                                    const qualifiedLeads = leadsList.filter((l) => l.status === "Qualificado")
                                    const propostaLeads = leadsList.filter((l) => l.status === "Proposta")
                                    const negociacaoLeads = leadsList.filter((l) => l.status === "Negociação")
                                    const fechadoLeads = leadsList.filter((l) => l.status === "Fechado")

                                    const sumQualified = qualifiedLeads.reduce((sum, lead) => sum + lead.orcamento, 0)
                                    const sumProposta = propostaLeads.reduce((sum, lead) => sum + lead.orcamento, 0)
                                    const sumNegociacao = negociacaoLeads.reduce((sum, lead) => sum + lead.orcamento, 0)
                                    const sumFechado = fechadoLeads.reduce((sum, lead) => sum + lead.orcamento, 0)

                                    const totalPipelineValue = sumQualified + sumProposta + sumNegociacao + sumFechado

                                    const getProgressWidth = (value: number) =>
                                      totalPipelineValue > 0 ? (value / totalPipelineValue) * 100 : 0

                                    return (
                                      <>
                                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                          <div>
                                            <h4 className="font-semibold">Leads Qualificados</h4>
                                            <p className="text-sm text-muted-foreground">
                                              {qualifiedLeads.length} leads
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold">
                                              $
                                              {sumQualified.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                              })}
                                              K
                                            </p>
                                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                                              <div
                                                className="h-2 bg-blue-500 rounded-full"
                                                style={{ width: `${getProgressWidth(sumQualified)}%` }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                                          <div>
                                            <h4 className="font-semibold">Propostas Enviadas</h4>
                                            <p className="text-sm text-muted-foreground">
                                              {propostaLeads.length} propostas
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold">
                                              $
                                              {sumProposta.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                              })}
                                              K
                                            </p>
                                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                                              <div
                                                className="h-2 bg-yellow-500 rounded-full"
                                                style={{ width: `${getProgressWidth(sumProposta)}%` }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                                          <div>
                                            <h4 className="font-semibold">Negociação</h4>
                                            <p className="text-sm text-muted-foreground">
                                              {negociacaoLeads.length} negociações
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold">
                                              $
                                              {sumNegociacao.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                              })}
                                              K
                                            </p>
                                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                                              <div
                                                className="h-2 bg-green-500 rounded-full"
                                                style={{ width: `${getProgressWidth(sumNegociacao)}%` }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                                          <div>
                                            <h4 className="font-semibold">Fechamento</h4>
                                            <p className="text-sm text-muted-foreground">
                                              {fechadoLeads.length} fechamentos
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold">
                                              $
                                              {sumFechado.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                              })}
                                              K
                                            </p>
                                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                                              <div
                                                className="h-2 bg-purple-500 rounded-full"
                                                style={{ width: `${getProgressWidth(sumFechado)}%` }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  })()}
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Recent Activities */}
                          <div>
                            <Card className="rounded-2xl">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Bell className="h-5 w-5" />
                                  Atividades Recentes
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                      <User className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">Novo lead adicionado</p>
                                      <p className="text-xs text-muted-foreground">há 2 horas</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                      <Phone className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">Ligação realizada</p>
                                      <p className="text-xs text-muted-foreground">há 5 horas</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                      <MessageSquare className="h-4 w-4 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">Mensagem enviada</p>
                                      <p className="text-xs text-muted-foreground">ontem</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                      <FileText className="h-4 w-4 text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">Relatório gerado</p>
                                      <p className="text-xs text-muted-foreground">há 3 dias</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        {/* Leads Table */}
                        <Card className="rounded-2xl">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Users className="h-5 w-5" />
                              Leads Recentes
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                              <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="search"
                                  placeholder="Buscar leads..."
                                  className="w-full rounded-2xl pl-9"
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                />
                              </div>

                              <div className="flex items-center gap-3">
                                <select
                                  className="px-4 py-2 border border-gray-300 rounded-lg"
                                  value={statusFilter}
                                  onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                  <option value="">Todos os Status</option>
                                  <option value="Novo">Novo</option>
                                  <option value="Qualificado">Qualificado</option>
                                  <option value="Proposta">Proposta</option>
                                  <option value="Negociação">Negociação</option>
                                  <option value="Fechado">Fechado</option>
                                  <option value="Descartado">Descartado</option>
                                </select>

                                <select
                                  className="px-4 py-2 border border-gray-300 rounded-lg"
                                  value={sourceFilter}
                                  onChange={(e) => setSourceFilter(e.target.value)}
                                >
                                  <option value="">Todas as Fontes</option>
                                  <option value="Site">Site</option>
                                  <option value="Google">Google</option>
                                  <option value="Instagram">Instagram</option>
                                  <option value="Recomendação">Recomendação</option>
                                </select>
                              </div>
                            </div>

                            {/* Leads Table */}
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Nome
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Telefone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Fonte
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Data
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Ações
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {leadsList.map((lead) => (
                                    <tr key={lead.id}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {lead.nome}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lead.email}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lead.telefone}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lead.fonte}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lead.status}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.data}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                          <button
                                            onClick={() => handleViewLead(lead)}
                                            className="text-blue-600 hover:text-blue-800"
                                          >
                                            Ver
                                          </button>
                                          <button
                                            onClick={() => handleEditLead(lead)}
                                            className="text-green-600 hover:text-green-800"
                                          >
                                            Editar
                                          </button>
                                          <button
                                            onClick={() => handleCallLead(lead)}
                                            className="text-green-600 hover:text-green-800"
                                          >
                                            Ligar
                                          </button>
                                          <button
                                            onClick={() => handleEmailLead(lead)}
                                            className="text-purple-600 hover:text-purple-800"
                                          >
                                            Email
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {activeCrmTab === "leads" && (
                      <div>
                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="Buscar leads..."
                              className="w-full rounded-2xl pl-9"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="">Todos os Status</option>
                              <option value="Novo">Novo</option>
                              <option value="Qualificado">Qualificado</option>
                              <option value="Proposta">Proposta</option>
                              <option value="Negociação">Negociação</option>
                              <option value="Fechado">Fechado</option>
                              <option value="Descartado">Descartado</option>
                            </select>

                            <select
                              value={sourceFilter}
                              onChange={(e) => setSourceFilter(e.target.value)}
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="">Todas as Fontes</option>
                              <option value="Site">Site</option>
                              <option value="Google">Google</option>
                              <option value="Instagram">Instagram</option>
                              <option value="Recomendação">Recomendação</option>
                            </select>

                            {/* Add the new temperature filter here */}
                            <select
                              value={temperaturaFilter}
                              onChange={(e) => setTemperaturaFilter(e.target.value)}
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="">Todas as Qualificações</option>
                              <option value="Quente">🔥 Quente</option>
                              <option value="Morno">🌡️ Morno</option>
                              <option value="Frio">❄️ Frio</option>
                            </select>
                          </div>
                        </div>

                        {/* Contador de resultados filtrados */}
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Mostrando {filteredLeads.length} de {leadsList.length} leads
                          </p>
                          {(searchTerm || statusFilter || sourceFilter || temperaturaFilter) && (
                            <button
                              onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("")
                                setSourceFilter("")
                                setTemperaturaFilter("") // Reset the new filter
                              }}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Limpar filtros
                            </button>
                          )}
                        </div>

                        {/* Leads Table */}
                        <div>
                          {" "}
                          {/* REMOVED overflow-x-auto HERE */}
                          <table className="w-full min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="w-[15%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Nome
                                </th>
                                <th className="w-[15%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Email
                                </th>
                                <th className="w-[12%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Telefone
                                </th>
                                <th className="w-[10%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Fonte
                                </th>
                                <th className="w-[12%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tipo de Interesse
                                </th>
                                <th className="w-[10%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  QUALIFICAÇÃO
                                </th>
                                <th className="w-[12%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Orçamento
                                </th>
                                <th className="w-[10%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="w-[4%] px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Data
                                </th>
                                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Ações
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50">
                                  <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {lead.nome}
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.telefone}</td>
                                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.fonte}</td>
                                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {lead.tipoInteresse}
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        lead.temperatura === "Quente"
                                          ? "bg-red-100 text-red-800"
                                          : lead.temperatura === "Morno"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : lead.temperatura === "Frio"
                                              ? "bg-blue-100 text-blue-800"
                                              : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {lead.temperatura === "Quente"
                                        ? "🔥 Quente"
                                        : lead.temperatura === "Morno"
                                          ? "🌡️ Morno"
                                          : lead.temperatura === "Frio"
                                            ? "❄️ Frio"
                                            : "Não definido"}
                                    </span>
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {lead.orcamento.toLocaleString("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    })}
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap">
                                    <select
                                      value={lead.status}
                                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                      className={`px-2 py-1 rounded-full text-xs font-medium border-none focus:ring-2 focus:ring-blue-500 ${
                                        lead.status === "Novo"
                                          ? "bg-blue-100 text-blue-800"
                                          : lead.status === "Qualificado"
                                            ? "bg-green-100 text-green-800"
                                            : lead.status === "Proposta"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : lead.status === "Negociação"
                                                ? "bg-orange-100 text-orange-800"
                                                : lead.status === "Fechado"
                                                  ? "bg-emerald-100 text-emerald-800"
                                                  : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      <option value="Novo">Novo</option>
                                      <option value="Qualificado">Qualificado</option>
                                      <option value="Proposta">Proposta</option>
                                      <option value="Negociação">Negociação</option>
                                      <option value="Fechado">Fechado</option>
                                      <option value="Descartado">Descartado</option>
                                    </select>
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{lead.data}</td>
                                  <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() => handleViewLead(lead)}
                                        className="text-blue-600 hover:text-blue-800"
                                      >
                                        Ver
                                      </button>
                                      <button
                                        onClick={() => handleEditLead(lead)}
                                        className="text-green-600 hover:text-green-800"
                                      >
                                        Editar
                                      </button>
                                      <button
                                        onClick={() => handleCallLead(lead)}
                                        className="text-green-600 hover:text-green-800"
                                      >
                                        Ligar
                                      </button>
                                      <button
                                        onClick={() => handleEmailLead(lead)}
                                        className="text-purple-600 hover:text-purple-800"
                                      >
                                        Email
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {activeCrmTab === "pipeline" && (
                      <div className="space-y-6">
                        {/* Header do Pipeline */}
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Pipeline de Vendas Visual</h3>
                          <div className="text-sm text-gray-500">
                            Total:{" "}
                            <span className="font-medium">
                              $
                              {leadsList
                                .filter(
                                  (l) =>
                                    l.status === "Qualificado" || l.status === "Proposta" || l.status === "Negociação",
                                )
                                .reduce((sum, lead) => sum + lead.orcamento, 0)
                                .toLocaleString()}
                            </span>{" "}
                            em negociações
                          </div>
                        </div>

                        {/* Colunas do Pipeline */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {/* Coluna 1: Novos */}
                          <div
                            className={`bg-gray-50 rounded-lg p-4 ${dragOverColumn === "Novo" ? "bg-gray-100" : ""}`}
                            onDragOver={(e) => handleDragOver(e, "Novo")}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, "Novo")}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-900">Novos</h4>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {leadsList.filter((l) => l.status === "Novo").length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {leadsList
                                .filter((l) => l.status === "Novo")
                                .map((lead) => (
                                  <div
                                    key={lead.id}
                                    onClick={() => handleViewLead(lead)}
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, lead)}
                                    className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                  >
                                    <div className="mb-2 flex items-center">
                                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                                        {lead.nome.charAt(0).toUpperCase()}
                                        {lead.nome.split(" ").length > 1
                                          ? lead.nome.split(" ")[1].charAt(0).toUpperCase()
                                          : ""}
                                      </span>
                                      <span className="text-sm font-medium">{lead.nome}</span>
                                    </div>
                                    <p className="mb-2 text-xs text-gray-500">{lead.tipoInteresse}</p>
                                    <p className="text-sm font-semibold text-green-600">
                                      {lead.orcamento.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                    {lead.observacoes && (
                                      <div className="mt-2 text-xs text-gray-600">{lead.observacoes}</div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Coluna 2: Qualificados */}
                          <div
                            className={`bg-blue-50 rounded-lg p-4 ${
                              dragOverColumn === "Qualificado" ? "bg-blue-100" : ""
                            }`}
                            onDragOver={(e) => handleDragOver(e, "Qualificado")}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, "Qualificado")}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-blue-900">Qualificados</h4>
                              <span className="bg-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full">
                                {leadsList.filter((l) => l.status === "Qualificado").length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {leadsList
                                .filter((l) => l.status === "Qualificado")
                                .map((lead) => (
                                  <div
                                    key={lead.id}
                                    onClick={() => handleViewLead(lead)}
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, lead)}
                                    className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                  >
                                    <div className="mb-2 flex items-center">
                                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                                        {lead.nome.charAt(0).toUpperCase()}
                                        {lead.nome.split(" ").length > 1
                                          ? lead.nome.split(" ")[1].charAt(0).toUpperCase()
                                          : ""}
                                      </span>
                                      <span className="text-sm font-medium">{lead.nome}</span>
                                    </div>
                                    <p className="mb-2 text-xs text-gray-500">{lead.tipoInteresse}</p>
                                    <p className="text-sm font-semibold text-green-600">
                                      {lead.orcamento.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                    {lead.observacoes && (
                                      <div className="mt-2 text-xs text-blue-600">{lead.observacoes}</div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Coluna 3: Proposta */}
                          <div
                            className={`bg-yellow-50 rounded-lg p-4 ${
                              dragOverColumn === "Proposta" ? "bg-yellow-100" : ""
                            }`}
                            onDragOver={(e) => handleDragOver(e, "Proposta")}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, "Proposta")}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-yellow-900">Proposta</h4>
                              <span className="bg-yellow-200 text-yellow-700 text-xs px-2 py-1 rounded-full">
                                {leadsList.filter((l) => l.status === "Proposta").length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {leadsList
                                .filter((l) => l.status === "Proposta")
                                .map((lead) => (
                                  <div
                                    key={lead.id}
                                    onClick={() => handleViewLead(lead)}
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, lead)}
                                    className="bg-white p-3 rounded-lg border border-yellow-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                  >
                                    <div className="mb-2 flex items-center">
                                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-600">
                                        {lead.nome.charAt(0).toUpperCase()}
                                        {lead.nome.split(" ").length > 1
                                          ? lead.nome.split(" ")[1].charAt(0).toUpperCase()
                                          : ""}
                                      </span>
                                      <span className="text-sm font-medium">{lead.nome}</span>
                                    </div>
                                    <p className="mb-2 text-xs text-gray-500">{lead.tipoInteresse}</p>
                                    <p className="text-sm font-semibold text-green-600">
                                      {lead.orcamento.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                    {lead.observacoes && (
                                      <div className="mt-2 text-xs text-yellow-600">{lead.observacoes}</div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Coluna 4: Negociação */}
                          <div
                            className={`bg-orange-50 rounded-lg p-4 ${
                              dragOverColumn === "Negociação" ? "bg-orange-100" : ""
                            }`}
                            onDragOver={(e) => handleDragOver(e, "Negociação")}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, "Negociação")}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-orange-900">Negociação</h4>
                              <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded-full">
                                {leadsList.filter((l) => l.status === "Negociação").length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {leadsList
                                .filter((l) => l.status === "Negociação")
                                .map((lead) => (
                                  <div
                                    key={lead.id}
                                    onClick={() => handleViewLead(lead)}
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, lead)}
                                    className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                  >
                                    <div className="mb-2 flex items-center">
                                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-600">
                                        {lead.nome.charAt(0).toUpperCase()}
                                        {lead.nome.split(" ").length > 1
                                          ? lead.nome.split(" ")[1].charAt(0).toUpperCase()
                                          : ""}
                                      </span>
                                      <span className="text-sm font-medium">{lead.nome}</span>
                                    </div>
                                    <p className="mb-2 text-xs text-gray-500">{lead.tipoInteresse}</p>
                                    <p className="text-sm font-semibold text-green-600">
                                      {lead.orcamento.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                    {lead.observacoes && (
                                      <div className="mt-2 text-xs text-orange-600">{lead.observacoes}</div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Coluna 5: Fechado */}
                          <div
                            className={`bg-green-50 rounded-lg p-4 ${
                              dragOverColumn === "Fechado" ? "bg-green-100" : ""
                            }`}
                            onDragOver={(e) => handleDragOver(e, "Fechado")}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, "Fechado")}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-green-900">Fechado</h4>
                              <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-full">
                                {leadsList.filter((l) => l.status === "Fechado").length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {leadsList
                                .filter((l) => l.status === "Fechado")
                                .map((lead) => (
                                  <div
                                    key={lead.id}
                                    onClick={() => handleViewLead(lead)}
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, lead)}
                                    className="bg-white p-3 rounded-lg border border-green-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                  >
                                    <div className="mb-2 flex items-center">
                                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-600">
                                        {lead.nome.charAt(0).toUpperCase()}
                                        {lead.nome.split(" ").length > 1
                                          ? lead.nome.split(" ")[1].charAt(0).toUpperCase()
                                          : ""}
                                      </span>
                                      <span className="text-sm font-medium">{lead.nome}</span>
                                    </div>
                                    <p className="mb-2 text-xs text-gray-500">{lead.tipoInteresse}</p>
                                    <p className="text-sm font-semibold text-green-600">
                                      {lead.orcamento.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                    {lead.observacoes && (
                                      <div className="mt-2 text-xs text-green-600">{lead.observacoes}</div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        {/* Estatísticas do Pipeline */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-sm text-gray-500">Taxa de Conversão</div>
                            <div className="text-2xl font-bold text-green-600">20%</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-sm text-gray-500">Tempo Médio</div>
                            <div className="text-2xl font-bold text-blue-600">15 dias</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-sm text-gray-500">Ticket Médio</div>
                            <div className="text-2xl font-bold text-purple-600">$390K</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="text-sm text-gray-500">Meta Mensal</div>
                            <div className="text-2xl font-bold text-orange-600">$2.5M</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCrmTab === "agenda" && (
                      <div className="space-y-6">
                        {/* Header da Agenda */}
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Agenda e Compromissos</h3>
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                            onClick={() => setShowNewAppointmentModal(true)}
                          >
                            + Novo Compromisso
                          </button>
                        </div>

                        {/* Grid: Agenda do Dia + Próximos Compromissos */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Agenda de Hoje */}
                          <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              Hoje - 01/07/2024
                            </h4>

                            <div className="space-y-3">
                              <div
                                className="flex items-start p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500 cursor-pointer hover:bg-blue-100 transition-colors"
                                onClick={() => alert("Detalhes do compromisso: Reunião com Maria Silva")}
                              >
                                <div className="flex-shrink-0 w-16 text-center">
                                  <div className="text-sm font-medium text-blue-600">09:00</div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <div className="text-sm font-medium text-gray-900">Reunião com Maria Silva</div>
                                  <div className="text-xs text-gray-500">Apresentação de propriedades</div>
                                  <div className="text-xs text-blue-600 mt-1">📍 Escritório Central</div>
                                </div>
                              </div>

                              <div
                                className="flex items-start p-3 bg-green-50 rounded-lg border-l-4 border-green-500 cursor-pointer hover:bg-green-100 transition-colors"
                                onClick={() => alert("Detalhes do compromisso: Visita - João Santos")}
                              >
                                <div className="flex-shrink-0 w-16 text-center">
                                  <div className="text-sm font-medium text-green-600">14:00</div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <div className="text-sm font-medium text-gray-900">Visita - João Santos</div>
                                  <div className="text-xs text-gray-500">Casa em Kissimmee</div>
                                  <div className="text-xs text-green-600 mt-1">📍 1234 Main St, Kissimmee</div>
                                </div>
                              </div>

                              <div
                                className="flex items-start p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 cursor-pointer hover:bg-yellow-100 transition-colors"
                                onClick={() => alert("Detalhes do compromisso: Follow-up Carlos Lima")}
                              >
                                <div className="flex-shrink-0 w-16 text-center">
                                  <div className="text-sm font-medium text-yellow-600">16:30</div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <div className="text-sm font-medium text-gray-900">Follow-up Carlos Lima</div>
                                  <div className="text-xs text-gray-500">Retorno sobre proposta</div>
                                  <div className="text-xs text-yellow-600 mt-1">📞 Ligação agendada</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Próximos Compromissos */}
                          <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Próximos Dias
                            </h4>

                            <div className="space-y-3">
                              <div
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => alert("Detalhes do compromisso: Visita - Ana Costa")}
                              >
                                <div className="flex items-center">
                                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                                    <span className="text-xs font-medium text-purple-600">02</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">Visita - Ana Costa</div>
                                    <div className="text-xs text-gray-500">02/07/2024 às 10:00</div>
                                  </div>
                                </div>
                                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                                  Amanhã
                                </span>
                              </div>

                              <div
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => alert("Detalhes do compromisso: Reunião Equipe")}
                              >
                                <div className="flex items-center">
                                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <span className="text-xs font-medium text-blue-600">03</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">Reunião Equipe</div>
                                    <div className="text-xs text-gray-500">03/07/2024 às 09:00</div>
                                  </div>
                                </div>
                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">Quarta</span>
                              </div>

                              <div
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => alert("Detalhes do compromisso: Apresentação Lucia")}
                              >
                                <div className="flex items-center">
                                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                    <span className="text-xs font-medium text-orange-600">05</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">Apresentação Lucia</div>
                                    <div className="text-xs text-gray-500">05/07/2024 às 15:00</div>
                                  </div>
                                </div>
                                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800">
                                  Sexta
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Tarefas Pendentes */}
                          <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-orange-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-6 9l2 2 4-4"
                                />
                              </svg>
                              Tarefas Pendentes
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                <input
                                  type="checkbox"
                                  className="mr-3 text-red-600"
                                  checked={completedTasks.includes(0)}
                                  onChange={() => toggleTaskCompletion(0)}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-medium text-gray-900 ${completedTasks.includes(0) ? "line-through opacity-60" : ""}`}
                                  >
                                    Enviar contrato - João Santos
                                  </div>
                                  <div className="text-xs text-red-600">Venceu ontem</div>
                                </div>
                              </div>

                              <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <input
                                  type="checkbox"
                                  className="mr-3 text-yellow-600"
                                  checked={completedTasks.includes(1)}
                                  onChange={() => toggleTaskCompletion(1)}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-medium text-gray-900 ${completedTasks.includes(1) ? "line-through opacity-60" : ""}`}
                                  >
                                    Follow-up Maria Silva
                                  </div>
                                  <div className="text-xs text-yellow-600">Hoje</div>
                                </div>
                              </div>

                              <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <input
                                  type="checkbox"
                                  className="mr-3 text-blue-600"
                                  checked={completedTasks.includes(2)}
                                  onChange={() => toggleTaskCompletion(2)}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-medium text-gray-900 ${completedTasks.includes(2) ? "line-through opacity-60" : ""}`}
                                  >
                                    Pesquisar propriedades - Ana Costa
                                  </div>
                                  <div className="text-xs text-blue-600">Amanhã</div>
                                </div>
                              </div>

                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <input
                                  type="checkbox"
                                  className="mr-3 text-green-600"
                                  checked={completedTasks.includes(3)}
                                  onChange={() => toggleTaskCompletion(3)}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-medium text-gray-900 ${completedTasks.includes(3) ? "line-through opacity-60" : ""}`}
                                  >
                                    Preparar apresentação
                                  </div>
                                  <div className="text-xs text-green-600">Esta semana</div>
                                </div>
                              </div>

                              <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <input
                                  type="checkbox"
                                  className="mr-3 text-purple-600"
                                  checked={completedTasks.includes(4)}
                                  onChange={() => toggleTaskCompletion(4)}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-medium text-gray-900 ${completedTasks.includes(4) ? "line-through opacity-60" : ""}`}
                                  >
                                    Atualizar CRM
                                  </div>
                                  <div className="text-xs text-purple-600">Esta semana</div>
                                </div>
                              </div>

                              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <input
                                  type="checkbox"
                                  className="mr-3 text-gray-600"
                                  checked={completedTasks.includes(5)}
                                  onChange={() => toggleTaskCompletion(5)}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-medium text-gray-900 ${completedTasks.includes(5) ? "line-through opacity-60" : ""}`}
                                  >
                                    Revisar contratos
                                  </div>
                                  <div className="text-xs text-gray-600">Próxima semana</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>

      {/* Modal Novo Lead */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Novo Lead</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowNewLeadModal(false)} className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Nome Completo</label>
                <Input
                  type="text"
                  className="rounded-xl"
                  placeholder="Digite o nome completo"
                  value={leadFormData.nome}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, nome: e.target.value }))}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  className="rounded-xl"
                  placeholder="email@exemplo.com"
                  value={leadFormData.email}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Fonte do Lead</label>
                <select
                  className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={leadFormData.fonte}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, fonte: e.target.value }))}
                >
                  <option value="">Selecione a origem</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Site">Site</option>
                  <option value="Google">Google</option>
                  <option value="Recomendação">Recomendação</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Telefone</label>
                <div className="flex gap-2">
                  <select className="w-24 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+33">🇫🇷 +33</option>
                  </select>
                  <input
                    type="tel"
                    className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                    value={leadFormData.telefone}
                    onChange={(e) => setLeadFormData((prev) => ({ ...prev, telefone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Tipo de Interesse</label>
                <select
                  className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={leadFormData.tipoInteresse}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, tipoInteresse: e.target.value }))}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Curta Temporada">Investimento Curta Temporada</option>
                  <option value="Longa Temporada">Investimento Longa Temporada</option>
                  <option value="Morar">Morar</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Qualificação do Lead</label>
                <select
                  className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={leadFormData.temperatura}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, temperatura: e.target.value }))}
                >
                  <option value="">Selecione a qualificação</option>
                  <option value="Quente">🔥 Quente - Pronto para comprar</option>
                  <option value="Morno">🌡️ Morno - Interessado mas precisa nurturing</option>
                  <option value="Frio">❄️ Frio - Apenas pesquisando</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Orçamento</label>
                <Input
                  type="text"
                  className="rounded-xl"
                  placeholder="Ex: $300,000.00"
                  value={leadFormData.orcamento}
                  onChange={(e) => {
                    const rawValue = e.target.value
                    const digitsOnly = rawValue.replace(/\D/g, "")

                    if (!digitsOnly) {
                      setLeadFormData((prev) => ({ ...prev, orcamento: "" }))
                      return
                    }

                    const cents = Number.parseInt(digitsOnly, 10)
                    const amount = cents / 100

                    const formatted = new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(amount)

                    setLeadFormData((prev) => ({ ...prev, orcamento: formatted }))
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Observações</label>
                <textarea
                  className="w-full resize-none rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Informações adicionais sobre o lead..."
                  value={leadFormData.observacoes}
                  onChange={(e) => setLeadFormData((prev) => ({ ...prev, observacoes: e.target.value }))}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl bg-transparent"
                onClick={() => setShowNewLeadModal(false)}
              >
                Cancelar
              </Button>
              <Button className="flex-1 rounded-xl" onClick={handleSaveLead}>
                Salvar Lead
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ações do Lead */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {actionType === "view" && "Detalhes do Lead"}
                {actionType === "call" && "Ligar para Lead"}
                {actionType === "email" && "Enviar Email"}
                {actionType === "edit" && "Editar Lead"}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setShowLeadModal(false)} className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {actionType === "view" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nome</label>
                    <p className="text-gray-900">{selectedLead.nome}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <p className="text-gray-900">{selectedLead.status}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Qualificação</label>
                    <p className="text-gray-900">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedLead.temperatura === "Quente"
                            ? "bg-red-100 text-red-800"
                            : selectedLead.temperatura === "Morno"
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedLead.temperatura === "Frio"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedLead.temperatura === "Quente"
                          ? "🔥 Quente"
                          : selectedLead.temperatura === "Morno"
                            ? "🌡️ Morno"
                            : selectedLead.temperatura === "Frio"
                              ? "❄️ Frio"
                              : "bg-gray-100 text-gray-800"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Telefone</label>
                    <p className="text-gray-900">{selectedLead.telefone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fonte</label>
                    <p className="text-gray-900">{selectedLead.fonte}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Data</label>
                    <p className="text-gray-900">{selectedLead.data}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tipo de Interesse</label>
                    <p className="text-gray-900">{selectedLead.tipoInteresse}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Orçamento</label>
                    <p className="text-gray-900">
                      {selectedLead.orcamento.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>

                {selectedLead.observacoes && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Observações</label>
                    <p className="text-gray-900">{selectedLead.observacoes}</p>
                  </div>
                )}
              </div>
            )}

            {actionType === "call" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Phone className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium">{selectedLead.nome}</h4>
                  <p className="text-gray-600">{selectedLead.telefone}</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full rounded-lg bg-green-600 p-3 text-white hover:bg-green-700">
                    📞 Ligar Agora
                  </button>
                  <button className="w-full rounded-lg border border-gray-300 p-3 hover:bg-gray-50">
                    📱 Enviar WhatsApp
                  </button>
                  <button className="w-full rounded-lg border border-gray-300 p-3 hover:bg-gray-50">
                    📅 Agendar Ligação
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Notas da Ligação</label>
                  <textarea
                    className="w-full resize-none rounded-lg border border-gray-300 p-3"
                    rows={3}
                    placeholder="Adicione suas anotações sobre a ligação..."
                  />
                </div>
              </div>
            )}

            {actionType === "email" && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Para</label>
                  <Input type="email" className="rounded-lg" value={selectedLead.email} readOnly />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Assunto</label>
                  <Input
                    type="text"
                    className="rounded-lg"
                    placeholder="Assunto do email"
                    defaultValue={`Oportunidade de Investimento - ${selectedLead.tipoInteresse}`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Mensagem</label>
                  <textarea
                    className="w-full resize-none rounded-lg border border-gray-300 p-3"
                    rows={6}
                    placeholder="Digite sua mensagem..."
                    defaultValue={`Olá ${selectedLead.nome},

Espero que esteja bem! 

Gostaria de dar continuidade à nossa conversa sobre sua busca por ${selectedLead.tipoInteresse.toLowerCase()} em Orlando.

Tenho algumas opções interessantes que podem se adequar ao seu orçamento de ${selectedLead.orcamento.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      },
                    )}.

Quando seria um bom momento para conversarmos?

Atenciosamente,
Seu Corretor`}
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-lg bg-transparent">
                    💾 Salvar Rascunho
                  </Button>
                  <Button className="flex-1 rounded-lg">📧 Enviar Email</Button>
                </div>
              </div>
            )}

            {actionType === "edit" && (
              <>
                <h3 className="text-lg font-semibold mb-4">Editar Lead - {selectedLead.nome}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome Completo</label>
                    <Input
                      type="text"
                      name="nome"
                      value={leadFormData.nome}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">E-mail</label>
                    <Input
                      type="email"
                      name="email"
                      value={leadFormData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Telefone</label>
                    <div className="flex gap-2">
                      <select className="w-24 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+351">🇵🇹 +351</option>
                        <option value="+33">🇫🇷 +33</option>
                      </select>
                      <input
                        type="tel"
                        name="telefone"
                        value={leadFormData.telefone}
                        onChange={handleInputChange}
                        className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fonte do Lead</label>
                    <select
                      name="fonte"
                      value={leadFormData.fonte}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Selecione a origem</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Site">Site</option>
                      <option value="Google">Google</option>
                      <option value="Recomendacao">Recomendação</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Interesse</label>
                    <select
                      name="tipoInteresse"
                      value={leadFormData.tipoInteresse}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="Curta Temporada">Investimento Curta Temporada</option>
                      <option value="Longa Temporada">Investimento Longa Temporada</option>
                      <option value="Morar">Morar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Qualificação do Lead</label>
                    <select
                      name="temperatura"
                      value={leadFormData.temperatura}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Selecione a qualificação</option>
                      <option value="Quente">🔥 Quente</option>
                      <option value="Morno">🌡️ Morno</option>
                      <option value="Frio">❄️ Frio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Orçamento</label>
                    <Input
                      type="text"
                      name="orcamento"
                      value={leadFormData.orcamento}
                      onChange={(e) => {
                        const rawValue = e.target.value
                        const digitsOnly = rawValue.replace(/\D/g, "")

                        if (!digitsOnly) {
                          setLeadFormData((prev) => ({ ...prev, orcamento: "" }))
                          return
                        }

                        const cents = Number.parseInt(digitsOnly, 10)
                        const amount = cents / 100

                        const formatted = new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(amount)

                        setLeadFormData((prev) => ({ ...prev, orcamento: formatted }))
                      }}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: $300,000.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Observações</label>
                    <textarea
                      name="observacoes"
                      value={leadFormData.observacoes}
                      onChange={handleInputChange}
                      placeholder="Informações adicionais sobre o lead..."
                      className="w-full p-2 border rounded"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl bg-transparent"
                onClick={() => setShowLeadModal(false)}
              >
                Fechar
              </Button>
              {actionType === "view" && (
                <Button className="flex-1 rounded-xl" onClick={() => handleEditLead(selectedLead)}>
                  Editar Lead
                </Button>
              )}
              {actionType === "edit" && (
                <Button
                  onClick={handleUpdateLead}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Salvar Alterações
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Relatório */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Relatório de Leads</h3>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
                ✕
              </button>
            </div>

            {(() => {
              const reportData = generateReportData()
              return (
                <div className="space-y-6">
                  {/* Resumo Geral */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{reportData.totalLeads}</div>
                      <div className="text-sm text-blue-800">Total de Leads</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{reportData.leadsPorStatus.fechado}</div>
                      <div className="text-sm text-green-800">Vendas Fechadas</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">{reportData.taxaConversao}%</div>
                      <div className="text-sm text-yellow-800">Taxa de Conversão</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        R$ {reportData.valorMedio.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                      </div>
                      <div className="text-sm text-purple-800">Ticket Médio</div>
                    </div>
                  </div>

                  {/* Leads por Status */}
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Distribuição por Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Novos:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div
                              className="h-3 bg-blue-500 rounded-full"
                              style={{ width: `${(reportData.leadsPorStatus.novo / reportData.totalLeads) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{reportData.leadsPorStatus.novo}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Qualificados:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div
                              className="h-3 bg-green-500 rounded-full"
                              style={{
                                width: `${(reportData.leadsPorStatus.qualificado / reportData.totalLeads) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-medium">{reportData.leadsPorStatus.qualificado}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Propostas:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div
                              className="h-3 bg-yellow-500 rounded-full"
                              style={{
                                width: `${(reportData.leadsPorStatus.proposta / reportData.totalLeads) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-medium">{reportData.leadsPorStatus.proposta}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fechados:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-3 bg-gray-200 rounded-full">
                            <div
                              className="h-3 bg-emerald-500 rounded-full"
                              style={{ width: `${(reportData.leadsPorStatus.fechado / reportData.totalLeads) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{reportData.leadsPorStatus.fechado}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Leads por Fonte */}
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Leads por Fonte</h4>
                    <div className="space-y-2">
                      {Object.entries(reportData.leadsPorFonte).map(([fonte, quantidade]) => (
                        <div key={fonte} className="flex justify-between items-center">
                          <span>{fonte}:</span>
                          <span className="font-medium">{quantidade} leads</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leads por Qualificação */}
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Leads por Qualificação</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>🔥 Quente:</span>
                        <span className="font-medium">{reportData.leadsPorTemperatura.quente} leads</span>
                      </div>
                      <div className="flex justify-between">
                        <span>🌡️ Morno:</span>
                        <span className="font-medium">{reportData.leadsPorTemperatura.morno} leads</span>
                      </div>
                      <div className="flex justify-between">
                        <span>❄️ Frio:</span>
                        <span className="font-medium">{reportData.leadsPorTemperatura.frio} leads</span>
                      </div>
                    </div>
                  </div>

                  {/* Valor Total */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Valor Total do Pipeline</div>
                      <div className="text-3xl font-bold text-gray-900">
                        R$ {reportData.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Imprimir Relatório
                    </button>
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Modal Novo Compromisso */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Novo Compromisso</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNewAppointmentModal(false)}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Primeira linha - Título e Tipo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Título do compromisso</label>
                  <Input
                    type="text"
                    className="rounded-xl"
                    placeholder="Ex: Reunião com Cliente"
                    value={newAppointmentTitle}
                    onChange={(e) => setNewAppointmentTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Tipo de Compromisso</label>
                  <select className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Selecione o tipo</option>
                    <option value="reuniao">📋 Reunião</option>
                    <option value="visita">🏠 Visita</option>
                    <option value="ligacao">📞 Ligação</option>
                    <option value="followup">🔄 Follow-up</option>
                    <option value="apresentacao">📊 Apresentação</option>
                    <option value="negociacao">💼 Negociação</option>
                  </select>
                </div>
              </div>

              {/* Segunda linha - Data e Horário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Data</label>
                  <Input
                    type="date"
                    className="rounded-xl"
                    value={newAppointmentDate}
                    onChange={(e) => setNewAppointmentDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Horário</label>
                  <Input
                    type="time"
                    className="rounded-xl"
                    value={newAppointmentTime}
                    onChange={(e) => setNewAppointmentTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Terceira linha - Lead e Lembrete */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Lead Relacionado</label>
                  <select className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Selecione o lead</option>
                    <option value="maria">👩 Maria Silva</option>
                    <option value="joao">👨 João Santos</option>
                    <option value="ana">👩 Ana Costa</option>
                    <option value="carlos">👨 Carlos Lima</option>
                    <option value="novo">➕ Novo Lead</option>
                    <option value="sem-lead">📋 Sem lead específico</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Lembrete</label>
                  <select className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Sem lembrete</option>
                    <option value="15min">⏰ 15 minutos antes</option>
                    <option value="30min">⏰ 30 minutos antes</option>
                    <option value="1hora">⏰ 1 hora antes</option>
                    <option value="1dia">📅 1 dia antes</option>
                  </select>
                </div>
              </div>

              {/* Quarta linha - Local */}
              <div>
                <label className="mb-2 block text-sm font-medium">Local/Endereço</label>
                <Input
                  type="text"
                  className="rounded-xl"
                  placeholder="Ex: Escritório Central, 1234 Main St, Kissimmee, ou Videochamada"
                />
              </div>

              {/* Quinta linha - Observações */}
              <div>
                <label className="mb-2 block text-sm font-medium">Observações</label>
                <textarea
                  className="w-full resize-none rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Informações adicionais sobre o compromisso..."
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl bg-transparent"
                onClick={() => setShowNewAppointmentModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 rounded-xl"
                onClick={() => {
                  alert("Compromisso salvo com sucesso!")
                  setShowNewAppointmentModal(false)
                  setNewAppointmentTitle("")
                  setNewAppointmentDate("")
                  setNewAppointmentTime("")
                }}
              >
                Salvar Compromisso
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DesignaliCreative
