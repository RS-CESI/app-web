'use client';

import { useEffect, useState } from 'react';
import { MyResourcesApi, MyResource, PaginatedMyResourcesResponse } from '@/lib/api/myResources';
import { useRouter } from 'next/navigation';

export default function MyResourcesPage() {
    const [resources, setResources] = useState<MyResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<{
        current_page: number;
        last_page: number;
    }>({ current_page: 1, last_page: 1 });

    const router = useRouter();

    const fetchResources = async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response: PaginatedMyResourcesResponse = await MyResourcesApi.getMyResources({ page });
            setResources(response.data);
            setMeta({
                current_page: response.current_page,
                last_page: response.last_page,
            });
        } catch (err: any) {
            setError(err?.data?.message ?? 'Erreur inconnue');
            if (err.status === 401) {
                localStorage.removeItem('auth_token');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources(page);
    }, [page]);

    const handleNext = () => {
        if (page < meta.last_page) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p className="text-red-500">Erreur : {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mes ressources</h1>
            {resources.length === 0 ? (
                <p>Aucune ressource trouvée.</p>
            ) : (
                <ul className="space-y-4">
                    {resources.map((resource) => (
                        <li key={resource.id} className="bg-white shadow p-4 rounded">
                            <h2 className="text-lg font-semibold">{resource.title}</h2>
                            <p className="text-sm text-gray-600">Catégorie : {resource.category?.name}</p>
                            <p className="text-sm text-gray-500">Créée le : {new Date(resource.created_at).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Précédent
                </button>
                <span className="text-sm text-gray-700">Page {meta.current_page} / {meta.last_page}</span>
                <button
                    onClick={handleNext}
                    disabled={page === meta.last_page}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
