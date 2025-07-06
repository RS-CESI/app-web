import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        <main className="flex-grow">
            {children}
        </main>

        <Footer />
        </body>
        </html>
    );
}