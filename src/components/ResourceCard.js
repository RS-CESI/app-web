'use client';

export default function ResourceCard({ title, color }) {
  return (
    <div
      className="rounded-2xl shadow-md p-6 w-full sm:w-60 text-white font-semibold transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <h3 className="text-lg">{title}</h3>
    </div>
  );
}
