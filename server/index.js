
import express from 'express';
import Parser from 'rss-parser';
import cors from 'cors';
import NodeCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
});
const cache = new NodeCache({ stdTTL: 1800 }); // 30 minutes TTL

app.use(cors());

// PIB RSS Feed URL (English/Mixed)
// English: Lang=1, Hindi: Lang=2
const PIB_RSS_BASE = 'https://pib.gov.in/RssMain.aspx?ModId=6';

app.get('/api/pib-updates', async (req, res) => {
    try {
        const lang = req.query.lang === 'hi' ? 'hi' : 'en';
        const pibLangCode = lang === 'hi' ? '2' : '1';

        // Use different cache keys for different languages
        const cacheKey = `pib-updates-${lang}`;

        // Check cache first
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }

        const feedUrl = `${PIB_RSS_BASE}&Lang=${pibLangCode}&Regid=1`; // Use Region ID 1 for broader/English, can verify for Hindi
        // Note: For Hindi, Regid=3 was seen in search results, we'll try to keep Regid=3 for Hindi if needed,
        // or just use consistent Regid if possible.
        // Let's rely on the plan: Lang=2 for Hindi.

        console.log(`Fetching fresh data from PIB (${lang.toUpperCase()})... URL: ${feedUrl}`);
        const feed = await parser.parseURL(feedUrl);

        // Transform data
        const updates = feed.items.slice(0, 10).map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            contentSnippet: item.contentSnippet,
            source: 'Press Information Bureau, Government of India'
        }));

        const responseData = {
            status: 'success',
            lastUpdated: new Date().toISOString(),
            language: lang,
            data: updates
        };

        // Save to cache
        cache.set(cacheKey, responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching PIB feed:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch government updates. Please try again later.',
            debug_error: error.message
        });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
