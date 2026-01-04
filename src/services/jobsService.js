import apiClient from './apiClient';

const MOCK_JOBS = [
    {
        id: 1,
        role: "SSC CGL 2026 Notification",
        org: "Staff Selection Commission",
        category: "Central",
        deadline: "2026-05-15",
        vacancies: "5000+",
        link: "https://ssc.gov.in/"
    },
    {
        id: 2,
        role: "SBI PO Recruitment",
        org: "State Bank of India",
        category: "Bank",
        deadline: "2026-04-30",
        vacancies: "2000",
        link: "https://sbi.co.in/web/careers"
    },
    {
        id: 3,
        role: "UPSC Civil Services Prelims",
        org: "Union Public Service Commission",
        category: "Central",
        deadline: "2026-06-05",
        vacancies: "1100",
        link: "https://upsconline.nic.in/"
    },
    {
        id: 4,
        role: "UP Police Constable",
        org: "Uttar Pradesh Police",
        category: "State",
        deadline: "2026-04-20",
        vacancies: "60244",
        link: "https://uppbpb.gov.in/"
    },
    {
        id: 5,
        role: "IBPS Clerk 2026",
        org: "Institute of Banking Personnel Selection",
        category: "Bank",
        deadline: "2026-07-21",
        vacancies: "4500+",
        link: "https://ibps.in/"
    },
    {
        id: 6,
        role: "MP Patwari Recruitment",
        org: "MP Employees Selection Board",
        category: "State",
        deadline: "2026-05-10",
        vacancies: "3000+",
        link: "https://esb.mp.gov.in/"
    },
    {
        id: 7,
        role: "RBI Assistant",
        org: "Reserve Bank of India",
        category: "Bank",
        deadline: "2026-06-15",
        vacancies: "950",
        link: "https://rbi.org.in/"
    },
    {
        id: 8,
        role: "Bihar BPSC 71st Exam",
        org: "Bihar Public Service Commission",
        category: "State",
        deadline: "2026-05-01",
        vacancies: "500+",
        link: "https://onlinebpsc.bihar.gov.in/"
    },
    {
        id: 9,
        role: "RRB NTPC 2026",
        org: "Railway Recruitment Board",
        category: "Railway",
        deadline: "2026-08-10",
        vacancies: "10000+",
        link: "https://indianrailways.gov.in/"
    },
    {
        id: 10,
        role: "Indian Army Agniveer",
        org: "Indian Army",
        category: "Defense",
        deadline: "2026-05-30",
        vacancies: "25000+",
        link: "https://joinindianarmy.nic.in/"
    },
    {
        id: 11,
        role: "CTET July 2026",
        org: "CBSE (Central Teacher Eligibility Test)",
        category: "Teaching",
        deadline: "2026-04-15",
        vacancies: "N/A",
        link: "https://ctet.nic.in/"
    },
    {
        id: 12,
        role: "KVS Recruitment",
        org: "Kendriya Vidyalaya Sangathan",
        category: "Teaching",
        deadline: "2026-06-20",
        vacancies: "6000+",
        link: "https://kvsangathan.nic.in/"
    },
    {
        id: 13,
        role: "AFCAT 2 2026",
        org: "Indian Air Force",
        category: "Defense",
        deadline: "2026-06-30",
        vacancies: "300+",
        link: "https://afcat.cdac.in/"
    }
];

export const getLatestJobs = async () => {
    // In a real scenario, we would hit a RapidAPI endpoint here.
    // For now, we return high-quality mock data, filtered by deadline.
    return new Promise((resolve) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

        const activeJobs = MOCK_JOBS.filter(job => {
            const deadlineDate = new Date(job.deadline);
            return deadlineDate >= today;
        });

        setTimeout(() => resolve(activeJobs), 500);
    });
};
