export default function LoadingUI({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C3122A] mb-4"></div>
            <p className="text-gray-600 font-medium">{message}</p>
        </div>
    );
}
