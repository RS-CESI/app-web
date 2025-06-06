'use client';

export default function Footer() {
  return (
    <footer className="mt-20 py-6 border-t text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} (RE)Sources. Tous droits réservés.</p>
    </footer>
  );
}
