import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { calculateRD } from '../../utils/calculators';
import { IndianRupee, Percent, Clock } from 'lucide-react';
import Card from '../common/Card';

const RDCalculator = () => {
    const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
    const [rate, setRate] = useState(6.5);
    const [months, setMonths] = useState(60); // 5 Years
    const [result, setResult] = useState(null);

    useEffect(() => {
        setResult(calculateRD(monthlyDeposit, rate, months));
    }, [monthlyDeposit, rate, months]);

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
                    <span style={{ color: 'var(--text-grey)' }}>Total Deposits</span>
                    <span style={{ fontWeight: '600' }}>{result ? formatCurrency(result.totalDeposits) : '-'}</span>
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
            title="Recurring Deposit (RD) Calculator"
            description="Calculate the maturity amount of your Recurring Deposits (RD) with monthly compounding approximation."
            results={results}
            formula={
                <div>
                    <p>Calculates compound interest on each monthly deposit based on the time remaining.</p>
                    <p>Uses quarterly compounding logic standard for Indian banks.</p>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Monthly Deposit */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Monthly Deposit</label>
                    <div className="input-with-icon">
                        <IndianRupee size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={monthlyDeposit}
                            onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Time Period (Months)</label>
                    <div className="input-with-icon">
                        <Clock size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                        />
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                        <input
                            type="range"
                            min="6"
                            max="120"
                            step="6"
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                        />
                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-grey)' }}>{Math.floor(months / 12)} Years {months % 12} Months</div>
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

export default RDCalculator;
