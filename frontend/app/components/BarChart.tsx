'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyStats } from '../types';

interface Props {
  data: MonthlyStats[];
  onBarClick: (month: string) => void;
}

export default function AlertBarChart({ data, onBarClick }: Props) {
  const chartData = data.map(item => ({
    ...item,
    name: item.month,
    alerts: item.count
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Aucune donnée disponible</p>
          <p className="text-sm">Vérifiez la connexion à l'API</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow h-96">
      <h2 className="text-xl font-semibold mb-4">Alertes par mois</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={80}
            tickFormatter={(value) => {
              const [year, month] = value.split('-');
              return `${month}/${year.slice(2)}`;
            }}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} alertes`, 'Nombre']}
            labelFormatter={(label) => `Mois: ${label}`}
          />
          <Bar 
            dataKey="alerts" 
            fill="#3b82f6" 
            className="cursor-pointer hover:opacity-80"
            onClick={(data) => {
              console.log('📊 Bar clicked:', data);
              onBarClick(data.name);
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}