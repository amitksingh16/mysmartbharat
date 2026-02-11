import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, CheckCircle, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import Hero from '../components/layout/Hero';
import QuickEligibilityTool from '../components/features/QuickEligibilityTool';
import SmartGrid from '../components/features/SmartGrid';
import ArticleCard from '../components/features/ArticleCard';
import DailyPoll from '../components/features/DailyPoll';
import DidYouKnow from '../components/features/DidYouKnow';
import NewsSlider from '../components/features/NewsSlider';

import { fetchPibUpdates } from '../services/newsService';

const Home = () => {
    const { t, i18n } = useTranslation();
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUpdates = async () => {
            setLoading(true);
            try {
                const data = await fetchPibUpdates(i18n.language);
                setUpdates(data.slice(0, 3)); // Show top 3 updates
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadUpdates();
    }, [i18n.language]);

    return (
        <>
            <Helmet>
                <title>MySmartBharat - Schemes, Finance, Jobs & Tools</title>
                <meta name="description" content="India's smart information portal for Government Schemes, Finance, Career updates, and smart calculators." />
            </Helmet>

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                {/* 1. Hero Section */}
                <Hero />

                {/* 2. Quick Eligibility Tool (Overlapping Hero) */}
                <QuickEligibilityTool />

                {/* 3. Smart Grid (Core Features) */}
                <SmartGrid />

                {/* 4. Dashboard Grid: News & Engagement */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column: Latest Updates (2/3 width on large screens) */}
                            <div className="lg:col-span-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold font-heading text-slate-800 dark:text-white flex items-center gap-2">
                                        <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-blue-400 rounded-full"></span>
                                        {t('home.latest_updates') || "Latest Updates"}
                                    </h2>
                                    <Link to="/news" className="text-primary dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline text-sm">
                                        {t('common.read_more') || "View All"} <ArrowRight size={16} />
                                    </Link>
                                </div>

                                <NewsSlider updates={updates} loading={loading} />
                            </div>

                            {/* Right Column: Interactive Widgets (1/3 width) */}
                            <div className="space-y-8">
                                {/* Poll Widget */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                                        Daily Engagement
                                    </h3>
                                    <DailyPoll />
                                </div>

                                {/* Did You Know Widget */}
                                <div>
                                    <DidYouKnow />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 5. Trust Section */}
                <section className="py-16 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-white mb-4">Why Trust MySmartBharat?</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                                We are committed to providing accurate, timely, and simplified information to help every Indian citizen.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{t('home.trust_verified')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t('home.trust_verified_desc')}</p>
                            </div>

                            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{t('home.trust_simple')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t('home.trust_simple_desc')}</p>
                            </div>

                            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{t('home.trust_tools')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t('home.trust_tools_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
