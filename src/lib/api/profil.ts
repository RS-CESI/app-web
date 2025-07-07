// lib/api/profil.ts

import { apiClient } from './client';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
    initials: string;
    created_at: string;
    email_verified_at: string | null;
    permissions: {
        can_moderate: boolean;
        is_admin: boolean;
        is_super_admin: boolean;
    };
}

export interface Stats {
    resources: {
        created: number;
        published: number;
        drafts: number;
        total_views: number;
    };
    favorites: {
        count: number;
    };
    progressions: {
        total: number;
        completed: number;
        in_progress: number;
        bookmarked: number;
        total_time: number;
    };
    activities: {
        created: number;
        participated: number;
    };
    comments: {
        count: number;
        approved: number;
    };
}

export interface ProfileData {
    user: User;
    stats: Stats;
}

export interface UpdateProfileData {
    name?: string;
    email?: string;
}

export interface ChangePasswordData {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface DeleteAccountData {
    password: string;
}

export const profileApi = {
    // Récupérer les données du profil
    getProfile: async (): Promise<ProfileData> => {
        return apiClient.get('/api/profile');
    },

    // Mettre à jour le profil
    updateProfile: async (data: UpdateProfileData): Promise<{ message: string; user: User }> => {
        return apiClient.put('/api/profile', data);
    },

    // Changer le mot de passe
    changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
        return apiClient.put('/api/profile/password', data);
    },

    // Supprimer le compte
    deleteAccount: async (data: DeleteAccountData): Promise<{ message: string }> => {
        return apiClient.delete('/api/profile', {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    // Télécharger les données personnelles
    downloadPersonalData: async (): Promise<void> => {
        // Pour le téléchargement de fichier, on utilise fetch directement car apiClient retourne du JSON
        const token = localStorage.getItem('auth_token');

        const response = await fetch('/api/profile/download', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors du téléchargement des données');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mes-donnees-personnelles.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },
};