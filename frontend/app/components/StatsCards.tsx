'use client';
import { MonthlyStats } from '../types';

interface StatsCardsProps {
  data: MonthlyStats[];
}

export default function StatsCards({ data }: StatsCardsProps) {
  const totalAlerts = data.reduce((sum, item) => sum + item.count, 0);
  const criticalAlerts = data.flatMap(item => item.alerts)
    .filter(alert => alert.severity === 'CRITICAL').length;
  const uniqueSubjects = Array.from(
    new Set(data.flatMap(item => item.alerts.map(alert => alert.subject)))
  ).length;
  const monthsCount = data.length;

  const stats = [
    {
      title: 'Total des alertes',
      value: totalAlerts,
      description: 'Nombre total d\'alertes',
      color: 'blue'
    },
    {
      title: 'Alertes critiques',
      value: criticalAlerts,
      description: 'Niveau CRITICAL',
      color: 'red'
    },
    {
      title: 'Sujets différents',
      value: uniqueSubjects,
      description: 'Catégories uniques',
      color: 'green'
    },
    {
      title: 'Période couverte',
      value: monthsCount,
      description: 'Mois de données',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className={`w-12 h-12 ${getColorClasses(stat.color)} rounded-lg flex items-center justify-center text-white mr-4`}>
              {stat.color === 'blue' && '📊'}
              {stat.color === 'red' && '🚨'}
              {stat.color === 'green' && '🏷️'}
              {stat.color === 'purple' && '📅'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}