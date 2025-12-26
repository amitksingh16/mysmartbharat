import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchService } from '../services/searchService';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight } from 'lucide-react';
import Card from '../components/common/Card';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const hits = searchService.search(query);
            setResults(hits);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="container section">
            <Helmet>
                <title>Search Results for "{query}" | MySmartBharat</title>
            </Helmet>

            <div style={{ marginBottom: '2rem' }}>
                <h1>Search Results</h1>
                <p style={{ color: 'var(--text-grey)' }}>
                    Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
            </div>

            {results.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-grey)' }}>
                    <Search size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <h3>No results found</h3>
                    <p>Try searching for "schemes", "jobs", "tax", etc.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {results.map(item => (
                        <Card key={item.id} className="search-result-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                                <div>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.2rem 0.6rem',
                                        backgroundColor: '#E3F2FD',
                                        color: 'var(--primary)',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {item.type}
                                    </span>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        {item.description}
                                    </p>
                                    <Link to={item.url} style={{
                                        color: 'var(--primary)',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.2rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        View Details <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
