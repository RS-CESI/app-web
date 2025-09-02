import { apiClient } from './client';

export class UsersApi {
    /**
     * Récupération des utilisateurs
     */
    static async getUsers(params = {}) {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.search) queryParams.append('search', params.search);

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/users${query}`);
    }

    /**
     * Récupération d'un utilisateur spécifique
     */
    static async getUser(id) {
        return apiClient.get(`/api/users/${id}`);
    }

    /**
     * Mise à jour du profil
     */
    static async updateProfile(profileData) {
        return apiClient.put('/api/profile', profileData);
    }

    /**
     * Upload d'avatar
     */
    static async uploadAvatar(file) {
        const formData = new FormData();
        formData.append('avatar', file);

        return apiClient.request('/api/avatar', {
            method: 'POST',
            body: formData,
            headers: {
                // Ne pas définir Content-Type pour FormData
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
    }
}