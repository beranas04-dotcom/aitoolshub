'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTools } from '@/lib/firestore';
import { Tool } from '@/types';

export default function AdminToolsPage() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTools() {
            try {
                const data = await getTools('all');
                setTools(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadTools();
    }, []);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">🛠 Admin — Manage Tools</h1>
                <Link
                    href="/submit"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
                >
                    + Add Tool
                </Link>
            </div>

            {loading ? (
                <p>Loading tools...</p>
            ) : (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-4">Tool</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tools.map((tool) => (
                                <tr key={tool.id} className="border-t border-border">
                                    <td className="p-4 font-medium">{tool.name}</td>
                                    <td className="p-4">{tool.category}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded ${tool.status === 'published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {tool.status || 'draft'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-3">
                                        <Link
                                            href={`/tools/${tool.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/admin/tools/edit/${tool.id}`}
                                            className="text-primary hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {tools.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-6 text-center text-muted-foreground">
                                        No tools found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
