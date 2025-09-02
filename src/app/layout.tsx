'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import {AuthProvider} from "@/contexts/AuthContext";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
        <AuthProvider>
            <Header />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </AuthProvider>
        </body>
        </html>
    );
}