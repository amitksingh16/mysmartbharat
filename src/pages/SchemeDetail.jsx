import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { schemes } from '../data/mockData';
import { ArrowLeft, CheckCircle, ExternalLink, Calendar, Users, FileText, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SchemeDetail = () => {
    const { slug } = useParams();
    const { t } = useTranslation();
    const scheme = schemes.find(s => s.slug === slug);

    if (!scheme) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '5rem 0' }}>
                <h2>Scheme not found</h2>
                <Link to="/schemes" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Schemes</Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{scheme.title} | MySmartBharat</title>
                <meta name="description" content={scheme.summary} />
            </Helmet>

            {/* Breadcrumb */}
            <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div className="container" style={{ padding: '0.8rem 1rem', fontSize: '0.9rem', color: '#64748b' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                    <span style={{ margin: '0 0.5rem' }}>/</span>
                    <Link to="/schemes" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav.schemes')}</Link>
                    <span style={{ margin: '0 0.5rem' }}>/</span>
                    <span style={{ color: '#0f172a', fontWeight: 500 }}>{scheme.title}</span>
                </div>
            </div>

            {/* Hero Section */}
            <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '3rem 0' }}>
                <div className="container">
                    <Link to="/schemes" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', marginBottom: '1.5rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                        <ArrowLeft size={16} /> Back to Schemes
                    </Link>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <span style={{
                                    background: scheme.type === 'Central' ? '#e0f2fe' : '#f0fdf4',
                                    color: scheme.type === 'Central' ? '#0369a1' : '#15803d',
                                    padding: '0.2rem 0.8rem',
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    border: `1px solid ${scheme.type === 'Central' ? '#bae6fd' : '#bbf7d0'}`
                                }}>
                                    {scheme.type} Govt
                                </span>
                                {scheme.ministry && (
                                    <span style={{
                                        background: '#f1f5f9',
                                        color: '#475569',
                                        padding: '0.2rem 0.8rem',
                                        borderRadius: '50px',
                                        fontSize: '0.85rem',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        {scheme.ministry}
                                    </span>
                                )}
                            </div>
                            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.2 }}>
                                {scheme.title}
                            </h1>
                            <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '800px', lineHeight: 1.6 }}>
                                {scheme.summary}
                            </p>
                        </div>
                        <div style={{ minWidth: '200px' }}>
                            <a href={scheme.officialLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem' }}>
                                Apply on Official Website <ExternalLink size={18} />
                            </a>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', textAlign: 'center' }}>
                                Verified on {scheme.lastVerified}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container section" style={{ display: 'grid', gridTemplateColumns: 'revert-layer', gap: '3rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {/* At a Glance */}
                    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div className="card" style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users size={16} /> Beneficiaries
                            </div>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{scheme.eligibility}</div>
                        </div>
                        <div className="card" style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FileText size={16} /> Benefits
                            </div>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{scheme.benefits}</div>
                        </div>
                        <div className="card" style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={16} /> Deadline
                            </div>
                            <div style={{ fontWeight: 600, color: '#dc2626' }}>{scheme.deadline}</div>
                        </div>
                    </section>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {/* About */}
                            <section>
                                <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <span style={{ width: '4px', height: '28px', background: 'var(--primary)', borderRadius: '4px' }}></span>
                                    About the Scheme
                                </h2>
                                <p style={{ lineHeight: 1.7, color: '#334155' }}>
                                    {scheme.details?.intro || scheme.summary}
                                </p>
                            </section>

                            {/* Eligibility */}
                            <section>
                                <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <span style={{ width: '4px', height: '28px', background: 'var(--primary)', borderRadius: '4px' }}></span>
                                    Eligibility Criteria
                                </h2>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem' }}>
                                    {scheme.details?.eligibilityCriteria?.map((item, index) => (
                                        <li key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'start', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                            <CheckCircle size={20} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                                            <span style={{ color: '#334155' }}>{item}</span>
                                        </li>
                                    )) || <li>Check official website for details.</li>}
                                </ul>
                            </section>

                            {/* Benefits Detail */}
                            <section>
                                <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <span style={{ width: '4px', height: '28px', background: 'var(--primary)', borderRadius: '4px' }}></span>
                                    Benefits Details
                                </h2>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                                    {scheme.details?.benefitsList?.map((item, index) => (
                                        <div key={index} style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.4rem' }}>{item.title}</div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>{item.value}</div>
                                        </div>
                                    )) || <p>See benefits summary above.</p>}
                                </div>
                            </section>

                            {/* How to Apply */}
                            <section>
                                <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <span style={{ width: '4px', height: '28px', background: 'var(--primary)', borderRadius: '4px' }}></span>
                                    How to Apply
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {scheme.details?.applicationProcess?.map((step, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '1.5rem' }}>
                                            <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {index + 1}
                                            </div>
                                            <p style={{ marginTop: '0.2rem', color: '#334155' }}>{step}</p>
                                        </div>
                                    )) || <p>Visit the official portal to apply.</p>}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar (Desktop) / Bottom (Mobile) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Documents Required */}
                            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>Documents Required</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem' }}>
                                    {scheme.details?.documentsRequired?.map((doc, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.95rem', color: '#475569' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                                            {doc}
                                        </li>
                                    )) || <li>Details on portal.</li>}
                                </ul>
                            </div>

                            {/* Official Sources */}
                            <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0369a1' }}>Official Sources</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <a href={scheme.officialLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0284c7', textDecoration: 'none', fontWeight: 500 }}>
                                        <ExternalLink size={16} /> Official Website
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchemeDetail;
