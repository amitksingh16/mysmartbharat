import React from 'react';
import { CheckCircle, ChevronRight, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NewsSlider = ({ updates, loading }) => {
    const { t } = useTranslation();

    // Fallback images based on category or random
    const getThumbnail = (index) => {
        const images = [
            "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=400", // India Flag/Govt
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400", // Finance
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400", // Jobs
        ];
        return images[index % images.length];
    };

    if (loading) {
        return (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[280px] h-32 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (!updates || updates.length === 0) {
        return <div className="text-slate-500">No updates available.</div>;
    }

    return (
        <div className="relative group">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {updates.map((update, index) => (
                    <div
                        key={index}
                        className="snap-center shrink-0 w-[85vw] md:w-[350px] bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all flex items-start gap-4"
                    >
                        {/* Thumbnail */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                            <img
                                src={getThumbnail(index)}
                                alt="News Thumbnail"
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded flex items-center gap-1">
                                    <CheckCircle size={10} /> Verified
                                </span>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <Calendar size={10} /> Today
                                </span>
                            </div>

                            <h3 className="text-sm font-semibold text-slate-800 dark:text-white leading-snug line-clamp-2 mb-2">
                                {update.title}
                            </h3>

                            <a href={update.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary dark:text-blue-400 font-medium hover:underline flex items-center">
                                {t('common.read_more') || "Read Full"} <ChevronRight size={12} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fade effect on right for scroll indication */}
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent pointer-events-none md:hidden"></div>
        </div>
    );
};

export default NewsSlider;
