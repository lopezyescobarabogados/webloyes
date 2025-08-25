'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminAuth from '@/components/admin/AdminAuth';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'READ' | 'RESPONDED' | 'ARCHIVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  source: 'WEB_FORM' | 'EMAIL' | 'PHONE' | 'OTHER';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'read' | 'responded'>('all');

  const fetchMessages = useCallback(async () => {
    try {
      const url = filter === 'all' 
        ? '/api/contact' 
        : `/api/contact?status=${filter.toUpperCase()}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateMessageStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });

      if (response.ok) {
        fetchMessages();
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      try {
        const response = await fetch(`/api/contact/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchMessages();
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'READ': return 'bg-blue-100 text-blue-800';
      case 'RESPONDED': return 'bg-green-100 text-green-800';
      case 'ARCHIVED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'URGENT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminAuth>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
        </div>
      </AdminAuth>
    );
  }

  return (
    <AdminAuth>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-navy text-2xl font-serif font-bold mb-2">
            Mensajes de Contacto
          </h1>
          <p className="text-gray-600">
            Gestiona las consultas y mensajes recibidos a través del formulario de contacto
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({messages.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'read' 
                  ? 'bg-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Leídos
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'responded' 
                  ? 'bg-navy text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Respondidos
            </button>
          </div>
        </div>

        {/* Lista de Mensajes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista */}
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-500">No hay mensajes que mostrar</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all hover:shadow-xl ${
                    selectedMessage?.id === message.id ? 'ring-2 ring-navy' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-navy">{message.name}</h3>
                    <div className="flex space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                  <p className="text-sm font-medium mb-2">{message.subject}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(message.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Detalle del Mensaje */}
          <div className="lg:sticky lg:top-6">
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-navy">Detalle del Mensaje</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre</label>
                    <p className="text-navy font-semibold">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>

                  {selectedMessage.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Teléfono</label>
                      <p className="text-gray-900">{selectedMessage.phone}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700">Asunto</label>
                    <p className="text-gray-900 font-medium">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Mensaje</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority}
                    </span>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Fecha de recepción</label>
                    <p className="text-gray-600">
                      {new Date(selectedMessage.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="border-t pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateMessageStatus(selectedMessage.id, 'READ')}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Marcar como Leído
                      </button>
                      <button
                        onClick={() => updateMessageStatus(selectedMessage.id, 'RESPONDED')}
                        className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Marcar Respondido
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateMessageStatus(selectedMessage.id, 'ARCHIVED')}
                        className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Archivar
                      </button>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-500">Selecciona un mensaje para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminAuth>
  );
}
