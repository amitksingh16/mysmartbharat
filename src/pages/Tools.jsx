import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
    Calculator, TrendingUp, PieChart as PieChartIcon,
    FileText, Lock, RefreshCw, Shield, IndianRupee,
    Percent, Calendar, ChevronRight, Info, ChevronDown,
    Home, Car, User, ToggleLeft, ToggleRight, Landmark
} from 'lucide-react';
import { calculateEMI, calculateSIP, calculateFD, calculatePPF } from '../utils/calculators';

const Tools = () => {
    const { t } = useTranslation();
    const { toolId } = useParams();
    const navigate = useNavigate();

    // Default to EMI if no ID
    const activeTool = toolId || 'emi';

    // Shared State
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(8.5);
    const [time, setTime] = useState(10);
    const [frequency, setFrequency] = useState(4);

    // Specific State: EMI
    const [emiType, setEmiType] = useState('home'); // 'home', 'personal', 'car'

    // Specific State: SIP
    const [showInflation, setShowInflation] = useState(false);
    const [inflationRate, setInflationRate] = useState(6);

    // Specific State: Land Records
    const [selectedState, setSelectedState] = useState('');
    const [error, setError] = useState('');

    const [result, setResult] = useState(null);

    // 1. Reset Defaults when Tool or EMI Type Changes
    useEffect(() => {
        if (activeTool === 'emi') {
            if (emiType === 'home') {
                setPrincipal(2500000);
                setRate(8.5);
                setTime(20); // Max 30
            } else if (emiType === 'personal') {
                setPrincipal(500000);
                setRate(11.5);
                setTime(3); // Max 5 
            } else if (emiType === 'car') {
                setPrincipal(1000000);
                setRate(9.5);
                setTime(5); // Max 7
            }
        } else if (activeTool === 'sip') {
            setPrincipal(5000); setRate(12); setTime(15);
        } else if (activeTool === 'fd') {
            setPrincipal(100000); setRate(6.5); setTime(5);
        } else if (activeTool === 'ppf') {
            setPrincipal(150000); setRate(7.1); setTime(15);
        }
    }, [activeTool, emiType]);

    // 2. Calculation Logic
    useEffect(() => {
        let res = null;
        switch (activeTool) {
            case 'emi':
                res = calculateEMI(principal, rate, time);
                break;
            case 'sip':
                res = calculateSIP(principal, rate, time);
                // Inflation Adjustment
                if (res && activeTool === 'sip') {
                    // Future Value of 1 Rupee = 1 / (1+inf)^n
                    const deflationFactor = Math.pow(1 + inflationRate / 100, time);
                    res.inflationAdjustedValue = Math.round(res.totalValue / deflationFactor);
                }
                break;
            case 'fd':
                res = calculateFD(principal, rate, time, frequency);
                break;
            case 'ppf':
                res = calculatePPF(principal, rate);
                break;
            default:
                res = calculateEMI(principal, rate, time);
        }
        setResult(res);
    }, [activeTool, principal, rate, time, frequency, inflationRate, showInflation]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    // Land Records Logic
    const landRecordsStates = [
        { name: 'Uttar Pradesh', url: 'https://upbhulekh.gov.in/' },
        { name: 'Madhya Pradesh', url: 'https://mpbhulekh.gov.in/' },
        { name: 'Bihar', url: 'https://bhulekh.bihar.gov.in/' },
    ];

    const handleViewRecords = () => {
        if (!selectedState) {
            setError('Kripya apna State chunein (Please select your state)');
            return;
        }
        const stateData = landRecordsStates.find(s => s.name === selectedState);
        if (stateData) {
            window.open(stateData.url, '_blank');
            setError('');
        }
    };

    // Prepare Chart Data
    let chartData = [];
    let COLORS = ['#e2e8f0', '#f97316']; // Slate (Inv), Orange (Int)

    if (result) {
        if (activeTool === 'emi') {
            chartData = [
                { name: 'Principal', value: principal },
                { name: 'Interest', value: result.totalInterest }
            ];
        } else if (activeTool === 'sip' || activeTool === 'ppf' || activeTool === 'fd') {
            const inv = result.investedAmount || result.principal || result.totalInvestment;
            chartData = [
                { name: 'Invested', value: inv },
                { name: 'Wealth Gain', value: result.totalInterest || result.estReturns || result.interestEarned }
            ];
            COLORS = ['#e2e8f0', '#22c55e']; // Slate (Inv), Green (Gain)
        }
    }

    // Dynamic EMI Config
    const getEmiConfig = () => {
        if (emiType === 'home') return { title: 'Home Loan EMI', icon: Home, maxTime: 30 };
        if (emiType === 'car') return { title: 'Car Loan EMI', icon: Car, maxTime: 7 };
        return { title: 'Personal Loan EMI', icon: User, maxTime: 5 };
    };

    const emiConfig = getEmiConfig();

    // Tool Configurations
    const toolConfig = {
        emi: {
            title: emiConfig.title,
            icon: emiConfig.icon,
            labels: { p: 'Loan Amount', r: 'Interest Rate (% p.a)', t: 'Tenure (Years)' },
            ranges: {
                p: { min: 100000, max: 10000000, step: 10000 },
                r: { min: 5, max: 20, step: 0.1 },
                t: { min: 1, max: emiConfig.maxTime }
            },
            didYouKnow: "A higher tenure reduces your monthly EMI but significantly increases the total interest amount."
        },
        sip: {
            title: 'SIP Calculator',
            icon: TrendingUp,
            labels: { p: 'Monthly Investment', r: 'Expected Return (%)', t: 'Time Period (Years)' },
            ranges: { p: { min: 500, max: 200000, step: 500 }, r: { min: 5, max: 30, step: 0.1 }, t: { min: 1, max: 40 } },
            didYouKnow: "Starting your SIP 5 years early can potentially double your wealth due to the power of compounding!"
        },
        fd: {
            title: 'Fixed Deposit (FD)',
            icon: Lock,
            labels: { p: 'Investment Amount', r: 'Interest Rate (%)', t: 'Time Period (Years)' },
            ranges: { p: { min: 5000, max: 10000000, step: 5000 }, r: { min: 3, max: 15, step: 0.1 }, t: { min: 1, max: 25 } },
            didYouKnow: "FDs are one of the safest investment options. Senior citizens often get an additional 0.5% interest rate."
        },
        ppf: {
            title: 'PPF Calculator',
            icon: Shield,
            labels: { p: 'Annual Investment', r: 'Interest Rate (%)', t: 'Tenure (15 Years Fixed)' },
            ranges: { p: { min: 500, max: 150000, step: 500 }, r: { min: 7.1, max: 7.1, step: 0, disabled: true }, t: { min: 15, max: 15, disabled: true } },
            didYouKnow: "PPF currently offers 7.1% interest and is completely tax-free under Section 80C."
        },
        land: {
            title: 'Land Records (Bhulekh)',
            icon: Landmark,
            labels: {},
            ranges: {},
            didYouKnow: "Bhulekh portals allow you to check land ownership details (Khasra/Khatauni) online without visiting government offices."
        }
    };

    const currentConfig = toolConfig[activeTool] || toolConfig.emi;
    const CurrentIcon = currentConfig.icon;

    const toolsList = [
        { id: 'emi', title: 'EMI Calc', icon: Calculator },
        { id: 'sip', title: 'SIP', icon: TrendingUp },
        { id: 'fd', title: 'FD', icon: Lock },
        { id: 'ppf', title: 'PPF', icon: Shield },
        { id: 'land', title: 'Bhulekh', icon: Landmark },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Helmet>
                <title>{currentConfig.title} | Smart Tools</title>
                <meta name="description" content={`Free ${currentConfig.title} to plan your finances.`} />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header & Tabs */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 dark:text-white mb-6">
                        Smart <span className="text-primary">Financial Tools</span>
                    </h1>

                    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide flex-nowrap justify-start px-1">
                        {toolsList.map(tool => {
                            const isActive = activeTool === tool.id;
                            const ToolIcon = tool.icon;
                            return (
                                <Link
                                    key={tool.id}
                                    to={tool.id === 'emi' ? '/tools' : `/tools/${tool.id}`}
                                    className={`flex items-center gap-2 px-6 py-3.5 rounded-full transition-all shrink-0 border whitespace-nowrap ${isActive
                                        ? 'bg-slate-900 text-white shadow-lg border-slate-900 scale-105'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <ToolIcon size={20} className={isActive ? 'text-secondary' : 'text-slate-400'} />
                                    <span className="font-bold text-sm md:text-base">{tool.title}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT: Inputs */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* Land Records UI Override */}
                            {activeTool === 'land' ? (
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <Landmark className="text-secondary" size={24} />
                                        Land Records (Bhulekh)
                                    </h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                                Select Your State
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={selectedState}
                                                    onChange={(e) => {
                                                        setSelectedState(e.target.value);
                                                        setError('');
                                                    }}
                                                    className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                                >
                                                    <option value="">-- Select State --</option>
                                                    {landRecordsStates.map(state => (
                                                        <option key={state.name} value={state.name}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={20} />
                                            </div>
                                            {error && (
                                                <p className="mt-2 text-sm text-red-500 font-medium animate-pulse">
                                                    {error}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleViewRecords}
                                            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                                        >
                                            View Land Records <ChevronRight size={20} />
                                        </button>

                                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
                                            <h4 className="font-bold text-orange-800 dark:text-orange-300 text-sm mb-2">Note:</h4>
                                            <ul className="text-xs text-orange-700 dark:text-orange-400 space-y-1 list-disc pl-4">
                                                <li>You will be redirected to the official government portal.</li>
                                                <li>Keep your Khasra/Khatauni number handy for faster search.</li>
                                                <li>This service is free of cost.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* EMI: Loan Type Selector */}
                                    {activeTool === 'emi' && (
                                        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl mb-8">
                                            {[
                                                { id: 'home', label: 'Home Loan', icon: Home },
                                                { id: 'personal', label: 'Personal', icon: User },
                                                { id: 'car', label: 'Car Loan', icon: Car }
                                            ].map(type => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setEmiType(type.id)}
                                                    className={`col-span-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${emiType === type.id
                                                        ? 'bg-white dark:bg-slate-700 text-primary shadow-sm ring-1 ring-black/5'
                                                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                                                        } ${type.id === 'car' ? 'col-span-2 md:col-span-1' : ''}`}
                                                >
                                                    <type.icon size={18} />
                                                    <span>{type.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <CurrentIcon className="text-secondary" size={24} />
                                        {currentConfig.title}
                                    </h2>

                                    <div className="space-y-8">
                                        {/* Input 1: Principal/Amount */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="font-semibold text-slate-700 dark:text-slate-300">{currentConfig.labels.p}</label>
                                                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                                    <IndianRupee size={14} className="text-slate-400 mr-1" />
                                                    <input
                                                        type="number"
                                                        value={principal}
                                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                                        className="w-28 bg-transparent font-bold text-slate-800 dark:text-white text-right outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                type="range"
                                                min={currentConfig.ranges.p.min}
                                                max={currentConfig.ranges.p.max}
                                                step={currentConfig.ranges.p.step}
                                                value={principal}
                                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>

                                        {/* Input 2: Rate */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="font-semibold text-slate-700 dark:text-slate-300">{currentConfig.labels.r}</label>
                                                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                                    <Percent size={14} className="text-slate-400 mr-1" />
                                                    <input
                                                        type="number" step="0.1"
                                                        value={rate}
                                                        disabled={currentConfig.ranges.r.disabled}
                                                        onChange={(e) => setRate(Number(e.target.value))}
                                                        className="w-20 bg-transparent font-bold text-slate-800 dark:text-white text-right outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                type="range"
                                                min={currentConfig.ranges.r.min}
                                                max={currentConfig.ranges.r.max}
                                                step={currentConfig.ranges.r.step}
                                                value={rate}
                                                disabled={currentConfig.ranges.r.disabled}
                                                onChange={(e) => setRate(Number(e.target.value))}
                                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${currentConfig.ranges.r.disabled ? 'bg-slate-100' : 'bg-slate-200 accent-orange-500'}`}
                                            />
                                        </div>

                                        {/* Input 3: Time */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <label className="font-semibold text-slate-700 dark:text-slate-300">{currentConfig.labels.t}</label>
                                                    {/* Max Tenure Label for EMI */}
                                                    {activeTool === 'emi' && (
                                                        <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800">
                                                            Max {currentConfig.ranges.t.max} Yrs
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                                    <Calendar size={14} className="text-slate-400 mr-1" />
                                                    <input
                                                        type="number"
                                                        value={time}
                                                        disabled={currentConfig.ranges.t.disabled}
                                                        onChange={(e) => {
                                                            let val = Number(e.target.value);
                                                            if (val > currentConfig.ranges.t.max) val = currentConfig.ranges.t.max;
                                                            setTime(val);
                                                        }}
                                                        className="w-20 bg-transparent font-bold text-slate-800 dark:text-white text-right outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                type="range"
                                                min={currentConfig.ranges.t.min}
                                                max={currentConfig.ranges.t.max}
                                                value={time}
                                                disabled={currentConfig.ranges.t.disabled}
                                                onChange={(e) => setTime(Number(e.target.value))}
                                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${currentConfig.ranges.t.disabled ? 'bg-slate-100' : 'bg-slate-200 accent-green-500'}`}
                                            />
                                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                                <span>{currentConfig.ranges.t.min} Yr</span>
                                                <span>{currentConfig.ranges.t.max} Yrs</span>
                                            </div>
                                        </div>

                                        {/* SIP: Inflation Toggle */}
                                        {activeTool === 'sip' && (
                                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`p-1.5 rounded-md ${showInflation ? 'bg-blue-100 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                                                            <TrendingUp size={16} />
                                                        </div>
                                                        <span className="font-semibold text-slate-700 dark:text-slate-300">Adjust for Inflation?</span>
                                                    </div>
                                                    <button
                                                        onClick={() => setShowInflation(!showInflation)}
                                                        className="text-primary transition-transform active:scale-95"
                                                    >
                                                        {showInflation ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-300" />}
                                                    </button>
                                                </div>

                                                {showInflation && (
                                                    <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                                                        <div className="flex justify-between mb-2">
                                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Expected Inflation Rate (%)</label>
                                                            <span className="font-bold text-primary">{inflationRate}%</span>
                                                        </div>
                                                        <input
                                                            type="range" min="1" max="15" step="0.5"
                                                            value={inflationRate}
                                                            onChange={(e) => setInflationRate(Number(e.target.value))}
                                                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Bottom Info Section */}
                        <div className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-blue-100 dark:border-slate-800 flex items-start gap-3">
                            <Info className="text-primary shrink-0 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white mb-1">Did you know?</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {currentConfig.didYouKnow}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Sticky Results (Hidden for Land Records) */}
                    {activeTool !== 'land' && (
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-24 bg-slate-900 text-white rounded-3xl p-8 shadow-xl shadow-slate-200 dark:shadow-none overflow-hidden transition-all duration-300">

                                {/* BG Pattern */}
                                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                    <CurrentIcon size={140} />
                                </div>

                                <div className="relative z-10">
                                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                                        {activeTool === 'emi' ? 'Monthly EMI' : showInflation ? 'Inflation Adjusted Value' : 'Total Future Value'}
                                    </span>
                                    <h2 className="text-4xl font-mono font-bold text-white mt-1 mb-6">
                                        {result ? formatCurrency(
                                            activeTool === 'emi'
                                                ? result.emi
                                                : showInflation
                                                    ? result.inflationAdjustedValue
                                                    : result.totalValue
                                        ) : '-'}
                                    </h2>

                                    {/* Chart */}
                                    <div className="h-48 w-full flex justify-center mb-8 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={75}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value) => formatCurrency(value)}
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: 'white' }}
                                                    itemStyle={{ color: 'white' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>

                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="text-xs text-slate-500 font-medium">Breakdown</span>
                                        </div>
                                    </div>

                                    {/* Summary Grid */}
                                    <div className="space-y-3">
                                        {/* Principal/Invested */}
                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                                <span className="text-sm text-slate-300">
                                                    {activeTool === 'emi' ? 'Principal Amount' : 'Invested Amount'}
                                                </span>
                                            </div>
                                            <span className="font-bold">{formatCurrency(activeTool === 'emi' ? principal : (result?.investedAmount || result?.principal || result?.totalInvestment))}</span>
                                        </div>

                                        {/* Interest/Gains */}
                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeTool === 'emi' ? '#f97316' : '#22c55e' }}></div>
                                                <span className="text-sm text-slate-300">
                                                    {activeTool === 'emi' ? 'Total Interest' : 'Wealth Gained'}
                                                </span>
                                            </div>
                                            <span className={`font-bold ${activeTool === 'emi' ? 'text-orange-400' : 'text-green-400'}`}>
                                                {formatCurrency(result?.totalInterest || result?.estReturns || result?.interestEarned || 0)}
                                            </span>
                                        </div>

                                        {/* Inflation Comparison (Only for SIP) */}
                                        {showInflation && activeTool === 'sip' && (
                                            <div className="pt-2">
                                                <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Info size={10} /> Purchasing Power Today</div>
                                                <div className="flex justify-between items-center bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                                                    <span className="text-sm text-blue-200">Real Value</span>
                                                    <span className="font-bold text-blue-100">{formatCurrency(result?.inflationAdjustedValue)}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <div className="mt-6 pt-4 border-t border-slate-700">
                                            <button className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                                                Start Investment <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tools;
