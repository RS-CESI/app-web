// lib/api/favorites.ts

import { apiClient } from './client';

export interface Category {
    id: number;
    name: string;
    color?: string;
    icon?: string;
}

export interface ResourceType {
    id: number;
    name: string;
    icon?: string;
    color?: string;
}

export interface Creator {
    id: number;
    name: string;
}

export interface RelationType {
    id: number;
    name: string;
}

export interface UserProgression {
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
}

export interface FavoriteResource {
    id: number;
    title: string;
    description: string;
    content?: string;
    category_id: number;
    resource_type_id: number;
    created_by: number;
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    estimated_duration_minutes?: number;
    status: 'draft' | 'published' | 'archived';
    visibility: 'public' | 'shared' | 'private';
    view_count: number;
    favorite_count: number;
    created_at: string;
    updated_at: string;
    favorited_at: string; // Pivot field

    // Relations
    category: Category;
    resourceType: ResourceType;
    creator: Creator;
    relationTypes: RelationType[];
    user_progression?: UserProgression;
    is_favorite: boolean;
}

export interface PaginatedFavoritesResponse {
    data: FavoriteResource[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface FavoritesResponse {
    data: PaginatedFavoritesResponse;
    message: string;
    meta: {
        total_favorites: number;
    };
}

export interface ToggleFavoriteResponse {
    message: string;
    is_favorite: boolean;
    favorite_count: number;
    data: {
        resource_id: number;
        action: 'added' | 'removed';
    };
}

export interface FavoriteStatistics {
    total_favorites: number;
    recent_favorites: number;
    by_category: Array<{
        category_name: string;
        color?: string;
        icon?: string;
        count: number;
    }>;
    by_type: Array<{
        type_name: string;
        color?: string;
        icon?: string;
        count: number;
    }>;
    by_difficulty: Array<{
        difficulty_level: string;
        count: number;
    }>;
    with_progression: Array<{
        status: string;
        count: number;
    }>;
    completion_rate: number;
}

export class FavoritesApi {
    /**
     * Récupérer tous les favoris de l'utilisateur
     */
    static async getFavorites(params?: {
        category_id?: number;
        resource_type_id?: number;
        difficulty_level?: string;
        page?: number;
    }): Promise<FavoritesResponse> {
        const queryParams = new URLSearchParams();

        if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
        if (params?.resource_type_id) queryParams.append('resource_type_id', params.resource_type_id.toString());
        if (params?.difficulty_level) queryParams.append('difficulty_level', params.difficulty_level);
        if (params?.page) queryParams.append('page', params.page.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/favorites${query}`);
    }

    /**
     * Ajouter/Retirer une ressource des favoris (toggle)
     */
    static async toggleFavorite(resourceId: number): Promise<ToggleFavoriteResponse> {
        return apiClient.post(`/api/favorites/resources/${resourceId}`);
    }

    /**
     * Retirer une ressource des favoris
     */
    static async removeFavorite(resourceId: number): Promise<{
        message: string;
        data: {
            resource_id: number;
            action: 'removed';
        };
    }> {
        return apiClient.delete(`/api/favorites/resources/${resourceId}`);
    }

    /**
     * Ajouter plusieurs ressources aux favoris
     */
    static async addMultipleFavorites(resourceIds: number[]): Promise<{
        message: string;
        data: {
            added: number[];
            skipped: number[];
            forbidden: number[];
            summary: {
                added_count: number;
                skipped_count: number;
                forbidden_count: number;
            };
        };
    }> {
        return apiClient.post('/api/favorites/bulk/add', {
            resource_ids: resourceIds
        });
    }

    /**
     * Retirer plusieurs ressources des favoris
     */
    static async removeMultipleFavorites(resourceIds: number[]): Promise<{
        message: string;
        data: {
            removed_count: number;
            requested_count: number;
        };
    }> {
        return apiClient.post('/api/favorites/bulk/remove', {
            resource_ids: resourceIds
        });
    }

    /**
     * Vérifier si une ressource est en favoris
     */
    static async checkFavorite(resourceId: number): Promise<{
        is_favorite: boolean;
        favorited_at: string | null;
        data: {
            resource_id: number;
            resource_title: string;
        };
    }> {
        return apiClient.get(`/api/favorites/resources/${resourceId}/check`);
    }

    /**
     * Obtenir les statistiques des favoris
     */
    static async getStatistics(): Promise<{
        data: FavoriteStatistics;
        message: string;
    }> {
        return apiClient.get('/api/favorites/statistics');
    }

    /**
     * Nettoyer les favoris (supprimer ceux de ressources supprimées)
     */
    static async cleanupFavorites(): Promise<{
        message: string;
        data: {
            cleaned_count: number;
            remaining_favorites: number;
        };
    }> {
        return apiClient.post('/api/favorites/cleanup');
    }
}