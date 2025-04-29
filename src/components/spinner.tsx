function Spinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <div className="pl-6">Loading...</div>
        </div>
    );
}

export default Spinner;
