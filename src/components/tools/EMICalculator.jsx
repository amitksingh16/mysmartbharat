import React, { useState, useEffect } from 'react';
import { calculateEMI } from '../../utils/calculators';
import { IndianRupee, Percent, Calendar } from 'lucide-react';
import Card from '../common/Card';

const EMICalculator = () => {
    const [amount, setAmount] = useState(1000000); // 10 Lakhs
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20); // Years
    const [result, setResult] = useState(null);

    useEffect(() => {
        setResult(calculateEMI(amount, rate, tenure));
    }, [amount, rate, tenure]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <Card className="calculator-card">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>EMI Calculator</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Loan Amount */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Loan Amount</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.5rem' }}>
                            <IndianRupee size={20} color="var(--text-grey)" />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                style={{ border: 'none', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '1rem', background: 'transparent' }}
                            />
                        </div>
                        <input
                            type="range"
                            min="100000"
                            max="10000000"
                            step="10000"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
                        />
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Interest Rate (%)</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.5rem' }}>
                            <Percent size={20} color="var(--text-grey)" />
                            <input
                                type="number"
                                value={rate}
                                step="0.1"
                                onChange={(e) => setRate(Number(e.target.value))}
                                style={{ border: 'none', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '1rem', background: 'transparent' }}
                            />
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
                        />
                    </div>

                    {/* Tenure */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tenure (Years)</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.5rem' }}>
                            <Calendar size={20} color="var(--text-grey)" />
                            <input
                                type="number"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                style={{ border: 'none', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '1rem', background: 'transparent' }}
                            />
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                            style={{ width: '100%', marginTop: '0.5rem', accentColor: 'var(--primary)' }}
                        />
                    </div>

                </div>

                {/* Results */}
                <div style={{
                    background: 'var(--bg-light)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem' }}>Monthly EMI</p>
                        <h2 style={{ color: 'var(--accent)', fontSize: '2rem' }}>{result ? formatCurrency(result.emi) : '-'}</h2>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-grey)' }}>Principal</span>
                        <span style={{ fontWeight: '600' }}>{formatCurrency(amount)}</span>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-grey)' }}>Total Interest</span>
                        <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{result ? formatCurrency(result.totalInterest) : '-'}</span>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-grey)' }}>Total Amount</span>
                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{result ? formatCurrency(result.totalAmount) : '-'}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default EMICalculator;
