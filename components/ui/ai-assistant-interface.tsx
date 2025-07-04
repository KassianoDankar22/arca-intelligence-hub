"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Mic, ArrowUp, Plus, FileText, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { processArcaAIChat, processDocument } from "@/app/actions"

// Helper function to read file content (still needed on client for file input)
function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target?.result as string)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    if (
      file.type.includes("text") ||
      file.type.includes("pdf") ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".csv")
    ) {
      reader.readAsText(file)
    } else {
      // For other types, read as Data URL (e.g., images)
      reader.readAsDataURL(file)
    }
  })
}

// Helper function to determine document type (still needed on client for file input)
function getDocumentTypeFromExtension(extension: string) {
  const documentTypes: Record<string, string> = {
    pdf: "PDF",
    doc: "Word",
    docx: "Word",
    xls: "Excel",
    xlsx: "Excel",
    csv: "CSV",
    txt: "Texto",
    jpg: "Imagem",
    jpeg: "Imagem",
    png: "Imagem",
  }

  return documentTypes[extension] || "Documento"
}

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  files?: string[]
}

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messages: Message[]
}

export function AIAssistantInterface() {
  const [inputValue, setInputValue] = useState("")
  const [searchEnabled, setSearchEnabled] = useState(false)
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false)
  const [reasonEnabled, setReasonEnabled] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showUploadAnimation, setShowUploadAnimation] = useState(false)
  const [activeCommandCategory, setActiveCommandCategory] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showChat, setShowChat] = useState(false) // Keep this state for full chat functionality later
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const inputRef = useRef<HTMLInputElement>(null)

  // Effect to load conversations from localStorage on mount
  useEffect(() => {
    const storedConversations = localStorage.getItem("aiConversations")
    if (storedConversations) {
      const parsedConversations: Conversation[] = JSON.parse(storedConversations).map((conv: any) => ({
        ...conv,
        timestamp: new Date(conv.timestamp),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }))
      setConversations(parsedConversations)
      // If there are stored conversations, automatically show the chat and select the most recent one
      if (parsedConversations.length > 0) {
        setActiveConversation(parsedConversations[0].id)
        setShowChat(true) // Show full chat if there's history
      }
    }
  }, [])

  // Effect to save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("aiConversations", JSON.stringify(conversations))
  }, [conversations])

  const commandSuggestions = {
    analysis: [
      "Analisar ROI de propriedade em Orlando",
      "Comparar preços de imóveis em diferentes bairros",
      "Calcular potencial de valorização imobiliária",
      "Avaliar rentabilidade de Airbnb em Orlando",
      "Analisar tendências do mercado imobiliário",
    ],
    market: [
      "Melhores bairros para investir em Orlando",
      "Preços médios de imóveis por região",
      "Análise de demanda turística em Orlando",
      "Comparar Orlando com outras cidades da Flórida",
      "Projeções do mercado imobiliário para 2025",
    ],
    investment: [
      "Estratégias de financiamento para não residentes",
      "Custos de manutenção de propriedades em Orlando",
      "Impostos sobre propriedades na Flórida",
      "Como formar LLC para investimento imobiliário",
      "Seguros obrigatórios para propriedades de aluguel",
    ],
  }

  const getCurrentConversation = () => {
    return conversations.find((conv) => conv.id === activeConversation)
  }

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setShowUploadAnimation(true)
    setIsTyping(true) // Indicate loading

    try {
      const fileContent = await readFileContent(file)
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || ""
      const documentType = getDocumentTypeFromExtension(fileExtension)

      // Call the server action
      const result = await processDocument(fileContent, documentType)

      const userMessage: Message = {
        id: Date.now().toString(),
        content: `Documento "${file.name}" enviado para análise.`,
        sender: "user",
        timestamp: new Date(),
        files: [file.name],
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: result.success ? result.analysis : result.error,
        sender: "ai",
        timestamp: new Date(),
      }

      const conversation = getCurrentConversation()

      if (!conversation) {
        const newConversation: Conversation = {
          id: Date.now().toString(),
          title: userMessage.content.slice(0, 50) + (userMessage.content.length > 50 ? "..." : ""),
          lastMessage: userMessage.content,
          timestamp: new Date(),
          messages: [userMessage, aiResponse],
        }
        setConversations((prev) => [newConversation, ...prev])
        setActiveConversation(newConversation.id)
      } else {
        conversation.messages.push(userMessage, aiResponse)
        conversation.lastMessage = aiResponse.content
        conversation.timestamp = new Date()
        setConversations((prev) => prev.map((conv) => (conv.id === activeConversation ? conversation! : conv)))
      }

      setUploadedFiles([]) // Clear uploaded files after processing
      setShowChat(true)
    } catch (error) {
      console.error("Error processing document:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, tive um problema ao analisar seu documento. Por favor, tente novamente.",
        sender: "ai",
        timestamp: new Date(),
      }
      const conversation = getCurrentConversation()
      if (conversation) {
        conversation.messages.push(errorMessage)
        conversation.lastMessage = errorMessage.content
        conversation.timestamp = new Date()
        setConversations((prev) => prev.map((conv) => (conv.id === activeConversation ? conversation! : conv)))
      } else {
        const newConversation: Conversation = {
          id: Date.now().toString(),
          title: "Erro no Upload",
          lastMessage: errorMessage.content,
          timestamp: new Date(),
          messages: [errorMessage],
        }
        setConversations((prev) => [newConversation, ...prev])
        setActiveConversation(newConversation.id)
      }
    } finally {
      setShowUploadAnimation(false)
      setIsTyping(false)
    }
  }

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        sender: "user",
        timestamp: new Date(),
        files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      }

      let conversation = getCurrentConversation()
      let currentConversationMessages: { role: string; content: string }[] = []

      if (!conversation) {
        // Create new conversation
        const newConversation: Conversation = {
          id: Date.now().toString(),
          title: inputValue.slice(0, 50) + (inputValue.length > 50 ? "..." : ""),
          lastMessage: inputValue,
          timestamp: new Date(),
          messages: [userMessage],
        }
        setConversations((prev) => [newConversation, ...prev])
        setActiveConversation(newConversation.id)
        conversation = newConversation
      } else {
        // Add to existing conversation
        conversation.messages.push(userMessage)
        conversation.lastMessage = inputValue
        conversation.timestamp = new Date()
        setConversations((prev) => prev.map((conv) => (conv.id === activeConversation ? conversation! : conv)))
      }

      // Prepare conversation history for Claude API
      currentConversationMessages = conversation.messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      setInputValue("")
      setUploadedFiles([])
      setShowChat(true)
      setIsTyping(true)

      try {
        // Call the server action
        const result = await processArcaAIChat(userMessage.content, currentConversationMessages)

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: result.success ? result.response : result.error,
          sender: "ai",
          timestamp: new Date(),
        }

        // Ensure conversation object is updated before setting state
        if (conversation) {
          conversation.messages.push(aiResponse)
          conversation.lastMessage = aiResponse.content
          conversation.timestamp = new Date()
          setConversations((prev) => prev.map((conv) => (conv.id === conversation!.id ? conversation : conv)))
        } else {
          // This case should ideally not happen if logic is correct, but as a fallback
          console.error("Conversation object was null after user message, cannot add AI response.")
        }
      } catch (error) {
        console.error("Error sending message to AI:", error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "Desculpe, ocorreu um erro inesperado ao se comunicar com a IA. Por favor, tente novamente mais tarde.",
          sender: "ai",
          timestamp: new Date(),
        }
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversation ? { ...conv, messages: [...conv.messages, errorMessage] } : conv,
          ),
        )
      } finally {
        setIsTyping(false)
      }
    }
  }

  const startNewConversation = () => {
    setActiveConversation(null)
    setShowChat(false)
    setActiveCommandCategory(null)
  }

  const selectConversation = (conversationId: string) => {
    setActiveConversation(conversationId)
    setShowChat(true)
  }

  const handleCommandSelect = (suggestion: string) => {
    setInputValue(suggestion)
  }

  if (showChat) {
    const currentConversation = getCurrentConversation()

    return (
      <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg overflow-hidden border">
        {/* Sidebar with conversations */}
        <div
          className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 border-r bg-gray-50 flex flex-col overflow-hidden`}
        >
          <div className="p-4 border-b">
            <Button onClick={startNewConversation} className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Nova Conversa
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeConversation === conv.id ? "bg-blue-100 border border-blue-200" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium text-sm truncate">{conv.title}</div>
                  <div className="text-xs text-gray-500 truncate">{conv.lastMessage}</div>
                  <div className="text-xs text-gray-400 mt-1">{conv.timestamp.toLocaleDateString()}</div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <ChevronLeft className={`h-4 w-4 transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
              </Button>
              <img src="/logo-arca.png" alt="Arca AI Logo" width={48} height={48} className="h-10 w-10" />
              <div>
                <h2 className="font-semibold">Arca AI - Especialista em Orlando</h2>
                <p className="text-sm text-gray-500">Seu consultor imobiliário inteligente</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {currentConversation?.messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}>
                  {message.sender === "ai" && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/avatar-arca-ai.png" alt="Arca AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`flex-1 ${message.sender === "user" ? "flex justify-end" : ""}`}>
                    <div
                      className={`rounded-2xl p-4 max-w-[80%] ${
                        message.sender === "user" ? "bg-blue-500 text-white rounded-tr-md" : "bg-gray-100 rounded-tl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.files && message.files.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs opacity-80">
                              <FileText className="h-3 w-3" />
                              {file}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 mx-2">{message.timestamp.toLocaleTimeString()}</p>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/avatar-arca-ai.png" alt="Arca AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-md p-4">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input area */}
          <div className="border-t bg-white p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-3">
                <input
                  id="file-upload-chat" // Unique ID for this input
                  type="file"
                  accept=".pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  onChange={handleUploadFile}
                  className="hidden"
                />
                <button
                  onClick={() => document.getElementById("file-upload-chat")?.click()}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                </button>

                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Mic className="h-5 w-5" />
                </button>

                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Digite sua mensagem sobre imóveis em Orlando..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={`absolute right-2 top-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      inputValue.trim()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // This is the new basic chat structure that replaces the welcome screen
  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg overflow-hidden border flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white">
        <img src="/logo-arca.png" alt="Arca AI Logo" width={40} height={40} className="h-8 w-8 mr-3" />
        <h2 className="font-semibold text-lg">Arca AI Assistant</h2>
      </div>

      {/* Messages Area (empty for now) */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="text-center text-gray-500 mt-10">Comece uma conversa com a Arca AI!</div>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled // Disabled as per "NÃO adicionar funcionalidades ainda"
            />
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled // Disabled as per "NÃO adicionar funcionalidades ainda"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CommandButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function CommandButton({ icon, label, isActive, onClick }: CommandButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
        isActive ? "bg-blue-50 border-blue-200 shadow-sm" : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className={`${isActive ? "text-blue-600" : "text-gray-500"} w-4 h-4 sm:w-5 sm:h-5`}>{icon}</div>
      <span className={`text-xs sm:text-sm font-medium ${isActive ? "text-blue-700" : "text-gray-700"}`}>{label}</span>
    </motion.button>
  )
}
