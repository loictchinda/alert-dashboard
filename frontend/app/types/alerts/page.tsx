'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiClient } from '../../lib/api-client';
import { Alert } from '../../types';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Récupérer le filtre mois depuis l'URL
    const monthFromUrl = searchParams.get('month');
    if (monthFromUrl) {
      setSelectedMonth(monthFromUrl);
    }
    loadAlerts();
  }, [searchParams]);

  useEffect(() => {
    loadAlerts();
  }, [selectedMonth, selectedSubject]);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (selectedMonth) filters.month = selectedMonth;
      if (selectedSubject) filters.subject = selectedSubject;
      
      const response = await apiClient.getAlerts(filters);
      setAlerts(response.alerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Grouper les alertes par mois
  const alertsByMonth = alerts.reduce((acc, alert) => {
    const month = alert.timestamp.substring(0, 7); // "2024-01"
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(alert);
    return acc;
  }, {} as { [key: string]: Alert[] });

  const months = Object.keys(alertsByMonth).sort().reverse();
  const subjects = Array.from(new Set(alerts.map(alert => alert.subject)));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Liste des Alertes</h1>
          <p className="text-gray-600 mt-2">Consultez toutes les alertes par période et par sujet</p>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrer par mois
              </label>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Tous les mois</option>
                {months.map(month => (
                  <option key={month} value={month}>
                    {new Date(month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrer par sujet
              </label>
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Tous les sujets</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedMonth('');
                  setSelectedSubject('');
                }}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {months.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-500">Aucune alerte trouvée avec les filtres actuels</p>
              </div>
            ) : (
              months.map(month => (
                <div key={month} className="bg-white rounded-lg shadow">
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {new Date(month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      <span className="ml-2 text-sm text-gray-500">
                        ({alertsByMonth[month].length} alerte{alertsByMonth[month].length > 1 ? 's' : ''})
                      </span>
                    </h2>
                  </div>
                  
                  <div className="divide-y">
                    {alertsByMonth[month].map(alert => (
                      <div key={alert.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                                {alert.severity}
                              </span>
                              <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded">
                                {alert.subject}
                              </span>
                              <span className="text-sm text-gray-400">
                                {new Date(alert.timestamp).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {alert.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {alert.message}
                            </p>
                          </div>
                          
                          <a 
                            href={`/alerts/${alert.id}`}
                            className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Détails
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-6">
          <a 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800"
          >
            ← Retour au dashboard
          </a>
        </div>
      </div>
    </div>
  );
}