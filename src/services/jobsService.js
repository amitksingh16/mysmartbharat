import apiClient from './apiClient';

const MOCK_JOBS = [
    {
        id: 1,
        title: "SSC CGL 2025 Notification",
        organization: "Staff Selection Commission",
        deadline: "2025-02-15",
        vacancies: "5000+",
        link: "#"
    },
    {
        id: 2,
        title: "SBI PO Recruitment",
        organization: "State Bank of India",
        deadline: "2025-01-30",
        vacancies: "2000",
        link: "#"
    },
    {
        id: 3,
        title: "UPSC Civil Services Prelims",
        organization: "Union Public Service Commission",
        deadline: "2025-03-05",
        vacancies: "1100",
        link: "#"
    }
];

export const getLatestJobs = async () => {
    // In a real scenario, we would hit a RapidAPI endpoint here.
    // For now, we return high-quality mock data.
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_JOBS), 500);
    });
};
