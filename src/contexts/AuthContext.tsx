'use client';

import React, { createContext, JSX, useContext } from 'react';
import { AuthApi, handleApiError, LOCAL_STORAGE_KEYS } from '@/lib/api';
import type { User, LoginCredentials, RegisterData } from '@/types/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: any }>;
    logout: () => Promise<{ success: boolean; error?: any }>;
    register: (userData: RegisterData) => Promise<{ success: boolean; error?: any }>;
    checkAuth: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            // Vérifier s'il y a un token en localStorage
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
            console.log('🔍 AuthContext - Vérification auth - Token présent:', !!token);

            if (!token) {
                console.log('❌ AuthContext - Pas de token - utilisateur non authentifié');
                setUser(null);
                setLoading(false);
                return;
            }

            console.log('🔑 AuthContext - Token trouvé, récupération du profil...');

            // Récupérer le profil utilisateur
            const response = await AuthApi.getProfile();
            console.log('✅ AuthContext - Profil récupéré:', response);

            // @ts-ignore
            setUser(response.user || response);
        } catch (error) {
            console.error('❌ AuthContext - Erreur lors de la vérification auth:', error);

            const errorInfo = handleApiError(error);

            if (errorInfo.type === 'auth') {
                console.log('🚫 AuthContext - Token expiré/invalide - suppression');
                // Token expiré ou invalide
                localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
                setUser(null);
            } else {
                console.error('🔥 AuthContext - Autre erreur:', errorInfo.message);
                setError(errorInfo.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: any }> => {
        try {
            setError(null);
            console.log('🔐 AuthContext - Tentative de connexion...');

            const response = await AuthApi.login(credentials);
            console.log('✅ AuthContext - Connexion réussie:', response);

            // @ts-ignore
            setUser(response.user || response);
            return { success: true };
        } catch (error) {
            console.error('❌ AuthContext - Erreur de connexion:', error);

            const errorInfo = handleApiError(error);
            setError(errorInfo.message);
            return { success: false, error: errorInfo };
        }
    };

    const logout = async (): Promise<{ success: boolean; error?: any }> => {
        try {
            console.log('🚪 AuthContext - Déconnexion...');
            await AuthApi.logout();
            setUser(null);
            setError(null);
            console.log('✅ AuthContext - Déconnexion réussie');
            return { success: true };
        } catch (error) {
            console.error('❌ AuthContext - Erreur de déconnexion:', error);
            const errorInfo = handleApiError(error);
            // Même en cas d'erreur, on déconnecte l'utilisateur localement
            setUser(null);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
            return { success: false, error: errorInfo };
        }
    };

    const register = async (userData: RegisterData): Promise<{ success: boolean; error?: any }> => {
        try {
            setError(null);
            console.log('📝 AuthContext - Tentative d\'inscription...');

            const response = await AuthApi.register(userData);
            console.log('✅ AuthContext - Inscription réussie:', response);

            // @ts-ignore
            setUser(response.user || response);
            return { success: true };
        } catch (error) {
            console.error('❌ AuthContext - Erreur d\'inscription:', error);

            const errorInfo = handleApiError(error);
            setError(errorInfo.message);
            return { success: false, error: errorInfo };
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        checkAuth,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}