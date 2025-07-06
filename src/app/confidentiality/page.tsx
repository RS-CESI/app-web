'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Eye, Lock, Download, Trash2, User, Mail, Calendar } from 'lucide-react';

export default function ConfidentialitePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Politique de confidentialité
                    </h1>
                </div>
                <p className="text-xl text-gray-600">
                    Comment nous protégeons et utilisons vos données personnelles sur (RE)Sources Relationnelles
                </p>
                <div className="mt-4 text-sm text-gray-500">
                    <p>Dernière mise à jour : 1er janvier 2025</p>
                    <p>Version : 1.0</p>
                </div>
            </div>

            {/* Navigation rapide */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">Navigation rapide</h2>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <a href="#collecte" className="text-blue-700 hover:text-blue-800">• Données collectées</a>
                    <a href="#utilisation" className="text-blue-700 hover:text-blue-800">• Utilisation des données</a>
                    <a href="#partage" className="text-blue-700 hover:text-blue-800">• Partage des données</a>
                    <a href="#conservation" className="text-blue-700 hover:text-blue-800">• Conservation</a>
                    <a href="#droits" className="text-blue-700 hover:text-blue-800">• Vos droits</a>
                    <a href="#securite" className="text-blue-700 hover:text-blue-800">• Sécurité</a>
                    <a href="#cookies" className="text-blue-700 hover:text-blue-800">• Cookies</a>
                    <a href="#contact" className="text-blue-700 hover:text-blue-800">• Contact</a>
                </div>
            </div>

            <div className="prose prose-lg max-w-none">

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                    <p className="text-gray-700 mb-4">
                        Le Ministère des Solidarités et de la Santé, responsable de la plateforme (RE)Sources Relationnelles,
                        s'engage à protéger votre vie privée et vos données personnelles conformément au Règlement Général
                        sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                    </p>
                    <p className="text-gray-700">
                        Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons,
                        stockons et protégeons vos données personnelles lorsque vous utilisez notre plateforme.
                    </p>
                </section>

                {/* Responsable de traitement */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsable du traitement</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                        <p className="text-gray-700 mb-2"><strong>Ministère des Solidarités et de la Santé</strong></p>
                        <p className="text-gray-600 text-sm">14 Avenue Duquesne, 75007 Paris, France</p>
                        <p className="text-gray-600 text-sm">Email : contact@resources-relationnelles.gouv.fr</p>
                        <p className="text-gray-600 text-sm">Téléphone : 01 40 56 60 00</p>
                    </div>
                </section>

                {/* Données collectées */}
                <section id="collecte" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Données que nous collectons</h2>

                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-3">
                                <User className="h-5 w-5 text-blue-600 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-900">Données d'identification</h3>
                            </div>
                            <ul className="text-gray-700 space-y-1">
                                <li>• Nom et prénom</li>
                                <li>• Adresse email</li>
                                <li>• Date de naissance (optionnelle)</li>
                                <li>• Ville de résidence (optionnelle)</li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-3">
                                <Eye className="h-5 w-5 text-green-600 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-900">Données d'utilisation</h3>
                            </div>
                            <ul className="text-gray-700 space-y-1">
                                <li>• Ressources consultées et temps passé</li>
                                <li>• Centres d'intérêt sélectionnés</li>
                                <li>• Ressources favorites</li>
                                <li>• Participation aux activités de groupe</li>
                                <li>• Commentaires et interactions</li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-3">
                                <Lock className="h-5 w-5 text-purple-600 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-900">Données techniques</h3>
                            </div>
                            <ul className="text-gray-700 space-y-1">
                                <li>• Adresse IP (anonymisée)</li>
                                <li>• Type de navigateur et version</li>
                                <li>• Système d'exploitation</li>
                                <li>• Données de connexion (dates, durées)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Utilisation */}
                <section id="utilisation" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisation de vos données</h2>
                    <p className="text-gray-700 mb-4">Nous utilisons vos données personnelles pour :</p>
                    <ul className="text-gray-700 space-y-2 mb-6">
                        <li>• <strong>Fournir le service :</strong> Créer et gérer votre compte, personnaliser votre expérience</li>
                        <li>• <strong>Améliorer la plateforme :</strong> Analyser l'utilisation pour optimiser nos contenus</li>
                        <li>• <strong>Communication :</strong> Vous envoyer des notifications selon vos préférences</li>
                        <li>• <strong>Support :</strong> Répondre à vos questions et résoudre les problèmes techniques</li>
                        <li>• <strong>Sécurité :</strong> Protéger la plateforme contre les fraudes et abus</li>
                        <li>• <strong>Obligations légales :</strong> Respecter nos obligations réglementaires</li>
                    </ul>
                </section>

                {/* Partage */}
                <section id="partage" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Partage de vos données</h2>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                        <p className="text-green-800 font-semibold">
                            ⚠️ Important : Nous ne vendons jamais vos données personnelles à des tiers.
                        </p>
                    </div>
                    <p className="text-gray-700 mb-4">Vos données peuvent être partagées uniquement dans les cas suivants :</p>
                    <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Prestataires techniques :</strong> Hébergement sécurisé (données chiffrées)</li>
                        <li>• <strong>Obligations légales :</strong> Autorités compétentes en cas de réquisition judiciaire</li>
                        <li>• <strong>Activités de groupe :</strong> Prénom visible aux autres participants (avec votre consentement)</li>
                    </ul>
                </section>

                {/* Conservation */}
                <section id="conservation" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Conservation des données</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type de données</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Durée de conservation</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 py-3 text-sm text-gray-700">Données de compte actif</td>
                                <td className="px-4 py-3 text-sm text-gray-700">Tant que le compte est actif</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-sm text-gray-700">Données de compte inactif</td>
                                <td className="px-4 py-3 text-sm text-gray-700">3 ans après dernière connexion</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-sm text-gray-700">Données techniques (logs)</td>
                                <td className="px-4 py-3 text-sm text-gray-700">13 mois maximum</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-sm text-gray-700">Données supprimées</td>
                                <td className="px-4 py-3 text-sm text-gray-700">30 jours (sauvegarde de sécurité)</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Droits */}
                <section id="droits" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos droits RGPD</h2>
                    <p className="text-gray-700 mb-6">Conformément au RGPD, vous disposez des droits suivants :</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Droit d'accès</h4>
                            <p className="text-gray-600 text-sm">Obtenir une copie de vos données personnelles</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Droit de rectification</h4>
                            <p className="text-gray-600 text-sm">Corriger des données inexactes ou incomplètes</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Droit à l'effacement</h4>
                            <p className="text-gray-600 text-sm">Demander la suppression de vos données</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Droit à la portabilité</h4>
                            <p className="text-gray-600 text-sm">Récupérer vos données dans un format lisible</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Droit d'opposition</h4>
                            <p className="text-gray-600 text-sm">Vous opposer au traitement de vos données</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Droit de limitation</h4>
                            <p className="text-gray-600 text-sm">Limiter le traitement de vos données</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-2">Comment exercer vos droits ?</h4>
                        <p className="text-blue-800 text-sm mb-3">
                            Vous pouvez exercer vos droits directement depuis votre profil ou en nous contactant :
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/profil" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                Gérer mes données
                            </Link>
                            <a href="mailto:dpo@resources-relationnelles.gouv.fr" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors">
                                Contacter le DPO
                            </a>
                        </div>
                    </div>
                </section>

                {/* Sécurité */}
                <section id="securite" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Sécurité des données</h2>
                    <p className="text-gray-700 mb-6">
                        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Lock className="h-6 w-6 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Chiffrement</h4>
                            <p className="text-gray-600 text-sm">Données chiffrées en transit et au repos (AES-256)</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Accès contrôlé</h4>
                            <p className="text-gray-600 text-sm">Accès limité aux seuls personnels autorisés</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Download className="h-6 w-6 text-purple-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Sauvegardes</h4>
                            <p className="text-gray-600 text-sm">Sauvegardes régulières et sécurisées</p>
                        </div>
                    </div>
                </section>

                {/* Cookies */}
                <section id="cookies" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies et traceurs</h2>
                    <p className="text-gray-700 mb-4">
                        Nous utilisons uniquement des cookies essentiels au fonctionnement de la plateforme :
                    </p>
                    <ul className="text-gray-700 space-y-2 mb-4">
                        <li>• <strong>Cookies de session :</strong> Maintenir votre connexion</li>
                        <li>• <strong>Cookies de préférences :</strong> Sauvegarder vos paramètres</li>
                        <li>• <strong>Cookies de sécurité :</strong> Protéger contre les attaques</li>
                    </ul>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 text-sm">
                            <strong>Aucun cookie publicitaire ou de suivi</strong> n'est utilisé sur cette plateforme gouvernementale.
                        </p>
                    </div>
                </section>

                {/* Contact DPO */}
                <section id="contact" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact - Délégué à la protection des données</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <Mail className="h-5 w-5 text-blue-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-900">Délégué à la Protection des Données (DPO)</h3>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Email :</strong> dpo@resources-relationnelles.gouv.fr</p>
                            <p><strong>Courrier :</strong> DPO - Ministère des Solidarités et de la Santé</p>
                            <p className="ml-16">14 Avenue Duquesne, 75007 Paris, France</p>
                            <p><strong>Réponse :</strong> Sous 30 jours maximum</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 rounded-lg p-4">
                        <p className="text-blue-800 text-sm">
                            <strong>Recours :</strong> En cas de non-réponse ou de réponse insatisfaisante, vous pouvez saisir la
                            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900"> CNIL</a>.
                        </p>
                    </div>
                </section>

                {/* Modifications */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications de cette politique</h2>
                    <p className="text-gray-700 mb-4">
                        Cette politique de confidentialité peut être mise à jour pour refléter les changements
                        dans nos pratiques ou pour des raisons légales. Les modifications importantes vous seront
                        notifiées par email ou via un message sur la plateforme.
                    </p>
                    <p className="text-gray-600 text-sm">
                        Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques de confidentialité.
                    </p>
                </section>

            </div>
        </div>
    );
}