export interface ApiResponse<T = any> {
    message?: string;
    data?: T;
    token?: string;
    user?: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role_id?: number;
    created_at?: string;
    updated_at?: string;
    email_verified_at?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ApiErrorResponse {
    message: string;
    errors?: {
        [key: string]: string[];
    };
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface ErrorInfo {
    type: 'validation' | 'auth' | 'forbidden' | 'server' | 'network' | 'api';
    message: string;
    errors?: {
        [key: string]: string[];
    };
}