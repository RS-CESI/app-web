'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    BookOpen,
    Users,
    Heart,
    MessageCircle,
    TrendingUp,
    Star,
    Clock,
    Eye,
    Download,
    Calendar,
    User,
    Tag,
    Loader2,
    ExternalLink
} from 'lucide-react';
import { ResourcesApi, Resource } from '@/lib/api/resources';

export default function ResourceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [resource, setResource] = useState<Resource | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const resourceId = params.id as string;

    useEffect(() => {
        if (resourceId) {
            fetchResource();
        }
    }, [resourceId]);

    const fetchResource = async () => {
        try {
            setLoading(true);
            const response = await ResourcesApi.getPublicResource(Number(resourceId));
            setResource(response.data || response as unknown as Resource);
        } catch (err) {
            console.error('Erreur lors de la récupération de la ressource:', err);
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty?: string): string => {
        switch (difficulty?.toLowerCase()) {
            case 'beginner':
            case 'débutant':
                return 'bg-green-100 text-green-800';
            case 'intermediate':
            case 'intermédiaire':
                return 'bg-yellow-100 text-yellow-800';
            case 'advanced':
            case 'avancé':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getDifficultyLabel = (difficulty?: string): string => {
        switch (difficulty?.toLowerCase()) {
            case 'beginner': return 'Débutant';
            case 'intermediate': return 'Intermédiaire';
            case 'advanced': return 'Avancé';
            default: return difficulty || 'Non spécifié';
        }
    };

    const formatDuration = (minutes?: number): string => {
        if (!minutes) return 'Non spécifié';
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    };

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'Non spécifié';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCategoryIcon = (categoryName?: string) => {
        const name = categoryName?.toLowerCase();
        if (name?.includes('couple') || name?.includes('amour')) return Heart;
        if (name?.includes('famille') || name?.includes('family')) return Users;
        if (name?.includes('amitié') || name?.includes('ami')) return MessageCircle;
        if (name?.includes('travail') || name?.includes('professionnel')) return TrendingUp;
        return BookOpen;
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Chargement de la ressource...</span>
                </div>
            </div>
        );
    }

    if (error || !resource) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-red-800 mb-2">
                        Ressource introuvable
                    </h3>
                    <p className="text-red-700 mb-4">
                        {error || 'Cette ressource n\'existe pas ou n\'est plus disponible.'}
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

    const CategoryIcon = getCategoryIcon(resource.category?.name);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Navigation */}
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Retour
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header avec image de catégorie */}
                <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center text-white">
                        <CategoryIcon className="h-12 w-12 mx-auto mb-2" />
                        <span className="text-lg font-medium">
                            {resource.resource_type?.name || 'Ressource'}
                        </span>
                    </div>
                </div>

                <div className="p-8">
                    {/* Titre et métadonnées */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {resource.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(resource.difficulty_level)}`}>
                                    {getDifficultyLabel(resource.difficulty_level)}
                                </span>

                                <div className="flex items-center text-gray-600">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span className="text-sm">{formatDuration(resource.duration_minutes)}</span>
                                </div>

                                <div className="flex items-center text-gray-600">
                                    <Tag className="h-4 w-4 mr-1" />
                                    <span className="text-sm">{resource.category?.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div className="lg:w-64">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-medium text-gray-900 mb-3">Statistiques</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600">
                                            <Star className="h-4 w-4 mr-2 text-yellow-400" />
                                            <span className="text-sm">Note moyenne</span>
                                        </div>
                                        <span className="font-medium">
                                            {resource.average_rating || '0'}/5
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600">
                                            <Eye className="h-4 w-4 mr-2" />
                                            <span className="text-sm">Vues</span>
                                        </div>
                                        <span className="font-medium">{resource.view_count || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600">
                                            <Download className="h-4 w-4 mr-2" />
                                            <span className="text-sm">Téléchargements</span>
                                        </div>
                                        <span className="font-medium">{resource.download_count || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {resource.description}
                        </p>
                    </div>

                    {/* Contenu principal */}
                    {resource.content && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contenu</h2>
                            <div className="prose max-w-none">
                                <div
                                    className="text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: resource.content }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Informations supplémentaires */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Informations</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-3 text-gray-400" />
                                    <span className="text-sm text-gray-600">Créé par</span>
                                    <span className="ml-2 font-medium">{resource.creator?.name || 'Anonyme'}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                                    <span className="text-sm text-gray-600">Publié le</span>
                                    <span className="ml-2 font-medium">{formatDate(resource.published_at)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Types de relations */}
                        {resource.relation_types && resource.relation_types.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Types de relations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {resource.relation_types.map((relationType, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                                        >
                                            {relationType.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {resource.tags && resource.tags.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {resource.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {resource.file_path && (
                            <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Download className="h-5 w-5 mr-2" />
                                Télécharger la ressource
                            </button>
                        )}

                        {resource.external_url && (
                            <a
                                href={resource.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <ExternalLink className="h-5 w-5 mr-2" />
                                Accéder au contenu externe
                            </a>
                        )}

                        <button className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <Heart className="h-5 w-5 mr-2" />
                            Ajouter aux favoris
                        </button>
                    </div>
                </div>
            </div>

            {/* Section commentaires (si nécessaire) */}
            {resource.comments && resource.comments.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Commentaires ({resource.comments.length})
                    </h2>
                    <div className="space-y-6">
                        {resource.comments.map((comment, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                        <User className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <span className="font-medium text-gray-900">Utilisateur anonyme</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                        {formatDate(comment.created_at)}
                                    </span>
                                </div>
                                <p className="text-gray-700 ml-11">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}