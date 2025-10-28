# Alert Monitoring App

Application full-stack de monitoring d'alertes développée avec Next.js, Express, TypeScript et Docker.

## 🚀 Fonctionnalités

- **Dashboard** avec graphiques interactifs des alertes par mois
- **Liste des alertes** avec filtres par sujet et période
- **Détails complets** de chaque alerte
- **Architecture containerisée** avec Docker
- **API REST** sécurisée

## 🛠 Technologies

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, TypeScript
- **Containerisation**: Docker, Docker Compose
- **Développement**: Hot-reload, debugging intégré

## 📦 Installation

### Prérequis
- Docker et Docker Compose
- Node.js 18+ (pour le développement local)

### Développement Local

```bash
# Cloner le repository
git clone <votre-repo>
cd alert-monitoring-app

# Lancer avec Docker (recommandé)
docker-compose up --build

# Ou développement local
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev