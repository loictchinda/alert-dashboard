import './globals.css';
import AuthProvider from '../app/components/AuthProvider';
import Navigation from '../app/components/Navigation';

export const metadata = {
  title: 'Alert Monitoring App',
  description: 'Application de surveillance d\'alertes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}