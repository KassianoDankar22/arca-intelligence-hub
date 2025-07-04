"use client"

import type React from "react"
import { useState } from "react"
import { Bell, Edit, FileText } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

// Definir interface para Lead (necessário para o dropdown de leads relacionados)
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

interface AgendaManagerProps {
  appointments: Appointment[]
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>
  tasks: number[]
  setTasks: React.Dispatch<React.SetStateAction<number[]>>
  leadsList: Lead[]
  notification: string
  setNotification: React.Dispatch<React.SetStateAction<string>>
}

export function AgendaManager({
  appointments,
  setAppointments,
  tasks,
  setTasks,
  leadsList,
  notification,
  setNotification,
}: AgendaManagerProps) {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [newAppointmentTitle, setNewAppointmentTitle] = useState("")
  const [newAppointmentDate, setNewAppointmentDate] = useState("")
  const [newAppointmentTime, setNewAppointmentTime] = useState("")
  const [newAppointmentType, setNewAppointmentType] = useState("")
  const [newAppointmentRelatedLead, setNewAppointmentRelatedLead] = useState("")
  const [newAppointmentReminder, setNewAppointmentReminder] = useState("")
  const [newAppointmentLocation, setNewAppointmentLocation] = useState("")
  const [newAppointmentNotes, setNewAppointmentNotes] = useState("")

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
      setAppointments((prev) =>
        prev.map((app) => (app.id === editingAppointment.id ? { ...app, ...appointmentData } : app)),
      )
      setNotification("Compromisso atualizado com sucesso!")
    } else {
      const newId = appointments.length > 0 ? Math.max(...appointments.map((a) => a.id)) + 1 : 1
      setAppointments((prev) => [...prev, { id: newId, ...appointmentData } as Appointment])
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

  const toggleTaskCompletion = (taskIndex: number) => {
    setTasks((prev) => {
      if (prev.includes(taskIndex)) {
        return prev.filter((index) => index !== taskIndex)
      } else {
        return [...prev, taskIndex]
      }
    })
  }

  const today = new Date().toISOString().split("T")[0]
  const appointmentsToday = appointments
    .filter((appointment) => appointment.date === today)
    .sort((a, b) => a.time.localeCompare(b.time))

  const upcomingAppointments = appointments
    .filter((appointment) => appointment.date > today)
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })

  const pendingTasksList = [
    "Enviar proposta para Maria Silva",
    "Agendar visita com João Santos",
    "Follow-up com Carlos Lima",
    "Preparar apresentação para Ana Costa",
    "Atualizar CRM com novos leads",
    "Revisar contratos pendentes",
  ]

  return (
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
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{appointment.time.split(":")[0]}</div>
                          <div className="text-sm text-blue-500">{appointment.time.split(":")[1]}</div>
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
                    <div key={appointment.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
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
            {pendingTasksList.map((task, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={tasks.includes(index)}
                  onChange={() => toggleTaskCompletion(index)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span
                  className={`flex-1 text-sm ${tasks.includes(index) ? "line-through text-gray-500" : "text-gray-700"}`}
                >
                  {task}
                </span>
                <span className="text-xs text-gray-500">{tasks.includes(index) ? "Concluída" : "Pendente"}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingAppointment ? "Editar Compromisso" : "Novo Compromisso"}
              </h3>
              <button onClick={() => setShowAppointmentModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Título *</Label>
                <Input
                  type="text"
                  value={newAppointmentTitle}
                  onChange={(e) => setNewAppointmentTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Reunião com cliente"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Data *</Label>
                  <Input
                    type="date"
                    value={newAppointmentDate}
                    onChange={(e) => setNewAppointmentDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Horário *</Label>
                  <Input
                    type="time"
                    value={newAppointmentTime}
                    onChange={(e) => setNewAppointmentTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Tipo</Label>
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
                <Label className="block text-sm font-medium text-gray-700 mb-1">Lead Relacionado</Label>
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
                <Label className="block text-sm font-medium text-gray-700 mb-1">Lembrete</Label>
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
                <Label className="block text-sm font-medium text-gray-700 mb-1">Local</Label>
                <Input
                  type="text"
                  value={newAppointmentLocation}
                  onChange={(e) => setNewAppointmentLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Escritório, Endereço, Videochamada"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Observações</Label>
                <Textarea
                  value={newAppointmentNotes}
                  onChange={(e) => setNewAppointmentNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Observações adicionais..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => setShowAppointmentModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveOrUpdateAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingAppointment ? "Atualizar" : "Salvar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
