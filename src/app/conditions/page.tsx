'use client';

import Head from 'next/head'
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Scale } from 'lucide-react'

export default function ConditionsPage() {
    return (
        <>
            <Head>
                <title>Conditions d'utilisation - Plateforme Relations Humaines</title>
                <meta name="description" content="Conditions générales d'utilisation de la plateforme gouvernementale" />
            </Head>

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Conditions d'utilisation</h1>
                                    <p className="text-gray-600">Ministère des Solidarités et de la Santé</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 text-gray-700">
                            <section>
                                <div className="flex items-center mb-4">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">1. Objet et acceptation</h2>
                                </div>
                                <p className="mb-4">
                                    La présente plateforme est un service public numérique développé par le Ministère des Solidarités et de la Santé
                                    dans le cadre de sa mission d'amélioration des relations humaines et du bien-être social.
                                </p>
                                <p>
                                    L'utilisation de cette plateforme implique l'acceptation pleine et entière des présentes conditions d'utilisation.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">2. Description du service</h2>
                                </div>
                                <p className="mb-4">
                                    Cette plateforme gouvernementale vous permet de :
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-blue-900 mb-2">Services d'accompagnement</h3>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• Accès à des ressources de soutien</li>
                                            <li>• Orientation vers les services sociaux</li>
                                            <li>• Suivi personnalisé</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-green-900 mb-2">Outils relationnels</h3>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            <li>• Formation aux compétences sociales</li>
                                            <li>• Ateliers de communication</li>
                                            <li>• Ressources pédagogiques</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="mt-4">
                                    Le Ministère se réserve le droit de modifier, suspendre ou interrompre tout ou partie du service,
                                    temporairement ou définitivement, sans préavis.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">3. Conditions d'accès</h2>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <h3 className="font-medium text-gray-900 mb-2">Éligibilité</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span>Être majeur ou représenté légalement</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span>Résider en France métropolitaine ou dans les territoires d'outre-mer</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span>Fournir des informations exactes et à jour</span>
                                        </li>
                                    </ul>
                                </div>
                                <p>
                                    L'accès à certains services peut être conditionné à l'évaluation de votre situation par nos équipes.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">4. Obligations de l'utilisateur</h2>
                                </div>
                                <p className="mb-4">
                                    En utilisant cette plateforme, vous vous engagez à :
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <div>
                                            <strong>Respecter la loi :</strong> Ne pas utiliser le service à des fins illégales ou contraires à l'ordre public
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <div>
                                            <strong>Préserver la confidentialité :</strong> Respecter la vie privée des autres utilisateurs
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <div>
                                            <strong>Utilisation appropriée :</strong> Ne pas perturber le fonctionnement du service
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <div>
                                            <strong>Sincérité :</strong> Fournir des informations exactes et ne pas usurper l'identité d'autrui
                                        </div>
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Responsabilités</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Du Ministère</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li>• Assurer la disponibilité du service dans la mesure du possible</li>
                                            <li>• Protéger la confidentialité de vos données</li>
                                            <li>• Fournir un service conforme aux standards de qualité</li>
                                            <li>• Respecter la neutralité du service public</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">De l'utilisateur</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li>• Utiliser le service de manière appropriée</li>
                                            <li>• Protéger ses identifiants de connexion</li>
                                            <li>• Signaler tout dysfonctionnement</li>
                                            <li>• Respecter les autres utilisateurs</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation de responsabilité</h2>
                                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                                    <p className="mb-3">
                                        Le Ministère ne saurait être tenu responsable :
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Des interruptions de service dues à des opérations de maintenance ou à des circonstances indépendantes de sa volonté</li>
                                        <li>De l'utilisation inappropriée du service par les utilisateurs</li>
                                        <li>Des dommages résultant de l'inexactitude des informations fournies par les utilisateurs</li>
                                        <li>Des conséquences d'une utilisation non conforme aux présentes conditions</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Propriété intellectuelle</h2>
                                <p className="mb-4">
                                    L'ensemble des contenus présents sur cette plateforme (textes, images, vidéos, outils) sont protégés
                                    par le droit de la propriété intellectuelle et appartiennent au Ministère des Solidarités et de la Santé
                                    ou à leurs ayants droit.
                                </p>
                                <p>
                                    Toute reproduction, représentation, modification, publication, adaptation sans autorisation préalable
                                    est interdite et peut constituer une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Suspension et résiliation</h2>
                                <p className="mb-4">
                                    Le Ministère se réserve le droit de suspendre ou de résilier l'accès au service :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>En cas de non-respect des présentes conditions d'utilisation</li>
                                    <li>En cas d'utilisation frauduleuse ou abusive du service</li>
                                    <li>Pour des raisons de sécurité ou de maintenance</li>
                                    <li>Sur demande de l'utilisateur</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Évolution des conditions</h2>
                                <p>
                                    Le Ministère se réserve le droit de modifier les présentes conditions d'utilisation à tout moment.
                                    Les nouvelles conditions seront applicables dès leur mise en ligne. Il est recommandé de consulter
                                    régulièrement cette page.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Scale className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">10. Droit applicable et médiation</h2>
                                </div>
                                <p className="mb-4">
                                    Les présentes conditions d'utilisation sont soumises au droit français. En cas de litige,
                                    une solution amiable sera recherchée avant tout recours contentieux.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-blue-800">
                                        <strong>Médiation :</strong> Vous pouvez recourir gratuitement au médiateur des ministères sociaux
                                        en cas de litige persistant.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <p className="text-sm text-gray-500 mt-8 pt-6 border-t border-gray-200">
                                    <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}