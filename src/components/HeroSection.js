'use client';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-light to-white py-section text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent opacity-10 rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary opacity-10 rounded-full blur-3xl animate-float delay-1000 -z-10" />

      <div className="max-w-4xl mx-auto px-container-px animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-dark mb-4 leading-tight tracking-tight drop-shadow-sm">
          Bienvenue sur <span className="text-primary animate-pulseSlow">(RE)Sources</span>
        </h1>
        <p className="text-xl text-dark/80 mb-10 max-w-2xl mx-auto">
          Des outils pour enrichir vos relations humaines et cultiver votre bien-être mental et social.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <button className="bg-primary text-dark px-7 py-3 rounded-button shadow-glow transition duration-300 hover:bg-primary-dark hover:scale-105 font-semibold">
            🚀 Explorer
          </button>
          <button className="bg-white text-dark border border-border px-7 py-3 rounded-button shadow-button hover:shadow-md transition duration-300 hover:scale-105 font-semibold">
            🔐 Connexion
          </button>
        </div>
      </div>
    </section>
  );
}
