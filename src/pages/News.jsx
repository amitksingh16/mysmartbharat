import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getLatestNews, fetchPibUpdates } from '../services/newsService';
import ArticleCard from '../components/features/ArticleCard';
import { useTranslation } from 'react-i18next';

const News = () => {
    const { t, i18n } = useTranslation();
    const [news, setNews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // Pass current language to service
                const data = await fetchPibUpdates(i18n.language);
                setNews(data);
            } catch (error) {
                console.error("Failed to load news", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [i18n.language]); // Refetch when language changes

    return (
        <>
            <Helmet>
                <title>Latest News & Updates | MySmartBharat</title>
                <meta name="description" content="Verified updates on Government policies, Education, and Rules in India." />
            </Helmet>

            <div className="container section">
                <h1 style={{ marginBottom: '2rem' }}>{t('news.title')}</h1>
                <p style={{ color: 'var(--text-grey)', marginBottom: '3rem' }}>{t('news.subtitle')}</p>

                {loading ? (
                    <p>{t('common.loading')}</p>
                ) : news.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {news.map((article, index) => (
                            <ArticleCard key={article.id || index} article={article} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', background: '#FFF3E0', borderRadius: 'var(--radius-lg)' }}>
                        <h3>{t('news.unavailable_title')}</h3>
                        <p style={{ margin: '1rem 0' }}>{t('news.unavailable_desc')}</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-grey)' }}>Please check back in a few minutes.</p>
                        {/* Here we could map cached data if available, or just show a message */}
                    </div>
                )}
            </div>
        </>
    );
};

export default News;
