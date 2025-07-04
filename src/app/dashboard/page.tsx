'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, TrendingUp, Heart, Users, MessageCircle, BookOpen, Star, Clock, Calendar, Target, Award, Activity } from 'lucide-react';

export default function TableauBordPage() {
    const [selectedPeriod, setSelectedPeriod] = React.useState('30');

    // Données utilisateur
    const userStats = {
        ressourcesConsultees: 24,
        tempsTotal: 8.5, // heures
        favoris: 8,
        activitesParticipees: 3,
        progression: 65, // pourcentage
        objectifMensuel: 30,
        streak: 7 // jours consécutifs
    };

    // Ressources récentes
    const ressourcesRecentes = [
        {
            id: 1,
            title: "Communication bienveillante en couple",
            type: "Guide",
            duree: "15 min",
            dateConsultation: "2025-01-03",
            progression: 100,
            note: 5,
            category: "couple"
        },
        {
            id: 2,
            title: "Exercice d'écoute active",
            type: "Exercice",
            duree: "20 min",
            dateConsultation: "2025-01-02",
            progression: 75,
            note: null,
            category: "famille"
        },
        {
            id: 3,
            title: "Gérer les conflits au travail",
            type: "Article",
            duree: "12 min",
            dateConsultation: "2025-01-01",
            progression: 100,
            note: 4,
            category: "travail"
        }
    ];

    // Recommandations
    const recommandations = [
        {
            id: 1,
            title: "Renforcer les liens familiaux",
            type: "Guide pratique",
            duree: "18 min",
            category: "famille",
            raison: "Basé sur vos centres d'intérêt"
        },
        {
            id: 2,
            title: "Activité : Cercle de parole",
            type: "Activité de groupe",
            duree: "60 min",
            category: "amitie",
            raison: "Nouvelle activité disponible"
        },
        {
            id: 3,
            title: "Les 5 langages de l'amour",
            type: "Article",
            duree: "25 min",
            category: "couple",
            raison: "Populaire cette semaine"
        }
    ];

    // Activités à venir
    const activitesAVenir = [
        {
            id: 1,
            title: "Atelier communication en famille",
            date: "2025-01-10",
            heure: "19:00",
            participants: 12,
            maxParticipants: 15
        },
        {
            id: 2,
            title: "Cercle de parole : relations amicales",
            date: "2025-01-15",
            heure: "20:30",
            participants: 8,
            maxParticipants: 10
        }
    ];

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'couple': return 'bg-pink-100 text-pink-800';
            case 'famille': return 'bg-green-100 text-green-800';
            case 'amitie': return 'bg-blue-100 text-blue-800';
            case 'travail': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'couple': return Heart;
            case 'famille': return Users;
            case 'amitie': return MessageCircle;
            case 'travail': return TrendingUp;
            default: return BookOpen;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
                <p className="text-gray-600">Suivez votre progression et découvrez de nouvelles ressources</p>
            </div>

            {/* Période de filtrage */}
            <div className="mb-6">
                <div className="flex gap-2">
                    {[
                        { value: '7', label: '7 jours' },
                        { value: '30', label: '30 jours' },
                        { value: '90', label: '3 mois' }
                    ].map(period => (
                        <button
                            key={period.value}
                            onClick={() => setSelectedPeriod(period.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedPeriod === period.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Statistiques principales */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{userStats.ressourcesConsultees}</p>
                            <p className="text-sm text-gray-600">Ressources consultées</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                            <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{userStats.tempsTotal}h</p>
                            <p className="text-sm text-gray-600">Temps d'apprentissage</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                            <Star className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{userStats.favoris}</p>
                            <p className="text-sm text-gray-600">Favoris</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-orange-100 p-3 rounded-xl mr-4">
                            <Activity className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{userStats.streak}</p>
                            <p className="text-sm text-gray-600">Jours consécutifs</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Colonne principale */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Progression */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Ma progression</h2>
                            <Target className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Objectif mensuel</span>
                                <span className="text-sm text-gray-600">{userStats.ressourcesConsultees}/{userStats.objectifMensuel} ressources</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(userStats.ressourcesConsultees / userStats.objectifMensuel) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Plus que {userStats.objectifMensuel - userStats.ressourcesConsultees} ressources pour atteindre votre objectif !
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <Award className="h-5 w-5 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium text-blue-900">Niveau actuel</span>
                                </div>
                                <p className="text-lg font-bold text-blue-600">Apprenti relationnel</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                                    <span className="text-sm font-medium text-green-900">Prochaine étape</span>
                                </div>
                                <p className="text-lg font-bold text-green-600">Expert relationnel</p>
                            </div>
                        </div>
                    </div>

                    {/* Ressources récentes */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Ressources récentes</h2>
                            <Link href="/my-resources" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Voir tout →
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {ressourcesRecentes.map(ressource => {
                                const CategoryIcon = getCategoryIcon(ressource.category);
                                return (
                                    <div key={ressource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <CategoryIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(ressource.category)}`}>
                            {ressource.type}
                          </span>
                                                    <span className="text-xs text-gray-500 ml-2">{ressource.duree}</span>
                                                </div>
                                                <h3 className="font-medium text-gray-900 mb-1">{ressource.title}</h3>
                                                <p className="text-xs text-gray-600">
                                                    Consulté le {new Date(ressource.dateConsultation).toLocaleDateString('fr-FR')}
                                                </p>

                                                {/* Barre de progression */}
                                                <div className="mt-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs text-gray-600">Progression</span>
                                                        <span className="text-xs font-medium text-gray-900">{ressource.progression}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${ressource.progression === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                            style={{ width: `${ressource.progression}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Note */}
                                            {ressource.note && (
                                                <div className="ml-4 flex items-center">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i < ressource.note ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Graphique d'activité */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Activité des 7 derniers jours</h2>
                            <BarChart3 className="h-5 w-5 text-gray-400" />
                        </div>

                        {/* Graphique simple avec barres CSS */}
                        <div className="space-y-3">
                            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((jour, index) => {
                                const valeur = [3, 1, 4, 2, 5, 0, 2][index]; // Données simulées
                                return (
                                    <div key={jour} className="flex items-center">
                                        <span className="text-sm text-gray-600 w-8">{jour}</span>
                                        <div className="flex-1 mx-4">
                                            <div className="bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                                                    style={{ width: `${(valeur / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 w-8">{valeur}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar droite */}
                <div className="space-y-6">

                    {/* Recommandations */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recommandations</h3>
                            <Link href="/resources" className="text-blue-600 hover:text-blue-700 text-sm">
                                Voir plus
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recommandations.map(item => {
                                const CategoryIcon = getCategoryIcon(item.category);
                                return (
                                    <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                        <div className="flex items-start">
                                            <CategoryIcon className="h-4 w-4 mt-1 mr-3 text-gray-500" />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h4>
                                                <p className="text-xs text-gray-600 mb-2">{item.type} • {item.duree}</p>
                                                <p className="text-xs text-blue-600">{item.raison}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Activités à venir */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Activités à venir</h3>
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="space-y-4">
                            {activitesAVenir.map(activite => (
                                <div key={activite.id} className="border border-gray-200 rounded-lg p-3">
                                    <h4 className="font-medium text-gray-900 text-sm mb-2">{activite.title}</h4>
                                    <div className="text-xs text-gray-600 space-y-1">
                                        <p>📅 {new Date(activite.date).toLocaleDateString('fr-FR')} à {activite.heure}</p>
                                        <p>👥 {activite.participants}/{activite.maxParticipants} participants</p>
                                    </div>
                                    <button className="mt-2 w-full bg-blue-50 text-blue-700 text-xs font-medium py-2 rounded-lg hover:bg-blue-100 transition-colors">
                                        Rejoindre l'activité
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Link href="/resources?type=activites" className="block mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir toutes les activités →
                        </Link>
                    </div>

                    {/* Actions rapides */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
                        <div className="space-y-3">
                            <Link href="/resources" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <BookOpen className="h-5 w-5 mr-3" />
                                <span className="text-sm font-medium">Explorer les ressources</span>
                            </Link>
                            <Link href="/my-resources" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Star className="h-5 w-5 mr-3" />
                                <span className="text-sm font-medium">Mes favoris</span>
                            </Link>
                            <Link href="/profil" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Users className="h-5 w-5 mr-3" />
                                <span className="text-sm font-medium">Mon profil</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}