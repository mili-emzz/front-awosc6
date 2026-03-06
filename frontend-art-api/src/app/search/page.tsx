import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Suspense fallback={<div className="text-center py-10">Loading search results...</div>}>
                <SearchResults />
            </Suspense>
        </div>
    );
}
