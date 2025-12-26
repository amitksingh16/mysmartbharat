export const schemes = [
    {
        id: 1,
        title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        slug: "pm-kisan-samman-nidhi",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Farmers",
        ministry: "Ministry of Agriculture & Farmers Welfare",
        summary: "Direct income support of ₹6,000 per year to landholding farmer families.",
        benefits: "₹6,000 per year",
        eligibility: "Small and marginal farmers",
        status: "Active",
        deadline: "Open all year",
        validUntil: "2099-12-31",
        lastVerified: "20 Dec 2025",
        officialLink: "https://pmkisan.gov.in",
        details: {
            intro: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from the Government of India. The funds are transferred directly to the bank accounts of the beneficiaries.",
            beneficiaries: ["Small Farmers", "Marginal Farmers"],
            eligibilityCriteria: [
                "Landholding farmer families with cultivable land holding in their names.",
                "Husband, Wife, and minor children constitute the family.",
                "Institutional landholders are NOT eligible.",
                "Present/retired officers and employees of central/state government are NOT eligible.",
                "Income Tax payers are NOT eligible."
            ],
            benefitsList: [
                { title: "Financial Support", value: "₹6,000 per year" },
                { title: "Installments", value: "3 equal installments of ₹2,000 every 4 months" },
                { title: "Mode of Transfer", value: "Direct Benefit Transfer (DBT) to Bank Account" }
            ],
            applicationProcess: [
                "Visit the official PM-KISAN portal (pmkisan.gov.in).",
                "Go to 'Farmers Corner' and click on 'New Farmer Registration'.",
                "Enter your Aadhaar Number and Captcha.",
                "Select your State and fill in the required details.",
                "Submit the form and note down your registration number."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Landholding Documents (Khasra/Khatauni)",
                "Bank Account Passbook",
                "Passport size photo"
            ]
        }
    },
    {
        id: 2,
        title: "Ayushman Bharat PM-JAY",
        slug: "ayushman-bharat-pm-jay",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Health",
        ministry: "Ministry of Health and Family Welfare",
        summary: "Health insurance coverage of up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.",
        benefits: "Free health cover up to ₹5 Lakhs",
        eligibility: "Low income families (SECC 2011)",
        status: "Active",
        deadline: "N/A",
        validUntil: "2099-12-31",
        lastVerified: "15 Dec 2025",
        officialLink: "https://pmjay.gov.in",
        details: {
            intro: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world's largest health assurance scheme fully financed by the government. It provides a cover of Rs. 5 lakhs per family per year.",
            beneficiaries: ["Poor Families", "Vulnerable Sections"],
            eligibilityCriteria: [
                "Families listed in SECC 2011 database.",
                "Families with RSBY card.",
                "No restriction on family size, age or gender.",
                "Pre-existing conditions are covered from day one."
            ],
            benefitsList: [
                { title: "Health Cover", value: "₹5,00,000 per family/year" },
                { title: "Hospitalization", value: "Cashless & Paperless at empaneled hospitals" },
                { title: "Coverage", value: "Secondary and Tertiary care procedures" }
            ],
            applicationProcess: [
                "Check eligibility on mera.pmjay.gov.in or call 14555.",
                "If eligible, visit an Empaneled Health Care Provider (EHCP) or CSC.",
                "Verify identity using Aadhaar or Ration Card.",
                "Get your Ayushman Card generated."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Ration Card",
                "Mobile Number"
            ]
        }
    },
    {
        id: 3,
        title: "Ladli Behna Yojana",
        slug: "ladli-behna-yojana",
        scheme_level: "state",
        state_name: "Madhya Pradesh",
        type: "State",
        state: "Madhya Pradesh",
        sector: "Women",
        ministry: "Govt of Madhya Pradesh",
        summary: "Financial assistance of ₹1,250 per month to eligible women in Madhya Pradesh.",
        benefits: "₹1,250 per month",
        eligibility: "Women aged 21-60 years",
        status: "Active",
        deadline: "Check portal",
        validUntil: "2099-12-31",
        lastVerified: "01 Dec 2025",
        officialLink: "https://cmladlibahna.mp.gov.in",
        details: {
            intro: "Mukhyamantri Ladli Behna Yojana is a scheme by the Madhya Pradesh government to strengthen the economic independence of women, improve their health and nutrition status and their role in family decisions.",
            beneficiaries: ["Women of MP"],
            eligibilityCriteria: [
                "Must be a resident of Madhya Pradesh.",
                "Married women (including widowed, divorced, abandoned) aged 21 to 60 years.",
                "Family annual income should be less than ₹2.5 Lakhs.",
                "No family member should be an Income Tax payer."
            ],
            benefitsList: [
                { title: "Monthly Assistance", value: "₹1,250 directly to bank account" },
                { title: "Frequency", value: "10th of every month" }
            ],
            applicationProcess: [
                "Visit the Gram Panchayat/Ward Office or designated camp.",
                "Fill out the application form.",
                "Complete e-KYC and link Aadhaar with Bank Account.",
                "Receive acknowledgment receipt."
            ],
            documentsRequired: [
                "Aadhaar Card (Samagra ID linked)",
                "Samagra ID",
                "Bank Account (Aadhaar linked & DBT enabled)",
                "Mobile Number"
            ]
        }
    },
    {
        id: 4,
        title: "PM Vishwakarma Yojana",
        slug: "pm-vishwakarma-yojana",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "MSME",
        ministry: "Ministry of MSME",
        summary: "Holistic support to artisans and craftspeople including loans, skill training, and toolkits.",
        benefits: "Loan up to ₹3 Lakhs @ 5%",
        eligibility: "Artisans (18 trades)",
        status: "Active",
        deadline: "31 Mar 2026",
        validUntil: "2026-03-31",
        lastVerified: "10 Dec 2025",
        officialLink: "https://pmvishwakarma.gov.in",
        details: {
            intro: "PM Vishwakarma aims to improve the quality, scale and reach of products and services of artisans and craftspeople and to integrate them with the domestic and global value chains.",
            beneficiaries: ["Artisans", "Craftspeople"],
            eligibilityCriteria: [
                "Engaged in one of the 18 specified traditional trades.",
                "Minimum age 18 years.",
                "Should not have availed similar loan schemes in past 5 years.",
                "Only one member per family is eligible."
            ],
            benefitsList: [
                { title: "Collateral Free Loan", value: "Up to ₹3 Lakhs (Tranche 1: ₹1L, Tranche 2: ₹2L)" },
                { title: "Interest Rate", value: "Concessional 5%" },
                { title: "Skill Training", value: "Stipend of ₹500/day" },
                { title: "Toolkit Incentive", value: "Up to ₹15,000" }
            ],
            applicationProcess: [
                "Register on PM Vishwakarma Portal.",
                "Verification by Gram Panchayat/ULB level.",
                "District & Screening Committee check.",
                "Sanction of Loan/Training."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Bank Account Details",
                "Skill Certificate (if any)"
            ]
        }
    },
    {
        id: 5,
        title: "Pradhan Mantri Awas Yojana (Urban)",
        slug: "pm-awas-yojana-urban",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Housing",
        ministry: "Ministry of Housing and Urban Affairs",
        summary: "Housing for All in urban areas. Interest subsidy on home loans for EWS/LIG/MIG categories.",
        benefits: "Interest subsidy up to ₹2.67 Lakhs",
        eligibility: "EWS, LIG, MIG families",
        status: "Active",
        deadline: "31 Dec 2026",
        validUntil: "2026-12-31",
        lastVerified: "01 Jan 2025",
        officialLink: "https://pmaymis.gov.in",
        details: {
            intro: "PMAY-U addresses urban housing shortage among the EWS/LIG and MIG categories including the slum dwellers by ensuring a pucca house to all eligible urban households.",
            beneficiaries: ["Urban Poor", "Middle Income Groups"],
            eligibilityCriteria: [
                "Beneficiary family should not own a pucca house primarily in any part of India.",
                "Annual income criteria: EWS (up to ₹3L), LIG (₹3L-₹6L), MIG (₹6L-₹18L).",
                "Adult female member ownership is mandatory for EWS/LIG."
            ],
            benefitsList: [
                { title: "CLSS Subsidy", value: "Interest subsidy of 6.5%, 4%, or 3% on loan amounts" },
                { title: "Max Amount", value: "Benefit varies based on category" }
            ],
            applicationProcess: [
                "Apply online via PMAY(U) MIS portal or CSC.",
                "Select 'Citizen Assessment' and choose category.",
                "Enter Aadhaar details and fill application.",
                "Track status using Assessment ID."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Income Certificate",
                "Bank Account Details",
                "Property Details (if applicable)"
            ]
        }
    },
    {
        id: 6,
        title: "Pradhan Mantri Mudra Yojana (PMMY)",
        slug: "pm-mudra-yojana",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Business",
        ministry: "Ministry of Finance",
        summary: "Loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises.",
        benefits: "Loan up to ₹10 Lakhs",
        eligibility: "Small business owners",
        status: "Active",
        deadline: "Open all year",
        validUntil: "2099-12-31",
        lastVerified: "01 Jan 2025",
        officialLink: "https://www.mudra.org.in",
        details: {
            intro: "PMMY provides loans to micro and small enterprises for income generating activities. Loans are divided into Shishu, Kishore, and Tarun categories.",
            beneficiaries: ["Entrepreneurs", "Small Business Owners"],
            eligibilityCriteria: [
                "Any Indian Citizen who has a business plan for a non-farm sector income generating activity.",
                "Manufacturing, processing, trading or service sector.",
                "Loan requirement is less than ₹10 Lakhs."
            ],
            benefitsList: [
                { title: "Shishu", value: "Loans up to ₹50,000" },
                { title: "Kishore", value: "Loans ₹50,000 to ₹5,00,000" },
                { title: "Tarun", value: "Loans ₹5,00,000 to ₹10,00,000" }
            ],
            applicationProcess: [
                "Approach any commercial bank, RRB, or Small Finance Bank.",
                "Submit loan application with business plan.",
                "Complete formalities as per bank's requirement.",
                "Loan processing and sanction."
            ],
            documentsRequired: [
                "Proof of Identity (Aadhaar/PAN/Voter ID)",
                "Proof of Residence",
                "Business Proof (Registration/License)",
                "Quotation of machinery/items to be purchased"
            ]
        }
    },
    {
        id: 7,
        title: "Sukanya Samriddhi Yojana",
        slug: "sukanya-samriddhi-yojana",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Social Welfare",
        ministry: "Ministry of Finance",
        summary: "Small deposit scheme for the girl child. High interest rate and tax benefits.",
        benefits: "High Interest (8.2%)",
        eligibility: "Girl child < 10 years",
        status: "Active",
        deadline: "Before child turns 10",
        validUntil: "2099-12-31",
        lastVerified: "01 Jan 2025",
        officialLink: "https://www.nsiindia.gov.in",
        details: {
            intro: "Sukanya Samriddhi Yojana (SSY) is a small deposit scheme of the Government of India meant exclusively for a girl child. It is launched as a part of the Beti Bachao Beti Padhao campaign.",
            beneficiaries: ["Girl Child"],
            eligibilityCriteria: [
                "Account can be opened by parents/guardians for a girl child.",
                "Girl child age must be less than 10 years.",
                "Maximum 2 accounts allowed per family (for 2 girl children)."
            ],
            benefitsList: [
                { title: "Interest Rate", value: "8.2% per annum (subject to change)" },
                { title: "Tax Benefit", value: "Tax-free under Section 80C" },
                { title: "Maturity", value: "21 years from account opening" }
            ],
            applicationProcess: [
                "Visit a Post Office or designated Bank branch.",
                "Fill the Account Opening Form.",
                "Submit documents and deposit initial amount (min ₹250).",
                "Direct credit or standing instructions can be set."
            ],
            documentsRequired: [
                "Birth Certificate of Girl Child",
                "ID Proof of Parent/Guardian",
                "Address Proof of Parent/Guardian"
            ]
        }
    },
    {
        id: 8,
        title: "Atal Pension Yojana (APY)",
        slug: "atal-pension-yojana",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Social Security",
        ministry: "Ministry of Finance",
        summary: "Pension scheme for unorganized sector workers with guaranteed monthly pension.",
        benefits: "Pension ₹1k-₹5k/month",
        eligibility: "Age 18-40 years",
        status: "Active",
        deadline: "Open all year",
        validUntil: "2099-12-31",
        lastVerified: "15 Jan 2025",
        officialLink: "https://www.npscra.nsdl.co.in",
        details: {
            intro: "APY is a pension scheme for citizens of India, focused on the unorganized sector workers. Under the APY, guaranteed minimum pension of Rs. 1,000/-, 2,000/-, 3,000/-, 4,000/ and 5,000/- per month will be given at the age of 60 years.",
            beneficiaries: ["Unorganized Sector Workers"],
            eligibilityCriteria: [
                "Indian Citizen.",
                "Age between 18 and 40 years.",
                "Should have a Savings Bank account.",
                "Should not be an income tax payer (rules updated Oct 2022)."
            ],
            benefitsList: [
                { title: "Pension", value: "Guaranteed monthly pension after age 60" },
                { title: "Amount", value: "₹1000 to ₹5000 based on contribution" },
                { title: "Family Benefit", value: "Pension to spouse and corpus to nominee" }
            ],
            applicationProcess: [
                "Approach the bank/post office where you have a savings account.",
                "Fill the APY registration form.",
                "Provide Aadhaar and Mobile number.",
                "Ensure sufficient balance for auto-debit of contribution."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Savings Bank Account details"
            ]
        }
    },
    {
        id: 9,
        title: "Pradhan Mantri Ujjwala Yojana",
        slug: "pm-ujjwala-yojana",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Energy",
        ministry: "Ministry of Petroleum & Natural Gas",
        summary: "Free LPG connections to women from BPL households.",
        benefits: "Free LPG Connection + Subsidy",
        eligibility: "Women from BPL families",
        status: "Active",
        deadline: "Open all year",
        validUntil: "2099-12-31",
        lastVerified: "10 Jan 2025",
        officialLink: "https://www.pmuy.gov.in",
        details: {
            intro: "PMUY aims to safeguard the health of women and children by providing them with a clean cooking fuel – LPG, so that they don’t have to compromise their health in smoky kitchens.",
            beneficiaries: ["BPL Households", "SC/ST Households"],
            eligibilityCriteria: [
                "Applicant must be a woman above 18 years.",
                "Must belong to BPL household/SC/ST/PMAY beneficiary/Antyodaya Anna Yojana.",
                "No other LPG connection in the same household."
            ],
            benefitsList: [
                { title: "Connection", value: "Deposit-free LPG connection" },
                { title: "Financial Support", value: "₹1600 per connection assistance" },
                { title: "First Refill", value: "Free Refill & Hotplate (Stove)" }
            ],
            applicationProcess: [
                "Fill application at nearest LPG distributor.",
                "Submit KYC details.",
                "Oil Marketing Company (OMC) will dedup and release connection.",
                "Installation at beneficiary home."
            ],
            documentsRequired: [
                "KYC (Aadhaar/Voter ID)",
                "Ration Card",
                "Aadhaar of all family members",
                "Bank Account details"
            ]
        }
    },
    {
        id: 10,
        title: "E-Shram Card",
        slug: "e-shram-card",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Labor",
        ministry: "Ministry of Labor & Employment",
        summary: "National Database of Unorganized Workers. Accidental insurance cover and social security.",
        benefits: "Insurance ₹2 Lakhs",
        eligibility: "Unorganized workers",
        status: "Active",
        deadline: "Open all year",
        validUntil: "2099-12-31",
        lastVerified: "20 Jan 2025",
        officialLink: "https://eshram.gov.in",
        details: {
            intro: "e-Shram is a comprehensive National Database of Unorganized Workers (NDUW). Registration gives workers an e-Shram card and access to various social security schemes.",
            beneficiaries: ["Construction Workers", "Migrant Workers", "Domestic Workers"],
            eligibilityCriteria: [
                "Age between 16-59 years.",
                "Should not be a member of EPFO/ESIC.",
                "Should not be an income tax payer.",
                "Must be working in unorganized sector."
            ],
            benefitsList: [
                { title: "Accidental Cover", value: "₹2 Lakhs on death/permanent disability" },
                { title: "Partial Disability", value: "₹1 Lakh" },
                { title: "Universal ID", value: "Valid across India" }
            ],
            applicationProcess: [
                "Self-registration at eshram.gov.in or visit CSC.",
                "Enter Aadhaar linked mobile number.",
                "Fill personal, address, and occupation details.",
                "Download UAN Card."
            ],
            documentsRequired: [
                "Aadhaar Number",
                "Aadhaar linked Mobile Number",
                "Bank Account Details"
            ]
        }
    },
    {
        id: 11,
        title: "PM Fasal Bima Yojana",
        slug: "pm-fasal-bima-yojana",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Farmers",
        ministry: "Ministry of Agriculture",
        summary: "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage.",
        benefits: "Crop Loss Coverage",
        eligibility: "All Farmers including Tenant",
        status: "Active",
        deadline: "Seasonal (Kharif/Rabi)",
        validUntil: "2026-07-31",
        lastVerified: "20 Jan 2025",
        officialLink: "https://pmfby.gov.in",
        details: {
            intro: "PMFBY aims to support sustainable production in agriculture sector by providing financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
            beneficiaries: ["Farmers"],
            eligibilityCriteria: [
                "Farmers growing notified crops in notified areas.",
                "Sharecroppers and tenant farmers are also eligible.",
                "Compulsory for loanee farmers (optional now in some states)."
            ],
            benefitsList: [
                { title: "Premium", value: "Very low: 2% (Kharif), 1.5% (Rabi), 5% (Commercial/Horticultural)" },
                { title: "Claim", value: "Full claim against sum insured" },
                { title: "Risk Coverage", value: "Prevented sowing, localized calamities, post-harvest losses" }
            ],
            applicationProcess: [
                "Apply via Bank (if taking loan) or CSC or PMFBY Portal.",
                "Pay the premium share.",
                "Receive policy documents."
            ],
            documentsRequired: [
                "Land Possession/Sowing Certificate",
                "Aadhaar Card",
                "Bank Account Details"
            ]
        }
    },
    {
        id: 12,
        title: "Stand Up India",
        slug: "stand-up-india",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Business",
        ministry: "Ministry of Finance",
        summary: "Bank loans between ₹10 Lakh and ₹1 Crore to SC/ST and Women borrowers.",
        benefits: "Loan ₹10L - ₹1Cr",
        eligibility: "SC/ST or Woman Entrepreneur",
        status: "Active",
        deadline: "Open all year",
        validUntil: "2099-12-31",
        lastVerified: "01 Feb 2025",
        officialLink: "https://www.standupmitra.in",
        details: {
            intro: "The objective of Stand Up India is to facilitate bank loans between 10 lakh and 1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
            beneficiaries: ["SC/ST", "Women Entrepreneurs"],
            eligibilityCriteria: [
                "SC/ST and/or Woman entrepreneur above 18 years.",
                "Greenfield enterprise (first time venture).",
                "Non-individual enterprises must have 51% shareholding by SC/ST/Woman."
            ],
            benefitsList: [
                { title: "Loan Amount", value: "₹10 Lakhs to ₹1 Crore" },
                { title: "Nature of Loan", value: "Composite loan (Term loan + Working capital)" },
                { title: "Repayment", value: "7 years with moratorium up to 18 months" }
            ],
            applicationProcess: [
                "Apply directly at bank branch OR via Stand Up India portal OR Lead District Manager.",
                "Submit project report.",
                "Loan sanction."
            ],
            documentsRequired: [
                "Identity Proof",
                "Residence Proof",
                "Business Plan/Project Report",
                "Caste Certificate (for SC/ST)"
            ]
        }
    },
    {
        id: 13,
        title: "PM SVANidhi",
        slug: "pm-svanidhi",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Business",
        ministry: "Ministry of Housing and Urban Affairs",
        summary: "Special Micro-Credit Facility for Street Vendors.",
        benefits: "Working Capital Loan up to ₹10k/20k/50k",
        eligibility: "Street Vendors",
        status: "Active",
        deadline: "Dec 2026",
        validUntil: "2026-12-31",
        lastVerified: "15 Jan 2025",
        officialLink: "https://pmsvanidhi.mohua.gov.in",
        details: {
            intro: "PM SVANidhi is a special micro-credit facility to provide affordable loans to street vendors to resume their livelihoods that have been adversely affected due to the Covid-19 lockdown.",
            beneficiaries: ["Street Vendors/Hawkers"],
            eligibilityCriteria: [
                "Street vendors in urban areas.",
                "Vendors from peri-urban/rural areas vending in urban areas.",
                "Must have valid ID or Letter of Recommendation (LoR)."
            ],
            benefitsList: [
                { title: "Loan", value: "Collateral free working capital loan" },
                { title: "Tranches", value: "1st: ₹10,000, 2nd: ₹20,000, 3rd: ₹50,000" },
                { title: "Subsidy", value: "7% Interest Subsidy on timely repayment" }
            ],
            applicationProcess: [
                "Apply online on PM SVANidhi portal or at CSC.",
                "Verification by ULB (if LoR needed).",
                "Loan sanction by lending institution."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Mobile Number linked to Aadhaar",
                "Vending ID card / LoR"
            ]
        }
    },
    {
        id: 14,
        title: "National Scholarship Portal (Post-Matric)",
        slug: "nsp-post-matric",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Education",
        ministry: "Ministry of Minority Affairs / Others",
        summary: "Scholarships for students studying at post-matriculation or post-secondary stage.",
        benefits: "Financial Assistance",
        eligibility: "Students Class 11 & above",
        status: "Active",
        deadline: "Check portal",
        validUntil: "2026-03-31",
        lastVerified: "10 Jan 2025",
        officialLink: "https://scholarships.gov.in",
        details: {
            intro: "The Post Matric Scholarship schemes provide financial assistance to students belonging to minority communities, SC, ST, and OBCs to pursue higher education.",
            beneficiaries: ["Minority/SC/ST/OBC Students"],
            eligibilityCriteria: [
                "Secure 50% marks in previous final examination.",
                "Annual family income limit varies (usually < ₹2L or ₹2.5L).",
                "Pursuing higher education (Class 11 to Ph.D)."
            ],
            benefitsList: [
                { title: "Admission/Tuition Fee", value: "Reimbursed (upto ceiling)" },
                { title: "Maintenance Allowance", value: "Monthly stipend" }
            ],
            applicationProcess: [
                "Register on National Scholarship Portal (NSP).",
                "Fill application form.",
                "Upload required documents.",
                "Submit for Institute Verification."
            ],
            documentsRequired: [
                "Student Photo",
                "Mark Sheet",
                "Income Certificate",
                "Bank Account Details",
                "Bonafide Student Certificate"
            ]
        }
    },
    {
        id: 15,
        title: "Mahila Samman Savings Certificate",
        slug: "mahila-samman-savings",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Finance",
        ministry: "Ministry of Finance",
        summary: "A one-time small savings scheme for women/girls for a 2-year period.",
        benefits: "7.5% Interest Rate",
        eligibility: "Any woman/girl",
        status: "Active",
        deadline: "31 Mar 2025",
        validUntil: "2025-03-31",
        lastVerified: "20 Dec 2024",
        officialLink: "https://www.indiapost.gov.in",
        details: {
            intro: "Mahila Samman Savings Certificate is a small savings scheme introduced in Budget 2023 to encourage investment among women. It offers a fixed interest rate.",
            beneficiaries: ["Women", "Girls"],
            eligibilityCriteria: [
                "Any woman can open an account for herself.",
                "Guardian can open for a minor girl.",
                "Deposit limit: Max ₹2 Lakhs per account."
            ],
            benefitsList: [
                { title: "Interest", value: "7.5% per annum (compounded quarterly)" },
                { title: "Tenure", value: "2 Years" },
                { title: "Withdrawal", value: "Partial withdrawal up to 40% allowed after 1 year" }
            ],
            applicationProcess: [
                "Visit Post Office or authorized Bank.",
                "Form-I needs to be filled.",
                "Submit KYC documents and deposit amount."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "PAN Card",
                "Passport size photos"
            ]
        }
    },
    {
        id: 16,
        title: "PM Surya Ghar: Muft Bijli Yojana",
        slug: "pm-surya-ghar",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Energy",
        ministry: "Ministry of New and Renewable Energy",
        summary: "Free electricity up to 300 units for 1 crore households via rooftop solar.",
        benefits: "Subsidy on Solar Instal + Free Elec",
        eligibility: "Households with suitable roof",
        status: "Active",
        deadline: "Open all year",
        validUntil: "2099-12-31",
        lastVerified: "15 Feb 2025",
        officialLink: "https://pmsuryaghar.gov.in",
        details: {
            intro: "PM Surya Ghar: Muft Bijli Yojana is a government scheme that aims to provide free electricity to households by installing rooftop solar panels. It offers subsidies to reduce the installation cost.",
            beneficiaries: ["Middle & Poor Class Households"],
            eligibilityCriteria: [
                "Must be an Indian citizen.",
                "Own a house with a roof suitable for solar panels.",
                "Valid electricity connection.",
                "No prior solar subsidy availed."
            ],
            benefitsList: [
                { title: "Subsidy", value: "₹30k/kW for first 2kW, ₹18k for addl kW" },
                { title: "Free Electricity", value: "Up to 300 units/month" },
                { title: "Loan", value: "Collateral-free low interest loan options" }
            ],
            applicationProcess: [
                "Register on pmsuryaghar.gov.in.",
                "Apply for rooftop solar, select vendor.",
                "Feasibility approval from DISCOM.",
                "Installation and Commissioning.",
                "Submit details for subsidy release."
            ],
            documentsRequired: [
                "Electricity Bill",
                "Aadhaar Card",
                "Bank Account Details",
                "Roof ownership proof"
            ]
        }
    },
    {
        id: 17,
        title: "Lakhpati Didi",
        slug: "lakhpati-didi",
        scheme_level: "central",
        state_name: null,
        type: "Central",
        sector: "Women/Rural",
        ministry: "Ministry of Rural Development",
        summary: "Skill development for women in SHGs to earn > ₹1 Lakh/year.",
        benefits: "Skill Training & Market Linkage",
        eligibility: "Women in SHGs",
        status: "Active",
        deadline: "Ongoing",
        validUntil: "2099-12-31",
        lastVerified: "20 Feb 2025",
        officialLink: "https://nrlm.gov.in",
        details: {
            intro: "The Lakhpati Didi initiative aims to empower women in Self-Help Groups (SHGs) to earn a sustainable annual income of at least ₹1 Lakh per household.",
            beneficiaries: ["Rural Women", "SHG Members"],
            eligibilityCriteria: [
                "Must be a member of a Self-Help Group (SHG).",
                "Active participation in SHG activities."
            ],
            benefitsList: [
                { title: "Skills", value: "Training in LED bulb making, plumbing, drone repair etc." },
                { title: "Financial Inclusions", value: "Better access to credit" },
                { title: "Market Access", value: "Platform to sell products" }
            ],
            applicationProcess: [
                "Contact local SHG or NRLM office.",
                "Enroll in skill development programs.",
                "Start micro-enterprise with SHG support."
            ],
            documentsRequired: [
                "SHG Membership proof",
                "Aadhaar Card",
                "Bank Account"
            ]
        }
    },
    {
        id: 18,
        title: "Majhi Ladki Bahin Yojana",
        slug: "majhi-ladki-bahin",
        scheme_level: "state",
        state_name: "Maharashtra",
        type: "State",
        state: "Maharashtra",
        sector: "Women",
        ministry: "Govt of Maharashtra",
        summary: "Monthly financial assistance of ₹1,500 to eligible women in Maharashtra.",
        benefits: "₹1,500 per month",
        eligibility: "Women aged 21-65 years",
        status: "Active",
        deadline: "Check portal",
        validUntil: "2099-12-31",
        lastVerified: "20 Jan 2025",
        officialLink: "https://ladakibahin.maharashtra.gov.in",
        details: {
            intro: "Majhi Ladki Bahin Yojana is a flagship scheme of the Maharashtra government to provide financial independence to women.",
            beneficiaries: ["Women of Maharashtra"],
            eligibilityCriteria: [
                "Resident of Maharashtra.",
                "Age between 21 to 65 years.",
                "Family income less than ₹2.5 Lakhs.",
                "Crucial exclusions apply for tax payers."
            ],
            benefitsList: [
                { title: "Monthly Grant", value: "₹1,500 directly to bank" },
                { title: "Free Gas", value: "3 Cylinders per year (Annapurna)" }
            ],
            applicationProcess: [
                "Apply via Nari Shakti Doot App.",
                "Visit Anganwadi or Setu Kendra.",
                "Submit Aadhaar and Bank details."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Domicile Certificate",
                "Income Proof (Orange/Yellow Ration Card)",
                "Bank Passbook"
            ]
        }
    },
    {
        id: 19,
        title: "Gruha Lakshmi Scheme",
        slug: "gruha-lakshmi-karnataka",
        scheme_level: "state",
        state_name: "Karnataka",
        type: "State",
        state: "Karnataka",
        sector: "Women",
        ministry: "Govt of Karnataka",
        summary: "₹2,000 monthly assistance to the woman head of the family.",
        benefits: "₹2,000 per month",
        eligibility: "Woman Head of Family",
        status: "Active",
        deadline: "Ongoing",
        validUntil: "2099-12-31",
        lastVerified: "15 Jan 2025",
        officialLink: "https://sevasindhu.karnataka.gov.in",
        details: {
            intro: "Gruha Lakshmi is one of the 5 guarantees of the Karnataka Government, providing financial aid to women heads of households.",
            beneficiaries: ["Women Head of Household"],
            eligibilityCriteria: [
                "Name should be 'Yajamani' (Head) in Ration Card.",
                "Family should not be tax payer (GST/IT).",
                "Only one woman per family."
            ],
            benefitsList: [
                { title: "Financial Aid", value: "₹2,000 every month" },
                { title: "Transfer Type", value: "DBT" }
            ],
            applicationProcess: [
                "Visit Karnataka One / Bangalore One / Grama One centers.",
                "Apply via Seva Sindhu portal.",
                "Acknowledge via SMS."
            ],
            documentsRequired: [
                "Ration Card",
                "Aadhaar Card",
                "Bank Account Details (Aadhaar linked)"
            ]
        }
    },
    {
        id: 20,
        title: "Kanya Sumangala Yojana",
        slug: "kanya-sumangala-up",
        scheme_level: "state",
        state_name: "Uttar Pradesh",
        type: "State",
        state: "Uttar Pradesh",
        sector: "Girl Child",
        ministry: "Govt of Uttar Pradesh",
        summary: "Financial assistance up to ₹25,000 for the girl child in phases.",
        benefits: "Up to ₹25,000",
        eligibility: "Girl child in UP",
        status: "Active",
        deadline: "Ongoing",
        validUntil: "2099-12-31",
        lastVerified: "10 Feb 2025",
        officialLink: "https://mksy.up.gov.in",
        details: {
            intro: "Mukhyamantri Kanya Sumangala Yojana aims to improve the health and education of girls in Uttar Pradesh.",
            beneficiaries: ["Girl Child"],
            eligibilityCriteria: [
                "Resident of Uttar Pradesh.",
                "Family income < ₹3 Lakhs.",
                "Maximum 2 girls per family."
            ],
            benefitsList: [
                { title: "Total Amount", value: "₹15,000 to ₹25,000 (hiked)" },
                { title: "Stages", value: "Birth, Vaccination, Class 1, 6, 9, Graduation" }
            ],
            applicationProcess: [
                "Apply online at mksy.up.gov.in.",
                "Citizen registration and login.",
                "Fill application for specific stage."
            ],
            documentsRequired: [
                "Birth Certificate",
                "Parent IDs",
                "Bank Details",
                "Vaccination card/School proof"
            ]
        }
    },
    {
        id: 21,
        title: "Kalaignar Magalir Urimai Thogai",
        slug: "magalir-urimai-thogai",
        scheme_level: "state",
        state_name: "Tamil Nadu",
        type: "State",
        state: "Tamil Nadu",
        sector: "Women",
        ministry: "Govt of Tamil Nadu",
        summary: "₹1,000 monthly rights grant to eligible women heads of families.",
        benefits: "₹1,000 per month",
        eligibility: "Women Head of Family",
        status: "Active",
        deadline: "Check portal",
        validUntil: "2099-12-31",
        lastVerified: "25 Jan 2025",
        officialLink: "https://kmut.tn.gov.in",
        details: {
            intro: "This scheme recognizes the lifelong unpaid labor of women and provides them a rights grant to improve their livelihood.",
            beneficiaries: ["Women of Tamil Nadu"],
            eligibilityCriteria: [
                "Age 21+.",
                "Annual family income < ₹2.5 Lakhs.",
                "Land holding < 5 acres (wet) or 10 acres (dry).",
                "Electricity consumption < 3600 units/year."
            ],
            benefitsList: [
                { title: "Rights Grant", value: "₹1,000 monthly" },
                { title: "Mode", value: "Direct Bank Transfer" }
            ],
            applicationProcess: [
                "Special camps organized by Corporation/Panchayat.",
                "Biometric authentication required.",
                "Confirmation via SMS."
            ],
            documentsRequired: [
                "Aadhaar Card",
                "Ration Card",
                "Bank Passbook"
            ]
        }
    },
    {
        id: 22,
        title: "Lakshmir Bhandar",
        slug: "lakshmir-bhandar",
        scheme_level: "state",
        state_name: "West Bengal",
        type: "State",
        state: "West Bengal",
        sector: "Women",
        ministry: "Govt of West Bengal",
        summary: "Financial support of ₹1,000 (Gen) / ₹1,200 (SC/ST) per month for women.",
        benefits: "₹1,000 - ₹1,200 / month",
        eligibility: "Women aged 25-60",
        status: "Active",
        deadline: "Ongoing",
        validUntil: "2099-12-31",
        lastVerified: "05 Feb 2025",
        officialLink: "https://socialsecurity.wb.gov.in",
        details: {
            intro: "Lakshmir Bhandar is a flagship scheme of the West Bengal government to provide basic income support to female heads of households.",
            beneficiaries: ["Women of West Bengal"],
            eligibilityCriteria: [
                "Resident of West Bengal.",
                "Age between 25 and 60 years.",
                "Must enrolled in Swasthya Sathi scheme.",
                "Not a permanent govt employee."
            ],
            benefitsList: [
                { title: "General Category", value: "₹1,000 per month" },
                { title: "SC/ST Category", value: "₹1,200 per month" }
            ],
            applicationProcess: [
                "Apply at Duare Sarkar camps.",
                "Collect free application form.",
                "Submit with documents."
            ],
            documentsRequired: [
                "Swasthya Sathi Card",
                "Aadhaar Card",
                "Bank Account (Aadhaar linked)"
            ]
        }
    },
    {
        id: 23,
        title: "Delhi Ladli Scheme",
        slug: "delhi-ladli-scheme",
        scheme_level: "state",
        state_name: "Delhi",
        type: "State",
        state: "Delhi",
        sector: "Girl Child",
        ministry: "Govt of NCT of Delhi",
        summary: "Financial assistance at various stages of a girl's education up to ₹1 Lakh maturity.",
        benefits: "Term Deposits",
        eligibility: "Girl born in Delhi",
        status: "Active",
        deadline: "Ongoing",
        validUntil: "2099-12-31",
        lastVerified: "20 Jan 2025",
        officialLink: "http://wcddel.in",
        details: {
            intro: "The Delhi Ladli Scheme encourages the education of the girl child and provides financial security.",
            beneficiaries: ["Girls in Delhi"],
            eligibilityCriteria: [
                "Resident of Delhi for 3 years.",
                "Annual family income < ₹1 Lakh.",
                "Girl must be born in Delhi/studying in Delhi."
            ],
            benefitsList: [
                { title: "Periodic Deposits", value: "₹11,000 at birth (hospital), ₹5,000 at Class 1, 6, 9, 10, 12" },
                { title: "Maturity", value: "Claimable after Class 12 or age 18" }
            ],
            applicationProcess: [
                "Contact District Office of WCD Dept or School Principal.",
                "Fill form and submit with documents."
            ],
            documentsRequired: [
                "Residence Proof (3 years)",
                "Income Certificate",
                "Birth Certificate"
            ]
        }
    }
];

export const financeUpdates = [
    {
        id: 1,
        title: "New Income Tax Slabs for FY 2025-26",
        date: "20 Dec 2024",
        summary: "Standard deduction increased to ₹75,000. Changes in default tax regime."
    },
    {
        id: 2,
        title: "RBI Repo Rate Update",
        date: "15 Dec 2024",
        summary: "RBI keeps repo rate unchanged at 6.5%. Home loan rates remain stable."
    }
];

export const jobs = [
    {
        id: 1,
        role: "Probationary Officer (PO)",
        org: "State Bank of India (SBI)",
        vacancies: 2000,
        deadline: "15 Jan 2025",
        link: "#"
    },
    {
        id: 2,
        role: "SSC CGL 2024 Notification",
        org: "Staff Selection Commission",
        vacancies: 8500,
        deadline: "2 Feb 2025",
        link: "#"
    }
];

export const blogPosts = [
    {
        id: 1,
        slug: "pm-kisan-explained",
        title: "PM Kisan Samman Nidhi: Is ₹6,000 Coming to Your Account?",
        category: "Scheme Explained",
        summary: "Understand the PM-KISAN scheme simply. Know who is eligible, how to check your status, and why your installment might be stuck.",
        readTime: "4 min read",
        verified: true,
        publishedDate: "20 Dec 2024",
        lastUpdated: "25 Dec 2024",
        content: {
            intro: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central government scheme that promises ₹6,000 every year to farming families. But is everyone eligible? Let's break it down.",
            sections: [
                {
                    heading: "What is this scheme?",
                    body: "It is a direct income support scheme. The government transfers ₹6,000 per year directly into the bank accounts of farmers. This amount is not given all at once but in three equal installments of ₹2,000 each (every 4 months)."
                },
                {
                    heading: "Who is eligible?",
                    body: "All landholding farmer families are eligible, subject to certain exclusions. Basically, if you own cultivable land, you can apply. However, you are NOT eligible if: You are an institutional landholder, hold a constitutional post, are a government employee (retired or serving), or pay income tax."
                },
                {
                    heading: "How to apply?",
                    body: "You can apply online through the official PM-KISAN portal (pmkisan.gov.in) or visit your nearest Common Service Center (CSC). You will need your Aadhaar card, landholding documents, and bank account details."
                }
            ],
            cta: {
                text: "Check Eligibility",
                link: "https://pmkisan.gov.in",
                type: "external"
            }
        }
    },
    {
        id: 2,
        slug: "income-tax-slabs-2025",
        title: "New Income Tax Regime vs Old: What Should You Choose?",
        category: "Finance Guides",
        summary: "Confusion about the new tax slabs? We explain the difference between the Old and New tax regimes in simple terms to help you save money.",
        readTime: "5 min read",
        verified: true,
        publishedDate: "18 Dec 2024",
        lastUpdated: "20 Dec 2024",
        content: {
            intro: "Tax season is coming, and the choice between the Old and New tax regimes is more important than ever. The government has made the New Regime the default, but is it better for you?",
            sections: [
                {
                    heading: "The Main Difference",
                    body: "The Old Regime allows you to claim deductions (like 80C for investments, HRA for rent, etc.) to lower your tax. The New Regime offers lower tax rates but takes away most deductions. It is simpler and good for those who don't invest much."
                },
                {
                    heading: "New Slab Rates (FY 2025-26)",
                    body: "Up to ₹3 Lakh: Nil. ₹3-7 Lakh: 5%. ₹7-10 Lakh: 10%. ₹10-12 Lakh: 15%. ₹12-15 Lakh: 20%. Above ₹15 Lakh: 30%. Plus, a standard deduction of ₹75,000 is available for salaried employees."
                }
            ],
            cta: {
                text: "Calculate Tax",
                link: "/tools",
                type: "internal"
            }
        }
    },
    {
        id: 3,
        slug: "sbi-po-exam-pattern",
        title: "SBI PO 2025: Exam Pattern & Syllabus Decoding",
        category: "Jobs & Exams Explained",
        summary: "Preparing for SBI PO? Here is a simplified breakdown of the Prelims and Mains exam pattern, syllabus, and strategy to crack it.",
        readTime: "6 min read",
        verified: true,
        publishedDate: "15 Dec 2024",
        lastUpdated: "15 Dec 2024",
        content: {
            intro: "The State Bank of India Probationary Officer (SBI PO) exam is one of the most sought-after banking jobs. Let's look at what you need to study.",
            sections: [
                {
                    heading: "Selection Process",
                    body: "It has three stages: Prelims (Online Test), Mains (Online Test + Descriptive), and Psychometric Test (Group Exercise + Interview)."
                },
                {
                    heading: "Prelims Strategy",
                    body: "Speed is key. You have 60 minutes for 100 questions. Focus on high-scoring topics like Simplification, Quadratic Equations, and Reading Comprehension."
                }
            ],
            cta: {
                text: "View Job Details",
                link: "/career",
                type: "internal"
            }
        }
    },
    {
        id: 4,
        slug: "aadhaar-update-news",
        title: "Free Aadhaar Update Deadline Extended: What It Means",
        category: "News Simplified",
        summary: "UIDAI has extended the deadline for free document updates. Find out if you need to update your Aadhaar and how to do it for free.",
        readTime: "3 min read",
        verified: true,
        publishedDate: "10 Dec 2024",
        lastUpdated: "12 Dec 2024",
        content: {
            intro: "Have you updated your Aadhaar documents recently? If your Aadhaar was issued more than 10 years ago and hasn't been updated, you need to do it now.",
            sections: [
                {
                    heading: "What holds the deadline?",
                    body: "The deadline to update your Proof of Identity (POI) and Proof of Address (POA) documents for FREE on the myAadhaar portal has been extended."
                },
                {
                    heading: "Why update?",
                    body: "To ensure your demographic information is accurate and to avoid fraud. It helps in easy verification for government schemes."
                }
            ],
            cta: {
                text: "View Original News",
                link: "/news",
                type: "internal"
            }
        }
    }
];
