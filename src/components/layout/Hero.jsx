import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    // Hover states for chips
    const [hoveredChip, setHoveredChip] = useState(null);

    // Words to animate
    const words = ["schemes", "finance", "career", "tools", "verified updates"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchText)}`);
        }
    };

    return (
        <section className="section" style={{
            background: 'linear-gradient(180deg, rgba(237, 247, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
            padding: '4rem 0 3.5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animation Styles */}
            <style>{`
                @keyframes slideUpFade {
                    0% { opacity: 0; transform: translateY(10px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }
                .animated-word {
                    display: inline-block;
                    color: #F57F17;
                    min-width: 150px;
                    text-align: left;
                    animation: slideUpFade 2s infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animated-word {
                        animation: none;
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>

            {/* Subtle background element - Option B: Ultra-light dotted pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', // Slightly darker dot but lower opacity for better blend
                backgroundSize: '24px 24px',
                opacity: 0.07, // reduced visual weight (5-7%)
                zIndex: -1
            }}></div>

            <div className="container" style={{ textAlign: 'center', maxWidth: '900px', position: 'relative', zIndex: 1 }}>

                {/* Main Headline */}
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    marginBottom: '1rem',
                    color: '#0D47A1',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                }}>
                    {t('home.hero_title')} <br className="mobile-break" />
                    {/* Key change forces re-render of span to restart animation cleanly */}
                    <span key={currentWordIndex} className="animated-word">
                        {words[currentWordIndex]}
                    </span>
                </h1>

                {/* Sub-headline */}
                <p style={{
                    fontSize: '1.25rem',
                    maxWidth: '700px',
                    margin: '0 auto 2.5rem',
                    color: '#475569', // Slate 600
                    fontWeight: 500
                }}>
                    {t('home.hero_subtitle')}
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '640px', margin: '0 auto 2rem' }}>
                    <div style={{
                        position: 'relative',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        background: 'white'
                    }}>
                        <Search
                            size={20}
                            color="#94A3B8"
                            style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
                        />
                        <input
                            type="text"
                            placeholder={t('home.search_placeholder')}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1.2rem 1rem 1.2rem 3.5rem',
                                paddingRight: '140px', // Space for button
                                borderRadius: '12px',
                                border: '1px solid #E2E8F0',
                                fontSize: '1.1rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                                color: '#1E293B'
                            }}
                            onFocus={(e) => e.target.parentElement.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'}
                            onBlur={(e) => e.target.parentElement.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'}
                        />
                        <button
                            type="submit"
                            style={{
                                position: 'absolute',
                                right: '6px',
                                top: '6px',
                                bottom: '6px',
                                background: '#1565C0',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0 1.5rem',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = '#0D47A1'}
                            onMouseOut={(e) => e.target.style.background = '#1565C0'}
                        >
                            {t('common.search')}
                        </button>
                    </div>
                    {/* Helper Text */}
                    <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: '#64748B' }}>
                        {t('home.search_helper', 'Search across schemes, government jobs, and calculators.')}
                    </p>
                </form>

                {/* Trust Badges */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    marginBottom: '2.5rem',
                    fontSize: '0.875rem', // Slightly smaller (14px)
                    color: '#64748B'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span style={{ fontWeight: 500 }}>{t('home.trust_verified')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span style={{ fontWeight: 500 }}>{t('home.trust_simple')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F57F17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span style={{ fontWeight: 500 }}>{t('home.trust_tools')}</span>
                    </div>
                </div>

                {/* Quick Action Buttons (Trending Chips) */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/schemes')}
                        className="btn-outline"
                        onMouseEnter={() => setHoveredChip('schemes')}
                        onMouseLeave={() => setHoveredChip(null)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            borderRadius: '50px',
                            background: hoveredChip === 'schemes' ? 'rgba(13, 71, 161, 0.05)' : 'white',
                            transform: hoveredChip === 'schemes' ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            border: '1px solid #E2E8F0', // Ensure visibility if class styling is subtle
                            color: '#0F172A'
                        }}
                    >
                        {t('home.explore_btn')}
                    </button>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="btn-outline"
                        onMouseEnter={() => setHoveredChip('jobs')}
                        onMouseLeave={() => setHoveredChip(null)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            borderRadius: '50px',
                            background: hoveredChip === 'jobs' ? 'rgba(13, 71, 161, 0.05)' : 'white',
                            transform: hoveredChip === 'jobs' ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            border: '1px solid #E2E8F0',
                            color: '#0F172A'
                        }}
                    >
                        {t('career.title')}
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Hero;
