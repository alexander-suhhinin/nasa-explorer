import { useQuery } from '@tanstack/react-query';
import { getNeoWs } from '../services/api';
import type { NeoObject } from '../services/api';
import { useState } from 'react';
import Card, { SkeletonCard } from '../components/Card';

export default function NeoWs() {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<'name' | 'estimated_diameter_m' | 'close_approach_date'>('close_approach_date');
  const [sortAsc, setSortAsc] = useState(true);
  const pageSize = 10;

  const { data, isLoading, isError } = useQuery<NeoObject[]>({
    queryKey: ['neows'],
    queryFn: () => getNeoWs(),
    retry: 0,
  });

  if (isLoading && !isError) {
    return <SkeletonCard className="max-w-3xl mx-auto" />;
  }


  if (isError || !data) {
    return (
      <Card className="max-w-3xl mx-auto text-center">
        <div className="p-4 text-red-500 font-semibold">
          ⚠️ Failed to load NeoWs data. Please try again later.
        </div>
      </Card>
    );
  }
  // Sort data
  const sortedData = [...data].sort((a, b) => {
    let valA: string | number = a[sortField];
    let valB: string | number = b[sortField];

    if (sortField === 'close_approach_date') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: typeof sortField) => {
    if (field === sortField) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Near-Earth Objects (NeoWs)</h1>
      <div className="overflow-x-auto border rounded shadow mb-4">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('close_approach_date')}>
                Close Approach Date {sortField === 'close_approach_date' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('estimated_diameter_m')}>
                Estimated Diameter (m) {sortField === 'estimated_diameter_m' && (sortAsc ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border">Hazardous</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((neo) => (
              <tr key={neo.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border font-medium">{neo.name}</td>
                <td className="px-4 py-2 border">{neo.close_approach_date}</td>
                <td className="px-4 py-2 border text-right">{neo.estimated_diameter_m.toFixed(1)}</td>
                <td
                  className={`px-4 py-2 border font-semibold ${
                    neo.is_potentially_hazardous ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {neo.is_potentially_hazardous ? '⚠️ Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}