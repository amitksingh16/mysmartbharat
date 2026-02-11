import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { schemes } from '../data/mockData';
import {
    ArrowLeft, CheckCircle, ExternalLink, Calendar, Users,
    FileText, ChevronRight, Share2, Printer, Bookmark,
    Clock, Shield, Building2, Download, AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SchemeDetail = () => {
    const { slug } = useParams();
    const { t } = useTranslation();
    const scheme = schemes.find(s => s.slug === slug);
    const contentRef = useRef(null);

    if (!scheme) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Scheme not found</h2>
                <Link to="/schemes" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition">
                    Back to Schemes
                </Link>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: scheme.title,
                text: scheme.summary,
                url: window.location.href,
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Helmet>
                <title>{scheme.title} | MySmartBharat</title>
                <meta name="description" content={scheme.summary} />
            </Helmet>

            {/* 1. Breadcrumbs & Top Bar */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Link to="/" className="hover:text-primary transition">Home</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <Link to="/schemes" className="hover:text-primary transition">Schemes</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="font-medium text-slate-800 dark:text-white truncate max-w-[150px] sm:max-w-md">
                            {scheme.title}
                        </span>
                    </div>

                    {/* Action Buttons (Desktop) */}
                    <div className="hidden sm:flex items-center gap-2">
                        <button onClick={handleShare} className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-full transition" title="Share">
                            <Share2 size={18} />
                        </button>
                        <button onClick={handlePrint} className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-full transition" title="Print">
                            <Printer size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Hero Section */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-12 pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/schemes" className="inline-flex items-center text-slate-500 hover:text-primary text-sm font-medium mb-6 transition">
                        <ArrowLeft size={16} className="mr-1" /> Back to Schemes
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${scheme.type === 'Central'
                                        ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                                        : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                                    }`}>
                                    {scheme.type} Govt
                                </span>
                                {scheme.ministry && (
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                                        {scheme.ministry}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                                {scheme.title}
                            </h1>

                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                                {scheme.summary}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-primary" />
                                    Last Updated: <span className="font-medium text-slate-800 dark:text-slate-200">{scheme.lastVerified}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-green-600" />
                                    Status: <span className="font-medium text-green-600">Verified & Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Card (Mobile/Desktop Hero) */}
                        <div className="w-full lg:w-80 shrink-0">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Application Deadline</span>
                                <div className="text-lg font-bold text-red-600 flex items-center gap-2 mb-6">
                                    <Calendar size={20} />
                                    {scheme.deadline}
                                </div>

                                <a
                                    href={scheme.officialLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-full py-3.5 bg-primary hover:bg-blue-700 text-white font-bold text-center rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Apply Online <ExternalLink size={18} />
                                </a>

                                <p className="text-xs text-center text-slate-400 mt-3">
                                    Redirects to official government portal
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Content Layout (2-Col) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Detailed Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* At a Glance Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                                        <Users size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Who can apply?</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300">{scheme.eligibility}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg">
                                        <FileText size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Main Benefit</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300">{scheme.benefits}</p>
                            </div>
                        </div>

                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                                Overview
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-7 text-lg">
                                {scheme.details?.intro || scheme.summary}
                            </p>
                        </section>

                        {/* Benefits Breakdown (Cards) */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                                Key Benefits
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {scheme.details?.benefitsList?.map((item, index) => (
                                    <div key={index} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <p className="text-sm font-semibold text-slate-500 mb-1">{item.title}</p>
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">{item.value}</p>
                                    </div>
                                )) || <p className="text-slate-500">See summary above.</p>}
                            </div>
                        </section>

                        {/* Eligibility Criteria (List) */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                                Eligibility Criteria
                            </h2>
                            <ul className="space-y-4">
                                {scheme.details?.eligibilityCriteria?.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                        <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={20} />
                                        <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                                    </li>
                                )) || <li>Check official website.</li>}
                            </ul>
                        </section>

                        {/* How to Apply (Timeline) */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                                Application Process
                            </h2>
                            <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
                                {scheme.details?.applicationProcess?.map((step, index) => (
                                    <div key={index} className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-4 border-slate-50 dark:border-slate-950">
                                            {index + 1}
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">Step {index + 1}</h3>
                                        <p className="text-slate-600 dark:text-slate-300">{step}</p>
                                    </div>
                                )) || <p>Visit portal.</p>}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sticky Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Documents Required Widget */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 sticky top-24">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <FileText className="text-secondary" /> Documents Required
                            </h3>
                            <ul className="space-y-3">
                                {scheme.details?.documentsRequired?.map((doc, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 pb-3 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></div>
                                        {doc}
                                    </li>
                                )) || <li>See portal.</li>}
                            </ul>

                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Need Help?</h4>
                                <div className="space-y-2">
                                    <a href={scheme.officialLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                                        <ExternalLink size={14} /> Official Website
                                    </a>
                                    <a href="#" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                                        <AlertCircle size={14} /> Report an Issue
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchemeDetail;
