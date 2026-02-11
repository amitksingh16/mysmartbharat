import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSchemes } from '../services/schemesService';
import { Filter, Search, MapPin, ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

const Schemes = () => {
    const { t, i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Local Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedState, setSelectedState] = useState('All India');

    // Data State
    const [allSchemes, setAllSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        const loadSchemes = async () => {
            setLoading(true);
            const data = await getSchemes('All', i18n.language);
            setAllSchemes(data || []);
            setLoading(false);
        };
        loadSchemes();
    }, [i18n.language]);

    // Sync URL Params with State
    useEffect(() => {
        const cat = searchParams.get('category');
        const st = searchParams.get('state');
        // If params exist, use them; otherwise verify if we should reset (or keep existing state if user just navigated)
        // Actually, if URL changes, we should sync state to it. If param is missing, it means "All".
        setSelectedCategory(cat || 'All');
        setSelectedState(st || 'All India');
    }, [searchParams]);

    // Smart Categories (Chips)
    const categories = [
        { id: 'All', label: 'All Schemes' },
        { id: 'Central', label: 'Central Govt' },
        { id: 'State', label: 'State Govt' },
        { id: 'Farmers', label: 'Farmers (Kisan)' },
        { id: 'Women', label: 'Women (Nari)' },
        { id: 'Students', label: 'Students' },
        { id: 'Health', label: 'Health' },
        { id: 'Business', label: 'Business & Loans' }
    ];

    // States List (Simplified)
    const states = [
        "All India", "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan",
        "Maharashtra", "Gujarat", "Karnataka", "Tamil Nadu", "West Bengal",
        "Delhi", "Haryana", "Punjab"
    ];

    // Filtering Logic
    const filteredSchemes = allSchemes.filter(scheme => {
        // 1. Text Search
        const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scheme.sector?.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Category Filter
        let matchesCategory = true;
        if (selectedCategory !== 'All') {
            if (selectedCategory === 'Central') matchesCategory = scheme.type === 'Central';
            else if (selectedCategory === 'State') matchesCategory = scheme.type === 'State';
            else {
                // Case-insensitive check
                const sectorMatch = scheme.sector?.toLowerCase() === selectedCategory.toLowerCase();
                const tagMatch = scheme.tags?.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
                matchesCategory = sectorMatch || tagMatch;
            }
        }

        // 3. State Filter
        let matchesState = true;
        if (selectedState !== 'All India') {
            matchesState = scheme.type === 'Central' || scheme.state_name === selectedState;
        }

        return matchesSearch && matchesCategory && matchesState;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Helmet>
                <title>Sarkari Yojana Hub | MySmartBharat</title>
                <meta name="description" content="Explore the latest government schemes for Farmers, Women, Students, and Business. Filter by state and category." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* 1. Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                    <div>
                        <span className="text-secondary font-bold tracking-wider text-sm uppercase mb-2 block">
                            Citizen Welfare Portal
                        </span>
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
                            Sarkari <span className="text-primary">Yojana Hub</span>
                        </h1>
                        <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                            Find the right government schemes for you. Filter by category, state, or search directly.
                        </p>
                    </div>

                    {/* Dedicated Search Bar */}
                    <div className="w-full md:w-96 relative group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="text-slate-400 group-focus-within:text-secondary transition-colors" size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search schemes (e.g. Pension, Awas)..."
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all shadow-sm group-hover:shadow-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* 2. Smart Filters */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8 sticky top-24 z-30 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        {/* Horizontal Chips */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            <Filter size={20} className="text-slate-400 mr-2 flex-shrink-0" />
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat.id
                                        ? 'bg-primary text-white shadow-md shadow-blue-200 dark:shadow-none'
                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* State Selector */}
                        <div className="relative w-full md:w-64 flex-shrink-0">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <MapPin size={18} className="text-slate-500" />
                            </div>
                            <select
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium appearance-none cursor-pointer hover:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                {states.map(st => <option key={st} value={st}>{st}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <ChevronDown size={16} className="text-slate-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Scheme Cards Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                        ))}
                    </div>
                ) : filteredSchemes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredSchemes.map(scheme => (
                            <div
                                key={scheme.id}
                                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                                    {scheme.sector || 'General'}
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase mb-3 ${scheme.type === 'Central' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                        }`}>
                                        {scheme.type} Govt
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                                        {scheme.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                                        {scheme.summary}
                                    </p>
                                </div>

                                {/* Highlights */}
                                <div className="space-y-2 mb-6">
                                    {scheme.benefits && (
                                        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                            <span>{scheme.benefits.substring(0, 50)}...</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action */}
                                <Link
                                    to={`/schemes/${scheme.slug}`}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold group-hover:bg-primary group-hover:text-white transition-all"
                                >
                                    View Details <ArrowRight size={18} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* 4. Empty State */
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">No Schemes Found</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-6">
                            We couldn't find any schemes matching "<strong>{searchQuery || selectedCategory}</strong>".
                            Try changing the filters or searching for something else.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedState('All India'); }}
                            className="text-primary font-semibold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schemes;
