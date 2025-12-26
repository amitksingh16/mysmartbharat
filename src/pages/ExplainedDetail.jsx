
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, CheckCircle, Share2, Printer } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const ExplainedDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Article not found</h2>
                <button onClick={() => navigate('/explained')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Back to Explained
                </button>
            </div>
        );
    }

    return (
        <div className="container section">
            {/* Breadcrumb & Back */}
            <div style={{ marginBottom: '2rem' }}>
                <Link to="/explained" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-grey)',
                    fontWeight: '500',
                    marginBottom: '1rem'
                }}>
                    <ArrowLeft size={16} />
                    Back to Explained
                </Link>
            </div>

            <article style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Header */}
                <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{
                            backgroundColor: 'rgba(21, 101, 192, 0.1)',
                            color: 'var(--primary)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '4px'
                        }}>
                            {post.category}
                        </span>
                        {post.verified && (
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                color: 'var(--success)',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '4px'
                            }}>
                                <CheckCircle size={14} />
                                Verified Source
                            </span>
                        )}
                    </div>

                    <h1 style={{
                        fontSize: '2.5rem',
                        lineHeight: '1.2',
                        marginBottom: '1.5rem',
                        color: 'var(--text-dark)'
                    }}>
                        {post.title}
                    </h1>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'var(--text-grey)',
                        fontSize: '0.95rem'
                    }}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Calendar size={16} />
                                {post.publishedDate}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={16} />
                                {post.readTime}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-grey)' }}>
                                <Share2 size={20} />
                            </button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-grey)' }}>
                                <Printer size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dark)' }}>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-grey)',
                        marginBottom: '2.5rem',
                        borderLeft: '4px solid var(--accent)',
                        paddingLeft: '1rem',
                        fontStyle: 'italic'
                    }}>
                        {post.summary}
                    </p>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>What is this about?</h2>
                        <p>{post.content.intro}</p>
                    </div>

                    {post.content.sections.map((section, index) => (
                        <div key={index} style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{section.heading}</h2>
                            <p>{section.body}</p>
                        </div>
                    ))}

                    {/* Contextual CTA */}
                    <div style={{
                        backgroundColor: 'var(--bg-light)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        marginTop: '3rem',
                        border: '1px solid var(--border)'
                    }}>
                        <h3 style={{ marginBottom: '1rem' }}>Ready to take the next step?</h3>
                        {post.content.cta.type === 'internal' ? (
                            <Link to={post.content.cta.link} className="btn btn-primary">
                                {post.content.cta.text} &rarr;
                            </Link>
                        ) : (
                            <a href={post.content.cta.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                {post.content.cta.text} &rarr;
                            </a>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ExplainedDetail;
