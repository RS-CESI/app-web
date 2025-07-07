'use client';

import { useEffect, useState } from 'react';
import { MyResourcesApi, MyResource, PaginatedMyResourcesResponse } from '@/lib/api/myResources';
import { useRouter } from 'next/navigation';
import { Grid, List, BookOpen, Users, Heart, MessageCircle, TrendingUp, Star, Clock, Eye, Loader2 } from 'lucide-react';
import Link from "next/link";

export default function MyResourcesPage() {
    const [resources, setResources] = useState<MyResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<{
        current_page: number;
        last_page: number;
        total: number;
    }>({ current_page: 1, last_page: 1, total: 0 });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const router = useRouter();

    const fetchResources = async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response: PaginatedMyResourcesResponse = await MyResourcesApi.getMyResources({ page });
            setResources(response.data);
            setMeta({
                current_page: response.current_page,
                last_page: response.last_page,
                total: response.total || 0,
            });
        } catch (err: any) {
            setError(err?.data?.message ?? 'Erreur inconnue');
            if (err.status === 401) {
                localStorage.removeItem('auth_token');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources(page);
    }, [page]);

    const handleNext = () => {
        if (page < meta.last_page) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const getBackgroundColor = (index: number): string => {
        const colors = [
            'bg-pink-100',
            'bg-green-100',
            'bg-blue-100',
            'bg-yellow-100',
            'bg-purple-100',
            'bg-indigo-100'
        ];
        return colors[index % colors.length];
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

    const getCategoryIcon = (categoryName?: string) => {
        const name = categoryName?.toLowerCase();
        if (name?.includes('couple') || name?.includes('amour')) return Heart;
        if (name?.includes('famille') || name?.includes('family')) return Users;
        if (name?.includes('amitié') || name?.includes('ami')) return MessageCircle;
        if (name?.includes('travail') || name?.includes('professionnel')) return TrendingUp;
        return BookOpen;
    };

    if (loading && resources.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Chargement des ressources...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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
                                        fetchResources(page);
                                    }}
                                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                                >
                                    Réessayer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Mes ressources
                </h1>
                <p className="text-gray-600 max-w-3xl">
                    Consultez et gérez vos ressources personnelles.
                </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-end mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                        <Grid className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                        <List className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Results Count and Pagination Info */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-600">
                    {resources.length} ressource{resources.length > 1 ? 's' : ''} affichée{resources.length > 1 ? 's' : ''}
                    {meta.total > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                            (sur {meta.total} au total)
                        </span>
                    )}
                </p>

                {meta.last_page > 1 && (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Page {meta.current_page} sur {meta.last_page}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                Précédent
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={page === meta.last_page}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Resources Grid */}
            {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, index) => {
                        const CategoryIcon = getCategoryIcon(resource.category?.name);
                        return (
                            <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                                <div className={`h-32 ${getBackgroundColor(index)} flex items-center justify-center`}>
                                    <div className="text-center">
                                        <CategoryIcon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {resource.resourceType?.name || 'Ressource'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty_level)}`}>
                                            {getDifficultyLabel(resource.difficulty_level)}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {formatDuration(resource.estimated_duration_minutes)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {resource.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {resource.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>Créée le : {new Date(resource.created_at).toLocaleDateString()}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center">
                                                <Eye className="h-4 w-4 mr-1" />
                                                {resource.view_count || 0}
                                            </span>
                                        </div>
                                    </div>

                                    <Link href={`/resources/${resource.id}`}>
                                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                            Consulter la ressource
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // List View
                <div className="space-y-4">
                    {resources.map((resource, index) => {
                        const CategoryIcon = getCategoryIcon(resource.category?.name);
                        return (
                            <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className={`w-16 h-16 ${getBackgroundColor(index)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <CategoryIcon className="h-6 w-6 text-gray-600" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty_level)}`}>
                                                {getDifficultyLabel(resource.difficulty_level)}
                                            </span>
                                            <span className="text-xs text-gray-500">{resource.resourceType?.name}</span>
                                            <span className="text-xs text-gray-500 flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {formatDuration(resource.estimated_duration_minutes)}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {resource.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-2">
                                            {resource.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Créée le : {new Date(resource.created_at).toLocaleDateString()}</span>
                                            <span className="flex items-center">
                                                <Eye className="h-4 w-4 mr-1" />
                                                {resource.view_count || 0} vues
                                            </span>
                                        </div>
                                    </div>

                                    <Link href={`/resources/${resource.id}`}>
                                        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                                            Consulter
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty State */}
            {!loading && resources.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune ressource trouvée</h3>
                    <p className="text-gray-500">Vous n'avez pas encore créé de ressources.</p>
                </div>
            )}
        </div>
    );
}
