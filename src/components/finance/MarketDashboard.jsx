import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { getMarketStatus } from '../../services/newsService';
import { useTranslation } from 'react-i18next';

const MarketDashboard = () => {
    const { t } = useTranslation();
    const [marketData, setMarketData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMarketStatus();
                setMarketData(data);
            } catch (error) {
                console.error("Failed to fetch market data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !marketData) return null;

    const MarketCard = ({ title, value, change, percent, isUp }) => (
        <div style={{
            background: 'var(--card-bg)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            minWidth: '150px',
            flex: 1
        }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', marginBottom: '0.3rem' }}>{title}</p>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{value}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                {isUp ? <TrendingUp size={14} color="var(--success)" /> : <TrendingDown size={14} color="var(--error)" />}
                <span style={{ color: isUp ? 'var(--success)' : 'var(--error)', fontWeight: '500' }}>
                    {change} {percent && `(${percent})`}
                </span>
            </div>
        </div>
    );

    return (
        <section style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Market Dashboard</h2>
                <span style={{
                    fontSize: '0.8rem',
                    background: '#e3f2fd',
                    color: '#dc3545',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                }}>
                    <span style={{ width: '8px', height: '8px', background: '#dc3545', borderRadius: '50%' }}></span>
                    LIVE
                </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {marketData.indices.map((item, idx) => (
                    <MarketCard key={idx} title={item.name} value={item.value} change={item.change} percent={item.percent} isUp={item.isUp} />
                ))}
                {marketData.commodities.map((item, idx) => (
                    <MarketCard key={idx + 10} title={item.name} value={item.value} change={item.change} isUp={item.isUp} />
                ))}
            </div>
        </section>
    );
};

export default MarketDashboard;
