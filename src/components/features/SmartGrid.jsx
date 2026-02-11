import React, { useState, useEffect } from 'react';
import { FileText, Calculator, Map, Bell, ArrowRight, ChevronRight, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const SmartGrid = () => {
    // --- Card 2: Calculator Data ---
    const chartData = [
        { name: 'Invested', value: 400 },
        { name: 'Returns', value: 300 },
    ];
    const COLORS = ['#CBD5E1', '#FF9933'];

    // --- Card 3: Unit Converter Logic ---
    const [unitValue, setUnitValue] = useState(1);
    const [unitType, setUnitType] = useState('sqft'); // sqft -> sqmt

    const convertedValue = unitType === 'sqft'
        ? (unitValue * 0.092903).toFixed(2) + ' sq.mt'
        : (unitValue * 10.7639).toFixed(2) + ' sq.ft';

    // --- Card 4: Job Alerts Ticker ---
    const jobAlerts = [
        "SSC CGL 2025 Notification Out - 1500+ Posts",
        "Railway RRB Group D Exam Dates Announced",
        "Bank of Baroda PO Recruitment - Apply Now",
        "UP Police Constable Results Declared"
    ];
    const [tickerIndex, setTickerIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % jobAlerts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-800 dark:text-white">
                            Explore <span className="text-primary dark:text-blue-400">MySmartBharat</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Access all essential services in one place.
                        </p>
                    </div>
                </div>

                {/* Grid: 2x2 on Mobile (grid-cols-2), 4 cols on lg */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Card 1: Govt Schemes */}
                    <Link to="/schemes" className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <FileText size={80} className="text-primary dark:text-white" />
                        </div>
                        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                            <Activity size={32} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2">Govt Schemes</h3>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                            Check eligibility for 500+ Central & State schemes.
                        </p>

                        {/* Quick Links Pills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-1 text-[10px] bg-blue-100 text-blue-700 rounded-md font-medium">PM Kisan</span>
                            <span className="px-2 py-1 text-[10px] bg-blue-100 text-blue-700 rounded-md font-medium">Awas</span>
                        </div>

                        <div className="flex items-center text-primary dark:text-blue-400 font-semibold text-xs md:text-sm mt-auto">
                            Live Checker <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Card 2: Calculators */}
                    <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 relative flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                                <Calculator size={32} />
                            </div>
                            <div className="h-14 w-14 -mt-2 -mr-2 opacity-80 hidden md:block">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={chartData} innerRadius={15} outerRadius={25} paddingAngle={5} dataKey="value">
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-1">Calculators</h3>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                            SIP, EMI, PPF & more. Plan smart.
                        </p>

                        {/* Quick Links Pills */}
                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                            <Link to="/tools/sip" className="px-2 py-1 text-[10px] bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-md font-medium transition-colors">SIP</Link>
                            <Link to="/tools/emi" className="px-2 py-1 text-[10px] bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-md font-medium transition-colors">EMI</Link>
                            <Link to="/tools/tax" className="px-2 py-1 text-[10px] bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-md font-medium transition-colors">Tax</Link>
                        </div>

                        <Link to="/tools" className="flex items-center text-secondary font-semibold text-xs md:text-sm">
                            Try Now <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Card 3: Land Records */}
                    <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 flex flex-col">
                        <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                            <Map size={32} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2">Land Records</h3>

                        {/* Interactive Converter */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg mb-3 border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-1 mb-1">
                                <input
                                    type="number"
                                    value={unitValue}
                                    onChange={(e) => setUnitValue(e.target.value)}
                                    className="w-12 p-1 text-xs bg-white dark:bg-slate-800 border rounded outline-none text-center"
                                />
                                <select
                                    value={unitType}
                                    onChange={(e) => setUnitType(e.target.value)}
                                    className="text-[10px] bg-transparent outline-none font-semibold text-slate-600 dark:text-slate-300 w-12"
                                >
                                    <option value="sqft">Sq.ft</option>
                                    <option value="sqmt">Sq.mt</option>
                                </select>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                                = <span className="text-green-600 dark:text-green-400 font-bold">{convertedValue}</span>
                            </div>
                        </div>

                        {/* Quick Links Pills */}
                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                            <span className="px-2 py-1 text-[10px] bg-green-100 text-green-700 rounded-md font-medium">Bhulekh</span>
                            <span className="px-2 py-1 text-[10px] bg-green-100 text-green-700 rounded-md font-medium">Khasra</span>
                        </div>

                        <a href="#" className="flex items-center text-green-600 dark:text-green-400 font-semibold text-xs md:text-sm hover:underline">
                            View Records <ChevronRight size={14} />
                        </a>
                    </div>

                    {/* Card 4: Job Alerts */}
                    <Link to="/career" className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Bell size={80} className="text-purple-500 dark:text-purple-400" />
                        </div>
                        <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                            <Bell size={32} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2">Job Alerts</h3>

                        {/* Live Ticker */}
                        <div className="h-[50px] overflow-hidden relative mb-2">
                            <div key={tickerIndex} className="animate-in slide-in-from-bottom duration-500">
                                <div className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 font-medium">
                                        {jobAlerts[tickerIndex]}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white dark:from-slate-800 to-transparent"></div>
                        </div>

                        {/* Quick Links Pills */}
                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                            <span className="px-2 py-1 text-[10px] bg-purple-100 text-purple-700 rounded-md font-medium">SSC</span>
                            <span className="px-2 py-1 text-[10px] bg-purple-100 text-purple-700 rounded-md font-medium">Bank</span>
                            <span className="px-2 py-1 text-[10px] bg-purple-100 text-purple-700 rounded-md font-medium">Rail</span>
                        </div>

                        <div className="mt-auto flex items-center text-purple-600 dark:text-purple-400 font-semibold text-xs md:text-sm">
                            View All <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SmartGrid;
