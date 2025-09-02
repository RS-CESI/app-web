export { apiClient, ApiError } from './client';
export { AuthApi } from './auth';
export { handleApiError, ErrorHandler } from './errorHandler';
export { API_CONFIG, API_ENDPOINTS, HTTP_STATUS, ERROR_TYPES, LOCAL_STORAGE_KEYS } from './config';

// Réexport des types pour faciliter les imports
export type {
    ApiResponse,
    User,
    LoginCredentials,
    RegisterData,
    ApiErrorResponse,
    PaginatedResponse,
    ErrorInfo
} from '@/types/api';