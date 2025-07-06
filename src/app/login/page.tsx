'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, CheckCircle, Users, Heart, MessageCircle } from 'lucide-react';

// Import de notre couche API
import { AuthApi, handleApiError } from '@/lib/api';

export default function ConnexionPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = React.useState({
        email: '',
        password: '',
        general: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrors({ email: '', password: '', general: '' });

        // Validation côté client
        let newErrors = { email: '', password: '', general: '' };

        if (!formData.email) {
            newErrors.email = 'L\'adresse email est requise';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'L\'adresse email n\'est pas valide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            // Appel API simplifié
            const response = await AuthApi.login({
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe
            });

            console.log('Connexion réussie!', response);

            // Redirection vers le tableau de bord
            router.push('/dashboard');

        } catch (error) {
            console.error('Erreur de connexion:', error);

            // Gestion des erreurs avec notre utilitaire
            const errorInfo = handleApiError(error);

            if (errorInfo.type === 'validation' && errorInfo.errors) {
                const serverErrors = { email: '', password: '', general: '' };

                if (errorInfo.errors.email) {
                    serverErrors.email = errorInfo.errors.email[0];
                }
                if (errorInfo.errors.password) {
                    serverErrors.password = errorInfo.errors.password[0];
                }

                setErrors(serverErrors);
            } else {
                setErrors({
                    email: '',
                    password: '',
                    general: errorInfo.message
                });
            }
        }

        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <LogIn className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Bienvenue
                    </h1>
                    <p className="text-gray-600">
                        Connectez-vous à votre compte (RE)Sources Relationnelles
                    </p>
                </div>

                {/* Info API */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                            <h3 className="text-sm font-medium text-green-900 mb-1">API Modulaire</h3>
                            <p className="text-xs text-green-700">
                                Connexion via AuthApi.login() - Structure modulaire activée
                            </p>
                        </div>
                    </div>
                </div>

                {/* Formulaire de connexion */}
                <div className="bg-white rounded-2xl shadow-lg p-8">

                    {/* Erreur générale */}
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                                <span className="text-sm text-red-700">{errors.general}</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Adresse email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="votre.email@exemple.fr"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.password ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Votre mot de passe"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                                    Se souvenir de moi
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                            } text-white`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Connexion...
                                </div>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </div>

                    {/* Lien vers inscription */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Vous n'avez pas encore de compte ?{' '}
                            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                Créer un compte gratuit
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Section informative */}
                <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                        Accédez à votre espace personnel
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center">
                            <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Suivi personnalisé</h4>
                                <p className="text-sm text-gray-600">Consultez vos ressources favorites et votre progression</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                                <Heart className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Recommandations</h4>
                                <p className="text-sm text-gray-600">Recevez des contenus adaptés à vos centres d'intérêt</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                                <MessageCircle className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Participation</h4>
                                <p className="text-sm text-gray-600">Participez aux discussions et activités de groupe</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aide */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Besoin d'aide ? Consultez notre{' '}
                        <Link href="/help" className="text-blue-600 hover:text-blue-700">
                            centre d'aide
                        </Link>{' '}
                        ou{' '}
                        <Link href="/about" className="text-blue-600 hover:text-blue-700">
                            contactez-nous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}