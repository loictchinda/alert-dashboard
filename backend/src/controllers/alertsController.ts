import { Request, Response } from 'express';
import { alertsData } from '../data/alertsData';

interface Alert {
  id: string;
  subject: string;
  timestamp: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

export class AlertsController {
  private alerts: Alert[] = alertsData.alerts;

  getAllAlerts(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const subject = req.query.subject as string;

    let filteredAlerts = this.alerts;

    if (subject) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }

    filteredAlerts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex);

    res.json({
      alerts: paginatedAlerts,
      total: filteredAlerts.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredAlerts.length / pageSize)
    });
  }

  getAlertById(req: Request, res: Response) {
    const { id } = req.params;
    const alert = this.alerts.find(a => a.id === id);

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.json(alert);
  }

  getMonthlyStats(req: Request, res: Response) {
    const subject = req.query.subject as string;

    let filteredAlerts = this.alerts;
    if (subject) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }

    const monthlyStats = filteredAlerts.reduce((acc: any, alert) => {
      const date = new Date(alert.timestamp);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          count: 0,
          alerts: []
        };
      }
      
      acc[monthKey].count++;
      acc[monthKey].alerts.push(alert);
      
      return acc;
    }, {});

    const result = Object.values(monthlyStats).sort((a: any, b: any) => 
      a.month.localeCompare(b.month)
    );

    res.json(result);
  }

  getStatsBySubject(req: Request, res: Response) {
    const stats = this.alerts.reduce((acc: any, alert) => {
      if (!acc[alert.subject]) {
        acc[alert.subject] = 0;
      }
      acc[alert.subject]++;
      return acc;
    }, {});

    res.json(stats);
  }
}

export const alertsController = new AlertsController();