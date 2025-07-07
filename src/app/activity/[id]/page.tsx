'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    User,
    BookOpen,
    Play,
    CheckCircle,
    XCircle,
    UserPlus,
    UserMinus,
    Settings,
    Share2,
    Copy,
    Lock,
    Globe,
    Loader2,
    Edit
} from 'lucide-react';
import { ActivitiesApi, ResourceActivity } from '@/lib/api/activities';

export default function ActivityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [activity, setActivity] = useState<ResourceActivity | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const activityId = params.id as string;

    useEffect(() => {
        if (activityId) {
            fetchActivity();
        }
    }, [activityId]);

    const fetchActivity = async () => {
        try {
            setLoading(true);
            const response = await ActivitiesApi.getActivity(Number(activityId));
            setActivity(response.data || response as unknown as ResourceActivity);
        } catch (err) {
            console.error('Erreur lors de la récupération de l\'activité:', err);
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async () => {
        if (!activity) return;
        try {
            setActionLoading('join');
            await ActivitiesApi.joinActivity(activity.id);
            await fetchActivity(); // Recharger l'activité
        } catch (err) {
            console.error('Erreur lors de l\'inscription:', err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleLeave = async () => {
        if (!activity) return;
        try {
            setActionLoading('leave');
            await ActivitiesApi.leaveActivity(activity.id);
            await fetchActivity(); // Recharger l'activité
        } catch (err) {
            console.error('Erreur lors du départ:', err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleAccept = async () => {
        if (!activity) return;
        try {
            setActionLoading('accept');
            await ActivitiesApi.acceptInvitation(activity.id);
            await fetchActivity(); // Recharger l'activité
        } catch (err) {
            console.error('Erreur lors de l\'acceptation:', err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDecline = async () => {
        if (!activity) return;
        try {
            setActionLoading('decline');
            await ActivitiesApi.declineInvitation(activity.id);
            await fetchActivity(); // Recharger l'activité
        } catch (err) {
            console.error('Erreur lors du refus:', err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleStart = async () => {
        if (!activity) return;
        try {
            setActionLoading('start');
            await ActivitiesApi.startActivity(activity.id);
            await fetchActivity(); // Recharger l'activité
        } catch (err) {
            console.error('Erreur lors du démarrage:', err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleComplete = async () => {
        if (!activity) return;
        try {
            setActionLoading('complete');
            await ActivitiesApi.completeActivity(activity.id);
            await fetchActivity(); // Recharger l'activité
        } catch (err) {
            console.error('Erreur lors de la finalisation:', err);
        } finally {
            setActionLoading(null);
        }
    };

    const copyAccessCode = () => {
        if (activity?.access_code) {
            navigator.clipboard.writeText(activity.access_code);
            // Ici vous pourriez ajouter une notification toast
        }
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'open': return 'bg-green-100 text-green-800 border-green-200';
            case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'open': return 'Ouvert aux inscriptions';
            case 'in_progress': return 'En cours';
            case 'completed': return 'Terminé';
            case 'cancelled': return 'Annulé';
            default: return status;
        }
    };

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'Non planifié';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (minutes?: number): string => {
        if (!minutes) return 'Non définie';
        if (minutes < 60) return `${minutes} minutes`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours} heures`;
    };

    const getParticipationStatus = (): {
        text: string;
        color: string;
        canJoin: boolean;
        canLeave: boolean;
        canAccept: boolean;
        canDecline: boolean;
    } => {
        if (!activity?.user_participation) {
            return {
                text: 'Non inscrit',
                color: 'text-gray-500',
                canJoin: activity?.can_join || false,
                canLeave: false,
                canAccept: false,
                canDecline: false
            };
        }

        const status = activity.user_participation.status;

        switch (status) {
            case 'invited':
                return {
                    text: 'Invité - En attente de réponse',
                    color: 'text-blue-600',
                    canJoin: false,
                    canLeave: false,
                    canAccept: true,
                    canDecline: true
                };
            case 'accepted':
                return {
                    text: 'Inscrit',
                    color: 'text-green-600',
                    canJoin: false,
                    canLeave: true,
                    canAccept: false,
                    canDecline: false
                };
            case 'participating':
                return {
                    text: 'Participant actuel',
                    color: 'text-green-600',
                    canJoin: false,
                    canLeave: true,
                    canAccept: false,
                    canDecline: false
                };
            case 'completed':
                return {
                    text: 'Activité terminée',
                    color: 'text-gray-600',
                    canJoin: false,
                    canLeave: false,
                    canAccept: false,
                    canDecline: false
                };
            case 'declined':
                return {
                    text: 'Invitation déclinée',
                    color: 'text-red-600',
                    canJoin: activity?.can_join || false,
                    canLeave: false,
                    canAccept: false,
                    canDecline: false
                };
            default:
                return {
                    text: 'Statut inconnu',
                    color: 'text-gray-500',
                    canJoin: false,
                    canLeave: false,
                    canAccept: false,
                    canDecline: false
                };
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Chargement de l'activité...</span>
                </div>
            </div>
        );
    }

    if (error || !activity) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-red-800 mb-2">
                        Activité introuvable
                    </h3>
                    <p className="text-red-700 mb-4">
                        {error || 'Cette activité n\'existe pas ou vous n\'avez pas accès.'}
                    </p>
                    <button
                        onClick={() => router.back()}
                        className="bg-red-100 px-4 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    const participationStatus = getParticipationStatus();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Navigation */}
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Retour aux activités
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Contenu principal */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(activity.status)}`}>
                                            {getStatusLabel(activity.status)}
                                        </span>
                                        <div className="flex items-center text-gray-500">
                                            {activity.is_private ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                                            <span className="ml-1 text-sm">
                                                {activity.is_private ? 'Activité privée' : 'Activité publique'}
                                            </span>
                                        </div>
                                    </div>

                                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                                        {activity.title}
                                    </h1>

                                    <p className="text-gray-700 leading-relaxed">
                                        {activity.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        <Share2 className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Informations principales */}
                        <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Date et heure</p>
                                            <p className="font-medium">{formatDate(activity.scheduled_at)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Durée estimée</p>
                                            <p className="font-medium">{formatDuration(activity.estimated_duration_minutes)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Participants</p>
                                            <p className="font-medium">{activity.participant_count} / {activity.max_participants}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <User className="h-5 w-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Organisateur</p>
                                            <p className="font-medium">{activity.creator?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Code d'accès pour activités privées */}
                            {activity.is_private && activity.access_code && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Code d'accès</p>
                                            <p className="text-lg font-mono font-bold text-blue-600">{activity.access_code}</p>
                                        </div>
                                        <button
                                            onClick={copyAccessCode}
                                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                            title="Copier le code"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Ressource associée */}
                            {activity.resource && (
                                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Basé sur la ressource</p>
                                                <p className="font-medium text-gray-900">{activity.resource.title}</p>
                                                {activity.resource.category && (
                                                    <p className="text-sm text-gray-500">{activity.resource.category.name}</p>
                                                )}
                                            </div>
                                        </div>
                                        <Link href={`/resources/${activity.resource.id}`}>
                                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Voir la ressource
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Instructions */}
                            {activity.instructions && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {activity.instructions}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Statut de participation */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Votre participation</h3>

                        <div className="mb-4">
                            <span className={`font-medium ${participationStatus.color}`}>
                                {participationStatus.text}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            {participationStatus.canJoin && (
                                <button
                                    onClick={handleJoin}
                                    disabled={actionLoading === 'join'}
                                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    {actionLoading === 'join' ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Rejoindre l'activité
                                        </>
                                    )}
                                </button>
                            )}

                            {participationStatus.canAccept && (
                                <button
                                    onClick={handleAccept}
                                    disabled={actionLoading === 'accept'}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    {actionLoading === 'accept' ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Accepter l'invitation
                                        </>
                                    )}
                                </button>
                            )}

                            {participationStatus.canDecline && (
                                <button
                                    onClick={handleDecline}
                                    disabled={actionLoading === 'decline'}
                                    className="w-full border border-red-300 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    {actionLoading === 'decline' ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Décliner l'invitation
                                        </>
                                    )}
                                </button>
                            )}

                            {participationStatus.canLeave && (
                                <button
                                    onClick={handleLeave}
                                    disabled={actionLoading === 'leave'}
                                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    {actionLoading === 'leave' ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <UserMinus className="h-4 w-4 mr-2" />
                                            Quitter l'activité
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Actions pour l'organisateur */}
                    {activity.creator && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Actions organisateur</h3>

                            <div className="space-y-2">
                                {activity.status === 'open' && (
                                    <button
                                        onClick={handleStart}
                                        disabled={actionLoading === 'start'}
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {actionLoading === 'start' ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Play className="h-4 w-4 mr-2" />
                                                Démarrer l'activité
                                            </>
                                        )}
                                    </button>
                                )}

                                {activity.status === 'in_progress' && (
                                    <button
                                        onClick={handleComplete}
                                        disabled={actionLoading === 'complete'}
                                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {actionLoading === 'complete' ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Terminer l'activité
                                            </>
                                        )}
                                    </button>
                                )}

                                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Gérer l'activité
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Participants */}
                    {activity.participants && activity.participants.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                Participants ({activity.participants.length})
                            </h3>

                            <div className="space-y-3">
                                {activity.participants.slice(0, 5).map((participant, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                                <User className="h-4 w-4 text-gray-600" />
                                            </div>
                                            <span className="text-sm font-medium">{participant.user?.name || 'Utilisateur'}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            participant.status === 'participating' ? 'bg-green-100 text-green-800' :
                                                participant.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                                    participant.status === 'invited' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                        }`}>
                                            {participant.status}
                                        </span>
                                    </div>
                                ))}

                                {activity.participants.length > 5 && (
                                    <p className="text-sm text-gray-500 text-center">
                                        +{activity.participants.length - 5} autres participants
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}