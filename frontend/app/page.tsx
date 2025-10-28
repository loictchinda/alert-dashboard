import Link from 'next/link';
import { getSession } from '../app/lib/auth';

export default async function Home() {
  const session = await getSession();
  
  // Si déjà connecté, on pourrait rediriger vers le dashboard
  // Mais pour l'instant on affiche la page d'accueil normale

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alert Monitoring</h1>
          <p className="mt-2 text-gray-600">Application de surveillance d'alertes</p>
        </div>
        
        {session ? (
          <div className="space-y-4">
            <p className="text-green-600">✅ Vous êtes connecté en tant que {session.user.name}</p>
            <Link
              href="/dashboard"
              className="w-full inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Accéder au Dashboard
            </Link>
            <Link
              href="/api/auth/logout"
              className="w-full inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
            >
              Se déconnecter
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <Link
              href="/api/auth/login"
              className="w-full inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Se connecter
            </Link>
            <Link
              href="/dashboard"
              className="w-full inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
            >
              Accéder au Dashboard (sans auth)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}