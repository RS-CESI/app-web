// layout.js
import "./globals.css";
import { GeistSans, GeistMono } from 'geist/font';

export const metadata = {
  title: "(RE)Sources Relationnelles",
  description: "Plateforme pour renforcer les liens humains par des ressources citoyennes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <header className="bg-primary text-black px-6 py-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">🌿 (RE)Sources</h1>
            <nav className="space-x-4 hidden md:flex">
              <a href="/" className="hover:underline">Accueil</a>
              <a href="/resources" className="hover:underline">Ressources</a>
              <a href="/login" className="hover:underline">Connexion</a>
            </nav>
          </div>
        </header>

        <main className="min-h-[80vh] max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-secondary text-white text-sm text-center p-4">
          © 2025 - (RE)Sources Relationnelles — Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
