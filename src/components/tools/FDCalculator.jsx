import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { calculateFD } from '../../utils/calculators';
import { IndianRupee, Percent, Clock, Settings } from 'lucide-react';
import Card from '../common/Card';

const FDCalculator = () => {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(6.5);
    const [years, setYears] = useState(5);
    const [frequency, setFrequency] = useState(4); // Quarterly
    const [result, setResult] = useState(null);

    useEffect(() => {
        setResult(calculateFD(principal, rate, years, frequency));
    }, [principal, rate, years, frequency]);

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
                <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Maturity Amount</p>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginTop: '0.5rem' }}>{result ? formatCurrency(result.maturityAmount) : '-'}</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Principal Amount</span>
                    <span style={{ fontWeight: '600' }}>{result ? formatCurrency(result.principal) : '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Interest Earned</span>
                    <span style={{ fontWeight: '600', color: '#059669' }}>{result ? formatCurrency(result.interestEarned) : '-'}</span>
                </div>
            </div>
        </Card>
    );

    return (
        <CalculatorLayout
            title="Fixed Deposit (FD) Calculator"
            description="Calculate the maturity amount and interest earned on your Fixed Deposits."
            results={results}
            formula={
                <div>
                    <p>P = Principal</p>
                    <p>r = Rate of Interest</p>
                    <p>n = Compounding Frequency (4 for Quarterly)</p>
                    <p>t = Time in Years</p>
                    <p><strong>A = P × (1 + r/n)^(n×t)</strong></p>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Principal */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Investment Amount</label>
                    <div className="input-with-icon">
                        <IndianRupee size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={principal}
                            onChange={(e) => setPrincipal(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Rate */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Interest Rate (%)</label>
                    <div className="input-with-icon">
                        <Percent size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                        />
                    </div>
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
                </div>

                {/* Frequency */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Compounding Frequency</label>
                    <div className="input-with-icon">
                        <Settings size={20} color="var(--text-grey)" />
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(Number(e.target.value))}
                            style={{ border: 'none', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '1rem', background: 'transparent' }}
                        >
                            <option value={12}>Monthly</option>
                            <option value={4}>Quarterly (Standard)</option>
                            <option value={2}>Half-Yearly</option>
                            <option value={1}>Yearly</option>
                        </select>
                    </div>
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

export default FDCalculator;
