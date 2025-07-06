'use client';

import React, { useState, useEffect } from 'react';
import { Search, Grid, List, BookOpen, Users, Heart, MessageCircle, TrendingUp, Star, Clock, Eye, Loader2 } from 'lucide-react';
import { ResourcesApi, Resource, Category, ResourceType, ResourcesQueryParams } from '@/lib/api/resources';

export default function RessourcesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [resources, setResources] = useState<Resource[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalResources, setTotalResources] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(15);

    // Fonction pour récupérer les ressources avec pagination normale
    const fetchResources = async (filters: ResourcesQueryParams = {}, page?: number) => {
        try {
            const pageToUse = page || currentPage;
            console.log('fetchResources appelé avec:', { filters, page: pageToUse, perPage });
            console.log('Paramètres envoyés à l\'API:', {
                ...filters,
                page: pageToUse,
                limit: perPage
            });
            setLoading(true);

            let response;

            // Si il y a une recherche textuelle, utiliser l'endpoint search
            if (filters.search && filters.search.trim()) {
                response = await ResourcesApi.searchPublicResources({
                    ...filters,
                    page: pageToUse,
                    limit: perPage
                });
            } else {
                // Sinon utiliser l'endpoint normal (sans search dans les paramètres)
                const { search, ...filtersWithoutSearch } = filters;
                response = await ResourcesApi.getPublicResources({
                    ...filtersWithoutSearch,
                    page: pageToUse,
                    limit: perPage
                });
            }

            console.log('Réponse API:', response);
            setResources(response.data || []);
            setTotalPages(response.last_page || 1);
            setTotalResources(response.total || 0);
            setCurrentPage(response.current_page || 1);
        } catch (err) {
            console.error('Erreur fetchResources:', err);
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour récupérer les catégories
    const fetchCategories = async () => {
        try {
            const response = await ResourcesApi.getPublicCategories();
            // Gérer les deux types de réponse possibles
            const categoriesData = Array.isArray(response) ? response : response.data;
            setCategories([
                { id: 0, name: 'Toutes les catégories', created_at: '', updated_at: '' } as Category,
                ...categoriesData
            ]);
        } catch (err) {
            console.error('Erreur lors de la récupération des catégories:', err);
        }
    };

    // Fonction pour récupérer les types de ressources
    const fetchResourceTypes = async () => {
        try {
            const response = await ResourcesApi.getPublicResourceTypes();
            // Gérer les deux types de réponse possibles
            const resourceTypesData = Array.isArray(response) ? response : response.data;
            setResourceTypes(resourceTypesData);
        } catch (err) {
            console.error('Erreur lors de la récupération des types de ressources:', err);
        }
    };

    // Effet pour charger les données au montage
    useEffect(() => {
        console.log('Montage du composant');
        fetchResources({}, 1);
        fetchCategories();
        fetchResourceTypes();
    }, []); // Tableau de dépendances vide

    // Effet pour filtrer les ressources
    useEffect(() => {
        // Éviter l'appel au montage initial si tout est par défaut
        if (selectedCategory === 'all' && selectedDifficulty === 'all' && searchTerm === '') {
            return;
        }

        console.log('Effet filtrage - selectedCategory:', selectedCategory, 'selectedDifficulty:', selectedDifficulty, 'searchTerm:', searchTerm);
        const filters: ResourcesQueryParams = {};

        if (selectedCategory !== 'all' && selectedCategory !== '0') {
            filters.category_id = selectedCategory;
        }

        if (selectedDifficulty !== 'all') {
            filters.difficulty_level = selectedDifficulty;
        }

        if (searchTerm.trim()) {
            filters.search = searchTerm.trim();
        }

        const debounceTimer = setTimeout(() => {
            console.log('Debounce - appel fetchResources avec filtres:', filters);
            setCurrentPage(1); // Reset à la première page pour nouveaux filtres
            fetchResources(filters, 1);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [selectedCategory, selectedDifficulty, searchTerm]); // IMPORTANT: incluez selectedDifficulty

    // Effet pour recharger quand on change le nombre par page
    useEffect(() => {
        console.log('Effet perPage - perPage:', perPage);
        const filters: ResourcesQueryParams = {};

        if (selectedCategory !== 'all' && selectedCategory !== '0') {
            filters.category_id = selectedCategory;
        }

        if (selectedDifficulty !== 'all') {
            filters.difficulty_level = selectedDifficulty;
        }

        if (searchTerm.trim()) {
            filters.search = searchTerm.trim();
        }

        setCurrentPage(1); // Reset à la première page
        fetchResources(filters, 1);
    }, [perPage]);

    // Effet pour recharger quand on change de page
    useEffect(() => {
        console.log('Effet currentPage - currentPage:', currentPage);
        if (currentPage > 1) { // Éviter le double appel au montage
            const filters: ResourcesQueryParams = {};

            if (selectedCategory !== 'all' && selectedCategory !== '0') {
                filters.category_id = selectedCategory;
            }

            if (selectedDifficulty !== 'all') {
                filters.difficulty_level = selectedDifficulty;
            }

            if (searchTerm.trim()) {
                filters.search = searchTerm.trim();
            }

            fetchResources(filters, currentPage);
        }
    }, [currentPage]);

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
                                        fetchResources({}, 1);
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
                    Catalogue des ressources
                </h1>
                <p className="text-gray-600 max-w-3xl">
                    Découvrez notre collection de ressources pour améliorer vos relations.
                    Filtrez par catégorie et type de contenu pour trouver ce qui vous convient.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher par titre, description, difficulté, catégorie..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="lg:w-48">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="lg:w-40">
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => {
                                console.log('Changement difficulté:', e.target.value);
                                setSelectedDifficulty(e.target.value);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Toutes difficultés</option>
                            <option value="beginner">Débutant</option>
                            <option value="intermediate">Intermédiaire</option>
                            <option value="advanced">Avancé</option>
                        </select>
                    </div>

                    {/* Per Page Selector */}
                    <div className="lg:w-32">
                        <select
                            value={perPage}
                            onChange={(e) => setPerPage(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={15}>15 par page</option>
                            <option value={30}>30 par page</option>
                            <option value={45}>45 par page</option>
                            <option value={100}>100 par page</option>
                        </select>
                    </div>

                    {/* View Mode */}
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
            </div>

            {/* Loading indicator for filters */}
            {loading && (
                <div className="mb-6 flex items-center text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Chargement...
                </div>
            )}

            {/* Results Count and Pagination Info */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-600">
                    {resources.length} ressource{resources.length > 1 ? 's' : ''} affichée{resources.length > 1 ? 's' : ''}
                    {totalResources > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                            (sur {totalResources} au total)
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
                                            {resource.resource_type?.name || 'Ressource'}
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
                                            {formatDuration(resource.duration_minutes)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {resource.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {resource.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>Par {resource.creator?.name || 'Anonyme'}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                                {resource.average_rating || '0'}
                                            </span>
                                            <span className="flex items-center">
                                                <Eye className="h-4 w-4 mr-1" />
                                                {resource.view_count || 0}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                        Consulter la ressource
                                    </button>
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
                                            <span className="text-xs text-gray-500">{resource.resource_type?.name}</span>
                                            <span className="text-xs text-gray-500 flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {formatDuration(resource.duration_minutes)}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {resource.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-2">
                                            {resource.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Par {resource.creator?.name || 'Anonyme'}</span>
                                            <span className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                                {resource.average_rating || '0'}
                                            </span>
                                            <span className="flex items-center">
                                                <Eye className="h-4 w-4 mr-1" />
                                                {resource.view_count || 0} vues
                                            </span>
                                        </div>
                                    </div>

                                    <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                                        Consulter
                                    </button>
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
                    <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
                </div>
            )}
        </div>
    );
}