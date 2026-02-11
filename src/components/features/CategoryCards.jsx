import React from 'react';
import { BookOpen, TrendingUp, Briefcase, Calculator, Newspaper, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CategoryCards = () => {
    const { t } = useTranslation();

    const categories = [
        { id: 1, title: t('schemes.title'), icon: <BookOpen size={28} />, path: '/schemes', color: '#1E88E5', desc: t('categories.schemes_desc') },
        { id: 2, title: t('finance.title'), icon: <TrendingUp size={28} />, path: '/finance', color: '#43A047', desc: t('categories.finance_desc') }, // Finance Updates
        { id: 3, title: t('career.title'), icon: <Briefcase size={28} />, path: '/career', color: '#FB8C00', desc: t('categories.career_desc') },
        { id: 4, title: t('tools.title'), icon: <Calculator size={28} />, path: '/tools', color: '#8E24AA', desc: t('categories.tools_desc') }, // Financial Tools & Calculators
        { id: 5, title: t('categories.explained_title'), icon: <Newspaper size={28} />, path: '/explained', color: '#039BE5', desc: t('categories.explained_desc') },
    ];

    return (
        <section className="section">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('home.explore_categories', 'Explore Categories')}</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {categories.map((cat) => (
                        <Link to={cat.path} key={cat.id} style={{
                            background: 'var(--white)',
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            border: '1px solid var(--border)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <div style={{
                                color: cat.color,
                                background: `${cat.color}15`, // 15 = roughly 10% opacity
                                padding: '1rem',
                                borderRadius: '50%',
                                marginBottom: '1rem'
                            }}>
                                {cat.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{cat.title}</h3>
                            <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem' }}>{cat.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryCards;
