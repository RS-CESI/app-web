import { apiClient } from './client';

export class DiscussionsApi {
    /**
     * Récupération des discussions
     */
    static async getDiscussions(params = {}) {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/discussions${query}`);
    }

    /**
     * Récupération d'une discussion spécifique
     */
    static async getDiscussion(id) {
        return apiClient.get(`/api/discussions/${id}`);
    }

    /**
     * Création d'une nouvelle discussion
     */
    static async createDiscussion(discussionData) {
        return apiClient.post('/api/discussions', discussionData);
    }

    /**
     * Ajout d'un message à une discussion
     */
    static async addMessage(discussionId, messageData) {
        return apiClient.post(`/api/discussions/${discussionId}/messages`, messageData);
    }

    /**
     * Suppression d'un message
     */
    static async deleteMessage(discussionId, messageId) {
        return apiClient.delete(`/api/discussions/${discussionId}/messages/${messageId}`);
    }
}
