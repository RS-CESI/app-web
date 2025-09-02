import { ApiError } from './client';
import { HTTP_STATUS, ERROR_TYPES } from './config';
import type { ErrorInfo } from '@/types/api';

/**
 * Gestionnaire d'erreurs pour les appels API
 */
export const handleApiError = (error: unknown): ErrorInfo => {
    if (error instanceof ApiError) {
        // Erreur de validation Laravel
        if (error.status === HTTP_STATUS.UNPROCESSABLE_ENTITY && error.data.errors) {
            return {
                type: ERROR_TYPES.VALIDATION,
                errors: error.data.errors,
                message: error.message
            };
        }

        // Erreur d'authentification
        if (error.status === HTTP_STATUS.UNAUTHORIZED) {
            return {
                type: ERROR_TYPES.AUTH,
                message: 'Vous devez être connecté pour accéder à cette ressource'
            };
        }

        // Erreur d'autorisation
        if (error.status === HTTP_STATUS.FORBIDDEN) {
            return {
                type: ERROR_TYPES.FORBIDDEN,
                message: 'Vous n\'avez pas les permissions nécessaires'
            };
        }

        // Erreur serveur
        if (error.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
            return {
                type: ERROR_TYPES.SERVER,
                message: 'Erreur serveur, veuillez réessayer plus tard'
            };
        }

        return {
            type: ERROR_TYPES.API,
            message: error.message
        };
    }

    // Erreur réseau ou autre
    return {
        type: ERROR_TYPES.NETWORK,
        message: 'Erreur de connexion'
    };
};

/**
 * Classe de gestion globale des erreurs
 */
export class ErrorHandler {
    private static isDebugMode = process.env.NODE_ENV === 'development';

    static log(error: Error, context: string = ''): void {
        if (this.isDebugMode) {
            console.group(`🚨 Erreur ${context ? `(${context})` : ''}`);
            console.error('Message:', error.message);
            console.error('Stack:', error.stack);
            console.error('Objet complet:', error);
            console.groupEnd();
        }
    }

    static notify(message: string, type: 'error' | 'warning' | 'info' = 'error'): void {
        // Ici vous pourriez intégrer un système de notification
        // comme react-hot-toast, react-toastify, etc.
        if (this.isDebugMode) {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    static handle(error: unknown, context: string = ''): void {
        const errorObj = error instanceof Error ? error : new Error(String(error));

        this.log(errorObj, context);

        if (error instanceof ApiError && error.status === HTTP_STATUS.UNAUTHORIZED) {
            // Redirection vers login si non authentifié
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            return;
        }

        const errorInfo = handleApiError(error);
        this.notify(errorInfo.message);
    }
}