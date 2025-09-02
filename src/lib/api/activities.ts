import { apiClient } from './client';

// Types pour les activités
export interface ActivityQueryParams {
    page?: number;
    limit?: number;
    status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
    category_id?: string;
    upcoming?: boolean;
}

export interface ActivityParticipant {
    id: number;
    user_id: number;
    resource_activity_id: number;
    status: 'invited' | 'accepted' | 'declined' | 'participating' | 'completed';
    invited_by?: number;
    invited_at?: string;
    accepted_at?: string;
    joined_at?: string;
    left_at?: string;
    invitation_message?: string;
    created_at: string;
    updated_at: string;

    // Relations
    user?: {
        id: number;
        name: string;
    };
}

export interface ResourceActivity {
    id: number;
    title: string;
    description: string;
    resource_id: number;
    created_by: number;
    status: 'open' | 'in_progress' | 'completed' | 'cancelled';
    max_participants: number;
    is_private: boolean;
    access_code: string;
    scheduled_at?: string;
    started_at?: string;
    completed_at?: string;
    estimated_duration_minutes?: number;
    activity_data?: any;
    results?: any;
    participant_count: number;
    instructions?: string;
    created_at: string;
    updated_at: string;

    // Relations
    resource?: {
        id: number;
        title: string;
        category_id: number;
        category?: {
            id: number;
            name: string;
            color?: string;
            icon?: string;
        };
    };
    creator?: {
        id: number;
        name: string;
    };
    participants?: ActivityParticipant[];

    // Champs calculés
    user_participation?: ActivityParticipant;
    can_join?: boolean;
    formatted_duration?: string;
}

export interface PaginatedActivitiesResponse {
    data: ResourceActivity[];
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

export class ActivitiesApi {
    /**
     * Récupération de toutes les activités
     */
    static async getActivities(params: ActivityQueryParams = {}): Promise<ApiResponse<PaginatedActivitiesResponse>> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('per_page', params.limit.toString());
        if (params.status) queryParams.append('status', params.status);
        if (params.category_id) queryParams.append('category_id', params.category_id);
        if (params.upcoming) queryParams.append('upcoming', params.upcoming.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

        return apiClient.get(`/api/activities${query}`);
    }

    /**
     * Récupération d'une activité spécifique
     */
    static async getActivity(id: number): Promise<ApiResponse<ResourceActivity>> {
        return apiClient.get(`/api/activities/${id}`);
    }

    /**
     * Création d'une nouvelle activité
     */
    static async createActivity(activityData: Partial<ResourceActivity>): Promise<ApiResponse<ResourceActivity>> {
        return apiClient.post('/api/activities', activityData);
    }

    /**
     * Modification d'une activité
     */
    static async updateActivity(id: number, activityData: Partial<ResourceActivity>): Promise<ApiResponse<ResourceActivity>> {
        return apiClient.put(`/api/activities/${id}`, activityData);
    }

    /**
     * Suppression d'une activité
     */
    static async deleteActivity(id: number): Promise<ApiResponse<null>> {
        return apiClient.delete(`/api/activities/${id}`);
    }

    /**
     * Rejoindre une activité
     */
    static async joinActivity(id: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/activities/${id}/join`);
    }

    /**
     * Quitter une activité
     */
    static async leaveActivity(id: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/activities/${id}/leave`);
    }

    /**
     * Accepter une invitation
     */
    static async acceptInvitation(id: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/activities/${id}/accept`);
    }

    /**
     * Décliner une invitation
     */
    static async declineInvitation(id: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/activities/${id}/decline`);
    }

    /**
     * Démarrer une activité
     */
    static async startActivity(id: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/activities/${id}/start`);
    }

    /**
     * Terminer une activité
     */
    static async completeActivity(id: number, results?: any): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/activities/${id}/complete`, { results });
    }

    /**
     * Annuler une activité
     */
    static async cancelActivity(id: number): Promise<ApiResponse<any>> {
        return apiClient.post(`/api/activities/${id}/cancel`);
    }
}