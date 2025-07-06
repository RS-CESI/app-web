import { apiClient } from './client';

export class ResourcesApi {
    /**
     * Récupération de toutes les ressources
     */
    static async getResources(params = {}) {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.category) queryParams.append('category', params.category);
        if (params.search) queryParams.append('search', params.search);

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/resources${query}`);
    }

    /**
     * Récupération d'une ressource spécifique
     */
    static async getResource(id) {
        return apiClient.get(`/api/resources/${id}`);
    }

    /**
     * Création d'une nouvelle ressource
     */
    static async createResource(resourceData) {
        return apiClient.post('/api/resources', resourceData);
    }

    /**
     * Modification d'une ressource
     */
    static async updateResource(id, resourceData) {
        return apiClient.put(`/api/resources/${id}`, resourceData);
    }

    /**
     * Suppression d'une ressource
     */
    static async deleteResource(id) {
        return apiClient.delete(`/api/resources/${id}`);
    }

    /**
     * Ajout aux favoris
     */
    static async addToFavorites(resourceId) {
        return apiClient.post(`/api/resources/${resourceId}/favorite`);
    }

    /**
     * Suppression des favoris
     */
    static async removeFromFavorites(resourceId) {
        return apiClient.delete(`/api/resources/${resourceId}/favorite`);
    }

    /**
     * Récupération des favoris
     */
    static async getFavorites() {
        return apiClient.get('/api/favorites');
    }
}