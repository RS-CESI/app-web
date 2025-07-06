import { apiClient } from './client';

// Types pour les paramètres de requête
export interface ResourcesQueryParams {
    page?: number;
    limit?: number;
    category_id?: string;
    resource_type_id?: string;
    relation_type_id?: string;
    difficulty_level?: string;
    duration_max?: number;
    search?: string;
}

// Types pour les réponses API
export interface Category {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ResourceType {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface RelationType {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface User {
    id: number;
    name: string;
    email?: string;
}

export interface Resource {
    id: number;
    title: string;
    description: string;
    content?: string;
    slug: string;
    category_id: number;
    resource_type_id: number;
    created_by: number;
    validated_by?: number;
    visibility: 'public' | 'shared' | 'private';
    status: 'draft' | 'pending' | 'published' | 'rejected';
    file_path?: string;
    file_name?: string;
    file_mime_type?: string;
    file_size?: number;
    external_url?: string;
    duration_minutes?: number;
    difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
    tags?: string[];
    view_count: number;
    download_count: number;
    favorite_count: number;
    average_rating?: number;
    rating_count: number;
    published_at?: string;
    validated_at?: string;
    last_viewed_at?: string;
    created_at: string;
    updated_at: string;

    // Relations
    category?: Category;
    resource_type?: ResourceType;
    creator?: User;
    validator?: User;
    relation_types?: RelationType[];
}

export interface PaginatedResponse<T> {
    data: T[];
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

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: number;
}

export class ResourcesApi {
    /**
     * Récupération de toutes les ressources publiques
     */
    static async getPublicResources(params: ResourcesQueryParams = {}): Promise<PaginatedResponse<Resource>> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('per_page', params.limit.toString());
        if (params.category_id) queryParams.append('category_id', params.category_id);
        if (params.resource_type_id) queryParams.append('resource_type_id', params.resource_type_id);
        if (params.relation_type_id) queryParams.append('relation_type_id', params.relation_type_id);
        if (params.difficulty_level) queryParams.append('difficulty_level', params.difficulty_level);
        if (params.duration_max) queryParams.append('duration_max', params.duration_max.toString());
        // Ne pas envoyer search sur cet endpoint

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/public/resources${query}`);
    }

    /**
     * Récupération d'une ressource publique spécifique
     */
    static async getPublicResource(id: number): Promise<ApiResponse<Resource>> {
        return apiClient.get(`/api/public/resources/${id}`);
    }

    /**
     * Recherche dans les ressources publiques
     */
    static async searchPublicResources(params: ResourcesQueryParams = {}): Promise<PaginatedResponse<Resource>> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('per_page', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.category_id) queryParams.append('category_id', params.category_id);
        if (params.resource_type_id) queryParams.append('resource_type_id', params.resource_type_id);
        if (params.relation_type_id) queryParams.append('relation_type_id', params.relation_type_id);
        if (params.difficulty_level) queryParams.append('difficulty_level', params.difficulty_level);
        if (params.duration_max) queryParams.append('duration_max', params.duration_max.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/public/search${query}`);
    }

    /**
     * Recherche simple (pour compatibilité)
     */
    static async searchPublicResourcesSimple(searchTerm: string, params: Omit<ResourcesQueryParams, 'search'> = {}): Promise<PaginatedResponse<Resource>> {
        return this.searchPublicResources({ ...params, search: searchTerm });
    }
    /**
     * Récupération des catégories publiques
     */
    static async getPublicCategories(): Promise<ApiResponse<Category[]>> {
        return apiClient.get('/api/public/categories');
    }

    /**
     * Récupération des types de ressources publiques
     */
    static async getPublicResourceTypes(): Promise<ApiResponse<ResourceType[]>> {
        return apiClient.get('/api/public/resource-types');
    }

    /**
     * Récupération des types de relations publiques
     */
    static async getPublicRelationTypes(): Promise<ApiResponse<RelationType[]>> {
        return apiClient.get('/api/public/relation-types');
    }

    /**
     * Récupération des statistiques publiques
     */
    static async getPublicStatistics(): Promise<ApiResponse<any>> {
        return apiClient.get('/api/public/statistics');
    }

    // ========== MÉTHODES POUR LES UTILISATEURS AUTHENTIFIÉS ==========

    /**
     * Récupération de toutes les ressources (authentifié)
     */
    static async getResources(params: ResourcesQueryParams = {}): Promise<PaginatedResponse<Resource>> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.category_id) queryParams.append('category_id', params.category_id);
        if (params.resource_type_id) queryParams.append('resource_type_id', params.resource_type_id);
        if (params.relation_type_id) queryParams.append('relation_type_id', params.relation_type_id);
        if (params.difficulty_level) queryParams.append('difficulty_level', params.difficulty_level);
        if (params.duration_max) queryParams.append('duration_max', params.duration_max.toString());
        if (params.search) queryParams.append('search', params.search);

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/resources${query}`);
    }

    /**
     * Récupération d'une ressource spécifique (authentifié)
     */
    static async getResource(id: number): Promise<ApiResponse<Resource>> {
        return apiClient.get(`/api/resources/${id}`);
    }

    /**
     * Création d'une nouvelle ressource
     */
    static async createResource(resourceData: Partial<Resource>): Promise<ApiResponse<Resource>> {
        return apiClient.post('/api/resources', resourceData);
    }

    /**
     * Modification d'une ressource
     */
    static async updateResource(id: number, resourceData: Partial<Resource>): Promise<ApiResponse<Resource>> {
        return apiClient.put(`/api/resources/${id}`, resourceData);
    }

    /**
     * Suppression d'une ressource
     */
    static async deleteResource(id: number): Promise<ApiResponse<null>> {
        return apiClient.delete(`/api/resources/${id}`);
    }

    /**
     * Ajout aux favoris
     */
    static async addToFavorites(resourceId: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/resources/${resourceId}/favorite`);
    }

    /**
     * Suppression des favoris
     */
    static async removeFromFavorites(resourceId: number): Promise<ApiResponse<any>> {
        return apiClient.delete(`/api/resources/${resourceId}/favorite`);
    }

    /**
     * Récupération des favoris
     */
    static async getFavorites(params: Pick<ResourcesQueryParams, 'page' | 'limit'> = {}): Promise<PaginatedResponse<Resource>> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/favorites${query}`);
    }

    /**
     * Marquer une ressource comme consultée (augmente le view_count)
     */
    static async markAsViewed(resourceId: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/resources/${resourceId}/view`);
    }

    /**
     * Télécharger une ressource (augmente le download_count)
     */
    static async downloadResource(resourceId: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/resources/${resourceId}/download`);
    }

    /**
     * Noter une ressource
     */
    static async rateResource(resourceId: number, rating: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/resources/${resourceId}/rate`, { rating });
    }
}