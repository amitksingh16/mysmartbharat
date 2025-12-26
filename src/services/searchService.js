import Fuse from 'fuse.js';
import { schemes, financeUpdates, jobs } from '../data/mockData';

// 1. Aggregating Data
const getAllData = () => {
    const schemeItems = schemes.map(item => ({
        id: `scheme-${item.id}`,
        title: item.title,
        description: `Ministry: ${item.ministry}. Benefits: ${item.benefits}`,
        type: 'Scheme',
        url: '/schemes', // OR specific detail page if available
        original: item
    }));

    const financeItems = financeUpdates.map(item => ({
        id: `finance-${item.id}`,
        title: item.title,
        description: item.summary,
        type: 'Finance',
        url: '/finance',
        original: item
    }));

    const jobItems = jobs.map(item => ({
        id: `job-${item.id}`,
        title: `${item.role} at ${item.org}`,
        description: `Vacancies: ${item.vacancies}. Deadline: ${item.deadline}`,
        type: 'Job',
        url: '/career',
        original: item
    }));

    // Todo: Add News items when available

    return [...schemeItems, ...financeItems, ...jobItems];
};

const data = getAllData();

// 2. Configure Fuse
const options = {
    includeScore: true,
    keys: [
        { name: 'title', weight: 0.7 },
        { name: 'description', weight: 0.3 },
        { name: 'type', weight: 0.1 }
    ],
    threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
};

const fuse = new Fuse(data, options);

// 3. Search Function
export const searchService = {
    search: (query) => {
        if (!query) return [];
        const results = fuse.search(query);
        return results.map(result => result.item); // Return just the items
    }
};
