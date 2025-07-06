'use client';

import { useState } from 'react'
import { Heart, Star, Trash2, ExternalLink, Search, Filter, Grid, List, Plus, BookmarkPlus, Tag } from 'lucide-react'

interface Favorite {
    id: string
    title: string
    description: string
    url: string
    category: 'service' | 'document' | 'contact' | 'guide'
    tags: string[]
    dateAdded: string
    lastAccessed?: string
    isPublic: boolean
}

interface NewFavorite {
    title: string
    description: string
    url: string
    category: 'service' | 'document' | 'contact' | 'guide'
    tags: string
    isPublic: boolean
}

export default function FavoritesPage() {
    const user = {
        name: 'Marie Dubois',
        email: 'marie.dubois@example.com',
        isAuthenticated: true
    };

    const [favorites, setFavorites] = useState<Favorite[]>([
        {
            id: '1',
            title: 'Demande d\'aide sociale',
            description: 'Formulaire de demande d\'aide sociale départementale',
            url: '/services/aide-sociale',
            category: 'service',
            tags: ['aide', 'social', 'formulaire'],
            dateAdded: '2025-06-15',
            lastAccessed: '2025-07-01',
            isPublic: true
        },
        {
            id: '2',
            title: 'Guide des prestations familiales',
            description: 'Document complet sur les allocations familiales et aides aux familles',
            url: '/documents/guide-prestations-familiales.pdf',
            category: 'document',
            tags: ['famille', 'allocations', 'guide'],
            dateAdded: '2025-06-20',
            isPublic: true
        },
        {
            id: '3',
            title: 'Contact CCAS Lyon',
            description: 'Centre Communal d\'Action Sociale de Lyon - Services aux personnes âgées',
            url: '/contacts/ccas-lyon',
            category: 'contact',
            tags: ['lyon', 'ccas', 'personnes-âgées'],
            dateAdded: '2025-07-01',
            isPublic: false
        }
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showAddForm, setShowAddForm] = useState(false)
    const [newFavorite, setNewFavorite] = useState<NewFavorite>({
        title: '',
        description: '',
        url: '',
        category: 'service',
        tags: '',
        isPublic: false
    })

    const categories = [
        { value: 'all', label: 'Tous', icon: Star },
        { value: 'service', label: 'Services', icon: Heart },
        { value: 'document', label: 'Documents', icon: BookmarkPlus },
        { value: 'contact', label: 'Contacts', icon: ExternalLink },
        { value: 'guide', label: 'Guides', icon: Tag }
    ]

    const filteredFavorites = favorites.filter(favorite => {
        const matchesSearch = favorite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            favorite.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            favorite.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = selectedCategory === 'all' || favorite.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const deleteFavorite = (id: string) => {
        setFavorites(favorites.filter(fav => fav.id !== id))
    }

    const togglePublic = (id: string) => {
        setFavorites(favorites.map(fav =>
            fav.id === id ? { ...fav, isPublic: !fav.isPublic } : fav
        ))
    }

    const addFavorite = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newFavorite.title || !newFavorite.url) return

        const favorite: Favorite = {
            id: Date.now().toString(),
            title: newFavorite.title,
            description: newFavorite.description,
            url: newFavorite.url,
            category: newFavorite.category,
            tags: newFavorite.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            dateAdded: new Date().toISOString().split('T')[0],
            isPublic: newFavorite.isPublic
        }

        setFavorites([...favorites, favorite])
        setNewFavorite({
            title: '',
            description: '',
            url: '',
            category: 'service',
            tags: '',
            isPublic: false
        })
        setShowAddForm(false)
    }

    const getCategoryIcon = (category: string) => {
        const categoryData = categories.find(cat => cat.value === category)
        return categoryData ? categoryData.icon : Star
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR')
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
                            <p className="text-gray-600">Bonjour {user.name}, vous avez {favorites.length} éléments sauvegardés</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter
                        </button>
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
                        <div className="flex items-center">
                            <Filter className="w-4 h-4 text-gray-500 mr-2" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Formulaire d'ajout */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold mb-4">Ajouter un favori</h3>
                            <form onSubmit={addFavorite} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                    <input
                                        type="text"
                                        value={newFavorite.title}
                                        onChange={(e) => setNewFavorite({...newFavorite, title: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={newFavorite.description}
                                        onChange={(e) => setNewFavorite({...newFavorite, description: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                    <input
                                        type="url"
                                        value={newFavorite.url}
                                        onChange={(e) => setNewFavorite({...newFavorite, url: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                                    <select
                                        value={newFavorite.category}
                                        onChange={(e) => setNewFavorite({...newFavorite, category: e.target.value as any})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="service">Service</option>
                                        <option value="document">Document</option>
                                        <option value="contact">Contact</option>
                                        <option value="guide">Guide</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                    <input
                                        type="text"
                                        value={newFavorite.tags}
                                        onChange={(e) => setNewFavorite({...newFavorite, tags: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                        placeholder="aide, social, famille..."
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newFavorite.isPublic}
                                        onChange={(e) => setNewFavorite({...newFavorite, isPublic: e.target.checked})}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">Favori public</label>
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Liste des favoris */}
                {filteredFavorites.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun favori trouvé</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || selectedCategory !== 'all'
                                ? 'Aucun favori ne correspond à vos critères.'
                                : 'Vous n\'avez pas encore ajouté de favoris.'
                            }
                        </p>
                        {(!searchTerm && selectedCategory === 'all') && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Ajouter votre premier favori
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                        {filteredFavorites.map((favorite) => {
                            const CategoryIcon = getCategoryIcon(favorite.category)

                            if (viewMode === 'list') {
                                return (
                                    <div key={favorite.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start flex-1">
                                                <div className={`p-3 rounded-lg mr-4 ${
                                                    favorite.category === 'service' ? 'bg-blue-100' :
                                                        favorite.category === 'document' ? 'bg-green-100' :
                                                            favorite.category === 'contact' ? 'bg-purple-100' : 'bg-yellow-100'
                                                }`}>
                                                    <CategoryIcon className={`w-5 h-5 ${
                                                        favorite.category === 'service' ? 'text-blue-600' :
                                                            favorite.category === 'document' ? 'text-green-600' :
                                                                favorite.category === 'contact' ? 'text-purple-600' : 'text-yellow-600'
                                                    }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-gray-900">{favorite.title}</h3>
                                                        {favorite.isPublic && (
                                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Public</span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 mb-2">{favorite.description}</p>
                                                    <div className="text-sm text-gray-500 mb-2">
                                                        Ajouté le {formatDate(favorite.dateAdded)}
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {favorite.tags.map((tag, index) => (
                                                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <a
                                                    href={favorite.url}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Ouvrir"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => togglePublic(favorite.id)}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        favorite.isPublic ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'
                                                    }`}
                                                    title={favorite.isPublic ? "Rendre privé" : "Rendre public"}
                                                >
                                                    <Star className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteFavorite(favorite.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <div key={favorite.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-lg ${
                                            favorite.category === 'service' ? 'bg-blue-100' :
                                                favorite.category === 'document' ? 'bg-green-100' :
                                                    favorite.category === 'contact' ? 'bg-purple-100' : 'bg-yellow-100'
                                        }`}>
                                            <CategoryIcon className={`w-6 h-6 ${
                                                favorite.category === 'service' ? 'text-blue-600' :
                                                    favorite.category === 'document' ? 'text-green-600' :
                                                        favorite.category === 'contact' ? 'text-purple-600' : 'text-yellow-600'
                                            }`} />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => togglePublic(favorite.id)}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    favorite.isPublic ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                                title={favorite.isPublic ? "Rendre privé" : "Rendre public"}
                                            >
                                                <Star className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteFavorite(favorite.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{favorite.title}</h3>
                                            {favorite.isPublic && (
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Public</span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm">{favorite.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {favorite.tags.map((tag, index) => (
                                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-sm text-gray-500 mb-4">
                                        Ajouté le {formatDate(favorite.dateAdded)}
                                    </div>

                                    <a
                                        href={favorite.url}
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Accéder
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}