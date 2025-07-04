"use client"

// React Imports
import type React from "react"
import { useEffect, useState } from "react"

// Third-Party Imports
import { motion, AnimatePresence } from "framer-motion"

// Lucide React Icons
import {
  Bell,
  Menu,
  PanelLeft,
  MessageSquare,
  MessageCircle,
  Plus,
  ImageIcon,
  Brush,
  Video,
  Sparkles,
  Layers,
  ArrowDownUpIcon,
  Camera,
  FileText,
  Code,
  CuboidIcon,
  Type,
  Palette,
  Gauge,
  BarChart3,
  LayoutGrid,
} from "lucide-react"

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { StarBorder } from "@/components/ui/star-border"

// Custom Components
import { CRMDashboard } from "@/components/crm/CRMDashboard"
import { LeadsTable } from "@/components/crm/LeadsTable"
import { PipelineView } from "@/components/crm/PipelineView"
import { AgendaManager } from "@/components/crm/AgendaManager"
import { Sidebar } from "@/components/layout/Sidebar"
import { AgentsHub } from "@/components/agents/AgentsHub"
import { FinancialDashboard } from "@/components/financial/FinancialDashboard"

// Utility Imports
import { cn } from "@/lib/utils"

// Interfaces
interface Appointment {
  id: number
  title: string
  date: string
  time: string
  type: string
  relatedLead: string
  reminder: string
  location: string
  notes: string
}

interface Lead {
  id: number
  nome: string
  email: string
  telefone: string
  fonte: string
  tipoInteresse: string
  orcamento: number
  status: string
  temperatura: string
  data: string
  observacoes?: string
}

// Dados dos agentes disponíveis
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
  {
    name: "Zayo Analisador de Zillow",
    icon: <BarChart3 className="text-emerald-500" />,
    description: "Análise avançada de dados do Zillow para Orlando",
    category: "Análise",
    recent: false,
    new: true,
    progress: 100,
  },
]

// Dados de arquivos recentes (não utilizados atualmente)
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

// Dados de projetos (não utilizados atualmente)
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

// Dados de tutoriais (não utilizados atualmente)
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

// Dados da comunidade (não utilizados atualmente)
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

export function DesignaliCreative() {
  const [notification, setNotification] = useState("")
  const [greetingPrefix, setGreetingPrefix] = useState("")

  // Definir saudação baseada no horário
  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour >= 5 && currentHour < 12) {
      setGreetingPrefix("Bom dia")
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetingPrefix("Boa tarde")
    } else {
      setGreetingPrefix("Boa noite")
    }
  }, [])

  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState(5)
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [savedROIs, setSavedROIs] = useState<any[]>([])
  const [favoriteAgents, setFavoriteAgents] = useState<string[]>([])
  const [activeRoiView, setActiveRoiView] = useState<"agents" | "my-rois" | "favorites">("agents")
  const [showRoiTool, setShowRoiTool] = useState(false)
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const [activeCrmTab, setActiveCrmTab] = useState("dashboard")
  const [showReportModal, setShowReportModal] = useState(false)

  // Estados do módulo Financeiro
  const [activeFinancialTab, setActiveFinancialTab] = useState("overview")
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false)

  const [newAppointments, setNewAppointments] = useState<Appointment[]>([
    {
      id: 1,
      title: "Reunião com Maria Silva",
      date: "2024-07-01",
      time: "09:00",
      type: "reuniao",
      relatedLead: "Maria Silva",
      reminder: "15min",
      location: "Escritório Central",
      notes: "Apresentação de propriedades",
    },
    {
      id: 2,
      title: "Visita - João Santos",
      date: "2024-07-01",
      time: "14:00",
      type: "visita",
      relatedLead: "João Santos",
      reminder: "30min",
      location: "1234 Main St, Kissimmee",
      notes: "Casa em Kissimmee",
    },
    {
      id: 3,
      title: "Follow-up Carlos Lima",
      date: "2024-07-01",
      time: "16:30",
      type: "ligacao",
      relatedLead: "Carlos Lima",
      reminder: "1hora",
      location: "Ligação agendada",
      notes: "Retorno sobre proposta",
    },
    {
      id: 4,
      title: "Visita - Ana Costa",
      date: "2024-07-02",
      time: "10:00",
      type: "visita",
      relatedLead: "Ana Costa",
      reminder: "1dia",
      location: "456 Oak Ave, Orlando",
      notes: "Apresentar opções de longa temporada",
    },
    {
      id: 5,
      title: "Reunião Equipe",
      date: "2024-07-03",
      time: "09:00",
      type: "reuniao",
      relatedLead: "sem-lead",
      reminder: "1hora",
      location: "Sala de Reuniões",
      notes: "Planejamento semanal",
    },
    {
      id: 6,
      title: "Apresentação Lucia",
      date: "2024-07-05",
      time: "15:00",
      type: "apresentacao",
      relatedLead: "Lucia Mendes",
      reminder: "1dia",
      location: "Videochamada",
      notes: "Apresentação de ROI para investimento",
    },
  ])
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const [leadsList, setLeadsList] = useState<Lead[]>([
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
    },
    {
      id: 5,
      nome: "Lucia Mendes",
      email: "lucia@email.com",
      telefone: "(81) 55555-5555",
      fonte: "Indicação",
      tipoInteresse: "Curta Temporada",
      orcamento: 500000,
      status: "Qualificado",
      temperatura: "Quente",
      data: "01/07/2024",
    },
  ])

  const [leadFormData, setLeadFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    fonte: "",
    tipoInteresse: "",
    temperatura: "",
    orcamento: "",
    observacoes: "",
  })

  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState("")

  // Gerar dados do relatório
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
      leadsPorTemperatura,
      valorTotal,
      valorMedio,
      taxaConversao,
    }
  }

  // Atualizar status do lead
  const updateLeadStatus = (leadId: number, newStatus: string) => {
    setLeadsList((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))

    const leadName = leadsList.find((l) => l.id === leadId)?.nome
    setNotification(`Status de ${leadName} alterado para ${newStatus}`)

    setTimeout(() => setNotification(""), 3000)
  }

  // Simular carregamento de progresso
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Simular expiração de ROIs
  useEffect(() => {
    const interval = setInterval(
      () => {
        setSavedROIs((prev) => prev.filter((roi) => new Date(roi.expiresAt) > new Date()))
      },
      60 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  const handleSaveLead = () => {
    if (leadFormData.nome && leadFormData.email) {
      const novoLead = {
        id: leadsList.length + 1,
        nome: leadFormData.nome,
        email: leadFormData.email,
        telefone: leadFormData.telefone,
        fonte: leadFormData.fonte,
        tipoInteresse: leadFormData.tipoInteresse,
        orcamento: Number.parseFloat(leadFormData.orcamento.replace(/[^0-9.]/g, "")) || 0,
        status: "Novo",
        temperatura: leadFormData.temperatura,
        data: new Date().toLocaleDateString("pt-BR"),
        observacoes: leadFormData.observacoes,
      }

      setLeadsList((prev) => [novoLead, ...prev])
      setShowNewLeadModal(false)

      setLeadFormData({
        nome: "",
        email: "",
        telefone: "",
        fonte: "",
        tipoInteresse: "",
        temperatura: "",
        orcamento: "",
        observacoes: "",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLeadFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, lead: Lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnStatus: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(columnStatus)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
    e.preventDefault()
    if (draggedLead && draggedLead.status !== newStatus) {
      updateLeadStatus(draggedLead.id, newStatus)
    }
    setDraggedLead(null)
    setDragOverColumn("")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOverColumn("")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background animado com gradiente */}
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

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCrmTab={activeCrmTab}
        setActiveCrmTab={setActiveCrmTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        savedROIsCount={savedROIs.length}
        favoriteAgentsCount={favoriteAgents.length}
        setShowRoiTool={setShowRoiTool}
        setActiveRoiView={setActiveRoiView}
      />

      {/* Conteúdo Principal */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
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
              if (value !== "apps") {
                setShowRoiTool(false)
                setActiveRoiView("agents")
              }
            }}
            className="w-full"
          >
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[800px] grid-cols-5 rounded-2xl p-1 text-slate-500">
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
                <TabsTrigger value="financeiro" className="rounded-xl data-[state=active]:rounded-xl">
                  Financeiro
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex gap-2">
                {activeTab === "files" && (
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
                      className="relative overflow-hidden rounded-3xl px-8 bg-slate-500 opacity-40 text-slate-100 py-3.5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative z-10 max-w-2xl">
                        <h2 className="text-2xl md:text-4xl font-bold">{greetingPrefix}, Corretor!</h2>
                        <p className="mt-2 text-sm md:text-base text-white/80">
                          Domine o mercado imobiliário de Orlando com nossa suíte de soluções inteligentes para
                          corretores.
                        </p>
                        <div className="flex flex-wrap gap-3"></div>
                      </div>

                      <BackgroundBeams className="absolute inset-0 z-0 pointer-events-none" />
                    </motion.div>
                  </section>

                  <section className="space-y-4"></section>

                  <section className="space-y-4"></section>
                </TabsContent>

                <TabsContent value="apps" className="space-y-8 mt-0">
                  <AgentsHub
                    showRoiTool={showRoiTool}
                    setShowRoiTool={setShowRoiTool}
                    activeRoiView={activeRoiView}
                    setActiveRoiView={setActiveRoiView}
                    savedROIs={savedROIs}
                    setSavedROIs={setSavedROIs}
                    favoriteAgents={favoriteAgents}
                    setFavoriteAgents={setFavoriteAgents}
                    apps={apps}
                    setActiveTab={setActiveTab}
                  />
                </TabsContent>

                <TabsContent value="files" className="space-y-8 mt-0 h-full w-full max-w-full"></TabsContent>

                <TabsContent value="learn" className="space-y-8 mt-0">
                  <div className="space-y-6">
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

                    {notification && (
                      <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
                        <span>{notification}</span>
                        <button onClick={() => setNotification("")} className="text-green-700 hover:text-green-900">
                          ✕
                        </button>
                      </div>
                    )}

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
                      <CRMDashboard
                        leadsList={leadsList}
                        searchTerm={""}
                        setSearchTerm={() => {}}
                        statusFilter={""}
                        setStatusFilter={() => {}}
                        sourceFilter={""}
                        setSourceFilter={() => {}}
                        temperaturaFilter={""}
                        setTemperaturaFilter={() => {}}
                        handleViewLead={() => {}}
                        handleEditLead={() => {}}
                        handleCallLead={() => {}}
                        handleEmailLead={() => {}}
                        updateLeadStatus={updateLeadStatus}
                      />
                    )}

                    {activeCrmTab === "leads" && (
                      <LeadsTable
                        leadsList={leadsList}
                        updateLeadStatus={updateLeadStatus}
                        notification={notification}
                        setNotification={setNotification}
                      />
                    )}

                    {activeCrmTab === "pipeline" && (
                      <PipelineView leadsList={leadsList} updateLeadStatus={updateLeadStatus} />
                    )}

                    {activeCrmTab === "agenda" && (
                      <AgendaManager
                        appointments={newAppointments}
                        setAppointments={setNewAppointments}
                        tasks={completedTasks}
                        setTasks={setCompletedTasks}
                        leadsList={leadsList}
                        notification={notification}
                        setNotification={setNotification}
                      />
                    )}

                    {showNewLeadModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Novo Lead</h3>
                            <button
                              onClick={() => setShowNewLeadModal(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                              <input
                                type="text"
                                name="nome"
                                value={leadFormData.nome}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nome completo"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                              <input
                                type="email"
                                name="email"
                                value={leadFormData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="email@exemplo.com"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                              <input
                                type="tel"
                                name="telefone"
                                value={leadFormData.telefone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="(11) 99999-9999"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Fonte</label>
                              <select
                                name="fonte"
                                value={leadFormData.fonte}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Selecione a fonte</option>
                                <option value="Site">Site</option>
                                <option value="Google">Google</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Recomendacao">Recomendação</option>
                                <option value="Indicação">Indicação</option>
                                <option value="Outros">Outros</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Interesse</label>
                              <select
                                name="tipoInteresse"
                                value={leadFormData.tipoInteresse}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Selecione o tipo</option>
                                <option value="Curta Temporada">Curta Temporada</option>
                                <option value="Longa Temporada">Longa Temporada</option>
                                <option value="Morar">Morar</option>
                                <option value="Investimento">Investimento</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Qualificação</label>
                              <select
                                name="temperatura"
                                value={leadFormData.temperatura}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Selecione a qualificação</option>
                                <option value="Quente">🔥 Quente</option>
                                <option value="Morno">🌡️ Morno</option>
                                <option value="Frio">❄️ Frio</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento</label>
                              <input
                                type="text"
                                name="orcamento"
                                value={leadFormData.orcamento}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="R$ 450.000"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                              <textarea
                                name="observacoes"
                                value={leadFormData.observacoes}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Observações adicionais..."
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 mt-6">
                            <button
                              onClick={() => setShowNewLeadModal(false)}
                              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleSaveLead}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Salvar Lead
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showReportModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Relatório de Leads</h3>
                            <button
                              onClick={() => setShowReportModal(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>

                          {(() => {
                            const reportData = generateReportData()
                            return (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-800">Total de Leads</h4>
                                    <p className="text-2xl font-bold text-blue-600">{reportData.totalLeads}</p>
                                  </div>
                                  <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-800">Taxa de Conversão</h4>
                                    <p className="text-2xl font-bold text-green-600">{reportData.taxaConversao}%</p>
                                  </div>
                                  <div className="bg-purple-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-800">Valor Total</h4>
                                    <p className="text-2xl font-bold text-purple-600">
                                      {reportData.valorTotal.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                  </div>
                                  <div className="bg-orange-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-orange-800">Ticket Médio</h4>
                                    <p className="text-2xl font-bold text-orange-600">
                                      {reportData.valorMedio.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-semibold mb-3">Leads por Status</h4>
                                    <div className="space-y-2">
                                      {Object.entries(reportData.leadsPorStatus).map(([status, count]) => (
                                        <div key={status} className="flex justify-between">
                                          <span className="capitalize">{status}</span>
                                          <span className="font-medium">{count}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-semibold mb-3">Leads por Fonte</h4>
                                    <div className="space-y-2">
                                      {Object.entries(reportData.leadsPorFonte).map(([fonte, count]) => (
                                        <div key={fonte} className="flex justify-between">
                                          <span>{fonte}</span>
                                          <span className="font-medium">{count}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-semibold mb-3">Leads por Qualificação</h4>
                                    <div className="space-y-2">
                                      {Object.entries(reportData.leadsPorTemperatura).map(([temp, count]) => (
                                        <div key={temp} className="flex justify-between">
                                          <span className="capitalize">
                                            {temp === "quente" ? "🔥 Quente" : temp === "morno" ? "🌡️ Morno" : "❄️ Frio"}
                                          </span>
                                          <span className="font-medium">{count}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white border rounded-lg p-4">
                                  <h4 className="font-semibold mb-3">Resumo Executivo</h4>
                                  <div className="text-sm text-gray-600 space-y-2">
                                    <p>
                                      • Total de {reportData.totalLeads} leads cadastrados no sistema, com uma taxa de
                                      conversão de {reportData.taxaConversao}%.
                                    </p>
                                    <p>
                                      • O valor total em negociações é de{" "}
                                      {reportData.valorTotal.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                      , com ticket médio de{" "}
                                      {reportData.valorMedio.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                      .
                                    </p>
                                    <p>
                                      • A principal fonte de leads é{" "}
                                      {Object.entries(reportData.leadsPorFonte).sort(([, a], [, b]) => b - a)[0]?.[0]}{" "}
                                      com{" "}
                                      {Object.entries(reportData.leadsPorFonte).sort(([, a], [, b]) => b - a)[0]?.[1]}{" "}
                                      leads.
                                    </p>
                                    <p>
                                      • Temos {reportData.leadsPorTemperatura.quente} leads qualificados como "Quente",
                                      representando alta probabilidade de conversão.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          })()}

                          <div className="flex justify-end gap-3 mt-6">
                            <button
                              onClick={() => setShowReportModal(false)}
                              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              Fechar
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Exportar PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="financeiro" className="space-y-8 mt-0">
                  <FinancialDashboard
                    activeFinancialTab={activeFinancialTab}
                    setActiveFinancialTab={setActiveFinancialTab}
                    showNewTransactionModal={showNewTransactionModal}
                    setShowNewTransactionModal={setShowNewTransactionModal}
                  />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default DesignaliCreative
