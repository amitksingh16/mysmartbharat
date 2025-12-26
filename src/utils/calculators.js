// EMI Calculator Logic
export const calculateEMI = (principal, rate, tenure) => {
    const r = rate / 12 / 100;
    const n = tenure * 12; // tenure in years

    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - principal;

    return {
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalAmount: Math.round(totalAmount)
    };
};

// SIP Calculator Logic
export const calculateSIP = (monthlyInvestment, rate, years) => {
    const i = rate / 12 / 100;
    const n = years * 12;

    const totalValue = monthlyInvestment * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const investedAmount = monthlyInvestment * n;
    const estReturns = totalValue - investedAmount;

    return {
        investedAmount: Math.round(investedAmount),
        estReturns: Math.round(estReturns),
        totalValue: Math.round(totalValue)
    };
};

// Lump Sum Calculator Logic
export const calculateLumpSum = (principal, rate, years) => {
    const r = rate / 100;
    const n = years;

    const totalValue = principal * Math.pow(1 + r, n);
    const estReturns = totalValue - principal;

    return {
        investedAmount: Math.round(principal),
        estReturns: Math.round(estReturns),
        totalValue: Math.round(totalValue)
    };
};

// Income Tax Calculator Logic (Simplified for India FY 2024-25)
export const calculateTax = (income, deductions = 0, isNewRegime = true) => {
    let taxableIncome = income - (isNewRegime ? 75000 : deductions); // Standard deduction 75k for new regime
    if (taxableIncome < 0) taxableIncome = 0;

    let tax = 0;

    if (isNewRegime) {
        // New Regime Slabs (FY 2024-25 proposed)
        // 0-3L: nil
        // 3-7L: 5%
        // 7-10L: 10%
        // 10-12L: 15%
        // 12-15L: 20%
        // >15L: 30%
        if (taxableIncome > 300000) {
            if (taxableIncome <= 700000) {
                tax += (taxableIncome - 300000) * 0.05;
            } else {
                tax += 400000 * 0.05; // Tax for 3-7L
                if (taxableIncome <= 1000000) {
                    tax += (taxableIncome - 700000) * 0.10;
                } else {
                    tax += 300000 * 0.10; // Tax for 7-10L
                    if (taxableIncome <= 1200000) {
                        tax += (taxableIncome - 1000000) * 0.15;
                    } else {
                        tax += 200000 * 0.15; // Tax for 10-12L
                        if (taxableIncome <= 1500000) {
                            tax += (taxableIncome - 1200000) * 0.20;
                        } else {
                            tax += 300000 * 0.20; // Tax for 12-15L
                            tax += (taxableIncome - 1500000) * 0.30;
                        }
                    }
                }
            }
        }

        // Rebate u/s 87A: income up to 7L is tax free in new regime
        if (income <= 700000) {
            tax = 0;
        }

    } else {
        // Old Regime Slabs (General Citizen < 60)
        // 0-2.5L: Nil
        // 2.5-5L: 5%
        // 5-10L: 20%
        // >10L: 30%

        // Note: In old regime, deduction is already subtracted from taxableIncome in the first line if passed correctly
        // But logic above subtracted 75k only for new regime. Let's fix that.
        // Re-calcing taxable for old regime properly:
        taxableIncome = income - deductions;
        if (taxableIncome < 0) taxableIncome = 0;

        if (taxableIncome > 250000) {
            if (taxableIncome <= 500000) {
                tax += (taxableIncome - 250000) * 0.05;
            } else {
                tax += 250000 * 0.05; // 2.5L to 5L
                if (taxableIncome <= 1000000) {
                    tax += (taxableIncome - 500000) * 0.20;
                } else {
                    tax += 500000 * 0.20; // 5L to 10L
                    tax += (taxableIncome - 1000000) * 0.30;
                }
            }
        }

        // Rebate u/s 87A: income up to 5L is tax free in old regime
        if (taxableIncome <= 500000) {
            tax = 0;
        }
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
        tax: Math.round(totalTax),
        cess: Math.round(cess),
        baseTax: Math.round(tax),
        netIncome: Math.round(income - totalTax)
    };
};

// Fixed Deposit (FD) Calculator
export const calculateFD = (principal, rate, years, frequency = 4) => {
    // frequency: 1=yearly, 2=half-yearly, 4=quarterly, 12=monthly
    const r = rate / 100;
    const n = frequency;
    const t = years;

    const maturityAmount = principal * Math.pow(1 + (r / n), n * t);
    const interestEarned = maturityAmount - principal;

    return {
        maturityAmount: Math.round(maturityAmount),
        interestEarned: Math.round(interestEarned),
        principal: Math.round(principal)
    };
};

// Recurring Deposit (RD) Calculator
export const calculateRD = (monthlyDeposit, rate, months) => {
    // Standard RD Formula: A = P * ((1+r/n)^(nt) - 1) / (1-(1+r/n)^(-1/3)) ... Actually normally banks use quarterly compounding
    // But generic formula often used is Simple Interest for RD or Quarterly Compounding.
    // Indian Banks usually use quarterly compounding for RD.

    // Formula for RD with Quarterly Compounding:
    // This is complex. Let's use the general approximation available in most JS libraries or the simple formula
    // M = P * n + P * n(n+1)/2 * r/12/100 (Simple Interest version often taught)
    // BUT user asked for "Standard RD compound interest formula".
    // Let's use the formula commonly used: A = P * ( (1+r/4)^(4n/12) - 1 ) / (1-(1+r/4)^(-1/3)) -- No this is too messy.
    // Let's use the actual iteration for accuracy or the summation of FDs.
    // Each installment is an FD for remaining months.

    const r = rate / 100;
    let maturityAmount = 0;

    // Calculate for each deposit
    // n_months = number of quarters the deposit stays
    // Actually, let's stick to the Monthly Compounding approximation for smoother code if acceptable, 
    // OR Summation of Compound Interest for each installment (most accurate).

    // Using quarterly compounding (standard in India)
    for (let i = 0; i < months; i++) {
        const monthsRemaining = months - i;
        const quartersRemaining = monthsRemaining / 3; // Approx quarters
        // Exact days would be better but inputs are in months.

        // Let's assume quarterly compounding.
        // A = P * (1 + r/4)^(4 * years)
        const yearsRemaining = monthsRemaining / 12;
        maturityAmount += monthlyDeposit * Math.pow(1 + r / 4, 4 * yearsRemaining);
    }

    const totalDeposits = monthlyDeposit * months;
    const interestEarned = maturityAmount - totalDeposits;

    return {
        maturityAmount: Math.round(maturityAmount),
        interestEarned: Math.round(interestEarned),
        totalDeposits: Math.round(totalDeposits)
    };
};

// PPF Calculator
export const calculatePPF = (annualInvestment, rate = 7.1) => {
    // PPF is 15 years. Interest calculated on lowest balance between 5th and end of month.
    // Assuming investment made at start of year (max benefit).
    const r = rate / 100;
    const n = 15;

    // F = P * [({(1+i)^n} - 1) / i] * (1+i)  (Annuity Due) but PPF interest is compounded yearly.
    // If investing annually:
    const maturityAmount = annualInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const totalInvestment = annualInvestment * n;
    const totalInterest = maturityAmount - totalInvestment;

    return {
        maturityAmount: Math.round(maturityAmount),
        totalInterest: Math.round(totalInterest),
        totalInvestment: Math.round(totalInvestment)
    };
};
