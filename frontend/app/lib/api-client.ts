import { Alert, MonthlyStats, AlertsResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Récupérer les statistiques mensuelles
  async getMonthlyStats(subject?: string): Promise<MonthlyStats[]> {
    return this.fetchWithAuth(
      `${API_BASE_URL}/api/stats/monthly${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
    );
  }

  // Récupérer les alertes paginées
  async getAlerts(filters?: { month?: string; subject?: string; page?: number; pageSize?: number }): Promise<AlertsResponse> {
    const params = new URLSearchParams();
    if (filters?.month) params.append('month', filters.month);
    if (filters?.subject) params.append('subject', filters.subject);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    return this.fetchWithAuth(`${API_BASE_URL}/api/alerts?${params.toString()}`);
  }

  // Récupérer une alerte par ID
  async getAlert(id: string): Promise<Alert> {
    return this.fetchWithAuth(`${API_BASE_URL}/api/alerts/${id}`);
  }

  // Récupérer les stats par sujet
  async getStatsBySubject(): Promise<Record<string, number>> {
    return this.fetchWithAuth(`${API_BASE_URL}/api/stats/by-subject`);
  }

  // Health check
  async getHealth(): Promise<{ status: string; timestamp: string }> {
    return this.fetchWithAuth(`${API_BASE_URL}/health`);
  }
}

export const apiClient = new ApiClient();