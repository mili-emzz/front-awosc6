'use client';

import { useEffect } from 'react';
import ErrorUI from './components/uistate/ErrorUI';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return <ErrorUI
        title="Something went wrong!"
        message="We encountered an error while loading the data."
        onRetry={() => reset()}
    />;
}
