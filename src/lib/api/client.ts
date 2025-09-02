import { API_CONFIG } from './config';
import type { ApiErrorResponse } from '@/types/api';

export class ApiError extends Error {
    public status: number;
    public data: ApiErrorResponse;

    constructor(message: string, status: number = 500, data: ApiErrorResponse = { message }) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

class ApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;

    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.defaultHeaders = API_CONFIG.headers;
    }

    /**
     * Méthode générique pour faire des requêtes
     */
    async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        // Récupérer le token depuis localStorage
        const token = localStorage.getItem('auth_token');

        const config: RequestInit = {
            headers: {
                ...this.defaultHeaders,
                // Ajouter le token Bearer si disponible
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...options.headers,
            },
            credentials: 'include',
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                // Si 401, supprimer le token invalide
                if (response.status === 401) {
                    localStorage.removeItem('auth_token');
                }
                throw new ApiError(data.message || 'Une erreur est survenue', response.status, data);
            }

            return data as T;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError('Erreur de connexion', 500, { message: (error as Error).message });
        }
    }

    /**
     * Récupération du token CSRF
     */
    async getCsrfToken(): Promise<void> {
        try {
            await fetch(`${this.baseURL}/sanctum/csrf-cookie`, {
                method: 'GET',
                credentials: 'include',
                headers: this.defaultHeaders,
            });
        } catch (error) {
            console.warn('Erreur lors de la récupération du token CSRF:', error);
        }
    }

    // Méthodes HTTP raccourcies
    async get<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', ...options });
    }

    async post<T = any>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
    }

    async put<T = any>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });
    }

    async delete<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE', ...options });
    }
}

// Instance singleton
export const apiClient = new ApiClient();