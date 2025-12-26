import apiClient from './apiClient';
import { financeUpdates } from '../data/mockData';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const PROVIDER = import.meta.env.VITE_NEWS_API_PROVIDER || 'mock';

export const getLatestNews = async () => {
    // 1. Return Mock Data if configured or no key
    if (PROVIDER === 'mock' || !NEWS_API_KEY) {
        console.log('Fetching News from Mock Data...');
        return new Promise((resolve) => {
            setTimeout(() => resolve(financeUpdates), 500);
        });
    }

    // 2. Integration for Alpha Vantage (Example)
    if (PROVIDER === 'alphavantage') {
        try {
            const response = await apiClient.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=finance&apikey=${NEWS_API_KEY}`);
            // Transform Alpha Vantage format to our app's format
            if (response.data.feed) {
                return response.data.feed.map((item, index) => ({
                    id: index,
                    title: item.title,
                    summary: item.summary,
                    date: item.time_published, // Needs formatting
                    category: "Finance",
                    image: item.banner_image
                })).slice(0, 10);
            }
        } catch (error) {
            console.error("Alpha Vantage API Error, falling back to mock:", error);
        }
    }

    // 3. Integration for RapidAPI (Example)
    if (PROVIDER === 'rapidapi') {
        // Implementation for RapidAPI would go here
    }

    // Fallback
    return financeUpdates;
};

export const fetchPibUpdates = async () => {
    try {
        const response = await apiClient.get('/api/pib-updates');
        if (response.data && response.data.status === 'success') {
            return response.data.data.map((item, index) => ({
                id: `pib-${index}`,
                title: item.title,
                summary: item.contentSnippet || item.title,
                date: new Date(item.pubDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                link: item.link,
                source: 'PIB (Govt of India)',
                isVerified: true
            }));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch PIB updates", error);
        return [];
    }
};

export const getMarketStatus = async () => {
    // Placeholder for market status (Open/Closed/Nifty Level)
    return {
        nifty: "21,456.70",
        sensex: "71,200.30",
        status: "Market Open"
    };
};
