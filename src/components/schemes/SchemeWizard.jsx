import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { schemes } from '../../data/mockData';
import Card from '../common/Card';
import { ChevronRight, ChevronLeft, Check, Search } from 'lucide-react';

const SchemeWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        state: '',
        category: '',
        gender: ''
    });

    const states = [
        "All India", "Madhya Pradesh", "Maharashtra", "Karnataka", "Uttar Pradesh", "Bihar", "Rajasthan"
    ];

    const categories = [
        { id: 'Students', label: 'Student', icon: '🎓' },
        { id: 'Farmers', label: 'Farmer', icon: '🌾' },
        { id: 'Women', label: 'Woman', icon: '👩' },
        { id: 'Business', label: 'Business / Entrepreneur', icon: '💼' },
        { id: 'Health', label: 'Health / Patient', icon: '🏥' },
        { id: 'Housing', label: 'Homeless / Housing', icon: '🏠' },
        { id: 'Other', label: 'Any / Other', icon: '🌍' }
    ];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSelection = (field, value) => {
        setSelections({ ...selections, [field]: value });
    };

    const getFilteredSchemes = () => {
        return schemes.filter(scheme => {
            // 1. State Filter: Match State OR Central Scheme
            const stateMatch = !scheme.state_name || selections.state === 'All India' || scheme.state_name === selections.state;

            // 2. Category Filter
            let categoryMatch = true;
            if (selections.category && selections.category !== 'Other') {
                categoryMatch = scheme.sector.toLowerCase().includes(selections.category.toLowerCase()) ||
                    scheme.eligibility.toLowerCase().includes(selections.category.toLowerCase());

                // Special mapping for Students -> Education
                if (selections.category === 'Students' && scheme.sector === 'Education') categoryMatch = true;
            }

            // 3. Gender Filter (Simple heuristic)
            let genderMatch = true;
            if (selections.gender === 'Male') {
                if (scheme.sector === 'Women') genderMatch = false;
                if (scheme.title.includes('Mahila') || scheme.title.includes('Ladli') || scheme.title.includes('Sukanya')) genderMatch = false;
            }

            return stateMatch && categoryMatch && genderMatch;
        });
    };

    const matchedSchemes = step === 4 ? getFilteredSchemes() : [];

    return (
        <div className="wizard-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Find Your Scheme</h1>
                <p style={{ color: 'var(--text-grey)' }}>Answer a few questions to find government schemes tailored for you.</p>
            </div>

            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{
                        width: '40px', height: '4px',
                        background: s <= step ? 'var(--primary)' : 'var(--border)',
                        borderRadius: '2px'
                    }}></div>
                ))}
            </div>

            <Card style={{ padding: '2rem' }}>
                {step === 1 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Where do you live?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                            {states.map(state => (
                                <button
                                    key={state}
                                    onClick={() => { handleSelection('state', state); handleNext(); }}
                                    className={`option-btn ${selections.state === state ? 'selected' : ''}`}
                                >
                                    {state}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Which describes you best?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => { handleSelection('category', cat.id); handleNext(); }}
                                    className={`option-btn ${selections.category === cat.id ? 'selected' : ''}`}
                                    style={{ flexDirection: 'column', padding: '1.5rem', gap: '0.5rem' }}
                                >
                                    <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>What is your gender?</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                            {['Male', 'Female', 'Other'].map(g => (
                                <button
                                    key={g}
                                    onClick={() => { handleSelection('gender', g); handleNext(); }}
                                    className={`option-btn ${selections.gender === g ? 'selected' : ''}`}
                                    style={{ padding: '1rem 3rem' }}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ background: '#dcfce7', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                <Check size={32} color="#166534" />
                            </div>
                            <h2>We found {matchedSchemes.length} schemes for you!</h2>
                            <p style={{ color: 'var(--text-grey)' }}>Based on: {selections.state}, {selections.category}, {selections.gender}</p>
                        </div>

                        <div className="scheme-results" style={{ display: 'grid', gap: '1rem' }}>
                            {matchedSchemes.map(scheme => (
                                <div key={scheme.id}
                                    onClick={() => navigate(`/schemes/${scheme.slug}`)}
                                    style={{
                                        padding: '1rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        background: 'white'
                                    }}
                                    className="scheme-card-hover"
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                color: scheme.scheme_level === 'central' ? '#2563eb' : '#d97706',
                                                fontWeight: 'bold',
                                                background: scheme.scheme_level === 'central' ? '#eff6ff' : '#fffbeb',
                                                padding: '2px 8px',
                                                borderRadius: '4px'
                                            }}>
                                                {scheme.type}
                                            </span>
                                            <h3 style={{ margin: '0.5rem 0 0.25rem', fontSize: '1.1rem' }}>{scheme.title}</h3>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-grey)' }}>{scheme.ministry}</p>
                                        </div>
                                        <ChevronRight size={20} color="var(--text-grey)" />
                                    </div>
                                </div>
                            ))}

                            {matchedSchemes.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)' }}>
                                    <p>No specific schemes matched exactly, but don't worry!</p>
                                    <button onClick={() => navigate('/schemes')} style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        Browse all schemes
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                            <button
                                onClick={() => setStep(1)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.8rem 1.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                <Search size={18} /> Start New Search
                            </button>
                        </div>
                    </div>
                )}
            </Card>

            {step < 4 && step > 1 && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button onClick={handleBack} style={{ background: 'none', border: 'none', color: 'var(--text-grey)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Back
                    </button>
                </div>
            )}

            <style>{`
                .option-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    background: white;
                    border: 1px solid var(--border);
                    borderRadius: var(--radius-md);
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--text-main);
                    transition: all 0.2s;
                }
                .option-btn:hover {
                    border-color: var(--primary);
                    background: var(--bg-light);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .option-btn.selected {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                }
                .scheme-card-hover:hover {
                    border-color: var(--primary) !important;
                    transform: translateX(5px) !important;
                }
                .fade-in {
                    animation: fadeIn 0.4s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default SchemeWizard;
