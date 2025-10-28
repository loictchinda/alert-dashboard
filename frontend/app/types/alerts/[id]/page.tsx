'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../lib/api-client';
import { Alert } from '../../../types';

export default function AlertDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlert();
  }, [id]);

  const loadAlert = async () => {
    try {
      const alertData = await apiClient.getAlert(id);
      setAlert(alertData);
    } catch (error) {
      console.error('Error loading alert:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Alerte non trouvée</h1>
          <a href="/alerts" className="text-blue-600 hover:text-blue-800">
            ← Retour à la liste des alertes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <a 
            href="/alerts" 
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Retour à la liste des alertes
          </a>
        </div>

        <div className="bg-white rounded-lg shadow">
          {/* En-tête */}
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{alert.title}</h1>
                <p className="text-gray-600 mt-1">ID: {alert.id}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(alert.timestamp).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Informations principales */}
          <div className="px-6 py-4 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Sujet</h3>
                <p className="text-gray-900 bg-blue-50 px-3 py-2 rounded inline-block">
                  {alert.subject}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Date et heure</h3>
                <p className="text-gray-900">
                  {new Date(alert.timestamp).toLocaleString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="px-6 py-4 border-b">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
            <p className="text-gray-900 whitespace-pre-wrap">{alert.message}</p>
          </div>

          {/* Métadonnées */}
          {alert.metadata && Object.keys(alert.metadata).length > 0 && (
            <div className="px-6 py-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Métadonnées</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                  {JSON.stringify(alert.metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <a 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800"
          >
            ← Dashboard
          </a>
          <a 
            href="/alerts" 
            className="text-blue-600 hover:text-blue-800"
          >
            Liste des alertes →
          </a>
        </div>
      </div>
    </div>
  );
}