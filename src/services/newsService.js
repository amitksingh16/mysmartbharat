import apiClient from './apiClient';
import { financeUpdates, pibUpdates, pibUpdatesHi } from '../data/mockData';

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

export const fetchPibUpdates = async (language = 'en') => {
    try {
        const response = await apiClient.get('/api/pib-updates', {
            params: { lang: language }
        });
        if (response.data && response.data.status === 'success' && response.data.data.length > 0) {
            return response.data.data.map((item, index) => ({
                id: `pib-${index}`,
                title: item.title,
                summary: item.contentSnippet || item.title,
                date: new Date(item.pubDate).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                link: item.link,
                source: 'PIB (Govt of India)',
                isVerified: true
            })).filter(item => {
                // Feature: Strict English Filter
                // If the user explicity requests 'en', we must ensure NO Hindi/Urdu/Arabic content leaks through
                if (language === 'en') {
                    // Strict English Filter: Exclude titles/summary with content in:
                    // - Devanagari (\u0900-\u097F)
                    // - Arabic/Urdu (\u0600-\u06FF)
                    // - Arabic Supplement/Extended (\u0750-\u077F)
                    const hasNonEnglish = /[\u0900-\u097F\u0600-\u06FF\u0750-\u077F]/.test(item.title) ||
                        /[\u0900-\u097F\u0600-\u06FF\u0750-\u077F]/.test(item.summary);
                    return !hasNonEnglish;
                }

                // If language is 'hi', we WANT Hindi content.
                return true;
            });
        }
        // If API returns success but empty data, return mock data
        console.warn("API returned empty data, using mock data.");
        // Use Hindi mock data if language is 'hi'
        const mockData = language === 'hi' ? pibUpdatesHi : pibUpdates;
        return mockData || pibUpdates;
    } catch (error) {
        console.error("Failed to fetch PIB updates, falling back to mock data", error);
        const mockData = language === 'hi' ? pibUpdatesHi : pibUpdates;
        return mockData || pibUpdates;
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
