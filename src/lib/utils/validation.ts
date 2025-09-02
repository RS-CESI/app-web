// lib/utils/validation.ts - Utilitaires de validation avec types TypeScript
export interface ValidationRule {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message?: string;
}

export interface ValidationSchema {
    [key: string]: ValidationRule;
}

export interface ValidationErrors {
    [key: string]: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationErrors;
}

export const VALIDATION_RULES: { [key: string]: ValidationRule } = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Veuillez entrer une adresse email valide'
    },
    password: {
        required: true,
        minLength: 6,
        message: 'Le mot de passe doit contenir au moins 6 caractères'
    },
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        message: 'Le nom doit contenir entre 2 et 50 caractères'
    }
};

export const validateField = (value: any, rules: ValidationRule): string | null => {
    // Gestion spéciale pour les booléens (checkbox)
    if (typeof value === 'boolean') {
        if (rules.required && !value) {
            return rules.message || 'Ce champ est requis';
        }
        return null;
    }

    // Gestion pour les strings
    const stringValue = value as string | undefined;

    if (rules.required && (!stringValue || stringValue.trim() === '')) {
        return 'Ce champ est requis';
    }

    if (stringValue && rules.pattern && !rules.pattern.test(stringValue)) {
        return rules.message || 'Format invalide';
    }

    if (stringValue && rules.minLength && stringValue.length < rules.minLength) {
        return `Minimum ${rules.minLength} caractères requis`;
    }

    if (stringValue && rules.maxLength && stringValue.length > rules.maxLength) {
        return `Maximum ${rules.maxLength} caractères autorisés`;
    }

    return null;
};

export const validateForm = (data: { [key: string]: any }, validationSchema: ValidationSchema): ValidationResult => {
    const errors: ValidationErrors = {};

    Object.keys(validationSchema).forEach(field => {
        const fieldValue = data[field];
        const error = validateField(fieldValue, validationSchema[field]);
        if (error) {
            errors[field] = error;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};