import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSchemes } from '../services/schemesService';
import SchemeCard from '../components/features/SchemeCard';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Schemes = () => {
    const { t } = useTranslation();
    const [typeFilter, setTypeFilter] = useState('All');
    const [sectorFilter, setSectorFilter] = useState('All');
    // State Filter: 'All India' is default
    const [stateFilter, setStateFilter] = useState('All India');
    const [allSchemes, setAllSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const loadSchemes = async () => {
            try {
                setLoading(true);
                const data = await getSchemes('All');
                setAllSchemes(data);
            } catch (error) {
                console.error("Failed to load schemes");
            } finally {
                setLoading(false);
            }
        };
        loadSchemes();
    }, []);

    // State for View Mode: 'initial' or 'all'
    const [viewMode, setViewMode] = useState('initial');
    const [currentPage, setCurrentPage] = useState(1);
    const SCHEMES_PER_PAGE = 9;

    const filteredSchemes = allSchemes.filter(s => {
        // Filter by Type
        const matchType = typeFilter === 'All' || s.type === typeFilter;

        // Filter by Sector
        const matchSector = sectorFilter === 'All' || s.sector === sectorFilter;

        // Filter by State
        // If 'All India' selected: Show all Central + all State (Mixed) - As per requirement "Show All Central + All State together"
        // If Specific State selected: Show ALL Central + Schemes matching Only that state

        let matchState = true;
        if (stateFilter !== 'All India') {
            if (s.scheme_level === 'central') {
                matchState = true; // Central schemes shown for all states
            } else {
                matchState = s.state_name === stateFilter;
            }
        }

        // Filter by Active Status (Deadline check)
        let isNotExpired = true;
        if (s.validUntil) {
            const today = new Date().toISOString().split('T')[0];
            if (s.validUntil < today) {
                isNotExpired = false;
            }
        }

        return matchType && matchSector && matchState && isNotExpired;
    }).sort((a, b) => {
        // If specific state selected, prioritize State schemes over Central schemes
        if (stateFilter !== 'All India') {
            const aIsState = a.scheme_level !== 'central';
            const bIsState = b.scheme_level !== 'central';

            if (aIsState && !bIsState) return -1;
            if (!aIsState && bIsState) return 1;
        }
        return 0;
    });

    const sectors = ['All', ...new Set(allSchemes.filter(s => {
        if (s.validUntil) {
            const today = new Date().toISOString().split('T')[0];
            if (s.validUntil < today) return false;
        }
        return true;
    }).map(s => s.sector).filter(Boolean))];

    // List of Indian States & UTs
    const states = [
        "All India",
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
        "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Puducherry"
    ];

    // Pagination Logic
    const totalSchemes = filteredSchemes.length;
    let displayedSchemes = [];
    const totalPages = Math.ceil(totalSchemes / SCHEMES_PER_PAGE);

    if (viewMode === 'initial') {
        displayedSchemes = filteredSchemes.slice(0, 9);
    } else {
        const startIndex = (currentPage - 1) * SCHEMES_PER_PAGE;
        displayedSchemes = filteredSchemes.slice(startIndex, startIndex + SCHEMES_PER_PAGE);
    }

    const handleViewAll = () => {
        setViewMode('all');
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset view to initial if filters change
    React.useEffect(() => {
        setViewMode('initial');
        setCurrentPage(1);
    }, [typeFilter, sectorFilter, stateFilter]);

    return (
        <>
            <Helmet>
                <title>Government Schemes - Central & State | MySmartBharat</title>
                <meta name="description" content="Latest Government Schemes 2025. PM Kisan, Ayushman Bharat, and state schemes explained simply." />
            </Helmet>

            <div className="container section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1>{t('schemes.title')}</h1>
                        <p style={{ color: 'var(--text-grey)' }}>{t('schemes.subtitle')}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>

                        {/* State Filter */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>State:</span>
                            <select
                                value={stateFilter}
                                onChange={(e) => setStateFilter(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    color: 'var(--primary)',
                                    maxWidth: '150px'
                                }}
                            >
                                {states.map(st => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('schemes.type_label')}:</span>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="All">{t('schemes.filter_all_types')}</option>
                                <option value="Central">{t('schemes.filter_central')}</option>
                                <option value="State">{t('schemes.filter_state')}</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('schemes.sector_label')}:</span>
                            <select
                                value={sectorFilter}
                                onChange={(e) => setSectorFilter(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {sectors.map(sec => (
                                    <option key={sec} value={sec}>{sec === 'All' ? t('schemes.filter_all_sectors') : sec}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {displayedSchemes.length > 0 ? (
                    <>
                        {stateFilter !== 'All India' && (
                            <div style={{ marginBottom: '1.5rem', padding: '0.8rem', background: '#eeffe6', borderRadius: '8px', border: '1px solid #c3e6cb', color: '#155724' }}>
                                Showing schemes for <strong>{stateFilter}</strong> (includes all Central schemes).
                            </div>
                        )}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem',
                            marginBottom: '2rem'
                        }}>
                            {displayedSchemes.map(scheme => (
                                <SchemeCard key={scheme.id} scheme={scheme} />
                            ))}
                        </div>

                        {/* Navigation / Pagination Controls */}
                        {viewMode === 'initial' && totalSchemes > 9 && (
                            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                                <button
                                    onClick={handleViewAll}
                                    className="btn btn-primary"
                                    style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
                                >
                                    View All Schemes ({totalSchemes})
                                </button>
                            </div>
                        )}

                        {viewMode === 'all' && totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '4px',
                                            border: '1px solid var(--border)',
                                            background: currentPage === page ? 'var(--primary)' : 'white',
                                            color: currentPage === page ? 'white' : 'var(--text-main)',
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-grey)' }}>
                        <h3>No active schemes found matching your filters.</h3>
                        <p>Try changing the filters or check back later.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Schemes;
