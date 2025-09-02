'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Star, Trash2, ExternalLink, Search, Filter, Grid, List, BookmarkPlus, Loader2, AlertCircle, Book, Clock, Eye, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { FavoritesApi, type FavoriteResource, type PaginatedFavoritesResponse } from '@/lib/api/favorites';

export default function FavoritesPage() {
    const router = useRouter();
    const { user, loading: authLoading, isAuthenticated } = useAuth();

    const [favorites, setFavorites] = useState<FavoriteResource[]>([]);
    const [paginationData, setPaginationData] = useState<PaginatedFavoritesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalFavorites, setTotalFavorites] = useState<number>(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Redirection si non authentifié
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    // Charger les favoris
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchFavorites();
        }
    }, [isAuthenticated, user, currentPage, selectedCategory, selectedDifficulty]);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            setError(null);

            const params: any = {
                page: currentPage,
            };

            if (selectedCategory !== 'all') {
                params.category_id = parseInt(selectedCategory);
            }

            if (selectedDifficulty !== 'all') {
                params.difficulty_level = selectedDifficulty;
            }

            const response = await FavoritesApi.getFavorites(params);
            setFavorites(response.data.data);
            setPaginationData(response.data);
            setTotalFavorites(response.meta.total_favorites);
        } catch (err) {
            console.error('Erreur lors du chargement des favoris:', err);
            setError('Impossible de charger les favoris');
        } finally {
            setLoading(false);
        }
    };

    const deleteFavorite = async (resourceId: number) => {
        try {
            await FavoritesApi.removeFavorite(resourceId);
            // Recharger les favoris après suppression
            fetchFavorites();
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            alert('Erreur lors de la suppression du favori');
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Filtrage côté client pour la recherche
    const filteredFavorites = favorites.filter(favorite => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        return (
            favorite.title.toLowerCase().includes(searchLower) ||
            favorite.description.toLowerCase().includes(searchLower) ||
            favorite.category.name.toLowerCase().includes(searchLower) ||
            favorite.resourceType.name.toLowerCase().includes(searchLower)
        );
    });

    const getCategoryColor = (category: string): string => {
        switch (category?.toLowerCase()) {
            case 'couple': return 'bg-pink-100 text-pink-800';
            case 'famille': return 'bg-green-100 text-green-800';
            case 'amitie': return 'bg-blue-100 text-blue-800';
            case 'travail': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDifficultyColor = (difficulty: string): string => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDifficultyLabel = (difficulty: string): string => {
        switch (difficulty) {
            case 'beginner': return 'Débutant';
            case 'intermediate': return 'Intermédiaire';
            case 'advanced': return 'Avancé';
            default: return difficulty;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const formatDuration = (minutes?: number): string => {
        if (!minutes) return 'Non définie';
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    };

    // Affichage du loader pendant la vérification d'auth
    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Chargement...</p>
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
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                            <div>
                                <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
                                <p className="text-red-700 text-sm mt-1">{error}</p>
                                <button
                                    onClick={fetchFavorites}
                                    className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mes Favoris</h1>
                            <p className="text-gray-600">
                                Bonjour {user.name}, vous avez {totalFavorites} ressource{totalFavorites > 1 ? 's' : ''} favorite{totalFavorites > 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/resources"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <BookmarkPlus className="w-4 h-4 mr-2" />
                            Découvrir des ressources
                        </Link>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher dans mes favoris..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <Filter className="w-4 h-4 text-gray-500 mr-2" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Toutes les catégories</option>
                                    {/* Ces options devraient être dynamiques selon vos catégories */}
                                    <option value="1">Communication</option>
                                    <option value="2">Relations</option>
                                    <option value="3">Développement personnel</option>
                                </select>
                            </div>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => {
                                    setSelectedDifficulty(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Tous les niveaux</option>
                                <option value="beginner">Débutant</option>
                                <option value="intermediate">Intermédiaire</option>
                                <option value="advanced">Avancé</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Affichage du loading */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
                        <span className="text-gray-600">Chargement de vos favoris...</span>
                    </div>
                )}

                {/* Liste des favoris */}
                {!loading && filteredFavorites.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun favori trouvé</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all'
                                ? 'Aucun favori ne correspond à vos critères.'
                                : 'Vous n\'avez pas encore ajouté de favoris.'
                            }
                        </p>
                        {(!searchTerm && selectedCategory === 'all' && selectedDifficulty === 'all') && (
                            <Link
                                href="/resources"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center"
                            >
                                <BookmarkPlus className="w-5 h-5 mr-2" />
                                Découvrir des ressources
                            </Link>
                        )}
                    </div>
                ) : !loading && (
                    <>
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                            {filteredFavorites.map((favorite) => {
                                if (viewMode === 'list') {
                                    return (
                                        <div key={favorite.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start flex-1">
                                                    <div className="p-3 rounded-lg mr-4 bg-blue-100">
                                                        <Book className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="text-lg font-semibold text-gray-900">{favorite.title}</h3>
                                                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(favorite.category?.name || '')}`}>
                                                                {favorite.category?.name || 'Non catégorisé'}
                                                            </span>
                                                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(favorite.difficulty_level)}`}>
                                                                {getDifficultyLabel(favorite.difficulty_level)}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 mb-2">{favorite.description}</p>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                                            <div className="flex items-center">
                                                                <Clock className="w-4 h-4 mr-1" />
                                                                {formatDuration(favorite.estimated_duration_minutes)}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                {favorite.view_count} vues
                                                            </div>
                                                            <div className="flex items-center">
                                                                <User className="w-4 h-4 mr-1" />
                                                                {favorite.creator?.name || 'Créateur inconnu'}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Ajouté le {formatDate(favorite.favorited_at)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <Link
                                                        href={`/resources/${favorite.id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Voir la ressource"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteFavorite(favorite.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Retirer des favoris"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={favorite.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-blue-100">
                                                <Book className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <button
                                                onClick={() => deleteFavorite(favorite.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Retirer des favoris"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{favorite.title}</h3>
                                            <p className="text-gray-600 text-sm line-clamp-3">{favorite.description}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(favorite.category?.name || '')}`}>
                                                {favorite.category?.name || 'Non catégorisé'}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(favorite.difficulty_level)}`}>
                                                {getDifficultyLabel(favorite.difficulty_level)}
                                            </span>
                                            {favorite.resourceType && (
                                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                                    {favorite.resourceType.name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {formatDuration(favorite.estimated_duration_minutes)}
                                            </div>
                                            <div className="flex items-center">
                                                <Eye className="w-4 h-4 mr-1" />
                                                {favorite.view_count}
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-500 mb-4">
                                            Ajouté le {formatDate(favorite.favorited_at)}
                                        </div>

                                        <Link
                                            href={`/resources/${favorite.id}`}
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Voir la ressource
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {paginationData && paginationData.last_page > 1 && (
                            <div className="flex items-center justify-between mt-8">
                                <div className="text-sm text-gray-500">
                                    Affichage de {paginationData.from} à {paginationData.to} sur {paginationData.total} favoris
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        Précédent
                                    </button>
                                    <span className="px-4 py-2 text-sm text-gray-600">
                                        Page {currentPage} sur {paginationData.last_page}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === paginationData.last_page}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}