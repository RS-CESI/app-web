'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronRight, HelpCircle, User, BookOpen, Users, Settings, Shield, Mail, Phone, MessageCircle, ExternalLink, Play } from 'lucide-react';

export default function AidePage() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState('general');
    const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

    const categories = [
        { id: 'general', label: 'Questions générales', icon: HelpCircle },
        { id: 'compte', label: 'Mon compte', icon: User },
        { id: 'ressources', label: 'Ressources', icon: BookOpen },
        { id: 'activites', label: 'Activités de groupe', icon: Users },
        { id: 'technique', label: 'Problèmes techniques', icon: Settings },
        { id: 'confidentialite', label: 'Confidentialité', icon: Shield }
    ];

    const faqData = {
        general: [
            {
                question: "Qu'est-ce que (RE)Sources Relationnelles ?",
                answer: "(RE)Sources Relationnelles est une plateforme gouvernementale développée par le Ministère des Solidarités et de la Santé pour aider les citoyens à améliorer leurs relations humaines. La plateforme propose des ressources, outils et activités pour renforcer les liens familiaux, amoureux, amicaux et professionnels."
            },
            {
                question: "La plateforme est-elle gratuite ?",
                answer: "Oui, (RE)Sources Relationnelles est entièrement gratuite. Toutes les ressources, outils et activités sont accessibles sans frais pour tous les citoyens français."
            },
            {
                question: "Qui peut utiliser cette plateforme ?",
                answer: "La plateforme s'adresse à tous les citoyens français, sans distinction d'âge, de situation sociale ou d'origine. Elle est conçue pour être accessible à tous et respecte les normes d'accessibilité RGAA."
            },
            {
                question: "Comment la plateforme protège-t-elle mes données ?",
                answer: "Nous respectons strictement le RGPD. Vos données personnelles sont chiffrées, anonymisées quand possible, et ne sont jamais partagées avec des tiers. Vous pouvez consulter notre politique de confidentialité pour plus de détails."
            }
        ],
        compte: [
            {
                question: "Comment créer un compte ?",
                answer: "Cliquez sur 'Créer un compte' en haut de la page. Renseignez vos informations (nom, prénom, email, mot de passe) et sélectionnez vos centres d'intérêt. Un email de confirmation vous sera envoyé."
            },
            {
                question: "J'ai oublié mon mot de passe, que faire ?",
                answer: "Sur la page de connexion, cliquez sur 'Mot de passe oublié'. Saisissez votre email et suivez les instructions envoyées par email pour réinitialiser votre mot de passe."
            },
            {
                question: "Comment modifier mes informations personnelles ?",
                answer: "Connectez-vous à votre compte, allez dans 'Mon profil' puis cliquez sur 'Modifier'. Vous pouvez changer vos informations personnelles, centres d'intérêt et préférences de notification."
            },
            {
                question: "Comment supprimer mon compte ?",
                answer: "Dans votre profil, section 'Confidentialité', vous trouverez l'option 'Supprimer mon compte'. Cette action est irréversible et supprime toutes vos données."
            }
        ],
        ressources: [
            {
                question: "Quels types de ressources sont disponibles ?",
                answer: "Nous proposons des articles expertisés, des guides pratiques, des exercices interactifs, des activités de groupe et des jeux éducatifs. Tous sont organisés par type de relation (couple, famille, amitié, travail)."
            },
            {
                question: "Comment rechercher une ressource spécifique ?",
                answer: "Utilisez la barre de recherche sur la page 'Ressources' ou filtrez par catégorie, type de ressource et niveau de difficulté. Vous pouvez aussi consulter vos recommandations personnalisées."
            },
            {
                question: "Comment ajouter une ressource à mes favoris ?",
                answer: "Sur la page d'une ressource, cliquez sur l'icône étoile pour l'ajouter à vos favoris. Retrouvez toutes vos ressources favorites dans votre tableau de bord."
            },
            {
                question: "Puis-je proposer une nouvelle ressource ?",
                answer: "Les ressources sont créées par des experts en relations humaines. Cependant, vous pouvez nous envoyer vos suggestions via le formulaire de contact."
            }
        ],
        activites: [
            {
                question: "Comment participer à une activité de groupe ?",
                answer: "Consultez la section 'Activités' dans les ressources, choisissez une activité qui vous intéresse et cliquez sur 'Participer'. Certaines activités ont un nombre limité de participants."
            },
            {
                question: "Les activités sont-elles modérées ?",
                answer: "Oui, toutes les activités de groupe sont modérées par notre équipe pour garantir un environnement bienveillant et respectueux pour tous les participants."
            },
            {
                question: "Puis-je quitter une activité après inscription ?",
                answer: "Oui, vous pouvez vous désinscrire d'une activité depuis votre tableau de bord, section 'Mes activités', tant qu'elle n'a pas encore commencé."
            }
        ],
        technique: [
            {
                question: "Le site ne se charge pas correctement, que faire ?",
                answer: "Vérifiez votre connexion internet, videz le cache de votre navigateur et réessayez. Si le problème persiste, essayez avec un autre navigateur ou contactez notre support."
            },
            {
                question: "Quels navigateurs sont supportés ?",
                answer: "La plateforme fonctionne sur Chrome, Firefox, Safari, Edge et leurs versions mobiles. Nous recommandons d'utiliser la dernière version de votre navigateur."
            },
            {
                question: "L'application mobile est-elle disponible ?",
                answer: "Une version mobile responsive est disponible via votre navigateur. Une application native est en cours de développement et sera bientôt disponible."
            }
        ],
        confidentialite: [
            {
                question: "Mes données sont-elles partagées avec des tiers ?",
                answer: "Non, vos données personnelles ne sont jamais partagées avec des tiers. Elles sont utilisées uniquement pour améliorer votre expérience sur la plateforme."
            },
            {
                question: "Comment télécharger mes données personnelles ?",
                answer: "Dans votre profil, section 'Confidentialité', cliquez sur 'Télécharger mes données'. Vous recevrez un fichier contenant toutes vos informations personnelles."
            },
            {
                question: "Qui peut voir mes informations ?",
                answer: "Par défaut, vos informations sont privées. Vous pouvez choisir de rendre certaines informations visibles aux autres participants des activités de groupe."
            }
        ]
    };

    const guides = [
        {
            title: "Guide de démarrage",
            description: "Découvrez comment utiliser la plateforme",
            icon: Play,
            link: "/guide-demarrage"
        },
        {
            title: "Types de ressources",
            description: "Comprendre les différents contenus disponibles",
            icon: BookOpen,
            link: "/types-ressources"
        },
        {
            title: "Paramètres de compte",
            description: "Personnaliser votre profil et préférences",
            icon: User,
            link: "/parametres-compte"
        },
        {
            title: "Activités de groupe",
            description: "Participer aux activités collaboratives",
            icon: Users,
            link: "/guide-activites"
        }
    ];

    const contactOptions = [
        {
            title: "Email",
            description: "Contactez-nous par email",
            icon: Mail,
            contact: "aide@resources-relationnelles.gouv.fr",
            action: "Envoyer un email"
        },
        {
            title: "Téléphone",
            description: "Support téléphonique",
            icon: Phone,
            contact: "01 40 56 60 00",
            action: "Appeler",
            hours: "Lun-Ven 9h-17h"
        },
        {
            title: "Formulaire",
            description: "Envoyez-nous un message",
            icon: MessageCircle,
            contact: "Formulaire en ligne",
            action: "Ouvrir le formulaire"
        }
    ];

    const filteredFaq = faqData[activeCategory] || [];

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Centre d'aide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Trouvez rapidement les réponses à vos questions sur (RE)Sources Relationnelles
                </p>
            </div>

            {/* Barre de recherche */}
            <div className="mb-12">
                <div className="max-w-2xl mx-auto relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher dans l'aide..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Guides rapides */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Guides rapides</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {guides.map((guide, index) => {
                        const IconComponent = guide.icon;
                        return (
                            <Link key={index} href={guide.link}>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300">
                                    <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                        <IconComponent className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                                    <p className="text-sm text-gray-600">{guide.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">

                {/* Sidebar des catégories */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-8">
                        <h3 className="font-semibold text-gray-900 mb-4">Catégories</h3>
                        <nav className="space-y-1">
                            {categories.map(category => {
                                const IconComponent = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            activeCategory === category.id
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        <IconComponent className="h-4 w-4 mr-3" />
                                        {category.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="lg:col-span-3">

                    {/* FAQ */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Questions fréquentes - {categories.find(cat => cat.id === activeCategory)?.label}
                        </h2>

                        <div className="space-y-4">
                            {filteredFaq.map((faq, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-medium text-gray-900">{faq.question}</span>
                                        {expandedFaq === index ? (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                    {expandedFaq === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Besoin d'aide supplémentaire */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
                        <p className="text-blue-100 mb-6">
                            Notre équipe support est là pour vous aider. Contactez-nous par le moyen qui vous convient le mieux.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            {contactOptions.map((option, index) => {
                                const IconComponent = option.icon;
                                return (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex items-center mb-3">
                                            <IconComponent className="h-5 w-5 mr-2" />
                                            <h3 className="font-semibold">{option.title}</h3>
                                        </div>
                                        <p className="text-blue-100 text-sm mb-2">{option.description}</p>
                                        <p className="text-white font-medium text-sm mb-1">{option.contact}</p>
                                        {option.hours && (
                                            <p className="text-blue-200 text-xs mb-3">{option.hours}</p>
                                        )}
                                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                                            {option.action}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Liens utiles */}
            <div className="mt-12 bg-gray-50 rounded-xl p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Liens utiles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/conditions" className="flex items-center text-blue-600 hover:text-blue-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span className="text-sm">Conditions d'utilisation</span>
                    </Link>
                    <Link href="/confidentiality" className="flex items-center text-blue-600 hover:text-blue-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span className="text-sm">Politique de confidentialité</span>
                    </Link>
                    <Link href="/accessibility" className="flex items-center text-blue-600 hover:text-blue-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span className="text-sm">Accessibilité</span>
                    </Link>
                    <Link href="/legal-notices" className="flex items-center text-blue-600 hover:text-blue-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span className="text-sm">Mentions légales</span>
                    </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        <strong>À propos du support :</strong> Notre équipe support est composée de professionnels
                        formés pour vous accompagner dans l'utilisation de la plateforme. Nous nous engageons
                        à répondre à vos demandes dans les meilleurs délais.
                    </p>
                </div>
            </div>
        </div>
    );
}