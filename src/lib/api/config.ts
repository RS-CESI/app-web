export const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
} as const;

export const API_ENDPOINTS = {
    // Auth
    login: '/login',
    logout: '/logout',
    register: '/register',
    profile: '/api/user',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    changePassword: '/api/password',

    // Resources
    resources: '/api/resources',
    favorites: '/api/favorites',

    // Users
    users: '/api/users',
    updateProfile: '/api/profile',
    uploadAvatar: '/api/avatar',

    // Discussions
    discussions: '/api/discussions',

    // CSRF
    csrfCookie: '/sanctum/csrf-cookie'
} as const;

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
} as const;

export const ERROR_TYPES = {
    VALIDATION: 'validation',
    AUTH: 'auth',
    FORBIDDEN: 'forbidden',
    SERVER: 'server',
    NETWORK: 'network',
    API: 'api'
} as const;

export const LOCAL_STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme',
    PENDING_PROFILE_UPDATE: 'pending_profile_update'
} as const;