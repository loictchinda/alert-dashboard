'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 border-blue-600' : 'text-gray-700 hover:text-blue-600 border-transparent';
  };

  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Alert Monitoring</h1>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Alert Monitoring</h1>
            {user && (
              <div className="ml-10 flex space-x-8">
                <a 
                  href="/dashboard" 
                  className={`flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/dashboard')}`}
                >
                  Dashboard
                </a>
                <a 
                  href="/alerts" 
                  className={`flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/alerts')}`}
                >
                  Alertes
                </a>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700 text-sm">{user.name}</span>
                <a 
                  href="/api/auth/logout"
                  className="text-gray-700 hover:text-blue-600 text-sm"
                >
                  Déconnexion
                </a>
              </>
            ) : (
              <a 
                href="/api/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Connexion
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}