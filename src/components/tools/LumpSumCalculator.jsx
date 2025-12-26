import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { calculateLumpSum } from '../../utils/calculators';
import { IndianRupee, TrendingUp, Clock } from 'lucide-react';
import Card from '../common/Card';

const LumpSumCalculator = () => {
    const [investment, setInvestment] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(5);
    const [result, setResult] = useState(null);

    useEffect(() => {
        setResult(calculateLumpSum(investment, rate, years));
    }, [investment, rate, years]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const results = (
        <Card className="results-card" style={{ background: 'var(--bg-light)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Value</p>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginTop: '0.5rem' }}>{result ? formatCurrency(result.totalValue) : '-'}</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Invested Amount</span>
                    <span style={{ fontWeight: '600' }}>{result ? formatCurrency(result.investedAmount) : '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Est. Returns</span>
                    <span style={{ fontWeight: '600', color: '#059669' }}>{result ? formatCurrency(result.estReturns) : '-'}</span>
                </div>
            </div>
        </Card>
    );

    return (
        <CalculatorLayout
            title="Lump Sum Calculator"
            description="Calculate the future value of your one-time lump sum investment."
            results={results}
            formula={
                <div>
                    <p>P = Principal Investment</p>
                    <p>r = Annual Return %</p>
                    <p>n = Time in Years</p>
                    <p><strong>Future Value = P × (1 + r/100)^n</strong></p>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Investment Amount */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Investment Amount</label>
                    <div className="input-with-icon">
                        <IndianRupee size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={investment}
                            onChange={(e) => setInvestment(Number(e.target.value))}
                        />
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="10000000"
                        step="5000"
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
                    />
                </div>

                {/* Annual Return */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Expected Annual Return (%)</label>
                    <div className="input-with-icon">
                        <TrendingUp size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                        />
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
                    />
                </div>

                {/* Time Period */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Time Period (Years)</label>
                    <div className="input-with-icon">
                        <Clock size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                        />
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="40"
                        step="1"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
                    />
                </div>
            </div>

            <style>{`
                .input-with-icon {
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    padding: 0.5rem;
                }
                .input-with-icon input {
                    border: none;
                    outline: none;
                    margin-left: 0.5rem;
                    width: 100%;
                    font-size: 1rem;
                    background: transparent;
                }
            `}</style>
        </CalculatorLayout>
    );
};

export default LumpSumCalculator;
