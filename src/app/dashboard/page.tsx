'use client';

import React, { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp, Heart, Users, MessageCircle, BookOpen, Star, Clock, Target, Award, Activity, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardApi, type DashboardData, type RecentProgression } from '@/lib/api/dashboard';

export default function TableauBordPage(): JSX.Element {
    const router = useRouter();
    const { user, loading: authLoading, isAuthenticated } = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('30');
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Redirection si non authentifié
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    // Charger les données du dashboard
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchDashboardData();
        }
    }, [isAuthenticated, user]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await DashboardApi.getDashboard();
            setDashboardData(response.data);
        } catch (err) {
            console.error('Erreur lors du chargement du dashboard:', err);
            setError('Impossible de charger les données du tableau de bord');
        } finally {
            setLoading(false);
        }
    };

    // Affichage du loader pendant la vérification
    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Chargement de votre tableau de bord...</p>
                </div>
            </div>
        );
    }

    // Si pas authentifié, ne rien afficher (la redirection va se faire)
    if (!isAuthenticated || !user) {
        return null;
    }

    // Affichage d'erreur
    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                        <div>
                            <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
                            <p className="text-red-700 text-sm mt-1">{error}</p>
                            <button
                                onClick={fetchDashboardData}
                                className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                            >
                                Réessayer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!dashboardData) {
        return null;
    }

    // Extraction du prénom depuis le nom complet
    const firstName = user.name.split(' ')[0];

    const getCategoryColor = (category: string): string => {
        switch (category?.toLowerCase()) {
            case 'couple': return 'bg-pink-100 text-pink-800';
            case 'famille': return 'bg-green-100 text-green-800';
            case 'amitie': return 'bg-blue-100 text-blue-800';
            case 'travail': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category?.toLowerCase()) {
            case 'couple': return Heart;
            case 'famille': return Users;
            case 'amitie': return MessageCircle;
            case 'travail': return TrendingUp;
            default: return BookOpen;
        }
    };

    // Fonction pour déterminer l'heure de la journée
    const getTimeOfDay = (): string => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bonjour';
        if (hour < 18) return 'Bon après-midi';
        return 'Bonsoir';
    };

    // Calculer l'objectif mensuel (exemple : 30 ressources par mois)
    const monthlyGoal = 30;
    const progressTowardsGoal = Math.min((dashboardData.stats.completed / monthlyGoal) * 100, 100);

    // Calculer les jours consécutifs (simulé pour l'instant)
    const streak = 7; // À remplacer par une vraie logique

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header personnalisé */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {getTimeOfDay()}, {firstName} !
                </h1>
                <p className="text-gray-600">
                    Bienvenue sur votre tableau de bord. Voici un aperçu de votre parcours relationnel.
                </p>

                {/* Informations utilisateur */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-medium">
                                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-blue-900">{user.name}</p>
                            <p className="text-sm text-blue-700">{user.email}</p>
                        </div>
                    </div>
                </div>
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
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.total_progressions}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.formatted_time_spent}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.bookmarked}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{streak}</p>
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
                                <span className="text-sm text-gray-600">{dashboardData.stats.completed}/{monthlyGoal} ressources</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${progressTowardsGoal}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Plus que {Math.max(0, monthlyGoal - dashboardData.stats.completed)} ressources pour atteindre votre objectif !
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <Award className="h-5 w-5 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium text-blue-900">Ressources terminées</span>
                                </div>
                                <p className="text-lg font-bold text-blue-600">{dashboardData.stats.completed}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                                    <span className="text-sm font-medium text-green-900">En cours</span>
                                </div>
                                <p className="text-lg font-bold text-green-600">{dashboardData.stats.in_progress}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ressources récentes */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Vos ressources récentes</h2>
                            <Link href="/progressions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Voir tout →
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {dashboardData.recent_progressions.length > 0 ? (
                                dashboardData.recent_progressions.map((progression: RecentProgression) => {
                                    const CategoryIcon = getCategoryIcon(progression.resource.category?.name || '');
                                    return (
                                        <div key={progression.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <CategoryIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(progression.resource.category?.name || '')}`}>
                                                            {progression.resource.category?.name || 'Non catégorisé'}
                                                        </span>
                                                        <span className="text-xs text-gray-500 ml-2">{progression.time_spent_minutes} min</span>
                                                    </div>
                                                    <h3 className="font-medium text-gray-900 mb-1">{progression.resource.title}</h3>
                                                    <p className="text-xs text-gray-600">
                                                        Consulté le {new Date(progression.last_accessed_at).toLocaleDateString('fr-FR')}
                                                    </p>

                                                    {/* Barre de progression */}
                                                    <div className="mt-3">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs text-gray-600">Progression</span>
                                                            <span className="text-xs font-medium text-gray-900">{Math.round(progression.progress_percentage)}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${progression.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                                                                style={{ width: `${progression.progress_percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Note */}
                                                {progression.rating && (
                                                    <div className="ml-4 flex items-center">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={`star-${progression.id}-${i}`}
                                                                    className={`h-4 w-4 ${
                                                                        i < progression.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                    <p>Aucune ressource consultée récemment</p>
                                    <Link href="/resources" className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block">
                                        Découvrir des ressources →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Répartition par statut */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Répartition de vos progressions</h2>
                            <BarChart3 className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="space-y-3">
                            {dashboardData.by_status.map((item, index) => {
                                const statusLabels: Record<string, string> = {
                                    'completed': 'Terminées',
                                    'in_progress': 'En cours',
                                    'bookmarked': 'Favoris',
                                    'paused': 'En pause',
                                    'started': 'Démarrées'
                                };

                                const statusColors = [
                                    'bg-green-500',
                                    'bg-blue-500',
                                    'bg-purple-500',
                                    'bg-yellow-500',
                                    'bg-gray-500'
                                ];

                                const maxCount = Math.max(...dashboardData.by_status.map(s => s.count));
                                const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                                return (
                                    <div key={`status-${item.status}`} className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">{statusLabels[item.status] || item.status}</span>
                                        <div className="flex-1 mx-4">
                                            <div className="bg-gray-200 rounded-full h-3">
                                                <div
                                                    className={`h-3 rounded-full ${statusColors[index % statusColors.length]}`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 w-8">{item.count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar droite */}
                <div className="space-y-6">

                    {/* Recommandations personnalisées */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recommandations pour vous</h3>
                            <Link href="/resources" className="text-blue-600 hover:text-blue-700 text-sm">
                                Voir plus
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {dashboardData.recommendations && dashboardData.recommendations.length > 0 ? (
                                dashboardData.recommendations.map((item, index) => {
                                    const CategoryIcon = getCategoryIcon(item.category);
                                    return (
                                        <div key={`recommendation-${item.id || index}`} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start">
                                                <CategoryIcon className="h-4 w-4 mt-1 mr-3 text-gray-500" />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h4>
                                                    <p className="text-xs text-gray-600 mb-2">{item.type} • {item.duration}</p>
                                                    <p className="text-xs text-blue-600">{item.reason}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">
                                    Aucune recommandation disponible pour le moment
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Progression par catégorie */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Par catégorie</h3>
                            <Users className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="space-y-4">
                            {dashboardData.by_category.map(category => {
                                const CategoryIcon = getCategoryIcon(category.name);
                                return (
                                    <div key={`category-${category.name}`} className="border border-gray-200 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <CategoryIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                <span className="font-medium text-gray-900 text-sm">{category.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-600">{category.count} ressources</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${category.avg_progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Progression moyenne : {Math.round(category.avg_progress)}%
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions rapides personnalisées */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Vos actions rapides</h3>
                        <div className="space-y-3">
                            <Link href="/resources" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <BookOpen className="h-5 w-5 mr-3" />
                                <span className="text-sm font-medium">Explorer les ressources</span>
                            </Link>
                            <Link href="/progressions?status=bookmarked" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Star className="h-5 w-5 mr-3" />
                                <span className="text-sm font-medium">Mes favoris</span>
                            </Link>
                            <Link href="/profil" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Users className="h-5 w-5 mr-3" />
                                <span className="text-sm font-medium">Modifier mon profil</span>
                            </Link>
                            <Link href="/activity" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Activity className="h-5 w-5 mr-3" />
                                <span className="text-sm font-medium">Activités de groupe</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}