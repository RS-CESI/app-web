import HeroSection from '@/app/components/HeroSection';
import FeaturedResources from '@/app/components/FeaturedResources';
import Footer from '@/app/components/footer_common';

export const metadata = {
  title: '(RE)Sources Relationnelles',
  description: 'Des outils pour enrichir vos relations humaines.',
};

export default function Home() {
  return (
    <main className="bg-light text-dark font-sans">
      <HeroSection />
      <FeaturedResources />
      <Footer />
    </main>
  );
}
