import React from 'react';
import { Search, Grid, List, BookOpen, Users, Heart, MessageCircle, TrendingUp, Star, Clock, Eye } from 'lucide-react';

export default function RessourcesPage() {
    const [viewMode, setViewMode] = React.useState('grid');
    const [selectedCategory, setSelectedCategory] = React.useState('all');

    const categories = [
        { id: 'all', name: 'Toutes les catégories', count: 87 },
        { id: 'couple', name: 'Relations amoureuses', count: 23, icon: Heart },
        { id: 'famille', name: 'Relations familiales', count: 31, icon: Users },
        { id: 'amitie', name: 'Relations amicales', count: 18, icon: MessageCircle },
        { id: 'travail', name: 'Relations professionnelles', count: 15, icon: TrendingUp }
    ];

    const ressources = [
        {
            id: 1,
            title: "Communication non violente en couple",
            description: "Apprenez les bases de la communication bienveillante pour améliorer votre relation amoureuse.",
            category: "couple",
            type: "Guide pratique",
            duration: "15 min",
            difficulty: "Débutant",
            rating: 4.8,
            views: 1234,
            author: "Dr. Sarah Martin",
            image: "bg-pink-100"
        },
        {
            id: 2,
            title: "Exercice : Écoute active avec vos enfants",
            description: "Exercice pratique pour développer une meilleure écoute avec vos enfants adolescents.",
            category: "famille",
            type: "Exercice",
            duration: "20 min",
            difficulty: "Intermédiaire",
            rating: 4.6,
            views: 856,
            author: "Marie Dubois",
            image: "bg-green-100"
        },
        {
            id: 3,
            title: "Activité de groupe : Cercle de parole",
            description: "Participez à un cercle de parole pour partager vos expériences relationnelles.",
            category: "amitie",
            type: "Activité",
            duration: "60 min",
            difficulty: "Tous niveaux",
            rating: 4.9,
            views: 432,
            author: "Collectif",
            image: "bg-blue-100"
        },
        {
            id: 4,
            title: "Gérer les conflits au travail",
            description: "Stratégies pour résoudre les tensions et améliorer l'ambiance professionnelle.",
            category: "travail",
            type: "Article",
            duration: "12 min",
            difficulty: "Intermédiaire",
            rating: 4.4,
            views: 1567,
            author: "Pierre Leroy",
            image: "bg-yellow-100"
        },
        {
            id: 5,
            title: "Jeu interactif : Les émotions en famille",
            description: "Jeu ludique pour aider toute la famille à mieux exprimer ses émotions.",
            category: "famille",
            type: "Jeu",
            duration: "30 min",
            difficulty: "Débutant",
            rating: 4.7,
            views: 923,
            author: "Équipe pédagogique",
            image: "bg-purple-100"
        },
        {
            id: 6,
            title: "Construire une amitié durable",
            description: "Les clés pour développer et maintenir des amitiés profondes et authentiques.",
            category: "amitie",
            type: "Guide pratique",
            duration: "18 min",
            difficulty: "Débutant",
            rating: 4.5,
            views: 678,
            author: "Sophie Blanc",
            image: "bg-indigo-100"
        }
    ];

    const filteredRessources = ressources.filter(ressource =>
        selectedCategory === 'all' || ressource.category === selectedCategory
    );

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Débutant': return 'bg-green-100 text-green-800';
            case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
            case 'Avancé': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

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
                                placeholder="Rechercher une ressource..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="lg:w-64">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name} ({category.count})
                                </option>
                            ))}
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

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    {filteredRessources.length} ressource{filteredRessources.length > 1 ? 's' : ''} trouvée{filteredRessources.length > 1 ? 's' : ''}
                </p>
            </div>

            {/* Resources Grid */}
            {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRessources.map(ressource => (
                        <div key={ressource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                            <div className={`h-32 ${ressource.image} flex items-center justify-center`}>
                                <div className="text-center">
                                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">{ressource.type}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(ressource.difficulty)}`}>
                    {ressource.difficulty}
                  </span>
                                    <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                                        {ressource.duration}
                  </span>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {ressource.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {ressource.description}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>Par {ressource.author}</span>
                                    <div className="flex items-center gap-3">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {ressource.rating}
                    </span>
                                        <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                                            {ressource.views}
                    </span>
                                    </div>
                                </div>

                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    Consulter la ressource
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // List View
                <div className="space-y-4">
                    {filteredRessources.map(ressource => (
                        <div key={ressource.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className={`w-16 h-16 ${ressource.image} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <BookOpen className="h-6 w-6 text-gray-600" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(ressource.difficulty)}`}>
                      {ressource.difficulty}
                    </span>
                                        <span className="text-xs text-gray-500">{ressource.type}</span>
                                        <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                                            {ressource.duration}
                    </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {ressource.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-2">
                                        {ressource.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>Par {ressource.author}</span>
                                        <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            {ressource.rating}
                    </span>
                                        <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                                            {ressource.views} vues
                    </span>
                                    </div>
                                </div>

                                <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                                    Consulter
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {filteredRessources.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune ressource trouvée</h3>
                    <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
                </div>
            )}
        </div>
    );
}