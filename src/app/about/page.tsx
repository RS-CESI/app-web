'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Users, Target, Award, Shield, ExternalLink, Mail, Phone, MapPin, Code, Database, Smartphone } from 'lucide-react';

export default function AProposPage() {
    const teamMembers = [
        { name: 'ANTOINE Paul', role: 'Chef de projet' },
        { name: 'CARDOSO Dorian', role: 'Développeur Back-End & Base de données' },
        { name: 'GUERRERO Clément', role: 'Lead Développeur, Développeur Full-Stack' },
        { name: 'DESHAYES Enzo', role: 'Développeur Mobile' },
        { name: 'FONTEP Teddy', role: 'Développeur Front-End & UI/UX' }
    ];

    const technologies = [
        { name: 'Next.js 15', icon: Code, description: 'Framework React pour le développement web' },
        { name: 'TypeScript', icon: Code, description: 'Typage statique pour JavaScript' },
        { name: 'Tailwind CSS', icon: Code, description: 'Framework CSS utilitaire' },
        { name: 'Base de données', icon: Database, description: 'Stockage sécurisé des données' },
        { name: 'Application mobile', icon: Smartphone, description: 'Interface mobile native' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    À propos de{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            (RE)Sources Relationnelles
          </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                    Une initiative du Ministère des Solidarités et de la Santé pour améliorer
                    la qualité des relations humaines et favoriser la cohésion sociale en France.
                </p>
            </section>

            {/* Mission */}
            <section className="mb-16">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre mission</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-gray-700 mb-4">
                                (RE)Sources Relationnelles a pour objectif de proposer une plateforme autour de la qualité
                                des liens relationnels que nous pouvons tisser pour une meilleure qualité de vie.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Basé sur la pyramide de Maslow, ce projet reconnaît que nos besoins d'êtres humains se
                                structurent par priorités, et que la qualité de nos relations aux autres est un levier
                                fondamental pour notre épanouissement.
                            </p>
                            <p className="text-gray-700">
                                Que ce soit avec nos parents, notre couple, notre famille, nos amis ou nos collègues,
                                chaque type de relation implique une proximité différente et des lignes de communication spécifiques.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs principaux</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <Heart className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                                    <span className="text-gray-700">Créer et renforcer les relations des citoyens</span>
                                </li>
                                <li className="flex items-start">
                                    <Users className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                                    <span className="text-gray-700">Enrichir les liens relationnels existants</span>
                                </li>
                                <li className="flex items-start">
                                    <Award className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                                    <span className="text-gray-700">Améliorer la qualité de vie des citoyens</span>
                                </li>
                                <li className="flex items-start">
                                    <Shield className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
                                    <span className="text-gray-700">Favoriser la cohésion sociale</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Le Ministère */}
            <section className="mb-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                            <Shield className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Le Ministère des Solidarités et de la Santé</h2>
                            <p className="text-gray-600">Porteur du projet (RE)Sources Relationnelles</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-700 mb-4">
                                Le ministère des Solidarités et de la Santé prépare et met en œuvre la politique du
                                Gouvernement dans les domaines de la solidarité, de la cohésion sociale, de la santé
                                publique et de l'organisation du système de santé.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Dans le cadre de ce projet, ce sont les aspects liés à la cohésion sociale,
                                à la famille et à la santé mentale qui prennent tout leur sens.
                            </p>
                            <Link
                                href="https://solidarites-sante.gouv.fr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Site officiel du Ministère
                                <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-4">Missions principales</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• Politique de soutien aux familles et aux personnes âgées</li>
                                <li>• Organisation de la prévention et des soins de santé</li>
                                <li>• Gestion des régimes de sécurité sociale</li>
                                <li>• Développement de l'économie sociale et solidaire</li>
                                <li>• Lutte contre la pauvreté et l'exclusion sociale</li>
                            </ul>

                            <div className="mt-6 p-4 bg-white rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div className="text-sm text-gray-600">
                                        <p className="font-medium">Adresse officielle</p>
                                        <p>14 Avenue Duquesne</p>
                                        <p>75007 Paris, France</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* L'équipe ITSolutionsWeb */}
            <section className="mb-16">
                <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">L'équipe de développement</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Application développée par l'équipe ITSolutionsWeb dans le cadre du projet collaboratif BLOC 1.
                            Une équipe de 5 développeurs passionnés par les technologies web et mobiles.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-xl">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">
                    {member.name.split(' ')[1].charAt(0)}
                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                                <p className="text-gray-400 text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            Formation en développement web et mobile • Projet pédagogique • 2025
                        </p>
                    </div>
                </div>
            </section>

            {/* Technologies utilisées */}
            <section className="mb-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Technologies utilisées</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Une architecture moderne et performante respectant les standards du web et les bonnes pratiques de développement.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technologies.map((tech, index) => {
                        const IconComponent = tech.icon;
                        return (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <IconComponent className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tech.name}</h3>
                                <p className="text-gray-600 text-sm">{tech.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Architecture technique</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                            <h4 className="font-medium mb-2">Frontend</h4>
                            <ul className="space-y-1">
                                <li>• Next.js 15 avec App Router</li>
                                <li>• React 19 avec TypeScript</li>
                                <li>• Tailwind CSS v4</li>
                                <li>• Design responsive Mobile First</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Standards respectés</h4>
                            <ul className="space-y-1">
                                <li>• Architecture MVC</li>
                                <li>• Conformité RGPD</li>
                                <li>• Accessibilité RGAA</li>
                                <li>• Sécurité des données</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valeurs et engagements */}
            <section className="mb-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Les principes qui guident le développement et l'évolution de (RE)Sources Relationnelles.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibilité</h3>
                        <p className="text-gray-600">
                            Une plateforme accessible à tous les citoyens, quel que soit leur âge, leur situation sociale ou leurs capacités.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Heart className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Bienveillance</h3>
                        <p className="text-gray-600">
                            Des contenus expertisés et bienveillants pour accompagner chacun dans l'amélioration de ses relations.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Inclusion</h3>
                        <p className="text-gray-600">
                            Un espace d'échange et de partage respectueux de la diversité des situations et des besoins relationnels.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact et informations */}
            <section>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Une question sur le projet ?</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Pour toute question concernant (RE)Sources Relationnelles, n'hésitez pas à nous contacter
                        ou à consulter notre centre d'aide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/help">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                Centre d'aide
                            </button>
                        </Link>
                        <Link href="/about">
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
                                Nous contacter
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}