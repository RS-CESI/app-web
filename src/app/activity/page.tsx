'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Users,
    Calendar,
    Clock,
    Plus,
    Eye,
    UserPlus,
    Play,
    CheckCircle,
    XCircle,
    Lock,
    Globe,
    Loader2, BookOpen, User
} from 'lucide-react';
import { ActivitiesApi, ResourceActivity, ActivityQueryParams } from '@/lib/api/activities';

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<ResourceActivity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalActivities, setTotalActivities] = useState<number>(0);

    // Filtres
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [upcomingOnly, setUpcomingOnly] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchActivities();
    }, [currentPage, statusFilter, categoryFilter, upcomingOnly]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setCurrentPage(1);
            fetchActivities();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const params: ActivityQueryParams = {
                page: currentPage,
                limit: 12
            };

            if (statusFilter !== 'all') {
                params.status = statusFilter as any;
            }
            if (categoryFilter !== 'all') {
                params.category_id = categoryFilter;
            }
            if (upcomingOnly) {
                params.upcoming = true;
            }

            const response = await ActivitiesApi.getActivities(params);
            const activitiesData = response.data;

            setActivities(activitiesData.data || []);
            setTotalPages(activitiesData.last_page || 1);
            setTotalActivities(activitiesData.total || 0);
            setCurrentPage(activitiesData.current_page || 1);
        } catch (err) {
            console.error('Erreur lors de la récupération des activités:', err);
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'open': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'open': return 'Ouvert';
            case 'in_progress': return 'En cours';
            case 'completed': return 'Terminé';
            case 'cancelled': return 'Annulé';
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'open': return UserPlus;
            case 'in_progress': return Play;
            case 'completed': return CheckCircle;
            case 'cancelled': return XCircle;
            default: return Eye;
        }
    };

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'Non planifié';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (minutes?: number): string => {
        if (!minutes) return 'Non définie';
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    };

    const getParticipationStatus = (activity: ResourceActivity): { text: string; color: string } => {
        if (!activity.user_participation) {
            return { text: 'Non inscrit', color: 'text-gray-500' };
        }

        switch (activity.user_participation.status) {
            case 'invited':
                return { text: 'Invité', color: 'text-blue-600' };
            case 'accepted':
                return { text: 'Inscrit', color: 'text-green-600' };
            case 'participating':
                return { text: 'Participant', color: 'text-green-600' };
            case 'completed':
                return { text: 'Terminé', color: 'text-gray-600' };
            case 'declined':
                return { text: 'Décliné', color: 'text-red-600' };
            default:
                return { text: 'Inconnu', color: 'text-gray-500' };
        }
    };

    const handleJoinActivity = async (activityId: number) => {
        try {
            await ActivitiesApi.joinActivity(activityId);
            fetchActivities(); // Recharger la liste
        } catch (err) {
            console.error('Erreur lors de l\'inscription:', err);
        }
    };

    const handleAcceptInvitation = async (activityId: number) => {
        try {
            await ActivitiesApi.acceptInvitation(activityId);
            fetchActivities(); // Recharger la liste
        } catch (err) {
            console.error('Erreur lors de l\'acceptation:', err);
        }
    };

    const filteredActivities = activities.filter(activity =>
        searchTerm === '' ||
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && activities.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Chargement des activités...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Activités de groupe
                    </h1>
                    <p className="text-gray-600">
                        Participez à des activités interactives pour améliorer vos relations
                    </p>
                </div>
                <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Créer une activité
                </button>
            </div>

            {/* Filtres */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Recherche */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une activité..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Filtre statut */}
                    <div className="lg:w-48">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="open">Ouvert</option>
                            <option value="in_progress">En cours</option>
                            <option value="completed">Terminé</option>
                        </select>
                    </div>

                    {/* Filtre à venir */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="upcoming"
                            checked={upcomingOnly}
                            onChange={(e) => setUpcomingOnly(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="upcoming" className="ml-2 text-sm text-gray-700">
                            Uniquement à venir
                        </label>
                    </div>
                </div>
            </div>

            {/* Statistiques */}
            <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                    {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''}
                    {totalActivities > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                            (sur {totalActivities} au total)
                        </span>
                    )}
                </p>

                {totalPages > 1 && (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Page {currentPage} sur {totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                Précédent
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Liste des activités */}
            {loading && (
                <div className="mb-6 flex items-center text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Chargement...
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => {
                    const StatusIcon = getStatusIcon(activity.status);
                    const participationStatus = getParticipationStatus(activity);

                    return (
                        <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            {/* Header avec statut */}
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                                        {getStatusLabel(activity.status)}
                                    </span>
                                    <div className="flex items-center text-gray-500">
                                        {activity.is_private ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                                        <span className="ml-1 text-xs">
                                            {activity.is_private ? 'Privé' : 'Public'}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {activity.title}
                                </h3>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {activity.description}
                                </p>
                            </div>

                            {/* Contenu */}
                            <div className="p-4">
                                {/* Ressource associée */}
                                {activity.resource && (
                                    <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            <span>Basé sur: {activity.resource.title}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Informations */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>{formatDate(activity.scheduled_at)}</span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span>{formatDuration(activity.estimated_duration_minutes)}</span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>{activity.participant_count}/{activity.max_participants} participants</span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <User className="h-4 w-4 mr-2" />
                                        <span>Par {activity.creator?.name}</span>
                                    </div>
                                </div>

                                {/* Statut de participation */}
                                <div className="mb-4">
                                    <span className={`text-sm font-medium ${participationStatus.color}`}>
                                        {participationStatus.text}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link href={`/activity/${activity.id}`} className="flex-1">
                                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                            Voir détails
                                        </button>
                                    </Link>

                                    {activity.status === 'open' && activity.can_join && !activity.user_participation && (
                                        <button
                                            onClick={() => handleJoinActivity(activity.id)}
                                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                        >
                                            Rejoindre
                                        </button>
                                    )}

                                    {activity.user_participation?.status === 'invited' && (
                                        <button
                                            onClick={() => handleAcceptInvitation(activity.id)}
                                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                        >
                                            Accepter
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* État vide */}
            {!loading && filteredActivities.length === 0 && (
                <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune activité trouvée</h3>
                    <p className="text-gray-500 mb-4">Essayez de modifier vos filtres ou créez une nouvelle activité.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Créer une activité
                    </button>
                </div>
            )}

            {/* Erreur */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Erreur de chargement
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => {
                                        setError(null);
                                        fetchActivities();
                                    }}
                                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                                >
                                    Réessayer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}