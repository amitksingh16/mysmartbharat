import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const terms = [
    {
        term: "Repo Rate",
        definition: "The interest rate at which the RBI lends money to banks. When this goes up, your loan EMIs usually go up."
    },
    {
        term: "Inflation",
        definition: "The rate at which prices of goods and services rise. If inflation is 6%, something that cost ₹100 last year costs ₹106 now."
    },
    {
        term: "Fiscal Deficit",
        definition: "When the government spends more money than it earns. It's like a gap in the budget that needs to be filled by borrowing."
    },
    {
        term: "GDP (Gross Domestic Product)",
        definition: "The total value of all goods and services produced in the country. It's the scorecard of the country's economic health."
    },
    {
        term: "SIP (Systematic Investment Plan)",
        definition: "A method of investing a fixed sum regularly in a mutual fund. It helps you save small amounts consistently."
    },
    {
        term: "Form 16",
        definition: "A certificate from your employer certifying that TDS has been deducted from your salary and deposited with the government."
    }
];

const FinancialGlossary = () => {
    const [expanded, setExpanded] = useState(null);

    const toggle = (idx) => {
        setExpanded(expanded === idx ? null : idx);
    };

    return (
        <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#e0f7fa', padding: '0.5rem', borderRadius: '50%', color: '#006064' }}>
                    <BookOpen size={24} />
                </div>
                <h2>Financial Terms Simplified</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {terms.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => toggle(idx)}
                        style={{
                            background: 'var(--card-bg)',
                            padding: '1.2rem',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-sm)',
                            cursor: 'pointer',
                            border: expanded === idx ? '1px solid var(--primary)' : '1px solid transparent',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{item.term}</h3>
                            {expanded === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                        {expanded === idx && (
                            <p style={{ marginTop: '0.8rem', color: 'var(--text-grey)', lineHeight: '1.6' }}>
                                {item.definition}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FinancialGlossary;
