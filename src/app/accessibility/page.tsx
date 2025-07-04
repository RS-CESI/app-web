'use client';

import Head from 'next/head'
import { Accessibility, AlertCircle, Phone, Mail, ExternalLink, Monitor, Keyboard } from 'lucide-react'

export default function AccessibilityPage() {
    return (
        <>
            <Head>
                <title>Déclaration d'accessibilité - Plateforme Relations Humaines</title>
                <meta name="description" content="Déclaration d'accessibilité numérique de la plateforme gouvernementale" />
            </Head>

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                                    <Accessibility className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Déclaration d'accessibilité</h1>
                                    <p className="text-gray-600">Ministère des Solidarités et de la Santé</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 text-gray-700">
                            <section>
                                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                                    <div className="flex items-center mb-2">
                                        <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                                        <p className="text-lg font-medium text-orange-900">
                                            Statut de conformité : <span className="font-bold">Non conforme</span>
                                        </p>
                                    </div>
                                    <p className="text-orange-800">
                                        Cette plateforme gouvernementale dédiée à l'amélioration des relations humaines
                                        n'est pas encore entièrement conforme au RGAA 4.1.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                                <p className="mb-4">
                                    Le Ministère des Solidarités et de la Santé s'engage à rendre sa plateforme numérique
                                    accessible à tous les citoyens, conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005
                                    et au décret n° 2019-768 du 24 juillet 2019.
                                </p>
                                <p>
                                    Cette déclaration d'accessibilité s'applique à la plateforme Relations Humaines
                                    (plateforme-relations-humaines.gouv.fr).
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Monitor className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">2. État de conformité</h2>
                                </div>
                                <p className="mb-4">
                                    La plateforme Relations Humaines n'est <strong>pas encore conforme</strong> au Référentiel Général
                                    d'Amélioration de l'Accessibilité (RGAA) version 4.1. Nous travaillons activement à l'amélioration
                                    de l'accessibilité de notre service dans le cadre de notre mission de service public inclusif.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-blue-800">
                                        <strong>Audit en cours :</strong> Un audit complet d'accessibilité est actuellement en cours
                                        et sera finalisé d'ici le {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">3. Contenus non accessibles</h2>
                                </div>
                                <p className="mb-4">
                                    Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes :
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-3">Non-conformité au RGAA 4.1</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-red-50 p-4 rounded-lg">
                                                <h4 className="font-medium text-red-900 mb-2">Images et médias</h4>
                                                <ul className="text-sm text-red-800 space-y-1">
                                                    <li>• Alternatives textuelles manquantes sur certaines images</li>
                                                    <li>• Descriptions insuffisantes pour les graphiques</li>
                                                    <li>• Vidéos sans sous-titres synchronisés</li>
                                                </ul>
                                            </div>
                                            <div className="bg-red-50 p-4 rounded-lg">
                                                <h4 className="font-medium text-red-900 mb-2">Navigation et structure</h4>
                                                <ul className="text-sm text-red-800 space-y-1">
                                                    <li>• Hiérarchie des titres non optimale</li>
                                                    <li>• Liens non explicites dans certains contextes</li>
                                                    <li>• Plan du site incomplet</li>
                                                </ul>
                                            </div>
                                            <div className="bg-red-50 p-4 rounded-lg">
                                                <h4 className="font-medium text-red-900 mb-2">Couleurs et contrastes</h4>
                                                <ul className="text-sm text-red-800 space-y-1">
                                                    <li>• Contrastes insuffisants sur certains éléments</li>
                                                    <li>• Information véhiculée uniquement par la couleur</li>
                                                    <li>• Textes sur arrière-plans complexes</li>
                                                </ul>
                                            </div>
                                            <div className="bg-red-50 p-4 rounded-lg">
                                                <h4 className="font-medium text-red-900 mb-2">Interactions et formulaires</h4>
                                                <ul className="text-sm text-red-800 space-y-1">
                                                    <li>• Étiquettes manquantes sur certains champs</li>
                                                    <li>• Navigation au clavier non optimisée</li>
                                                    <li>• Messages d'erreur peu explicites</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-3">Charge disproportionnée</h3>
                                        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                                            <ul className="space-y-2">
                                                <li>• Certains outils interactifs complexes nécessitent des développements importants</li>
                                                <li>• Adaptations spécifiques pour les contenus multimédias archivés</li>
                                                <li>• Mise en conformité de certains documents PDF historiques</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Keyboard className="w-5 h-5 text-green-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">4. Contenus accessibles</h2>
                                </div>
                                <p className="mb-4">
                                    Malgré les non-conformités identifiées, la plateforme propose déjà plusieurs fonctionnalités accessibles :
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-green-900 mb-2">Navigation</h4>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            <li>✓ Navigation principale cohérente</li>
                                            <li>✓ Fil d'Ariane sur la majorité des pages</li>
                                            <li>✓ Liens d'évitement vers le contenu</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-green-900 mb-2">Contenu</h4>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            <li>✓ Structure HTML sémantique</li>
                                            <li>✓ Contrastes respectés sur les éléments principaux</li>
                                            <li>✓ Taille de police adaptable</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Phone className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">5. Amélioration et contact</h2>
                                </div>
                                <p className="mb-4">
                                    Si vous rencontrez des difficultés d'accès ou si vous avez des suggestions d'amélioration,
                                    nous vous encourageons vivement à nous contacter. Votre retour nous aide à améliorer
                                    l'accessibilité de notre service public.
                                </p>

                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="font-medium text-blue-900 mb-4">Moyens de contact pour l'accessibilité</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <Mail className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                                            <div>
                                                <strong className="text-blue-900">Email dédié :</strong>
                                                <a href="mailto:accessibilite.relations-humaines@sante.gouv.fr"
                                                   className="text-blue-600 hover:underline ml-1">
                                                    accessibilite.relations-humaines@sante.gouv.fr
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Phone className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                                            <div>
                                                <strong className="text-blue-900">Numéro d'aide :</strong>
                                                <span className="ml-1">0 800 11 10 11 (appel gratuit)</span><br />
                                                <span className="text-sm text-blue-700">Du lundi au vendredi de 9h à 17h</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <ExternalLink className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                                            <div>
                                                <strong className="text-blue-900">Formulaire en ligne :</strong>
                                                <a href="#" className="text-blue-600 hover:underline ml-1">
                                                    Signaler un problème d'accessibilité
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Voies de recours</h2>
                                <p className="mb-4">
                                    Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à un contenu
                                    ou une fonctionnalité de la plateforme, que vous nous le signalez et que vous ne parvenez
                                    pas à obtenir une réponse de notre part, vous êtes en droit de faire appel au
                                    Défenseur des droits.
                                </p>

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-4">Défenseur des droits</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <strong>Formulaire de contact :</strong><br />
                                                <a href="https://formulaire.defenseurdesdroits.fr/"
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   className="text-blue-600 hover:underline">
                                                    https://formulaire.defenseurdesdroits.fr/
                                                </a>
                                            </div>
                                            <div>
                                                <strong>Téléphone :</strong><br />
                                                09 69 39 00 00 (coût d'un appel local)
                                            </div>
                                        </div>
                                        <div>
                                            <strong>Adresse :</strong><br />
                                            Défenseur des droits<br />
                                            Libre accès au numérique<br />
                                            CS 73228<br />
                                            75334 Paris Cedex 07
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Technologies utilisées</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Technologies web</h3>
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>HTML5</li>
                                            <li>CSS3</li>
                                            <li>JavaScript</li>
                                            <li>React 18</li>
                                            <li>Next.js 14</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Outils d'accessibilité</h3>
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>ARIA (Accessible Rich Internet Applications)</li>
                                            <li>Landmarks ARIA</li>
                                            <li>Technologies d'assistance compatibles</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Environnement de test</h2>
                                <p className="mb-4">
                                    Les vérifications d'accessibilité ont été réalisées avec les combinaisons suivantes :
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium mb-2">Lecteurs d'écran</h4>
                                            <ul className="text-sm space-y-1">
                                                <li>• NVDA 2023.3 + Firefox 120 (Windows)</li>
                                                <li>• JAWS 2024 + Chrome 120 (Windows)</li>
                                                <li>• VoiceOver + Safari 17 (macOS)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Outils d'audit</h4>
                                            <ul className="text-sm space-y-1">
                                                <li>• axe DevTools</li>
                                                <li>• WAVE (Web Accessibility Evaluation Tool)</li>
                                                <li>• Contrast Checker</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Calendrier de mise en conformité</h2>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                                            <span><strong>Trimestre 1 2025 :</strong> Correction des contrastes et navigation clavier</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                                            <span><strong>Trimestre 2 2025 :</strong> Amélioration des formulaires et alternatives textuelles</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                                            <span><strong>Trimestre 3 2025 :</strong> Audit complet et certification RGAA 4.1</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-500">
                                        <strong>Cette déclaration a été établie le :</strong> {new Date().toLocaleDateString('fr-FR')}<br />
                                        <strong>Elle a été mise à jour le :</strong> {new Date().toLocaleDateString('fr-FR')}<br />
                                        <strong>Technologies utilisées pour réaliser l'audit :</strong> Tests manuels, outils automatisés, tests utilisateurs
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}