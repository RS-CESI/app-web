// lib/api/dashboard.ts

import { apiClient } from './client';

export interface DashboardStats {
    total_progressions: number;
    completed: number;
    in_progress: number;
    bookmarked: number;
    paused: number;
    total_time_spent: number;
    average_completion_rate: number;
}

export interface Category {
    id: number;
    name: string;
    color?: string;
    icon?: string;
}

export interface Resource {
    id: number;
    title: string;
    category_id: number;
    category?: Category;
}

export interface RecentProgression {
    id: number;
    resource_id: number;
    user_id: number;
    status: 'started' | 'in_progress' | 'completed' | 'paused' | 'bookmarked';
    progress_percentage: number;
    time_spent_minutes: number;
    last_accessed_at: string;
    completed_at?: string;
    started_at?: string;
    rating?: number;
    notes?: string;
    resource: Resource;
}

export interface ProgressionByCategory {
    name: string;
    color?: string;
    icon?: string;
    count: number;
    avg_progress: number;
}

export interface ProgressionByStatus {
    status: string;
    count: number;
}

export interface Recommendation {
    id: number;
    title: string;
    type: string;
    duration?: string;
    category: string;
    reason: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recent_progressions: RecentProgression[];
    recent_completions: RecentProgression[];
    by_category: ProgressionByCategory[];
    by_status: ProgressionByStatus[];
    recommendations: Recommendation[];
    formatted_time_spent: string;
}

export interface DashboardResponse {
    data: DashboardData;
    message: string;
}

export class DashboardApi {
    /**
     * Récupérer les données du tableau de bord
     */
    static async getDashboard(): Promise<DashboardResponse> {
        return apiClient.get('/api/progressions/dashboard');
    }

    /**
     * Récupérer toutes les progressions de l'utilisateur
     */
    static async getProgressions(params?: {
        status?: string;
        category_id?: number;
        page?: number;
        limit?: number;
    }): Promise<any> {
        const queryParams = new URLSearchParams();

        if (params?.status) queryParams.append('status', params.status);
        if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('per_page', params.limit.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/progressions${query}`);
    }

    /**
     * Démarrer une progression pour une ressource
     */
    static async startProgression(resourceId: number): Promise<any> {
        return apiClient.post(`/api/progressions/resources/${resourceId}/start`);
    }

    /**
     * Marquer une ressource comme terminée
     */
    static async completeProgression(resourceId: number, data?: {
        rating?: number;
        notes?: string;
    }): Promise<any> {
        return apiClient.post(`/api/progressions/resources/${resourceId}/complete`, data);
    }

    /**
     * Mettre en favoris/signet une ressource
     */
    static async bookmarkProgression(resourceId: number): Promise<any> {
        return apiClient.post(`/api/progressions/resources/${resourceId}/bookmark`);
    }

    /**
     * Mettre en pause une progression
     */
    static async pauseProgression(resourceId: number): Promise<any> {
        return apiClient.post(`/api/progressions/resources/${resourceId}/pause`);
    }

    /**
     * Ajouter du temps passé sur une ressource
     */
    static async addTimeToProgression(resourceId: number, timeInMinutes: number): Promise<any> {
        return apiClient.post(`/api/progressions/resources/${resourceId}/time`, {
            time_spent_minutes: timeInMinutes
        });
    }

    /**
     * Noter une ressource
     */
    static async rateProgression(resourceId: number, rating: number, notes?: string): Promise<any> {
        return apiClient.post(`/api/progressions/resources/${resourceId}/rate`, {
            rating,
            notes
        });
    }

    /**
     * Créer ou mettre à jour une progression
     */
    static async createOrUpdateProgression(resourceId: number, data: {
        status?: string;
        progress_percentage?: number;
        time_spent_minutes?: number;
        notes?: string;
    }): Promise<any> {
        return apiClient.post(`/api/progressions/resources/${resourceId}`, data);
    }

    /**
     * Mettre à jour une progression existante
     */
    static async updateProgression(resourceId: number, data: {
        status?: string;
        progress_percentage?: number;
        time_spent_minutes?: number;
        notes?: string;
    }): Promise<any> {
        return apiClient.put(`/api/progressions/resources/${resourceId}`, data);
    }
}