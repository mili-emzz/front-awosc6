'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Determine type based on current pathname
        const type = pathname.startsWith('/agents') ? 'agents' : 'artworks';

        router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${type}`);
        setQuery('');
    };

    return (
        <nav className="bg-[#C3122A] text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="font-bold text-xl tracking-tight hover:text-gray-200 transition-colors">
                            ArtAPI
                        </Link>
                        <div className="hidden md:flex space-x-4">
                            <Link href="/" className="hover:bg-red-800 px-3 py-2 rounded-md font-medium transition-colors">
                                Artworks
                            </Link>
                            <Link href="/agents" className="hover:bg-red-800 px-3 py-2 rounded-md font-medium transition-colors">
                                Agents
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 max-w-md ml-8">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder={`Search ${pathname.startsWith('/agents') ? 'agents' : 'artworks'}...`}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-red-800 border-none rounded-md py-1.5 px-4 text-sm text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                            />
                            <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 text-red-300 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}
