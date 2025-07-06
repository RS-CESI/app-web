'use client';

import React from 'react';
import { User, Heart, Users, MessageCircle, TrendingUp, Shield, Bell, Edit3, Save, X, Eye, Trash2 } from 'lucide-react';

export default function ProfilPage() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('informations');
    const [userData, setUserData] = React.useState({
        prenom: 'Marie',
        nom: 'Dubois',
        email: 'marie.dubois@email.fr',
        dateNaissance: '1982-03-15',
        ville: 'Lyon',
        dateInscription: '2024-11-15',
        interets: ['famille', 'couple'],
        bio: 'Mère de deux enfants, je souhaite améliorer la communication au sein de ma famille et renforcer les liens avec mes proches.',
        notifications: {
            email: true,
            nouveautés: true,
            recommandations: false
        }
    });

    const [tempUserData, setTempUserData] = React.useState(userData);

    const interetsOptions = [
        { id: 'couple', label: 'Relations amoureuses', icon: Heart, color: 'pink' },
        { id: 'famille', label: 'Relations familiales', icon: Users, color: 'green' },
        { id: 'amitie', label: 'Relations amicales', icon: MessageCircle, color: 'blue' },
        { id: 'travail', label: 'Relations professionnelles', icon: TrendingUp, color: 'yellow' }
    ];

    const stats = {
        ressourcesConsultees: 24,
        favoris: 8,
        activitesParticipees: 3,
        joursConnecte: 45
    };

    const handleEdit = () => {
        setTempUserData(userData);
        setIsEditing(true);
    };

    const handleSave = () => {
        setUserData(tempUserData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempUserData(userData);
        setIsEditing(false);
    };

    const handleInteretToggle = (interetId: string) => {
        setTempUserData(prev => ({
            ...prev,
            interets: prev.interets.includes(interetId)
                ? prev.interets.filter(id => id !== interetId)
                : [...prev.interets, interetId]
        }));
    };

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'pink': return 'bg-pink-100 text-pink-800 border-pink-200';
            case 'green': return 'bg-green-100 text-green-800 border-green-200';
            case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const tabs = [
        { id: 'informations', label: 'Informations personnelles', icon: User },
        { id: 'securite', label: 'Sécurité', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'confidentialite', label: 'Confidentialité', icon: Eye }
    ];

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
                                <User className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{userData.prenom} {userData.nom}</h3>
                            <p className="text-gray-600 text-sm">{userData.email}</p>
                            <p className="text-gray-500 text-xs mt-1">
                                Membre depuis {new Date(userData.dateInscription).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Statistiques</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Ressources consultées</span>
                                <span className="font-medium text-blue-600">{stats.ressourcesConsultees}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Favoris</span>
                                <span className="font-medium text-green-600">{stats.favoris}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Activités participées</span>
                                <span className="font-medium text-purple-600">{stats.activitesParticipees}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Jours connecté</span>
                                <span className="font-medium text-yellow-600">{stats.joursConnecte}</span>
                            </div>
                        </div>
                    </div>

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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            className={`w-full px-3 py-2 border rounded-lg ${
                                                isEditing ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                                            }`}
                                            value={isEditing ? tempUserData.prenom : userData.prenom}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, prenom: e.target.value }))}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            className={`w-full px-3 py-2 border rounded-lg ${
                                                isEditing ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                                            }`}
                                            value={isEditing ? tempUserData.nom : userData.nom}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, nom: e.target.value }))}
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
                                            value={isEditing ? tempUserData.email : userData.email}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                                        <input
                                            type="date"
                                            disabled={!isEditing}
                                            className={`w-full px-3 py-2 border rounded-lg ${
                                                isEditing ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                                            }`}
                                            value={isEditing ? tempUserData.dateNaissance : userData.dateNaissance}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, dateNaissance: e.target.value }))}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            className={`w-full px-3 py-2 border rounded-lg ${
                                                isEditing ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                                            }`}
                                            value={isEditing ? tempUserData.ville : userData.ville}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, ville: e.target.value }))}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Présentation (optionnel)</label>
                                        <textarea
                                            rows={3}
                                            disabled={!isEditing}
                                            className={`w-full px-3 py-2 border rounded-lg ${
                                                isEditing ? 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                                            }`}
                                            placeholder="Parlez un peu de vous et de vos objectifs relationnels..."
                                            value={isEditing ? tempUserData.bio : userData.bio}
                                            onChange={(e) => setTempUserData(prev => ({ ...prev, bio: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                {/* Centres d'intérêt */}
                                <div className="mt-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">Centres d'intérêt</label>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {interetsOptions.map(option => {
                                            const IconComponent = option.icon;
                                            const isSelected = (isEditing ? tempUserData.interets : userData.interets).includes(option.id);
                                            return (
                                                <div
                                                    key={option.id}
                                                    onClick={isEditing ? () => handleInteretToggle(option.id) : undefined}
                                                    className={`flex items-center p-3 border-2 rounded-lg transition-all ${
                                                        isSelected
                                                            ? `border-${option.color}-500 bg-${option.color}-50`
                                                            : 'border-gray-200 bg-white'
                                                    } ${isEditing ? 'cursor-pointer hover:border-gray-300' : 'cursor-default'}`}
                                                >
                                                    <IconComponent className={`h-5 w-5 mr-3 ${
                                                        isSelected ? `text-${option.color}-600` : 'text-gray-400'
                                                    }`} />
                                                    <span className={`text-sm font-medium ${
                                                        isSelected ? `text-${option.color}-900` : 'text-gray-700'
                                                    }`}>
                            {option.label}
                          </span>
                                                </div>
                                            );
                                        })}
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
                                                <p className="text-sm text-gray-600">Dernière modification il y a 2 mois</p>
                                            </div>
                                            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                                                Modifier
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Authentification à deux facteurs</h3>
                                                <p className="text-sm text-gray-600">Sécurisez votre compte avec une double vérification</p>
                                            </div>
                                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                                Activer
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Sessions actives</h3>
                                                <p className="text-sm text-gray-600">Gérez les appareils connectés à votre compte</p>
                                            </div>
                                            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                                                Voir tout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeTab === 'notifications' && (
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de notification</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Notifications par email</h3>
                                            <p className="text-sm text-gray-600">Recevez les notifications importantes par email</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={userData.notifications.email}
                                            onChange={(e) => setUserData(prev => ({
                                                ...prev,
                                                notifications: { ...prev.notifications, email: e.target.checked }
                                            }))}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Nouvelles ressources</h3>
                                            <p className="text-sm text-gray-600">Être informé des nouvelles ressources ajoutées</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={userData.notifications.nouveautés}
                                            onChange={(e) => setUserData(prev => ({
                                                ...prev,
                                                notifications: { ...prev.notifications, nouveautés: e.target.checked }
                                            }))}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Recommandations personnalisées</h3>
                                            <p className="text-sm text-gray-600">Recevez des suggestions basées sur vos intérêts</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={userData.notifications.recommandations}
                                            onChange={(e) => setUserData(prev => ({
                                                ...prev,
                                                notifications: { ...prev.notifications, recommandations: e.target.checked }
                                            }))}
                                        />
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
                                        <h3 className="font-medium text-gray-900 mb-2">Visibilité du profil</h3>
                                        <p className="text-sm text-gray-600 mb-3">Contrôlez qui peut voir vos informations</p>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Privé (uniquement moi)</option>
                                            <option>Participants aux activités</option>
                                            <option>Tous les utilisateurs</option>
                                        </select>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-medium text-gray-900 mb-2">Télécharger mes données</h3>
                                        <p className="text-sm text-gray-600 mb-3">Obtenez une copie de toutes vos données personnelles</p>
                                        <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                                            Télécharger
                                        </button>
                                    </div>

                                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                                        <h3 className="font-medium text-red-900 mb-2">Supprimer mon compte</h3>
                                        <p className="text-sm text-red-700 mb-3">Cette action est irréversible et supprimera toutes vos données</p>
                                        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
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