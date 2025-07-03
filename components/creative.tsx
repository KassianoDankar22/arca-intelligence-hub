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
  Edit,
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
import { StarBorder } from "@/components/ui/star-border"

// Definir interface para Compromisso
interface Appointment {
  id: number
  title: string
  date: string // Formato YYYY-MM-DD
  time: string // Formato HH:MM
  type: string
  relatedLead: string
  reminder: string
  location: string
  notes: string
}

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

export function DesignaliCreative() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sourceFilter, setSourceFilter] = useState("")
  const [notification, setNotification] = useState("")

  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState(5)
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(true)
  const [savedROIs, setSavedROIs] = useState<any[]>([])
  const [favoriteAgents, setFavoriteAgents] = useState<string[]>([])
  const [activeRoiView, setActiveRoiView] = useState<"agents" | "my-rois" | "favorites">("agents")
  const [showRoiTool, setShowRoiTool] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias")
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const [activeCrmTab, setActiveCrmTab] = useState("dashboard")
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [actionType, setActionType] = useState("")
  const [showReportModal, setShowReportModal] = useState(false)
  const [temperaturaFilter, setTemperaturaFilter] = useState("")
  const [newAppointmentTitle, setNewAppointmentTitle] = useState("")
  const [newAppointmentDate, setNewAppointmentDate] = useState("")
  const [newAppointmentTime, setNewAppointmentTime] = useState("")
  const [newAppointmentType, setNewAppointmentType] = useState("")
  const [newAppointmentRelatedLead, setNewAppointmentRelatedLead] = useState("")
  const [newAppointmentReminder, setNewAppointmentReminder] = useState("")
  const [newAppointmentLocation, setNewAppointmentLocation] = useState("")
  const [newAppointmentNotes, setNewAppointmentNotes] = useState("")
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
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

  const [draggedLead, setDraggedLead] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState("")

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
      leadsPorTemperatura,
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

  // useEffect para simular expiração de ROIs
  useEffect(() => {
    const interval = setInterval(
      () => {
        setSavedROIs((prev) => prev.filter((roi) => new Date(roi.expiresAt) > new Date()))
      },
      60 * 60 * 1000,
    )

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
        temperatura: leadFormData.temperatura,
        orcamento: Number.parseFloat(leadFormData.orcamento.replace(/[^0-9.]/g, "")) || 0,
        status: "Novo",
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
      orcamento: lead.orcamento.toString(),
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

  const handleUpdateLead = () => {
    console.log("Update Lead function will be implemented next!")
  }

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e, columnStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(columnStatus)
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

  const openAppointmentModal = (appointmentToEdit: Appointment | null = null) => {
    if (appointmentToEdit) {
      setEditingAppointment(appointmentToEdit)
      setNewAppointmentTitle(appointmentToEdit.title)
      setNewAppointmentDate(appointmentToEdit.date)
      setNewAppointmentTime(appointmentToEdit.time)
      setNewAppointmentType(appointmentToEdit.type)
      setNewAppointmentRelatedLead(appointmentToEdit.relatedLead)
      setNewAppointmentReminder(appointmentToEdit.reminder)
      setNewAppointmentLocation(appointmentToEdit.location)
      setNewAppointmentNotes(appointmentToEdit.notes)
    } else {
      setEditingAppointment(null)
      setNewAppointmentTitle("")
      setNewAppointmentDate("")
      setNewAppointmentTime("")
      setNewAppointmentType("")
      setNewAppointmentRelatedLead("")
      setNewAppointmentReminder("")
      setNewAppointmentLocation("")
      setNewAppointmentNotes("")
    }
    setShowAppointmentModal(true)
  }

  const handleSaveOrUpdateAppointment = () => {
    if (!newAppointmentTitle || !newAppointmentDate || !newAppointmentTime) {
      alert("Por favor, preencha o título, data e horário do compromisso.")
      return
    }

    const appointmentData = {
      title: newAppointmentTitle,
      date: newAppointmentDate,
      time: newAppointmentTime,
      type: newAppointmentType,
      relatedLead: newAppointmentRelatedLead,
      reminder: newAppointmentReminder,
      location: newAppointmentLocation,
      notes: newAppointmentNotes,
    }

    if (editingAppointment) {
      setNewAppointments((prev) =>
        prev.map((app) => (app.id === editingAppointment.id ? { ...app, ...appointmentData } : app)),
      )
      setNotification("Compromisso atualizado com sucesso!")
    } else {
      const newId = newAppointments.length > 0 ? Math.max(...newAppointments.map((a) => a.id)) + 1 : 1
      setNewAppointments((prev) => [...prev, { id: newId, ...appointmentData }])
      setNotification("Compromisso salvo com sucesso!")
    }

    setShowAppointmentModal(false)
    setEditingAppointment(null)
    setNewAppointmentTitle("")
    setNewAppointmentDate("")
    setNewAppointmentTime("")
    setNewAppointmentType("")
    setNewAppointmentRelatedLead("")
    setNewAppointmentReminder("")
    setNewAppointmentLocation("")
    setNewAppointmentNotes("")

    setTimeout(() => setNotification(""), 3000)
  }

  const today = new Date().toISOString().split("T")[0]
  const appointmentsToday = newAppointments
    .filter((appointment) => appointment.date === today)
    .sort((a, b) => a.time.localeCompare(b.time))

  const upcomingAppointments = newAppointments
    .filter((appointment) => appointment.date > today)
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOverColumn("")
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
                            onClick={() => {
                              setActiveTab("apps")
                              setShowRoiTool(false)
                              setActiveRoiView("agents")
                            }}
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
                            onClick={() => {
                              setActiveTab("apps")
                              setShowRoiTool(false)
                              setActiveRoiView("agents")
                            }}
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
                      className="relative overflow-hidden rounded-3xl px-8 py-2 bg-slate-500 opacity-40 text-slate-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative z-10 max-w-2xl">
                        <h2 className="text-2xl md:text-4xl font-bold">Bom dia, Corretor!</h2>
                        <p className="mt-2 text-sm md:text-base text-white/80">
                          Domine o mercado imobiliário de Orlando com nossa suíte de soluções inteligentes para
                          corretores.
                        </p>
                        <div className="flex flex-wrap gap-3"></div>
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
                  
                </TabsContent>

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
                      <div>
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

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

                        <Card className="rounded-2xl">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Users className="h-5 w-5" />
                              Leads Recentes
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
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
                                  <option value="Recomendacao">Recomendação</option>
                                </select>
                              </div>
                            </div>

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
                                  {filteredLeads.map((lead) => (
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
                                setTemperaturaFilter("")
                              }}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Limpar filtros
                            </button>
                          )}
                        </div>

                        <div>
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

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Agenda e Compromissos</h3>
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                            onClick={() => openAppointmentModal()}
                          >
                            + Novo Compromisso
                          </button>
                        </div>

                        {notification && (
                          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
                            <span>{notification}</span>
                            <button onClick={() => setNotification("")} className="text-green-700 hover:text-green-900">
                              ✕
                            </button>
                          </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <Card className="rounded-2xl">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Bell className="h-5 w-5" />
                                  Compromissos de Hoje
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {appointmentsToday.length === 0 ? (
                                  <div className="text-center py-8 text-gray-500">
                                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>Nenhum compromisso para hoje</p>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    {appointmentsToday.map((appointment) => (
                                      <div
                                        key={appointment.id}
                                        className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
                                      >
                                        <div className="flex items-center gap-4">
                                          <div className="text-center">
                                            <div className="text-lg font-bold text-blue-600">
                                              {appointment.time.split(":")[0]}
                                            </div>
                                            <div className="text-sm text-blue-500">
                                              {appointment.time.split(":")[1]}
                                            </div>
                                          </div>
                                          <div>
                                            <h4 className="font-semibold">{appointment.title}</h4>
                                            <p className="text-sm text-gray-600">{appointment.location}</p>
                                            {appointment.relatedLead !== "sem-lead" && (
                                              <p className="text-xs text-blue-600">Lead: {appointment.relatedLead}</p>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              appointment.type === "reuniao"
                                                ? "bg-blue-100 text-blue-800"
                                                : appointment.type === "visita"
                                                  ? "bg-green-100 text-green-800"
                                                  : appointment.type === "ligacao"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-purple-100 text-purple-800"
                                            }`}
                                          >
                                            {appointment.type === "reuniao"
                                              ? "Reunião"
                                              : appointment.type === "visita"
                                                ? "Visita"
                                                : appointment.type === "ligacao"
                                                  ? "Ligação"
                                                  : "Apresentação"}
                                          </span>
                                          <button
                                            onClick={() => openAppointmentModal(appointment)}
                                            className="text-blue-600 hover:text-blue-800"
                                          >
                                            <Edit className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>

                          <div>
                            <Card className="rounded-2xl">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Bell className="h-5 w-5" />
                                  Próximos Compromissos
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {upcomingAppointments.length === 0 ? (
                                  <div className="text-center py-8 text-gray-500">
                                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>Nenhum compromisso futuro</p>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    {upcomingAppointments.slice(0, 5).map((appointment) => (
                                      <div
                                        key={appointment.id}
                                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div className="text-center min-w-[60px]">
                                          <div className="text-sm font-bold text-gray-700">
                                            {new Date(appointment.date).toLocaleDateString("pt-BR", {
                                              day: "2-digit",
                                              month: "short",
                                            })}
                                          </div>
                                          <div className="text-xs text-gray-500">{appointment.time}</div>
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="font-medium text-sm">{appointment.title}</h4>
                                          <p className="text-xs text-gray-600">{appointment.location}</p>
                                          {appointment.relatedLead !== "sem-lead" && (
                                            <p className="text-xs text-blue-600">Lead: {appointment.relatedLead}</p>
                                          )}
                                        </div>
                                        <button
                                          onClick={() => openAppointmentModal(appointment)}
                                          className="text-gray-400 hover:text-gray-600"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <Card className="rounded-2xl">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Tarefas Pendentes
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {[
                                "Enviar proposta para Maria Silva",
                                "Agendar visita com João Santos",
                                "Follow-up com Carlos Lima",
                                "Preparar apresentação para Ana Costa",
                                "Atualizar CRM com novos leads",
                                "Revisar contratos pendentes",
                              ].map((task, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <input
                                    type="checkbox"
                                    checked={completedTasks.includes(index)}
                                    onChange={() => toggleTaskCompletion(index)}
                                    className="h-4 w-4 text-blue-600 rounded"
                                  />
                                  <span
                                    className={`flex-1 text-sm ${
                                      completedTasks.includes(index) ? "line-through text-gray-500" : "text-gray-700"
                                    }`}
                                  >
                                    {task}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {completedTasks.includes(index) ? "Concluída" : "Pendente"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
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

                    {showLeadModal && selectedLead && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                              {actionType === "view"
                                ? "Detalhes do Lead"
                                : actionType === "edit"
                                  ? "Editar Lead"
                                  : actionType === "call"
                                    ? "Ligar para Lead"
                                    : "Enviar Email"}
                            </h3>
                            <button
                              onClick={() => setShowLeadModal(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>

                          {actionType === "view" && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                                  <p className="text-gray-900">{selectedLead.nome}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Email</label>
                                  <p className="text-gray-900">{selectedLead.email}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                  <p className="text-gray-900">{selectedLead.telefone}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Fonte</label>
                                  <p className="text-gray-900">{selectedLead.fonte}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Tipo de Interesse</label>
                                  <p className="text-gray-900">{selectedLead.tipoInteresse}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Status</label>
                                  <p className="text-gray-900">{selectedLead.status}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Orçamento</label>
                                  <p className="text-gray-900">
                                    {selectedLead.orcamento.toLocaleString("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    })}
                                  </p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Data</label>
                                  <p className="text-gray-900">{selectedLead.data}</p>
                                </div>
                              </div>
                              {selectedLead.observacoes && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Observações</label>
                                  <p className="text-gray-900">{selectedLead.observacoes}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {actionType === "edit" && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                                  <input
                                    type="text"
                                    name="nome"
                                    value={leadFormData.nome}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo de Interesse
                                  </label>
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
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                                <textarea
                                  name="observacoes"
                                  value={leadFormData.observacoes}
                                  onChange={handleInputChange}
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>
                          )}

                          {actionType === "call" && (
                            <div className="space-y-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-medium text-green-800 mb-2">Informações para Ligação</h4>
                                <p>
                                  <strong>Nome:</strong> {selectedLead.nome}
                                </p>
                                <p>
                                  <strong>Telefone:</strong> {selectedLead.telefone}
                                </p>
                                <p>
                                  <strong>Interesse:</strong> {selectedLead.tipoInteresse}
                                </p>
                                <p>
                                  <strong>Orçamento:</strong>{" "}
                                  {selectedLead.orcamento.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notas da Ligação</label>
                                <textarea
                                  rows={4}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Anote aqui os pontos importantes da conversa..."
                                />
                              </div>
                            </div>
                          )}

                          {actionType === "email" && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Para</label>
                                <input
                                  type="email"
                                  value={selectedLead.email}
                                  readOnly
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Assunto do email"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                                <textarea
                                  rows={6}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder={`Olá ${selectedLead.nome},\n\nEspero que esteja bem. Gostaria de dar continuidade à nossa conversa sobre ${selectedLead.tipoInteresse}...\n\nAguardo seu retorno.\n\nAtenciosamente,\n[Seu Nome]`}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end gap-3 mt-6">
                            <button
                              onClick={() => setShowLeadModal(false)}
                              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              {actionType === "view" ? "Fechar" : "Cancelar"}
                            </button>
                            {actionType === "edit" && (
                              <button
                                onClick={handleUpdateLead}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                Salvar Alterações
                              </button>
                            )}
                            {actionType === "call" && (
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                Salvar Notas
                              </button>
                            )}
                            {actionType === "email" && (
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Enviar Email
                              </button>
                            )}
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

                    {showAppointmentModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                              {editingAppointment ? "Editar Compromisso" : "Novo Compromisso"}
                            </h3>
                            <button
                              onClick={() => setShowAppointmentModal(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                              <input
                                type="text"
                                value={newAppointmentTitle}
                                onChange={(e) => setNewAppointmentTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ex: Reunião com cliente"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
                                <input
                                  type="date"
                                  value={newAppointmentDate}
                                  onChange={(e) => setNewAppointmentDate(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horário *</label>
                                <input
                                  type="time"
                                  value={newAppointmentTime}
                                  onChange={(e) => setNewAppointmentTime(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                              <select
                                value={newAppointmentType}
                                onChange={(e) => setNewAppointmentType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Selecione o tipo</option>
                                <option value="reuniao">Reunião</option>
                                <option value="visita">Visita</option>
                                <option value="ligacao">Ligação</option>
                                <option value="apresentacao">Apresentação</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Relacionado</label>
                              <select
                                value={newAppointmentRelatedLead}
                                onChange={(e) => setNewAppointmentRelatedLead(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Selecione um lead</option>
                                <option value="sem-lead">Sem lead relacionado</option>
                                {leadsList.map((lead) => (
                                  <option key={lead.id} value={lead.nome}>
                                    {lead.nome}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Lembrete</label>
                              <select
                                value={newAppointmentReminder}
                                onChange={(e) => setNewAppointmentReminder(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Sem lembrete</option>
                                <option value="15min">15 minutos antes</option>
                                <option value="30min">30 minutos antes</option>
                                <option value="1hora">1 hora antes</option>
                                <option value="1dia">1 dia antes</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                              <input
                                type="text"
                                value={newAppointmentLocation}
                                onChange={(e) => setNewAppointmentLocation(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ex: Escritório, Endereço, Videochamada"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                              <textarea
                                value={newAppointmentNotes}
                                onChange={(e) => setNewAppointmentNotes(e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Observações adicionais..."
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 mt-6">
                            <button
                              onClick={() => setShowAppointmentModal(false)}
                              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleSaveOrUpdateAppointment}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              {editingAppointment ? "Atualizar" : "Salvar"}
                            </button>
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
    </div>
  )
}

export default DesignaliCreative
