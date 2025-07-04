import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    return (
        <footer className={`bg-gray-900 text-white ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">RE</span>
                            </div>
                            <div className="ml-3">
                                <span className="text-lg font-bold">(RE)Sources</span>
                                <div className="text-xs text-gray-400">Relationnelles</div>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Plateforme gouvernementale dédiée à l'amélioration des relations humaines.
                            Une initiative du Ministère des Solidarités et de la Santé.
                        </p>
                        <Link
                            href="https://solidarites-sante.gouv.fr"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Site officiel du Ministère
                            <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">
                                    Ressources
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                                    Aide
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
                                    Créer un compte
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Types de relations */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Types de relations</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/resources?type=couple" className="text-gray-400 hover:text-white transition-colors">
                                    Relations amoureuses
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources?type=famille" className="text-gray-400 hover:text-white transition-colors">
                                    Relations familiales
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources?type=amitie" className="text-gray-400 hover:text-white transition-colors">
                                    Relations amicales
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources?type=travail" className="text-gray-400 hover:text-white transition-colors">
                                    Relations professionnelles
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div className="text-gray-400">
                                    <p>Ministère des Solidarités et de la Santé</p>
                                    <p>14 Avenue Duquesne</p>
                                    <p>75007 Paris, France</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-400">01 40 56 60 00</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <a href="mailto:contact@resources-relationnelles.gouv.fr" className="text-gray-400 hover:text-white transition-colors">
                                    contact@resources-relationnelles.gouv.fr
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Équipe ITSolutionsWeb */}
                <div className="border-t border-gray-800 mt-8 pt-6">
                    <div className="bg-gray-800 rounded-lg p-4 mb-6">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Équipe de développement</h4>
                        <p className="text-xs text-gray-400 mb-3">
                            Application développée par l'équipe ITSolutionsWeb dans le cadre du projet collaboratif BLOC 1
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-gray-500">
                            <span>CARDOSO Dorian</span>
                            <span>GUERRERO Clément</span>
                            <span>DESHAYES Enzo</span>
                            <span>ANTOINE Paul</span>
                            <span>FONTEP Teddy</span>
                        </div>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="border-t border-gray-800 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                &copy; 2025 République Française - Ministère des Solidarités et de la Santé
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                            <Link href="/confidentiality" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Politique de confidentialité
                            </Link>
                            <Link href="/conditions" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Conditions d'utilisation
                            </Link>
                            <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Accessibilité : non conforme
                            </Link>
                            <Link href="/legal-mentions" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Mentions légales
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;