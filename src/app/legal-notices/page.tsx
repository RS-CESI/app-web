'use client';

import Head from 'next/head'
import { Building, Mail, Phone, ExternalLink, FileText, Globe, Shield, AlertTriangle } from 'lucide-react'

export default function LegalMentionsPage() {
    return (
        <>
            <Head>
                <title>Mentions légales - Plateforme Relations Humaines</title>
                <meta name="description" content="Mentions légales et informations sur l'éditeur de la plateforme gouvernementale" />
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
                                    <h1 className="text-3xl font-bold text-gray-900">Mentions légales</h1>
                                    <p className="text-gray-600">Ministère des Solidarités et de la Santé</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 text-gray-700">
                            <section>
                                <div className="flex items-center mb-4">
                                    <Building className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">1. Éditeur du site</h2>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="mb-2"><strong>Ministère des Solidarités et de la Santé</strong></p>
                                            <p className="mb-1"><strong>Adresse :</strong> 14 avenue Duquesne</p>
                                            <p className="mb-1">75007 Paris</p>
                                            <p className="mb-3"><strong>France</strong></p>

                                            <div className="flex items-center mb-2">
                                                <Phone className="w-4 h-4 text-blue-600 mr-2" />
                                                <span><strong>Téléphone :</strong> 01 40 56 60 00</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Globe className="w-4 h-4 text-blue-600 mr-2" />
                                                <span><strong>Site web :</strong>
                          <a href="https://solidarites-sante.gouv.fr"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-blue-600 hover:underline ml-1">
                            solidarites-sante.gouv.fr
                          </a>
                        </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-2"><strong>Directeur de la publication :</strong></p>
                                            <p className="mb-1">Ministre des Solidarités et de la Santé</p>
                                            <p className="mb-3">ou son représentant dûment habilité</p>

                                            <div className="flex items-center mb-2">
                                                <Mail className="w-4 h-4 text-blue-600 mr-2" />
                                                <span><strong>Contact :</strong>
                          <a href="mailto:contact.relations-humaines@sante.gouv.fr"
                             className="text-blue-600 hover:underline ml-1">
                            contact.relations-humaines@sante.gouv.fr
                          </a>
                        </span>
                                            </div>
                                            <p className="text-sm text-blue-700">
                                                <strong>SIRET :</strong> 110 092 174 00016<br />
                                                <strong>Code APE :</strong> 8411Z
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Globe className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">2. Hébergement</h2>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="mb-2"><strong>Direction interministérielle du numérique (DINUM)</strong></p>
                                            <p className="mb-1">20 avenue de Ségur</p>
                                            <p className="mb-1">75007 Paris</p>
                                            <p className="mb-3">France</p>
                                            <p className="text-sm">
                                                <strong>Infrastructure :</strong> Cloud souverain français<br />
                                                <strong>Certification :</strong> SecNumCloud (ANSSI)
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-2"><strong>Informations techniques :</strong></p>
                                            <ul className="text-sm space-y-1">
                                                <li>• Hébergement en France métropolitaine</li>
                                                <li>• Conformité RGPD garantie</li>
                                                <li>• Sauvegardes quotidiennes sécurisées</li>
                                                <li>• Monitoring 24h/24, 7j/7</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Conception et développement</h2>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="mb-2"><strong>Maîtrise d'ouvrage :</strong></p>
                                            <p className="mb-1">Direction Générale de la Cohésion Sociale (DGCS)</p>
                                            <p className="mb-1">Ministère des Solidarités et de la Santé</p>
                                            <p className="mb-3">
                                                <a href="mailto:dgcs.relations-humaines@sante.gouv.fr"
                                                   className="text-green-600 hover:underline">
                                                    dgcs.relations-humaines@sante.gouv.fr
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-2"><strong>Développement technique :</strong></p>
                                            <p className="mb-1">Équipe interne DINUM</p>
                                            <p className="mb-1">En collaboration avec la Fabrique numérique</p>
                                            <p className="mb-3">des ministères sociaux</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
                                <p className="mb-4">
                                    L'ensemble de cette plateforme relève de la législation française et internationale sur le droit d'auteur
                                    et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour
                                    les documents téléchargeables et les représentations iconographiques et photographiques.
                                </p>

                                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
                                    <h3 className="font-medium text-yellow-900 mb-2">Droits d'usage</h3>
                                    <p className="text-yellow-800 text-sm">
                                        Les contenus de cette plateforme sont mis à disposition sous
                                        <a href="https://www.etalab.gouv.fr/licence-ouverte-open-licence"
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="text-yellow-700 hover:underline ml-1">
                                            Licence Ouverte / Open Licence
                                        </a>
                                        sauf mention contraire.
                                    </p>
                                </div>

                                <p>
                                    La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit
                                    à des fins commerciales est formellement interdite sauf autorisation expresse du directeur de la publication.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Responsabilité</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Disponibilité du service</h3>
                                        <p className="text-sm">
                                            Le Ministère s'efforce d'assurer au mieux de ses possibilités, la continuité et la disponibilité
                                            du service. Cependant, il ne peut être tenu responsable des éventuelles indisponibilités du service.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Contenu et utilisation</h3>
                                        <p className="text-sm">
                                            Le Ministère ne pourra être tenu responsable des dommages directs et indirects causés au matériel
                                            de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel
                                            ne répondant pas aux spécifications indiquées au point 9, soit de l'apparition d'un bug ou d'une incompatibilité.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <ExternalLink className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">6. Liens hypertextes</h2>
                                </div>
                                <p className="mb-4">
                                    Des liens hypertextes peuvent être présents sur la plateforme. Le Ministère n'a pas de contrôle
                                    sur le contenu des pages web sur lesquelles aboutissent ces liens et ne saurait,
                                    en aucun cas, être responsable de ce contenu.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-blue-800 text-sm">
                                        <strong>Liens vers des sites partenaires :</strong> Les liens vers des organismes publics
                                        (CAF, CPAM, collectivités territoriales) sont maintenus et vérifiés régulièrement.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Données personnelles et cookies</h2>
                                <p className="mb-4">
                                    Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au
                                    Règlement Général sur la Protection des Données (RGPD), vous bénéficiez d'un droit d'accès
                                    et de rectification aux informations qui vous concernent.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-900 mb-2">Protection des données</h3>
                                        <p className="text-sm mb-2">
                                            Pour plus d'informations, consultez notre
                                            <a href="/confidentiality" className="text-blue-600 hover:underline mx-1">
                                                politique de confidentialité
                                            </a>.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-900 mb-2">Cookies</h3>
                                        <p className="text-sm">
                                            Cette plateforme utilise uniquement des cookies techniques nécessaires
                                            au fonctionnement du service (pas de cookies publicitaires).
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">8. Sécurité</h2>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mb-4">
                                    <h3 className="font-medium text-red-900 mb-2">Signalement de vulnérabilités</h3>
                                    <p className="text-red-800 text-sm mb-2">
                                        Si vous découvrez une vulnérabilité de sécurité sur cette plateforme,
                                        nous vous encourageons à nous la signaler de manière responsable.
                                    </p>
                                    <p className="text-red-800 text-sm">
                                        Contactez-nous à l'adresse :
                                        <a href="mailto:security.relations-humaines@sante.gouv.fr"
                                           className="text-red-700 hover:underline ml-1">
                                            security.relations-humaines@sante.gouv.fr
                                        </a>
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Mesures de sécurité</h3>
                                    <ul className="text-sm space-y-1">
                                        <li>• Chiffrement des données en transit et au repos</li>
                                        <li>• Authentification renforcée pour les utilisateurs</li>
                                        <li>• Audits de sécurité réguliers</li>
                                        <li>• Surveillance continue des accès</li>
                                        <li>• Conformité aux référentiels de sécurité de l'État</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Prérequis techniques</h2>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-3">Navigateurs supportés</h3>
                                            <ul className="text-sm space-y-1">
                                                <li>• Chrome (version 90 et supérieure)</li>
                                                <li>• Firefox (version 88 et supérieure)</li>
                                                <li>• Safari (version 14 et supérieure)</li>
                                                <li>• Edge (version 90 et supérieure)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-3">Configuration recommandée</h3>
                                            <ul className="text-sm space-y-1">
                                                <li>• JavaScript activé</li>
                                                <li>• Cookies autorisés</li>
                                                <li>• Résolution minimale : 1024x768</li>
                                                <li>• Connexion internet stable</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Accessibilité</h2>
                                <p className="mb-4">
                                    Cette plateforme est conçue pour être accessible à tous les utilisateurs, conformément aux
                                    standards d'accessibilité web WCAG 2.1 niveau AA et au Référentiel Général d'Amélioration de l'Accessibilité (RGAA).
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-blue-900 mb-2">Fonctionnalités d'accessibilité</h3>
                                    <ul className="text-blue-800 text-sm space-y-1">
                                        <li>• Navigation au clavier</li>
                                        <li>• Compatibilité avec les lecteurs d'écran</li>
                                        <li>• Contrastes de couleurs adaptés</li>
                                        <li>• Textes alternatifs pour les images</li>
                                        <li>• Taille de police ajustable</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center mb-4">
                                    <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-900">11. Droit applicable et juridictions</h2>
                                </div>
                                <p className="mb-4">
                                    Tout litige en relation avec l'utilisation de cette plateforme est soumis au droit français.
                                    En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable,
                                    les tribunaux français seront seuls compétents.
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Médiation</h3>
                                    <p className="text-sm">
                                        En cas de litige, vous pouvez saisir le
                                        <a href="https://www.defenseurdesdroits.fr"
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="text-blue-600 hover:underline mx-1">
                                            Défenseur des droits
                                        </a>
                                        ou le
                                        <a href="https://www.service-public.fr/particuliers/vosdroits/F20851"
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="text-blue-600 hover:underline mx-1">
                                            médiateur des relations avec les services publics
                                        </a>.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Mise à jour des mentions légales</h2>
                                <p className="mb-4">
                                    Les présentes mentions légales peuvent être modifiées à tout moment par le directeur de la publication.
                                    Les utilisateurs sont invités à les consulter régulièrement.
                                </p>
                                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                    <p className="text-green-800 text-sm">
                                        <strong>Dernière mise à jour :</strong> 4 juillet 2025<br />
                                        <strong>Version :</strong> 1.2
                                    </p>
                                </div>
                            </section>

                            <section className="border-t pt-6">
                                <div className="bg-blue-600 text-white p-6 rounded-lg">
                                    <h3 className="font-medium mb-3">Contact et support</h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="mb-1"><strong>Support technique :</strong></p>
                                            <p className="mb-2">
                                                <a href="mailto:support.relations-humaines@sante.gouv.fr"
                                                   className="text-blue-200 hover:underline">
                                                    support.relations-humaines@sante.gouv.fr
                                                </a>
                                            </p>
                                            <p><strong>Horaires :</strong> Lundi-Vendredi, 9h-17h</p>
                                        </div>
                                        <div>
                                            <p className="mb-1"><strong>Questions générales :</strong></p>
                                            <p className="mb-2">
                                                <a href="mailto:contact.relations-humaines@sante.gouv.fr"
                                                   className="text-blue-200 hover:underline">
                                                    contact.relations-humaines@sante.gouv.fr
                                                </a>
                                            </p>
                                            <p><strong>Téléphone :</strong> 01 40 56 60 00</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}