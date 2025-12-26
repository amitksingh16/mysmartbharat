import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { calculatePPF } from '../../utils/calculators';
import { IndianRupee, Percent } from 'lucide-react';
import Card from '../common/Card';

const PPFCalculator = () => {
    const [annualInvestment, setAnnualInvestment] = useState(150000);
    const [rate, setRate] = useState(7.1);
    const [result, setResult] = useState(null);

    useEffect(() => {
        setResult(calculatePPF(annualInvestment, rate));
    }, [annualInvestment, rate]);

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
                <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)' }}>After 15 Years</p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Total Investment</span>
                    <span style={{ fontWeight: '600' }}>{result ? formatCurrency(result.totalInvestment) : '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Interest Earned</span>
                    <span style={{ fontWeight: '600', color: '#059669' }}>{result ? formatCurrency(result.totalInterest) : '-'}</span>
                </div>
            </div>
        </Card>
    );

    return (
        <CalculatorLayout
            title="PPF Calculator"
            description="Public Provident Fund (PPF) returns calculator (15 Year Lock-in)."
            results={results}
            formula={
                <div>
                    <p>A = P [({(1 + i) ^ n} - 1) / i] * (1+i)</p>
                    <p>Where P is annual instalment, n = 15 years, i = rate/100.</p>
                    <p>Assumes investment made at start of each financial year.</p>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Annual Investment */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Annual Investment (Max ₹1.5L)</label>
                    <div className="input-with-icon">
                        <IndianRupee size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={annualInvestment}
                            max={150000}
                            onChange={(e) => setAnnualInvestment(Number(e.target.value))}
                        />
                    </div>
                    <input
                        type="range"
                        min="500"
                        max="150000"
                        step="500"
                        value={annualInvestment}
                        onChange={(e) => setAnnualInvestment(Number(e.target.value))}
                        style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
                    />
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: annualInvestment > 150000 ? 'red' : 'var(--text-grey)' }}>
                        {annualInvestment > 150000 ? 'Max limit is 1.5 Lakhs' : ''}
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

export default PPFCalculator;
