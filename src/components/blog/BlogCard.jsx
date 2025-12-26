
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';

const BlogCard = ({ post }) => {
    return (
        <Link to={`/explained/${post.slug}`} className="blog-card" style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
            height: '100%',
            textDecoration: 'none'
        }}>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Badge Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                        backgroundColor: 'var(--bg-light)',
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(21, 101, 192, 0.1)'
                    }}>
                        {post.category}
                    </span>
                    {post.verified && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontSize: '0.8rem', fontWeight: '500' }}>
                            <CheckCircle size={14} />
                            Verified
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    color: 'var(--text-dark)',
                    lineHeight: '1.4'
                }}>
                    {post.title}
                </h3>

                {/* Summary */}
                <p style={{
                    color: 'var(--text-grey)',
                    fontSize: '0.95rem',
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {post.summary}
                </p>

                {/* Footer */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-grey)', fontSize: '0.85rem' }}>
                        <Clock size={14} />
                        {post.readTime}
                    </div>
                    <span style={{
                        color: 'var(--primary)',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        Read Explained &rarr;
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
