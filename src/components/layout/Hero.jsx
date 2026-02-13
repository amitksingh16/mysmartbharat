import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, TrendingUp, X, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const Hero = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);

    // Mock Metadata for Search Index
    const searchData = [
        { id: 1, title: 'PM Kisan Samman Nidhi', type: 'Scheme', path: '/schemes?search=PMKisan', trending: true },
        { id: 2, title: 'Ladli Behna Yojana', type: 'Scheme', path: '/schemes?search=Ladli', trending: true },
        { id: 3, title: 'Ayushman Bharat (Health Card)', type: 'Scheme', path: '/schemes?search=Ayushman', trending: true },
        { id: 4, title: 'SIP Calculator', type: 'Tool', path: '/tools/sip', trending: true },
        { id: 5, title: 'EMI Calculator', type: 'Tool', path: '/tools/emi', trending: false },
        { id: 6, title: 'UP Bhulekh (Land Records)', type: 'Tool', path: '/tools/land', trending: false },
        { id: 7, title: 'Income Tax Calculator (Old vs New)', type: 'Tool', path: '/tools/tax', trending: false },
        { id: 8, title: 'MNREGA Job Card', type: 'Scheme', path: '/schemes?search=MNREGA', trending: false },
        { id: 9, title: 'E-Shram Card Registration', type: 'Scheme', path: '/schemes?search=Shram', trending: true },
        { id: 10, title: 'Sukanya Samriddhi Yojana', type: 'Scheme', path: '/schemes?search=Sukanya', trending: false },
        { id: 11, title: 'Atal Pension Yojana', type: 'Scheme', path: '/schemes?search=Atal', trending: false },
        { id: 12, title: 'GST Calculator', type: 'Tool', path: '/tools/gst', trending: false },
        { id: 13, title: 'Railway Recruitment Board (RRB)', type: 'News', path: '/career', trending: true },
        { id: 14, title: 'Digital India Internship', type: 'News', path: '/career', trending: false },
        { id: 15, title: 'Aadhaar Pan Link Status', type: 'Tool', path: '/tools', trending: true },
    ];

    // Initialize Fuse.js
    const fuse = useMemo(() => new Fuse(searchData, {
        keys: ['title', 'type'],
        threshold: 0.4, // Fuzzy match threshold (0.0 = exact, 1.0 = match anything)
    }), []);

    // Load recent searches from local storage
    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) setRecentSearches(JSON.parse(stored));
    }, []);

    // Handle Click Outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search Handler
    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setSelectedIndex(-1);

        if (query.trim().length >= 2) {
            const fuseResults = fuse.search(query).map(result => result.item);
            setResults(fuseResults);
            setShowResults(true);
        } else {
            setResults([]);
            setShowResults(true); // Show recent searches if query is empty/short
        }
    };

    // Select Result
    const handleSelectResult = (item) => {
        // Save to Recent Searches variables
        const updatedRecent = [item, ...recentSearches.filter(r => r.id !== item.id)].slice(0, 5);
        setRecentSearches(updatedRecent);
        localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

        navigate(item.path);
        setShowResults(false);
    };

    // Keyboard Navigation
    const handleKeyDown = (e) => {
        if (!showResults) return;

        const maxIndex = searchQuery.trim().length >= 2 ? results.length - 1 : recentSearches.length - 1;
        const currentList = searchQuery.trim().length >= 2 ? results : recentSearches;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < maxIndex ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && currentList[selectedIndex]) {
                handleSelectResult(currentList[selectedIndex]);
            } else if (searchQuery.trim()) {
                // Default search execution
                navigate(`/schemes?search=${encodeURIComponent(searchQuery)}`);
            }
        } else if (e.key === 'Escape') {
            setShowResults(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setResults([]);
        setSelectedIndex(-1);
        setShowResults(true); // Show recent searches
    };

    // Group Results by Type
    const groupedResults = results.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
    }, {});

    const trendingTags = [
        { id: 1, tag: '#PMKisan', path: '/schemes?search=PMKisan' },
        { id: 2, tag: '#SIPCalc', path: '/tools/sip-calculator' },
        { id: 3, tag: '#AwasYojna', path: '/schemes?search=Awas' },
    ];

    return (
        <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#003366] via-blue-900 to-[#4facfe] dark:from-slate-900 dark:to-slate-800 transition-all duration-1000 bg-[length:400%_400%] animate-gradient-xy">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-orange-400/20 dark:bg-orange-900/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                    {t('home.hero_title') || 'Dhoondiye Sarkari Yojana'} <br className="hidden md:block" />
                    <span className="text-secondary bg-clip-text">
                        {t('home.hero_subtitle_suffix') || 'ya Calculator...'}
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-blue-100 dark:text-slate-300 max-w-2xl mx-auto mb-12 font-medium">
                    {t('home.hero_desc') || "One-stop portal for Government Schemes, Financial Tools, and Career Updates."}
                </p>

                {/* Smart Search Bar */}
                <div className="w-full max-w-4xl mx-auto mb-10 relative z-50" ref={searchRef}>
                    <div className={`relative group transition-all duration-300 ${showResults ? 'transform -translate-y-2' : ''}`}>
                        {/* Glow Effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 ${showResults ? 'opacity-80' : ''}`}></div>

                        <div className={`relative flex items-center bg-white dark:bg-slate-800 backdrop-blur-2xl border ${showResults ? 'border-secondary ring-2 ring-secondary/50' : 'border-white/40 dark:border-slate-700'} rounded-2xl shadow-2xl p-2.5 transition-all duration-200`}>
                            <Search className={`text-slate-400 ml-5 w-6 h-6 ${showResults ? 'text-secondary' : ''}`} />
                            <input
                                type="text"
                                placeholder={t('home.search_placeholder') || "Search schemes, tools, or jobs..."}
                                className="flex-1 bg-transparent border-none outline-none px-5 py-4 text-lg text-slate-800 dark:text-white placeholder:text-slate-400 font-medium"
                                value={searchQuery}
                                onChange={handleSearchInput}
                                onFocus={() => setShowResults(true)}
                                onKeyDown={handleKeyDown}
                            />
                            {searchQuery && (
                                <button onClick={clearSearch} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <X size={20} />
                                </button>
                            )}
                            <button
                                onClick={() => navigate(`/schemes?search=${encodeURIComponent(searchQuery)}`)}
                                className="bg-secondary hover:bg-[#e68a00] text-white px-8 md:px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hidden md:block"
                            >
                                {t('common.search') || "Search"}
                            </button>
                        </div>
                    </div>

                    {/* Smart Dropdown Results */}
                    {showResults && (
                        <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
                            {/* Scenario 1: Recent Searches (Empty Query) */}
                            {searchQuery.trim().length < 2 && recentSearches.length > 0 && (
                                <div>
                                    <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Searches</span>
                                        <button onClick={() => { setRecentSearches([]); localStorage.removeItem('recentSearches'); }} className="text-xs text-red-500 hover:underline">Clear All</button>
                                    </div>
                                    <ul>
                                        {recentSearches.map((item, index) => (
                                            <li
                                                key={item.id}
                                                onClick={() => handleSelectResult(item)}
                                                className={`px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-50 dark:border-slate-700 last:border-0 ${index === selectedIndex ? 'bg-blue-50 dark:bg-slate-700' : ''}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Clock size={16} className="text-slate-400" />
                                                    <span className="text-slate-700 dark:text-slate-200 font-medium">{item.title}</span>
                                                </div>
                                                <ChevronRight size={16} className="text-slate-300" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Scenario 2: Search Results */}
                            {searchQuery.trim().length >= 2 && results.length > 0 && (
                                <div className="max-h-[60vh] overflow-y-auto">
                                    {['Scheme', 'Tool', 'News'].map(type => {
                                        if (!groupedResults[type]) return null;
                                        return (
                                            <div key={type}>
                                                <div className="px-6 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-10">
                                                    <span className="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-wider">
                                                        {type === 'Scheme' ? '🎯 Schemes' : type === 'Tool' ? '🧮 Calculators' : '📰 News'}
                                                    </span>
                                                </div>
                                                <ul>
                                                    {groupedResults[type].map((item, index) => {
                                                        const globalIndex = results.indexOf(item);
                                                        return (
                                                            <li
                                                                key={item.id}
                                                                onClick={() => handleSelectResult(item)}
                                                                className={`px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors ${globalIndex === selectedIndex ? 'bg-blue-50 dark:bg-slate-700' : ''}`}
                                                            >
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="font-semibold text-slate-800 dark:text-white text-base">
                                                                            {/* Simple highlighting */}
                                                                            {item.title.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) =>
                                                                                part.toLowerCase() === searchQuery.toLowerCase() ? <strong key={i} className="text-secondary">{part}</strong> : part
                                                                            )}
                                                                        </span>
                                                                        {item.trending && (
                                                                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full uppercase">Trending</span>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-xs text-slate-500 dark:text-slate-400">Jump to {type}</span>
                                                                </div>
                                                                <ArrowRight size={18} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Scenario 3: No Results */}
                            {searchQuery.trim().length >= 2 && results.length === 0 && (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🤔</div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No results found for "{searchQuery}"</h3>
                                    <p className="text-slate-500 text-sm mb-6">Typos happens! Try checking your spelling or search for something else.</p>
                                    <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-full text-sm font-semibold transition-colors">
                                        Nahi mila? Humein batayein!
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Trending Tags (Simplified) */}
                <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                        <TrendingUp size={18} />
                        <span>Trending:</span>
                    </div>
                    {trendingTags.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => navigate(tag.path)}
                            className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:border-primary/30 hover:shadow-sm transition-all"
                        >
                            {tag.tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
