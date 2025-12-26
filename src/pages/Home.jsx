import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoryCards from '../components/features/CategoryCards';
import Hero from '../components/layout/Hero';
import { Shield, CheckCircle, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { fetchPibUpdates } from '../services/newsService';
import ArticleCard from '../components/features/ArticleCard';

const Home = () => {
    const { t } = useTranslation();
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUpdates = async () => {
            try {
                const data = await fetchPibUpdates();
                setUpdates(data.slice(0, 3)); // Show top 3 updates
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadUpdates();
    }, []);

    return (
        <>
            <Helmet>
                <title>MySmartBharat - Schemes, Finance, Jobs & Tools</title>
                <meta name="description" content="India's smart information portal for Government Schemes, Finance, Career updates, and smart calculators." />
            </Helmet>

            <div className="home-page">
                {/* Localized Hero Section */}
                <Hero />

                <CategoryCards />

                {/* Latest Govt Updates Section */}
                <section className="section" style={{ background: '#f8f9fa' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2>{t('home.latest_updates')}</h2>
                            <Link to="/news" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '500' }}>
                                {t('common.read_more')} <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {loading ? (
                                <p>{t('common.loading')}</p>
                            ) : updates.length > 0 ? (
                                updates.map((update, index) => (
                                    <ArticleCard key={index} article={update} />
                                ))
                            ) : (
                                <p style={{ color: 'var(--text-grey)' }}>Latest updates temporarily unavailable.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Why Trust Us Section */}
                <section className="section" style={{ backgroundColor: 'var(--white)' }}>
                    <div className="container">
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Trust MySmartBharat?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block', background: '#E3F2FD', padding: '1rem', borderRadius: '50%' }}>
                                    <Shield size={32} />
                                </div>
                                <h3>{t('home.trust_verified')}</h3>
                                <p style={{ color: 'var(--text-grey)', marginTop: '0.5rem' }}>{t('home.trust_verified_desc')}</p>
                            </div>

                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block', background: '#E3F2FD', padding: '1rem', borderRadius: '50%' }}>
                                    <Users size={32} />
                                </div>
                                <h3>{t('home.trust_simple')}</h3>
                                <p style={{ color: 'var(--text-grey)', marginTop: '0.5rem' }}>{t('home.trust_simple_desc')}</p>
                            </div>

                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block', background: '#E3F2FD', padding: '1rem', borderRadius: '50%' }}>
                                    <CheckCircle size={32} />
                                </div>
                                <h3>{t('home.trust_tools')}</h3>
                                <p style={{ color: 'var(--text-grey)', marginTop: '0.5rem' }}>{t('home.trust_tools_desc')}</p>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
