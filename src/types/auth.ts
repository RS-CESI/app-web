import { LucideIcon } from 'lucide-react';
import type { User, LoginCredentials, RegisterData } from './api';


export interface RegisterFormData {
    prenom: string;
    nom: string;
    email: string;
    dateNaissance: string;
    ville: string;
    password: string;
    confirmPassword: string;
    interets: string[];
    accepteConditions: boolean;
    accepteNewsletter: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterErrors {
    general?: string;
    prenom?: string;
    nom?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    accepteConditions?: string;
}

export interface LoginErrors {
    general?: string;
    email?: string;
    password?: string;
}

export interface InteretOption {
    id: string;
    label: string;
    icon: LucideIcon;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: any }>;
    logout: () => Promise<{ success: boolean; error?: any }>;
    register: (userData: RegisterData) => Promise<{ success: boolean; error?: any }>;
    checkAuth: () => Promise<void>;
}

export type { User, LoginCredentials, RegisterData } from './api';