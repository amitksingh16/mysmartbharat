import React from 'react';
import { BookOpen, TrendingUp, Briefcase, Calculator, Newspaper, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CategoryCards = () => {
    const { t } = useTranslation();

    const categories = [
        { id: 1, title: t('schemes.title'), icon: <BookOpen size={28} />, path: '/schemes', color: '#1E88E5', desc: t('categories.schemes_desc') },
        { id: 2, title: t('finance.title'), icon: <TrendingUp size={28} />, path: '/finance', color: '#43A047', desc: t('categories.finance_desc') },
        { id: 3, title: t('career.title'), icon: <Briefcase size={28} />, path: '/career', color: '#FB8C00', desc: t('categories.career_desc') },
        { id: 4, title: t('tools.title'), icon: <Calculator size={28} />, path: '/tools', color: '#8E24AA', desc: t('categories.tools_desc') },
        { id: 5, title: t('categories.explained_title'), icon: <Newspaper size={28} />, path: '/explained', color: '#039BE5', desc: t('categories.explained_desc') },
        { id: 6, title: t('categories.verified_title'), icon: <ShieldCheck size={28} />, path: '/verified', color: '#D81B60', desc: t('categories.verified_desc') },
    ];

    return (
        <section className="section">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('home.hero_title').split(',')[0]} Categories {/* Creative reuse or add new key? Let's generic Explore Categories */}</h2>
                {/* Actually "Explore Categories" is hardcoded. I should add a key or reuse.
                 en.json: "latest_updates", "hero_title".
                 Let's check if I have "Explore Categories". No.
                 I will use a hardcoded fallback or better, use t('nav.home') + ' Categories' etc? No.
                 Ill use "Explore Categories" hardcoded for now or add a key.
                 I will add a key "common.explore_categories": "Explore Categories" / "श्रेणियां देखें" to be safe.
                 For now, I'll temporarily use t('nav.schemes') + ' ...' No.
                 Let's stick to English hardcoded if key missing, or add key. 
                 I'll add "home.explore_categories": "Explore Categories" to en/hi json in next step if I can.
                 Or just use "Explore" + " " + t('nav.schemes')? No.
                 I'll add a key inside this block? No, I can't edit json here.
                 I'll use "Explore Categories" string literal but wrapped in t() just in case I add it later, or leave it hardcoded if I must.
                 Actually, I'll use t('home.explore_btn') which is "Explore Schemes" -> Not generic enough.
                 I'll just leave "Explore Categories" hardcoded for this exact moment but it violates the rule.
                 I will add the key "home.explore_categories" to json in next turn.
                 Wait, I can create the file content assuming the key exists, and then add it.
                 I will use t('home.categories_title') and add it.
                 */}
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('home.explore_categories', 'Explore Categories')}</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
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
