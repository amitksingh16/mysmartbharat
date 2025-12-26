import React from 'react';
import { Helmet } from 'react-helmet-async';
import { jobs } from '../data/mockData';
import Card from '../components/common/Card';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Career = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>Career & Government Jobs | MySmartBharat</title>
                <meta name="description" content="Latest Government Job notifications, Exam dates, and Career guidance." />
            </Helmet>

            <div className="container section">
                <h1 style={{ marginBottom: '2rem' }}>{t('career.title')}</h1>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {jobs.map(job => (
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
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-primary" style={{ flex: 1 }}>{t('common.apply_now')}</button>
                                {/* Future Feature: Save Job */}
                                {/* <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Bookmark size={18} /> Save
                                </button> */}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Career;
