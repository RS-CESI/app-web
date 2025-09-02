import { apiClient } from './client';
import { LOCAL_STORAGE_KEYS } from './config';
import type {
    ApiResponse,
    LoginCredentials,
    RegisterData,
    User
} from '@/types/api';

export class AuthApi {
    /**
     * Connexion utilisateur
     */
    static async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
        await apiClient.getCsrfToken();

        const response = await apiClient.post<ApiResponse<User>>('/login', {
            email: credentials.email,
            password: credentials.password,
            remember: credentials.rememberMe || false,
        });

        // Stocker le token si fourni
        if (response.token) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
        }

        return response;
    }

    /**
     * Inscription utilisateur
     */
    static async register(userData: RegisterData): Promise<ApiResponse<User>> {
        await apiClient.getCsrfToken();

        const response = await apiClient.post<ApiResponse<User>>('/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            password_confirmation: userData.password_confirmation
        });

        // Stocker le token si fourni après inscription
        if (response.token) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
        }

        return response;
    }

    /**
     * Déconnexion utilisateur
     */
    static async logout(): Promise<void> {
        try {
            await apiClient.post('/api/logout');
        } finally {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        }
    }

    /**
     * Récupération du profil utilisateur
     */
    static async getProfile(): Promise<ApiResponse<User>> {
        return apiClient.get<ApiResponse<User>>('/api/user');
    }

    /**
     * Mot de passe oublié
     */
    static async forgotPassword(email: string): Promise<ApiResponse> {
        await apiClient.getCsrfToken();

        return apiClient.post<ApiResponse>('/forgot-password', { email });
    }

    /**
     * Réinitialisation du mot de passe
     */
    static async resetPassword(resetData: {
        token: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }): Promise<ApiResponse> {
        await apiClient.getCsrfToken();

        return apiClient.post<ApiResponse>('/reset-password', {
            token: resetData.token,
            email: resetData.email,
            password: resetData.password,
            password_confirmation: resetData.passwordConfirmation,
        });
    }

    /**
     * Changement de mot de passe
     */
    static async changePassword(passwordData: {
        currentPassword: string;
        newPassword: string;
        passwordConfirmation: string;
    }): Promise<ApiResponse> {
        return apiClient.put<ApiResponse>('/api/password', {
            current_password: passwordData.currentPassword,
            password: passwordData.newPassword,
            password_confirmation: passwordData.passwordConfirmation,
        });
    }

    /**
     * Vérification de l'email
     */
    static async verifyEmail(verificationData: {
        id: string;
        hash: string;
        expires: string;
        signature: string;
    }): Promise<ApiResponse> {
        return apiClient.post<ApiResponse>('/email/verify', {
            id: verificationData.id,
            hash: verificationData.hash,
            expires: verificationData.expires,
            signature: verificationData.signature
        });
    }

    /**
     * Renvoi de l'email de vérification
     */
    static async resendVerificationEmail(): Promise<ApiResponse> {
        await apiClient.getCsrfToken();

        return apiClient.post<ApiResponse>('/email/verification-notification');
    }
}