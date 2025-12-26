import React from 'react';
import { Helmet } from 'react-helmet-async';
import { financeUpdates } from '../data/mockData';
import ArticleCard from '../components/features/ArticleCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Finance = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>Finance & Tax Updates | MySmartBharat</title>
                <meta name="description" content="Latest Finance news, Income Tax updates, and RBI notifications simplified." />
            </Helmet>

            <div className="container section">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1>{t('finance.title')}</h1>
                    <p style={{ color: 'var(--text-grey)' }}>{t('finance.subtitle')}</p>
                </div>

                {/* Tools Teaser */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        background: 'linear-gradient(to right, var(--primary), var(--primary-light))',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        color: 'var(--white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '2rem'
                    }}>
                        <div>
                            <h2 style={{ color: 'var(--white)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{t('finance.teaser_title')}</h2>
                            <p style={{ opacity: 0.9 }}>{t('finance.teaser_desc')}</p>
                        </div>
                        <Link to="/tools" className="btn" style={{ background: 'var(--white)', color: 'var(--primary)' }}>
                            {t('finance.try_calculators')} <Calculator size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </section>

                <div style={{ marginBottom: '2rem' }}>
                    <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--success)',
                        background: '#E8F5E9',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}>
                        {t('finance.verified_badge')}
                    </span>
                    <h2 style={{ marginTop: '0.5rem' }}>{t('home.latest_updates')}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {financeUpdates.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Finance;
