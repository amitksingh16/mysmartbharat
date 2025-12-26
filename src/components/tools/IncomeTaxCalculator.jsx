import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';
import { calculateTax } from '../../utils/calculators';
import { IndianRupee, Layers } from 'lucide-react';
import Card from '../common/Card';

const IncomeTaxCalculator = () => {
    const [income, setIncome] = useState(1200000);
    const [deductions, setDeductions] = useState(150000);
    const [isNewRegime, setIsNewRegime] = useState(true);
    const [result, setResult] = useState(null);

    useEffect(() => {
        setResult(calculateTax(income, deductions, isNewRegime));
    }, [income, deductions, isNewRegime]);

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
                <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Tax Payable</p>
                <h2 style={{ fontSize: '2.5rem', color: '#dc2626', marginTop: '0.5rem' }}>{result ? formatCurrency(result.tax) : '-'}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', marginTop: '0.5rem' }}>Over Net Income: {result ? formatCurrency(result.netIncome) : '-'}</p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Base Tax</span>
                    <span style={{ fontWeight: '600' }}>{result ? formatCurrency(result.baseTax) : '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: 'var(--text-grey)' }}>Health & Edu Cess (4%)</span>
                    <span style={{ fontWeight: '600' }}>{result ? formatCurrency(result.cess) : '-'}</span>
                </div>
                {!isNewRegime && (
                    <div style={{ padding: '0.5rem', background: '#eff6ff', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: '#1e40af' }}>
                        Includes exemptions for 80C/80D etc. ({formatCurrency(deductions)})
                    </div>
                )}
                {isNewRegime && (
                    <div style={{ padding: '0.5rem', background: '#eff6ff', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: '#1e40af' }}>
                        Standard Deduction of ₹75,000 applied.
                    </div>
                )}
            </div>
        </Card>
    );

    return (
        <CalculatorLayout
            title="Income Tax Calculator"
            description="Calculate your tax liability under Old vs New Tax Regime for FY 2025-26 (Assesment Year 2026-27)."
            results={results}
            formula={
                <div>
                    <h4>New Tax Regime (Default)</h4>
                    <p>No tax up to ₹3 Lakhs. Lower slab rates. Standard deduction of ₹75,000 allowed. No other exemptions (80C, HRA, etc).</p>
                    <br />
                    <h4>Old Tax Regime</h4>
                    <p>Higher slab rates but allows deductions like 80C (up to 1.5L), 80D, HRA, etc.</p>
                    <br />
                    <p><i>Note: Income up to ₹7 Lakhs is tax-free under New Regime (u/s 87A).</i></p>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Regime Toggle */}
                <div style={{ display: 'flex', background: 'var(--bg-light)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <button
                        onClick={() => setIsNewRegime(true)}
                        style={{
                            flex: 1,
                            border: 'none',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            background: isNewRegime ? 'white' : 'transparent',
                            color: isNewRegime ? 'var(--primary)' : 'var(--text-grey)',
                            fontWeight: isNewRegime ? '600' : '400',
                            boxShadow: isNewRegime ? 'var(--shadow-sm)' : 'none',
                            cursor: 'pointer'
                        }}
                    >
                        New Regime
                    </button>
                    <button
                        onClick={() => setIsNewRegime(false)}
                        style={{
                            flex: 1,
                            border: 'none',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            background: !isNewRegime ? 'white' : 'transparent',
                            color: !isNewRegime ? 'var(--primary)' : 'var(--text-grey)',
                            fontWeight: !isNewRegime ? '600' : '400',
                            boxShadow: !isNewRegime ? 'var(--shadow-sm)' : 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Old Regime
                    </button>
                </div>

                {/* Annual Income */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Annual Income</label>
                    <div className="input-with-icon">
                        <IndianRupee size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Deductions (Only for Old Regime) */}
                <div style={{ opacity: isNewRegime ? 0.5 : 1, transition: 'opacity 0.3s' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Deductions (80C, 80D, HRA etc.)
                        {isNewRegime && <span style={{ fontSize: '0.8rem', color: '#dc2626', marginLeft: '0.5rem' }}>(Not applicable in New Regime)</span>}
                    </label>
                    <div className="input-with-icon">
                        <Layers size={20} color="var(--text-grey)" />
                        <input
                            type="number"
                            value={deductions}
                            onChange={(e) => setDeductions(Number(e.target.value))}
                            disabled={isNewRegime}
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

export default IncomeTaxCalculator;
