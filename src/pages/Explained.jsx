
import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import { blogPosts } from '../data/mockData';
import { useTranslation } from 'react-i18next';

const Explained = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Mapping IDs (from data) to Labels (from translations)
    const categoryMap = [
        { id: 'All', label: t('common.all') },
        { id: 'Scheme Explained', label: t('explained.cat_schemes') },
        { id: 'Finance Guides', label: t('explained.cat_finance') },
        { id: 'Jobs & Exams Explained', label: t('explained.cat_jobs') },
        { id: 'News Simplified', label: t('explained.cat_news') }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container section">
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(21, 101, 192, 0.1)',
                    color: 'var(--primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                }}>
                    <BookOpen size={18} />
                    <span>{t('explained.badge')}</span>
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
                    {t('explained.title')}
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-grey)', maxWidth: '600px', margin: '0 auto' }}>
                    {t('explained.desc')}
                </p>
            </div>

            {/* Filters & Search */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                marginBottom: '3rem',
                backgroundColor: 'var(--white)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)'
            }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-grey)' }} size={20} />
                    <input
                        type="text"
                        placeholder={t('explained.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem 0.8rem 3rem',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1rem',
                            outline: 'none',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                {/* Categories */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categoryMap.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: selectedCategory === cat.id ? 'none' : '1px solid var(--border)',
                                backgroundColor: selectedCategory === cat.id ? 'var(--primary)' : 'transparent',
                                color: selectedCategory === cat.id ? 'var(--white)' : 'var(--text-dark)',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            {filteredPosts.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-grey)' }}>
                    <h3>{t('explained.no_results')}</h3>
                    <p>{t('home.try_adjusting', 'Try adjusting your search or filters.')}</p>
                </div>
            )}
        </div>
    );
};

export default Explained;
