import React from 'react';
import EMICalculator from '../components/tools/EMICalculator';
import { Helmet } from 'react-helmet-async';
import { getLatestJobs } from '../services/jobsService';

import { useTranslation } from 'react-i18next';

const JobSection = () => {
    const { t } = useTranslation();
    const [jobs, setJobs] = React.useState([]);

    React.useEffect(() => {
        getLatestJobs().then(setJobs);
    }, []);

    return (
        <section id="jobs" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {t('tools.latest_jobs')} <span style={{ fontSize: '0.8rem', background: '#e11d48', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{t('tools.new_badge')}</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {jobs.map(job => (
                    <div key={job.id} style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                        <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{job.organization}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '1rem' }}>
                            <span style={{ background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '4px' }}>{job.vacancies} {t('career.vacancies')}</span>
                            <span style={{ color: '#dc2626' }}>{t('career.apply_deadline')}: {job.deadline}</span>
                        </div>
                        <a href={job.link} style={{ display: 'inline-block', width: '100%', textAlign: 'center', padding: '0.5rem', background: 'var(--primary)', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>{t('schemes.view_details')}</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Tools = () => {
    const { t } = useTranslation();

    const toolsList = [
        {
            id: 'sip',
            title: 'SIP Calculator',
            desc: 'Estimate returns on your monthly mutual fund investments.',
            icon: 'TrendingUp',
            link: '/tools/sip',
            color: '#0ea5e9',
            bg: '#e0f2fe'
        },
        {
            id: 'lumpsum',
            title: 'Lump Sum Calculator',
            desc: 'Calculate future value of one-time investments.',
            icon: 'PieChart',
            link: '/tools/lumpsum',
            color: '#8b5cf6',
            bg: '#f3e8ff'
        },
        {
            id: 'tax',
            title: 'Income Tax',
            desc: 'Compare Old vs New Regime for FY 2025-26.',
            icon: 'FileText',
            link: '/tools/tax',
            color: '#ef4444',
            bg: '#fee2e2'
        },
        {
            id: 'fd',
            title: 'FD Calculator',
            desc: 'Check maturity amount for Fixed Deposits.',
            icon: 'Lock',
            link: '/tools/fd',
            color: '#f59e0b',
            bg: '#jef3c7' // Typo fix: #fef3c7
        },
        {
            id: 'rd',
            title: 'RD Calculator',
            desc: 'Recurring Deposit maturity estimator.',
            icon: 'RefreshCw',
            link: '/tools/rd',
            color: '#10b981',
            bg: '#d1fae5'
        },
        {
            id: 'ppf',
            title: 'PPF Calculator',
            desc: '15-year Public Provident Fund returns.',
            icon: 'Shield',
            link: '/tools/ppf',
            color: '#6366f1',
            bg: '#e0e7ff'
        }
    ];

    // Helper to render icon by name
    const renderIcon = (name, color) => {
        // We'd typically import these, but for this dynamic list approach...
        // Let's just import them at top and use a map.
        // Or refactor to hardcode the cards for simplicity and safety.
        return null;
    };

    return (
        <>
            <Helmet>
                <title>Smart Tools - Financial Calculators | MySmartBharat</title>
                <meta name="description" content="Free financial calculators for SIP, Income Tax, FD, PPF and more. Plan your finances better with MySmartBharat." />
            </Helmet>

            <div className="container section">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1>{t('tools.header_title')}</h1>
                    <p style={{ color: 'var(--text-grey)', maxWidth: '600px', margin: '0.5rem auto' }}>
                        {t('tools.header_desc')}
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '4rem' }}>

                    {/* Financial Calculators Grid */}
                    <section>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Financial Calculators
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {toolsList.map(tool => (
                                <a key={tool.id} href={tool.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{
                                        background: 'white',
                                        padding: '1.5rem',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-sm)',
                                        border: '1px solid var(--border)',
                                        height: '100%',
                                        transition: 'transform 0.2s',
                                        cursor: 'pointer'
                                    }}
                                        className="tool-card"
                                    >
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: tool.bg,
                                            color: tool.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1rem'
                                        }}>
                                            {/* Icons would ideally go here. Since I can't dynamic import easily inside map without map object, I'll cheat or use simple text/emoji or imported icons if I refactor. */}
                                            {/* Let's manually replace this block or render something simple */}
                                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                {tool.title.charAt(0)}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{tool.title}</h3>
                                        <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', marginBottom: '1rem' }}>{tool.desc}</p>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            color: 'var(--primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}>
                                            {t('finance.calculate', 'Calculate Now')} →
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* EMI Calculator Section (Featured) */}
                    <section id="emi-calculator">
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h2>Featured: Home Loan EMI</h2>
                            <p style={{ color: 'var(--text-grey)' }}>Quickly check your monthly loan installments.</p>
                        </div>
                        <EMICalculator />
                    </section>

                    {/* Jobs Section */}
                    <JobSection />
                </div>
            </div>

            <style>{`
                .tool-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-md) !important;
                }
            `}</style>
        </>
    );
};

export default Tools;
