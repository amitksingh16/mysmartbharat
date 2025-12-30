import React from 'react';
import Card from '../common/Card';
import { Calendar, CheckCircle } from 'lucide-react';

const ArticleCard = ({ article }) => {
    const link = article.link || article.url;
    // Check if link is valid (not empty, not just hash)
    const isValidLink = link && link !== '#' && link.trim() !== '';

    return (
        <Card className="article-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{article.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-grey)', marginBottom: '1rem' }}>
                    <Calendar size={14} />
                    <span>{article.date}</span>
                    {article.isVerified && (
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            color: 'var(--success)',
                            fontWeight: '500',
                            marginLeft: 'auto'
                        }}>
                            <CheckCircle size={12} /> Verified
                        </span>
                    )}
                </div>
                <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.6' }}>{article.summary}</p>
            </div>

            {isValidLink ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                        marginTop: 'auto',
                        padding: '0.5rem 1rem',
                        border: '1px solid var(--primary)',
                        color: 'var(--primary)',
                        backgroundColor: 'transparent',
                        alignSelf: 'flex-start',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}
                >
                    Read More
                </a>
            ) : (
                <span
                    className="btn disabled"
                    style={{
                        marginTop: 'auto',
                        padding: '0.5rem 1rem',
                        border: '1px solid #ccc',
                        color: '#999',
                        backgroundColor: 'transparent',
                        alignSelf: 'flex-start',
                        display: 'inline-block',
                        cursor: 'not-allowed'
                    }}
                    title="Link unavailable"
                >
                    Read More
                </span>
            )}
        </Card>
    );
};

export default ArticleCard;
