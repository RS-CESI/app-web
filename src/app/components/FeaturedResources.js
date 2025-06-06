'use client';

import ResourceCard from './ResourceCard';

const mockResources = [
  { id: '1', title: 'Respiration guidée', color: '#FFD93D' },
  { id: '2', title: 'Méditation zen', color: '#6BCB77' },
  { id: '3', title: 'Podcast motivation', color: '#4D96FF' },
  { id: '4', title: 'Visualisation positive', color: '#FF6B6B' },
  { id: '5', title: 'Séance audio calme', color: '#845EC2' },
];

export default function FeaturedResources() {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Ressources en vedette</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {mockResources.map(resource => (
          <ResourceCard key={resource.id} title={resource.title} color={resource.color} />
        ))}
      </div>
    </section>
  );
}
