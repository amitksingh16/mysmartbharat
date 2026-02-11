import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Clock,
    Share2,
    TrendingUp,
    ChevronRight,
    Zap,
    Calendar,
    ArrowUpRight,
    Bookmark
} from 'lucide-react';
import { blogPosts, pibUpdates } from '../data/mockData';

const News = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [heroArticle, setHeroArticle] = useState(null);
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [recentUpdates, setRecentUpdates] = useState([]);

    useEffect(() => {
        // Simulating data fetching and sorting
        const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

        if (sortedPosts.length > 0) {
            setHeroArticle(sortedPosts[0]);
            setFeaturedArticles(sortedPosts.slice(1, 4));
            setRecentUpdates(sortedPosts.slice(4));
        }
    }, [i18n.language]);

    const trendingTopics = [
        { id: 1, tag: "#Budget2025", growth: "+45%" },
        { id: 2, tag: "#PMKisan", growth: "+32%" },
        { id: 3, tag: "#SolarSubsidy", growth: "+28%" },
        { id: 4, tag: "#AadhaarUpdate", growth: "+15%" },
        { id: 5, tag: "#NewTaxRegime", growth: "+12%" }
    ];

    if (!heroArticle) return <div className="min-h-screen grid place-items-center">Loading...</div>;

    return (
        <>
            <Helmet>
                <title>Latest News & Insights | MySmartBharat</title>
                <meta name="description" content="Deep dive into Government schemes, financial updates, and policy changes affecting you." />
            </Helmet>

            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20 font-inter">
                {/* Header Section */}
                <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-12">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                                    The Pulse
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                                    Decoding policies, schemes, and finance for the smart citizen.
                                </p>
                            </div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-4 md:mt-0 flex items-center gap-2">
                                <Calendar size={16} />
                                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8 space-y-12">

                            {/* Hero Article */}
                            <section className="group cursor-pointer">
                                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                    {/* Placeholder Gradient/Image */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"></div>
                                    <img
                                        src={`https://source.unsplash.com/random/1200x800/?india,finance,${heroArticle.category}`}
                                        alt={heroArticle.title}
                                        className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-105 transition-transform duration-700"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-saffron text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                                {heroArticle.category}
                                            </span>
                                            {heroArticle.verified && (
                                                <span className="flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                                                    <Zap size={12} fill="currentColor" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight group-hover:text-saffron-light transition-colors">
                                            {heroArticle.title}
                                        </h2>
                                        <p className="text-slate-200 text-lg md:text-xl line-clamp-2 mb-6 max-w-3xl">
                                            {heroArticle.summary}
                                        </p>
                                        <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
                                            <span className="flex items-center gap-2">
                                                <Clock size={16} /> {heroArticle.readTime}
                                            </span>
                                            <span>{heroArticle.publishedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Featured Grid */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <TrendingUp className="text-saffron" /> Must Read
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {featuredArticles.map((article) => (
                                        <div key={article.id} className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={`https://source.unsplash.com/random/600x400/?${article.category}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <span className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm text-slate-800 dark:text-white">
                                                    {article.category}
                                                </span>
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                    {article.title}
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                                                    {article.summary}
                                                </p>
                                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
                                                    <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                                                        {article.readTime}
                                                    </span>
                                                    {article.content?.cta && (
                                                        <button
                                                            onClick={() => article.content.cta.link.startsWith('/') ? navigate(article.content.cta.link) : window.open(article.content.cta.link, '_blank')}
                                                            className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wide flex items-center gap-1"
                                                        >
                                                            {article.content.cta.text || "Read More"} <ArrowUpRight size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Recent Updates List (Compact) */}
                            {recentUpdates.length > 0 && (
                                <section className="pt-8 border-t border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">More Updates</h3>
                                    <div className="space-y-6">
                                        {recentUpdates.map((post) => (
                                            <div key={post.id} className="flex flex-col md:flex-row gap-6 group">
                                                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                                                    <img
                                                        src={`https://source.unsplash.com/random/400x300/?india,${post.category}`}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xs font-semibold text-primary">{post.category}</span>
                                                        <span className="text-xs text-slate-400">• {post.publishedDate}</span>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h4>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-3">
                                                        {post.summary}
                                                    </p>
                                                    <button className="text-sm font-semibold text-slate-900 dark:text-white hover:underline decoration-saffron decoration-2 underline-offset-4">
                                                        Read Analysis
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Pulse of Bharat Widget */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                                    <Zap className="text-saffron" size={20} fill="currentColor" /> Pulse of Bharat
                                </h3>
                                <ul className="space-y-5">
                                    {trendingTopics.map((topic, idx) => (
                                        <li key={topic.id} className="flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-bold text-slate-200 dark:text-slate-700 group-hover:text-primary transition-colors">
                                                    0{idx + 1}
                                                </span>
                                                <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                                                    {topic.tag}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                                {topic.growth}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Sticky Quick Links */}
                            <div className="sticky top-24 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-lg p-6 text-white overflow-hidden relative">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-2">Tools for You</h3>
                                    <p className="text-indigo-200 text-sm mb-6">Check your eligibility for schemes or calculate your EMI in seconds.</p>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => navigate('/tools')}
                                            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-between backdrop-blur transition-all group"
                                        >
                                            <span className="font-semibold text-sm">Financial Tools</span>
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => navigate('/schemes')}
                                            className="w-full py-3 px-4 bg-saffron hover:bg-orange-600 text-white rounded-xl flex items-center justify-between shadow-lg shadow-orange-900/20 transition-all font-bold group"
                                        >
                                            <span className="text-sm">Find Schemes</span>
                                            <ArrowUpRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* Decor */}
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
                                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-saffron rounded-full blur-3xl opacity-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default News;
