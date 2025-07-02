"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react" // Import useEffect
import { Search, Mic, ArrowUp, Plus, FileText, Calculator, MapPin, DollarSign, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { processArcaAIChat, processDocument } from "@/app/actions" // Import Server Actions

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
  const [showChat, setShowChat] = useState(false)
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
        setShowChat(true)
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

  return (
    <div
      className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-white p-4 sm:p-6"
      style={{
        filter: "none",
        boxShadow: "none",
        textShadow: "none",
        background: "white",
        backgroundColor: "white",
      }}
    >
      <div
        className="w-full max-w-3xl mx-auto flex flex-col items-center"
        style={{ filter: "none", boxShadow: "none" }}
      >
        {/* Logo with animated gradient */}
        <div className="mb-8 relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px]">
          {/* Círculo animado de fundo */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full rounded-full overflow-hidden",
              `
[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
[background-image:var(--white-gradient),var(--aurora)]
dark:[background-image:var(--dark-gradient),var(--aurora)]
[background-size:300%,_200%]
[background-position:50%_50%,50%_50%]
filter blur-[10px] invert dark:invert-0
after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
after:dark:[background-image:var(--dark-gradient),var(--aurora)]
after:[background-size:200%,_100%] 
after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
pointer-events-none
opacity-50 will-change-transform`,
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
          {/* Logo da Arca centralizada sobre o círculo */}
          <img
            src="/logo-arca.png"
            alt="Arca AI Logo"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2, // Garante que a logo fique acima do círculo
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[80px] lg:h-[80px]"
          />
        </div>

        {/* Welcome message */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-2">
              Como podemos te ajudar hoje?
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md lg:max-w-none lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
              Deixe a Arca AI te ajudar a pesquisar, analisar e decidir com agilidade
            </p>
          </motion.div>
        </div>

        {/* Input area */}
        <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
          <div className="p-3 sm:p-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Pergunte sobre imóveis, ROI, bairros ou investimentos em Orlando..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="w-full text-gray-700 text-sm sm:text-base outline-none placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base"
            />
          </div>

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 py-1 px-2 rounded-md border border-gray-200"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-gray-700">{file}</span>
                    <button
                      onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Functions and actions */}
          <div className="px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchEnabled(!searchEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  searchEnabled
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Pesquisar</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-colors ${
                  inputValue.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Upload files */}
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 border-t border-gray-100">
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              onChange={handleUploadFile}
              className="hidden"
            />
            <button
              onClick={() => document.getElementById("file-upload")?.click()}
              className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm hover:text-gray-900 transition-colors"
            >
              {showUploadAnimation ? (
                <motion.div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
              <span>Enviar Documentos</span>
            </button>
          </div>
        </div>

        {/* Command categories */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <CommandButton
            icon={<Calculator className="w-5 h-5" />}
            label="Análises"
            isActive={activeCommandCategory === "analysis"}
            onClick={() => setActiveCommandCategory(activeCommandCategory === "analysis" ? null : "analysis")}
          />
          <CommandButton
            icon={<MapPin className="w-5 h-5" />}
            label="Mercado"
            isActive={activeCommandCategory === "market"}
            onClick={() => setActiveCommandCategory(activeCommandCategory === "market" ? null : "market")}
          />
          <CommandButton
            icon={<DollarSign className="w-5 h-5" />}
            label="Investimentos"
            isActive={activeCommandCategory === "investment"}
            onClick={() => setActiveCommandCategory(activeCommandCategory === "investment" ? null : "investment")}
          />
        </div>

        {/* Command suggestions */}
        <AnimatePresence>
          {activeCommandCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mb-6 overflow-hidden"
            >
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">
                    {activeCommandCategory === "analysis"
                      ? "Sugestões de Análise"
                      : activeCommandCategory === "market"
                        ? "Informações de Mercado"
                        : "Estratégias de Investimento"}
                  </h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {commandSuggestions[activeCommandCategory as keyof typeof commandSuggestions].map(
                    (suggestion, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => handleCommandSelect(suggestion)}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-75"
                      >
                        <div className="flex items-center gap-3">
                          {activeCommandCategory === "analysis" ? (
                            <Calculator className="w-4 h-4 text-blue-600" />
                          ) : activeCommandCategory === "market" ? (
                            <MapPin className="w-4 h-4 text-blue-600" />
                          ) : (
                            <DollarSign className="w-4 h-4 text-blue-600" />
                          )}
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </div>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
