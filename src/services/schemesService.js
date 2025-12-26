import { schemes } from '../data/mockData';

// Currently, there is no reliable free public API for all schemes.
// We are using a local "CMS" approach (mockData.js) which acts as our database.
// In the future, this service could fetch from a real backend endpoint (e.g., /api/schemes).

export const getSchemes = async (category = 'All') => {
    console.log(`Fetching Schemes for category: ${category}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (category === 'All') {
        return schemes;
    }
    return schemes.filter(s => s.category.includes(category));
};

export const getSchemeById = async (id) => {
    return schemes.find(s => s.id === parseInt(id));
};
