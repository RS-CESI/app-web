'use client';

import React, { useEffect, useState } from 'react';
import { User, Shield, Edit3, Save, X, Eye, Trash2 } from 'lucide-react';
import { profileApi, type User as UserType, type Stats, type UpdateProfileData } from '@/lib/api/profil';

export default function ProfilPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('informations');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserType | null>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const [tempUserData, setTempUserData] = useState<UpdateProfileData>({});

    // Fonction pour récupérer les données du profil
    const fetchProfileData = async () => {
        try {
            const data = await profileApi.getProfile();
            setUserData(data.user);
            setStats(data.stats);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleEdit = () => {
        if (userData) {
            setTempUserData({
                name: userData.name,
                email: userData.email
            });
        }
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await profileApi.updateProfile(tempUserData);
            setUserData(response.user);
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la mise à jour du profil');
        }
    };

    const handleCancel = () => {
        setTempUserData({});
        setIsEditing(false);
    };

    const handleDownloadData = async () => {
        try {
            await profileApi.downloadPersonalData();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors du téléchargement des données');
        }
    };

    const handleDeleteAccount = async () => {
        const password = prompt('Veuillez confirmer votre mot de passe pour supprimer votre compte :');
        if (!password) return;

        try {
            await profileApi.deleteAccount({ password });
            alert('Compte supprimé avec succès');
            // Rediriger vers la page de connexion
            window.location.href = '/login';
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression du compte');
        }
    };

    const tabs = [
        { id: 'informations', label: 'Informations personnelles', icon: User },
        { id: 'securite', label: 'Sécurité', icon: Shield },
        { id: 'confidentialite', label: 'Confidentialité', icon: Eye }
    ];

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="grid lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-gray-200 rounded-xl h-64 mb-6"></div>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="bg-gray-200 rounded-xl h-96"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <p className="text-gray-600">Erreur lors du chargement du profil</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon profil</h1>
                <p className="text-gray-600">Gérez vos informations personnelles et vos préférences</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    {/* Profil Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-xl font-semibold">
                                    {userData.initials}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
                            <p className="text-gray-600 text-sm">{userData.email}</p>
                            <div className="mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {userData.role === 'administrator' ? 'Administrateur' :
                                        userData.role === 'moderator' ? 'Modérateur' :
                                            userData.role === 'super-administrator' ? 'Super Admin' : 'Citoyen'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">
                                Membre depuis {new Date(userData.created_at).toLocaleDateString('fr-FR')}
                            </p>
                            {userData.is_verified && (
                                <p className="text-green-600 text-xs mt-1">✓ Email vérifié</p>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    {stats && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Statistiques</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Ressources créées</span>
                                    <span className="font-medium text-blue-600">{stats.resources.created}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Ressources publiées</span>
                                    <span className="font-medium text-green-600">{stats.resources.published}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Favoris</span>
                                    <span className="font-medium text-purple-600">{stats.favorites.count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Activités participées</span>
                                    <span className="font-medium text-yellow-600">{stats.activities.participated}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Commentaires</span>
                                    <span className="font-medium text-indigo-600">{stats.comments.count}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <nav className="space-y-1">
                            {tabs.map(tab => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        <IconComponent className="h-4 w-4 mr-3" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">

                        {/* Informations personnelles */}
                        {activeTab === 'informations' && (
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Informations personnelles</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            <Edit3 className="h-4 w-4 mr-2" />
                                            Modifier
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                <Save className="h-4 w-4 mr-2" />
                                                Sauvegarder
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Annuler
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            className={`w-full px-3 py-2 border rounded-lg ${
                                                isEditing ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                                            }`}
                                            value={isEditing ? tempUserData.name || '' : userData.name}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            disabled={!isEditing}
                                            className={`w-full px-3 py-2 border rounded-lg ${
                                                isEditing ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                                            }`}
                                            value={isEditing ? tempUserData.email || '' : userData.email}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg"
                                            value={userData.role === 'administrator' ? 'Administrateur' :
                                                userData.role === 'moderator' ? 'Modérateur' :
                                                    userData.role === 'super-administrator' ? 'Super Admin' : 'Citoyen'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date d'inscription</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg"
                                            value={new Date(userData.created_at).toLocaleDateString('fr-FR')}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sécurité */}
                        {activeTab === 'securite' && (
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sécurité du compte</h2>

                                <div className="space-y-6">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Mot de passe</h3>
                                                <p className="text-sm text-gray-600">Modifiez votre mot de passe</p>
                                            </div>
                                            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                                                Modifier
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Vérification email</h3>
                                                <p className="text-sm text-gray-600">
                                                    {userData?.is_verified ? 'Votre email est vérifié' : 'Votre email n\'est pas vérifié'}
                                                </p>
                                            </div>
                                            {!userData?.is_verified && (
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                    Vérifier
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Confidentialité */}
                        {activeTab === 'confidentialite' && (
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Confidentialité et données</h2>

                                <div className="space-y-6">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-medium text-gray-900 mb-2">Télécharger mes données</h3>
                                        <p className="text-sm text-gray-600 mb-3">Obtenez une copie de toutes vos données personnelles</p>
                                        <button
                                            onClick={handleDownloadData}
                                            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Télécharger
                                        </button>
                                    </div>

                                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                                        <h3 className="font-medium text-red-900 mb-2">Supprimer mon compte</h3>
                                        <p className="text-sm text-red-700 mb-3">Cette action est irréversible et supprimera toutes vos données</p>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Supprimer le compte
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}