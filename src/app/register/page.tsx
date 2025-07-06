'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Calendar, MapPin, Heart, Users, MessageCircle, TrendingUp } from 'lucide-react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        prenom: '',
        nom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        password: '',
        confirmPassword: '',
        interets: [],
        accepteConditions: false,
        accepteNewsletter: false
    });

    const interetsOptions = [
        { id: 'couple', label: 'Relations amoureuses', icon: Heart },
        { id: 'famille', label: 'Relations familiales', icon: Users },
        { id: 'amitie', label: 'Relations amicales', icon: MessageCircle },
        { id: 'travail', label: 'Relations professionnelles', icon: TrendingUp }
    ];

    const handleInteretChange = (interetId: string) => {
        setFormData(prev => ({
            ...prev,
            interets: prev.interets.includes(interetId)
                ? prev.interets.filter(id => id !== interetId)
                : [...prev.interets, interetId]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique d'inscription ici
        console.log('Données d\'inscription:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Rejoignez (RE)Sources Relationnelles
                    </h1>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Créez votre compte gratuit et accédez à toutes nos ressources pour améliorer vos relations.
                    </p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Informations personnelles */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                                        Prénom *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            id="prenom"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Votre prénom"
                                            value={formData.prenom}
                                            onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            id="nom"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Votre nom"
                                            value={formData.nom}
                                            onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Adresse email *
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="votre.email@exemple.fr"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 mb-2">
                                        Date de naissance
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="date"
                                            id="dateNaissance"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.dateNaissance}
                                            onChange={(e) => setFormData(prev => ({ ...prev, dateNaissance: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">
                                        Ville
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            id="ville"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Votre ville"
                                            value={formData.ville}
                                            onChange={(e) => setFormData(prev => ({ ...prev, ville: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            required
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Votre mot de passe"
                                            value={formData.password}
                                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmer le mot de passe *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            required
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Confirmer le mot de passe"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <p className="text-xs text-gray-500">
                                    Le mot de passe doit contenir au moins 8 caractères avec des lettres et des chiffres.
                                </p>
                            </div>
                        </div>

                        {/* Centres d'intérêt */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Centres d'intérêt</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Sélectionnez les domaines qui vous intéressent pour personnaliser votre expérience.
                            </p>

                            <div className="grid md:grid-cols-2 gap-3">
                                {interetsOptions.map(option => {
                                    const IconComponent = option.icon;
                                    return (
                                        <label
                                            key={option.id}
                                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                formData.interets.includes(option.id)
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={formData.interets.includes(option.id)}
                                                onChange={() => handleInteretChange(option.id)}
                                            />
                                            <IconComponent className={`h-5 w-5 mr-3 ${
                                                formData.interets.includes(option.id) ? 'text-blue-600' : 'text-gray-400'
                                            }`} />
                                            <span className={`text-sm font-medium ${
                                                formData.interets.includes(option.id) ? 'text-blue-900' : 'text-gray-700'
                                            }`}>
                        {option.label}
                      </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Conditions */}
                        <div className="space-y-4">
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    checked={formData.accepteConditions}
                                    onChange={(e) => setFormData(prev => ({ ...prev, accepteConditions: e.target.checked }))}
                                />
                                <span className="text-sm text-gray-700">
                  J'accepte les{' '}
                                    <Link href="/conditions" className="text-blue-600 hover:text-blue-700 underline">
                    conditions d'utilisation
                  </Link>{' '}
                                    et la{' '}
                                    <Link href="/confidentiality" className="text-blue-600 hover:text-blue-700 underline">
                    politique de confidentialité
                  </Link>
                  . *
                </span>
                            </label>

                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    checked={formData.accepteNewsletter}
                                    onChange={(e) => setFormData(prev => ({ ...prev, accepteNewsletter: e.target.checked }))}
                                />
                                <span className="text-sm text-gray-700">
                  Je souhaite recevoir la newsletter avec les dernières ressources et conseils relationnels.
                </span>
                            </label>
                        </div>

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                        >
                            Créer mon compte
                        </button>
                    </form>

                    {/* Lien vers connexion */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Vous avez déjà un compte ?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Avantages */}
                <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                        Pourquoi créer un compte ?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">Suivi personnalisé</h4>
                            <p className="text-sm text-gray-600">Suivez votre progression et vos ressources favorites</p>
                        </div>
                        <div>
                            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <Heart className="h-6 w-6 text-green-600" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">Contenus adaptés</h4>
                            <p className="text-sm text-gray-600">Recevez des recommandations selon vos intérêts</p>
                        </div>
                        <div>
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <MessageCircle className="h-6 w-6 text-purple-600" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">Communauté</h4>
                            <p className="text-sm text-gray-600">Participez aux discussions et activités de groupe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}