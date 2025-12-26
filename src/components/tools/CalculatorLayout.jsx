import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';
import Card from '../common/Card';

const CalculatorLayout = ({ title, description, children, results, formula, disclaimer }) => {
    return (
        <div className="container section">
            <Helmet>
                <title>{title} | MySmartBharat Tools</title>
                <meta name="description" content={description} />
            </Helmet>

            <div style={{ marginBottom: '2rem' }}>
                <Link to="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-grey)', textDecoration: 'none', marginBottom: '1rem' }}>
                    <ArrowLeft size={16} /> Back to Tools
                </Link>
                <h1>{title}</h1>
                <p style={{ color: 'var(--text-grey)', maxWidth: '700px' }}>{description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Input Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Card style={{ height: '100%' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                            <Calculator size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                            Inputs
                        </h3>
                        {children}
                    </Card>
                </div>

                {/* Results Section */}
                <div>
                    {results}
                </div>
            </div>

            {/* Formula & Explanation */}
            {formula && (
                <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-lg)' }}>
                    <h3>How it works</h3>
                    <div style={{ marginTop: '1rem', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                        {formula}
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-grey)' }}>
                {disclaimer || "Note: These calculations are for estimation purposes only. Actual returns/taxes may vary based on bank policies and latest government rules."}
            </div>
        </div>
    );
};

export default CalculatorLayout;
