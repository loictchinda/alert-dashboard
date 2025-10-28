export const alertsData = {
  alerts: [
    {
      id: "1",
      subject: "security",
      timestamp: "2024-01-15T10:30:00Z",
      severity: "HIGH" as const,
      title: "Suspicious login detected",
      message: "Multiple failed login attempts from unknown IP",
      metadata: { ip: "192.168.1.100", location: "Paris" }
    },
    {
      id: "2", 
      subject: "performance",
      timestamp: "2024-01-20T14:45:00Z",
      severity: "MEDIUM" as const,
      title: "High CPU usage",
      message: "CPU usage above 90% for 5 minutes",
      metadata: { deviceId: "server-01", cpuUsage: 95 }
    },
    {
      id: "3",
      subject: "security",
      timestamp: "2024-02-05T08:15:00Z", 
      severity: "CRITICAL" as const,
      title: "Data breach attempt",
      message: "Unauthorized access to database",
      metadata: { ip: "192.168.1.150", location: "London" }
    },
    {
      id: "4",
      subject: "network", 
      timestamp: "2024-02-10T16:20:00Z",
      severity: "LOW" as const,
      title: "Network latency",
      message: "Increased response time in European region",
      metadata: { region: "Europe", responseTime: "450ms" }
    },
    {
      id: "5",
      subject: "performance",
      timestamp: "2024-03-01T11:00:00Z",
      severity: "MEDIUM" as const, 
      title: "Memory leak detected",
      message: "Application consuming increasing memory over time",
      metadata: { process: "app-server", memoryUsage: "85%" }
    }
  ]
};