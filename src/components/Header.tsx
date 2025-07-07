'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, ChevronDown, Bell, Settings, LogIn, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    const router = useRouter();
    const { user, loading, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState<boolean>(false);
    const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserMenu = (): void => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = async (): Promise<void> => {
        setIsLoggingOut(true);
        try {
            await logout();
            setIsUserMenuOpen(false);
            router.push('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Fermer le menu utilisateur quand on clique ailleurs
    React.useEffect(() => {
        const handleClickOutside = (): void => {
            setIsUserMenuOpen(false);
        };

        if (isUserMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    // Fonction pour obtenir les initiales de l'utilisateur
    const getUserInitials = (name: string): string => {
        const names = name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <header className={`bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 ${className}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">RE</span>
                            </div>
                            <div className="ml-3">
                                <span className="text-xl font-bold text-gray-900">(RE)Sources</span>
                                <div className="text-xs text-gray-600">Relationnelles</div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex items-baseline space-x-8">
                            <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Accueil
                            </Link>
                            <Link href="/resources" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Ressources
                            </Link>
                            <Link href="/help" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Aide
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                À propos
                            </Link>
                        </div>

                        {/* User Section */}
                        {loading ? (
                            <div className="flex items-center">
                                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                            </div>
                        ) : isAuthenticated && user ? (
                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
                                </button>
                                <Link href="/activity" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Activités
                                </Link>

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleUserMenu();
                                        }}
                                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-medium">
                                                {getUserInitials(user.name)}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                                            {user.name}
                                        </span>
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                    </button>

                                    {/* User Dropdown */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                href="/profil"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                Mon profil
                                            </Link>
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <Settings className="h-4 w-4 mr-2" />
                                                Tableau de bord
                                            </Link>
                                            <Link
                                                href="/favorites"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <Settings className="h-4 w-4 mr-2" />
                                                Mes favoris
                                            </Link>
                                            <div className="border-t border-gray-100 mt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    disabled={isLoggingOut}
                                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                                                >
                                                    {isLoggingOut ? (
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <LogOut className="h-4 w-4 mr-2" />
                                                    )}
                                                    Déconnexion
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                                    <LogIn className="h-4 w-4 mr-1" />
                                    Connexion
                                </Link>
                                <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                                    Créer un compte
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/" className="block px-3 py-2 text-gray-900 font-medium">
                                Accueil
                            </Link>
                            <Link href="/resources" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                                Ressources
                            </Link>
                            <Link href="/help" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                                Aide
                            </Link>
                            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                                À propos
                            </Link>

                            {/* Mobile User Section */}
                            {loading ? (
                                <div className="flex items-center justify-center py-4">
                                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                                </div>
                            ) : isAuthenticated && user ? (
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex items-center px-3 py-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-xs font-medium">
                                                {getUserInitials(user.name)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/profil"
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Mon profil
                                    </Link>
                                    <Link
                                        href="/favorites"
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Mes Favoris
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Tableau de bord
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="flex items-center w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        {isLoggingOut ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                            <LogOut className="h-4 w-4 mr-2" />
                                        )}
                                        Déconnexion
                                    </button>
                                </div>
                            ) : (
                                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                                    <Link
                                        href="/login"
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block mx-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium text-center"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Créer un compte
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;