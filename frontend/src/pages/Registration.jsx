import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import { Loader2, Plus } from 'lucide-react';

const Registration = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [hasMore, setHasMore] = useState(true);

    const fetchUsers = async (currentPage) => {
        setLoading(true);
        setError(null);
        try {
            const skip = (currentPage - 1) * limit;
            const response = await axios.get(`http://localhost:8888/users/?skip=${skip}&limit=${limit}`);
            const data = response.data;
            setUsers(data);
            if (data.length < limit) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load users. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handleNextPage = () => {
        if (hasMore) setPage(p => p + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8 text-slate-50">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        User Registrations
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-slate-400">
                            Page {page}
                        </div>
                        <button
                            onClick={() => navigate('/user/new')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create User
                        </button>
                    </div>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl">
                        {error}
                    </div>
                )}

                <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center p-24">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <UserTable users={users} />
                    )}
                </div>

                <div className="flex justify-end">
                    <Pagination
                        page={page}
                        hasMore={hasMore}
                        onNext={handleNextPage}
                        onPrev={handlePrevPage}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Registration;
