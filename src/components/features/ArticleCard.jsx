import React from 'react';
import Card from '../common/Card';
import { Calendar, CheckCircle } from 'lucide-react';

const ArticleCard = ({ article }) => {
    const link = article.link || article.url;
    // Check if link is valid (not empty, not just hash)
    const isValidLink = link && link !== '#' && link.trim() !== '';
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${article.title}\n\nRead more: ${link || 'https://mysmartbharat.in'}`)}`;

    // Check for tags
    const isFactCheck = article.title.toLowerCase().includes('fact check') || article.summary.toLowerCase().includes('fake');

    return (
        <Card className="article-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                    {isFactCheck && <span style={{ background: '#FFEBEE', color: '#C62828', fontSize: '0.7em', padding: '2px 6px', borderRadius: '4px', marginRight: '5px', verticalAlign: 'middle' }}>FACT CHECK</span>}
                    {article.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#475569', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {/* Source Badge */}
                    <span style={{ fontWeight: '700', color: '#0F172A' }}>{article.source || 'PIB'}</span>
                    <span style={{ color: '#CBD5E1' }}>•</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={14} />
                        <span style={{ fontWeight: 500 }}>{article.date}</span>
                    </div>

                    {article.isVerified && (
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            color: 'var(--success)',
                            fontWeight: '600',
                            marginLeft: 'auto',
                            fontSize: '0.75rem',
                            background: '#F0FDF4',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid #BBF7D0'
                        }}>
                            <CheckCircle size={12} /> Verified
                        </span>
                    )}
                </div>
                <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>{article.summary}</p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {isValidLink ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            backgroundColor: 'transparent',
                            textDecoration: 'none',
                            fontSize: '0.9rem'
                        }}
                    >
                        Read More
                    </a>
                ) : (
                    <span className="btn disabled" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', color: '#999', cursor: 'not-allowed', fontSize: '0.9rem' }}>
                        Read More
                    </span>
                )}

                <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#25D366',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.593 1.97.817 3.203.817 4.256 0 7.608-2.696 7.608-6.104 0-3.18-2.586-5.766-5.766-5.766zm9.928 3.23c-1.258-2.269-3.508-3.926-6.192-4.542-2.684-.616-5.464-.319-7.906.840-2.441 1.159-4.29 3.328-5.11 6.136-.82 2.808-.55 5.64.764 8.24l-1.397 5.097 5.215-1.367c2.146 1.168 4.609 1.571 7.008 1.146 2.399-.425 4.646-1.743 6.309-3.712 1.663-1.969 2.529-4.502 2.441-7.078-.088-2.576-1.123-5.027-2.912-6.908z" /></svg>
                    Share
                </a>
            </div>
        </Card>
    );
};

export default ArticleCard;
