// lib/api/myResources.ts

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

export interface RelationType {
    id: number;
    name: string;
}

export interface MyResource {
    id: number;
    title: string;
    description: string;
    content?: string;
    category_id: number;
    resource_type_id: number;
    created_by: number;
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    estimated_duration_minutes?: number;
    status: 'draft' | 'published' | 'archived' | 'pending_validation';
    visibility: 'public' | 'shared' | 'private';
    view_count: number;
    download_count: number;
    favorite_count: number;
    created_at: string;
    updated_at: string;

    // Relations
    category: Category;
    resourceType: ResourceType;
    relationTypes: RelationType[];
}

export interface PaginatedMyResourcesResponse {
    data: MyResource[];
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

export interface SubmitForValidationResponse {
    message: string;
    data: {
        resource_id: number;
        status: string;
        submitted_at: string;
    };
}

export interface IncrementViewResponse {
    message: string;
    view_count: number;
}

export interface IncrementDownloadResponse {
    message: string;
    download_count: number;
}

export class MyResourcesApi {
    /**
     * Récupérer toutes mes ressources
     */
    static async getMyResources(params?: {
        page?: number;
        status?: string;
        category_id?: number;
    }): Promise<PaginatedMyResourcesResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.status) queryParams.append('status', params.status);
        if (params?.category_id) queryParams.append('category_id', params.category_id.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/resources/my${query}`);
    }

    /**
     * Récupérer mes brouillons
     */
    static async getMyDrafts(params?: {
        page?: number;
    }): Promise<PaginatedMyResourcesResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/resources/drafts${query}`);
    }

    /**
     * Récupérer mes ressources publiées
     */
    static async getMyPublished(params?: {
        page?: number;
    }): Promise<PaginatedMyResourcesResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/resources/published${query}`);
    }

    /**
     * Incrémenter le nombre de vues d'une ressource
     */
    static async incrementView(resourceId: number): Promise<IncrementViewResponse> {
        return apiClient.post(`/api/resources/${resourceId}/view`);
    }

    /**
     * Incrémenter le nombre de téléchargements d'une ressource
     */
    static async incrementDownload(resourceId: number): Promise<IncrementDownloadResponse> {
        return apiClient.post(`/api/resources/${resourceId}/download`);
    }

    /**
     * Télécharger le fichier d'une ressource
     */
    static async downloadFile(resourceId: number): Promise<void> {
        // Pour le téléchargement de fichier, on utilise fetch directement
        const response = await fetch(`/api/resources/${resourceId}/file`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/octet-stream',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors du téléchargement du fichier');
        }

        // Extraire le nom du fichier depuis les headers
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'resource-file';

        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch) {
                filename = filenameMatch[1];
            }
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    /**
     * Soumettre une ressource pour validation
     */
    static async submitForValidation(resourceId: number): Promise<SubmitForValidationResponse> {
        return apiClient.post(`/api/resources/${resourceId}/submit`);
    }
}