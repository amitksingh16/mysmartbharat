import axios from 'axios';

// Create a base client instance if we need a common base URL
// For now, since we hit different external APIs, this might just be a utility wrapper
// or we might have different instances for different services.

const apiClient = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
