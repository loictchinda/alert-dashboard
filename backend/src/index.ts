import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import alertRoutes from './routes/alerts';
import statsRoutes from './routes/stats';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de base
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Routes publiques (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ⚠️ TEMPORAIRE : Routes API sans protection Auth0
app.use('/api/alerts', alertRoutes);
app.use('/api/stats', statsRoutes);

// Gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});