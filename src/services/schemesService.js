import { schemes, schemesHi } from '../data/mockData';

// Currently, there is no reliable free public API for all schemes.
// We are using a local "CMS" approach (mockData.js) which acts as our database.
// In the future, this service could fetch from a real backend endpoint (e.g., /api/schemes).

export const getSchemes = async (category = 'All', language = 'en') => {
    console.log(`Fetching Schemes for category: ${category}, language: ${language}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Select data source based on language
    const dataSource = language === 'hi' ? schemesHi : schemes;
    // Fallback if Hindi data is missing for some reason (though we added it)
    const validDataSource = dataSource || schemes;

    if (category === 'All') {
        return validDataSource;
    }
    // Note: mockData categories might need mapping if we were filtering by category string.
    // However, our current filter logic in Schemes.jsx filters by 'type' and 'sector' AFTER fetching.
    // The 'category' param here seems unused in Schemes.jsx (it passes 'All').
    // So we just return the full list.
    return validDataSource;
};

export const getSchemeById = async (id, language = 'en') => {
    const dataSource = language === 'hi' ? schemesHi : schemes;
    const validDataSource = dataSource || schemes;
    return validDataSource.find(s => s.id === parseInt(id));
};
