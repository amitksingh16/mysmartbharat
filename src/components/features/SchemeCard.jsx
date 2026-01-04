import React from 'react';
import Card from '../common/Card';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SchemeCard = ({ scheme }) => {
    const { t } = useTranslation();

    const getDeadlineLabel = (deadline) => {
        if (deadline === 'Open all year') return `🟢 ${t('schemes.status_open', 'Always Open')}`;
        if (deadline === 'N/A' || deadline === 'Check portal') return `🟡 ${t('schemes.status_check', 'Check Official Portal')}`;
        return `📅 ${t('career.apply_deadline', 'Deadline')}: ${deadline}`;
    };

    return (
        <Card className="scheme-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: scheme.type === 'Central' ? '#1565C0' : '#2E7D32',
                        background: scheme.type === 'Central' ? '#E3F2FD' : '#E8F5E9',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: `1px solid ${scheme.type === 'Central' ? '#BBDEFB' : '#C8E6C9'}`
                    }}>
                        {scheme.type} {scheme.state ? `(${scheme.state})` : ''}
                    </span>
                    <span style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: 'var(--text-grey)',
                        background: '#F5F5F5',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border)'
                    }}>
                        {scheme.sector}
                    </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{scheme.title}</h3>
                <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem' }}>{scheme.ministry}</p>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <Users size={16} color="var(--text-grey)" />
                    <span>{scheme.eligibility}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 500 }}>
                    {/* Icon handles in function string or kept separate? keeping separate looks cleaner but function returns text with icon char */}
                    {/* Actually, let's keep Calendar icon if standard deadline, or no icon if label has emoji? */}
                    {/* The logic above returns string with emoji. I will render it directly without Calendar icon if it has emoji, or maybe just replace the whole block content. */}
                    <span>{getDeadlineLabel(scheme.deadline)}</span>
                </div>

                <Link to={`/schemes/${scheme.slug}`} className="btn btn-primary" style={{ width: '100%' }}>
                    View Details <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </Link>
            </div>
        </Card>
    );
};

export default SchemeCard;
