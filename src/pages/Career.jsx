import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getLatestJobs } from '../services/jobsService';
import Card from '../components/common/Card';
import { Briefcase, Calendar, MapPin, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Career = () => {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getLatestJobs();
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        if (filter === 'All') return true;
        return job.category === filter;
    });

    const categories = ['All', 'Central', 'State', 'Bank', 'Railway', 'Defense', 'Teaching'];

    return (
        <>
            <Helmet>
                <title>Career & Government Jobs | MySmartBharat</title>
                <meta name="description" content="Latest Government Job notifications, Exam dates, and Career guidance." />
            </Helmet>

            <div className="container section">
                <h1 style={{ marginBottom: '2rem' }}>{t('career.title')}</h1>

                {/* Filter Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className="btn"
                            style={{
                                padding: '0.5rem 1.2rem',
                                borderRadius: '20px',
                                background: filter === cat ? 'var(--primary)' : 'var(--card-bg)',
                                color: filter === cat ? 'white' : 'var(--text-main)',
                                border: filter === cat ? 'none' : '1px solid var(--border)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat} Jobs
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Loader className="animate-spin" size={32} />
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => (
                                <Card key={job.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{job.role}</h3>
                                            <p style={{ fontWeight: '500', marginTop: '0.2rem' }}>{job.org}</p>
                                        </div>
                                        <span className="btn" style={{ padding: '0.4rem 0.8rem', background: '#E3F2FD', color: 'var(--primary)', fontSize: '0.9rem' }}>
                                            {job.vacancies} {t('career.vacancies')}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-grey)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={16} />
                                            <span>{t('career.apply_deadline')}: {job.deadline}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Briefcase size={16} />
                                            <span>{t('career.full_time')}</span>
                                        </div>
                                        {/* Added Category Badge for clarity */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <MapPin size={16} />
                                            <span>{job.category}</span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t('common.apply_now')}</a>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: 'var(--text-grey)' }}>No active jobs found in this category.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Career;
