export interface Alert {
  id: string;
  subject: string;
  timestamp: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface MonthlyStats {
  month: string;
  count: number;
  alerts: Alert[];
}

export interface AlertsResponse {
  alerts: Alert[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}