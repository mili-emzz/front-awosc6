export default function ErrorUI({
    title = "Error",
    message,
    onRetry
}: {
    title?: string;
    message: string;
    onRetry?: () => void;
}) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 w-full">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[#C3122A] mx-auto mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-6 py-2 bg-[#C3122A] hover:bg-red-800 text-white rounded-md transition-colors font-medium shadow-sm"
                    >
                        Try again
                    </button>
                )}
            </div>
        </div>
    );
}
