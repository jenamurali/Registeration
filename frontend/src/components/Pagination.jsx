import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, hasMore, onNext, onPrev, loading }) => {
    return (
        <div className="flex items-center gap-4 bg-slate-800 px-4 py-3 rounded-xl border border-slate-700/50 shadow-sm">
            <button
                onClick={onPrev}
                disabled={page === 1 || loading}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 font-medium">Page</span>
                <span className="w-8 h-8 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-lg font-semibold text-sm">
                    {page}
                </span>
            </div>

            <button
                onClick={onNext}
                disabled={!hasMore || loading}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;
