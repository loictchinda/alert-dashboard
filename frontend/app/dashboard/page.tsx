'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertBarChart from '../components/BarChart';
import StatsCards from '../components/StatsCards';
import { apiClient } from '../lib/api-client';
import { MonthlyStats } from '../types';

export default function Dashboard() {
  const [data, setData] = useState<MonthlyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setError(null);
      console.log('🔄 Loading monthly stats...');
      
      const [monthlyStats, subjectStats, health] = await Promise.all([
        apiClient.getMonthlyStats(),
        apiClient.getStatsBySubject(),
        apiClient.getHealth()
      ]);
      
      console.log('✅ Data loaded:', monthlyStats);
      setData(monthlyStats);
    } catch (error) {
      console.error('❌ Error loading data:', error);
      setError('Erreur lors du chargement des données depuis l\'API');
    } finally {
      setLoading(false);
    }
  };

  const handleBarClick = (month: string) => {
    router.push(`/alerts?month=${month}`);
  };

  // Extraire tous les sujets uniques
  const subjects = Array.from(
    new Set(data.flatMap(item => item.alerts.map(alert => alert.subject)))
  );

  // Filtrer les données par sujet
  const filteredData = selectedSubject 
    ? data.map(item => ({
        ...item,
        count: item.alerts.filter(alert => alert.subject === selectedSubject).length,
        alerts: item.alerts.filter(alert => alert.subject === selectedSubject)
      })).filter(item => item.count > 0)
    : data;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Erreur</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={loadData}
              className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Réessayer
            </button>
            <a 
              href="http://localhost:3001/health" 
              target="_blank"
              className="block text-sm text-blue-600 hover:text-blue-800"
            >
              Tester l'API manuellement
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Alertes</h1>
          <p className="text-gray-600 mt-2">Surveillance et analyse des alertes par période</p>
        </div>

        {/* Cartes de statistiques */}
        <StatsCards data={data} />

        {/* Filtres */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filtrer par sujet:</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Tous les sujets</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject} ({data.flatMap(item => item.alerts).filter(alert => alert.subject === subject).length})
                </option>
              ))}
            </select>
            
            {selectedSubject && (
              <button
                onClick={() => setSelectedSubject('')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Effacer le filtre
              </button>
            )}
          </div>
        </div>

        {/* Graphique */}
        <div className="mb-8">
          <AlertBarChart data={filteredData} onBarClick={handleBarClick} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <a 
            href="/alerts" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Voir toutes les alertes
          </a>
          
          <div className="text-sm text-gray-500">
            Cliquez sur les barres du graphique pour voir les détails du mois
          </div>
        </div>
      </div>
    </div>
  );
}