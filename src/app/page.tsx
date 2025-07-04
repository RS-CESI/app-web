import React from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Users, Heart, MessageCircle, TrendingUp, BookOpen, Play } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Hero Section */}
            <section className="py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Renforcez vos{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              relations humaines
            </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        (RE)Sources Relationnelles vous accompagne dans l'amélioration de vos relations personnelles,
                        familiales, amicales et professionnelles grâce à des ressources expertes et accessibles.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/resources">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center">
                                Découvrir les ressources
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </button>
                        </Link>
                        <Link href="/login">
                            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all">
                                Créer un compte gratuit
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white/50 rounded-2xl mb-20">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">850+</div>
                        <div className="text-gray-600">Citoyens accompagnés</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">1200+</div>
                        <div className="text-gray-600">Ressources disponibles</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                        <div className="text-gray-600">Satisfaction utilisateurs</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                        <div className="text-gray-600">Accès libre</div>
                    </div>
                </div>
            </section>

            {/* Types de Relations */}
            <section className="py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Pour tous types de relations
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Chaque relation nécessite une approche spécifique. Trouvez les ressources adaptées à vos besoins.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Heart className="h-6 w-6 text-pink-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Relations amoureuses</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Conseils pour construire et maintenir des relations de couple saines.
                        </p>
                        <Link href="/resources?type=couple" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir les ressources →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Relations familiales</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Outils pour renforcer les liens familiaux et améliorer la communication.
                        </p>
                        <Link href="/resources?type=famille" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir les ressources →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <MessageCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Relations amicales</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Stratégies pour développer et entretenir des amitiés durables.
                        </p>
                        <Link href="/resources?type=amitie" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir les ressources →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-yellow-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <TrendingUp className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Relations professionnelles</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Techniques pour améliorer la collaboration au travail.
                        </p>
                        <Link href="/resources?type=travail" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir les ressources →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Types de Ressources */}
            <section className="py-20 bg-gray-50 rounded-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Des ressources variées
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Articles, guides, exercices et activités pour enrichir vos compétences relationnelles.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Articles & Guides</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Contenus expertisés pour comprendre les mécanismes relationnels.
                        </p>
                        <Link href="/resources?type=articles" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Consulter →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Play className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Exercices pratiques</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Mettez en pratique avec des exercices concrets et interactifs.
                        </p>
                        <Link href="/resources?type=exercices" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Faire les exercices →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Activités de groupe</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Participez à des activités collaboratives et jeux interactifs.
                        </p>
                        <Link href="/resources?type=activites" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Rejoindre →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Ministère Section */}
            <section className="py-20">
                <div className="bg-white p-8 rounded-xl border border-gray-200">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Une initiative du Ministère des Solidarités et de la Santé
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            (RE)Sources Relationnelles s'inscrit dans la politique gouvernementale de cohésion sociale
                            et d'amélioration du bien-être des citoyens. Basé sur la pyramide de Maslow, ce projet
                            reconnaît l'importance des relations humaines pour l'épanouissement personnel.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Sécurité relationnelle</h4>
                            <p className="text-sm text-gray-600">Relations stables et fiables</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Appartenance sociale</h4>
                            <p className="text-sm text-gray-600">Liens sociaux et sentiment d'appartenance</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Accomplissement personnel</h4>
                            <p className="text-sm text-gray-600">Relations épanouissantes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Commencez votre parcours relationnel
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Rejoignez les centaines de citoyens qui améliorent leurs relations grâce à nos ressources gratuites.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                Créer mon compte
                            </button>
                        </Link>
                        <Link href="/resources">
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
                                Explorer les ressources
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Simple Testimonials */}
            <section className="py-20">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Témoignages d'utilisateurs
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex text-yellow-400 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            "Les ressources m'ont aidée à améliorer le dialogue avec mes enfants. Très utile et pratique."
                        </p>
                        <p className="text-gray-900 font-medium text-sm">Marie L., 42 ans</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex text-yellow-400 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            "Plateforme intuitive avec des conseils concrets. Notre relation de couple s'est améliorée."
                        </p>
                        <p className="text-gray-900 font-medium text-sm">Pierre M., 35 ans</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex text-yellow-400 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            "Les activités de groupe m'ont permis de rencontrer d'autres personnes. Très enrichissant."
                        </p>
                        <p className="text-gray-900 font-medium text-sm">Sophie R., 68 ans</p>
                    </div>
                </div>
            </section>

        </div>
    );
}