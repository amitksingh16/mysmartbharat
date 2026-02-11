import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Menu, X, Globe, Moon, Sun, ChevronDown, LogIn,
    Sprout, User, GraduationCap, HeartPulse,
    Calculator, Landmark, FileText, ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // For mobile
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For desktop Schemes dropdown
    const dropdownRef = useRef(null);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    // Toggle Dark Mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        setIsDropdownOpen(false);
    };

    // Close dropdowns on route change
    useEffect(() => {
        closeMenu();
    }, [location]);

    // Click Outside Listener
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Mega Menu Data
    const schemesCategories = [
        { name: 'Farmers (Kisan)', icon: Sprout, path: '/schemes?category=farmers', desc: 'PM Kisan, KCC, Fasal Bima' },
        { name: 'Women (Nari)', icon: User, path: '/schemes?category=women', desc: 'Ladli Behna, Lakhpati Didi' },
        { name: 'Students (Yuva)', icon: GraduationCap, path: '/schemes?category=students', desc: 'Scholarships, Internships' },
        { name: 'Health (Swasthya)', icon: HeartPulse, path: '/schemes?category=health', desc: 'Ayushman Bharat, Jan Aushadhi' },
    ];

    const toolsCategories = [
        { name: 'Financial Tools', icon: Calculator, path: '/tools', desc: 'SIP, EMI, PPF, GST, Income Tax' },
        { name: 'Land Records', icon: Landmark, path: '/tools/land', desc: 'Bhulekh, Khasra-Khatauni' },
        { name: 'Doc Services', icon: FileText, path: '/tools/docs', desc: 'Aadhaar, PAN, Voter ID Link' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* 1. Logo & Branding */}
                <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
                    <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-400 to-green-500 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-bold text-xl">M</span>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading font-bold text-xl leading-none text-slate-800 dark:text-white tracking-tight">
                            MySmart<span className="text-secondary">Bharat</span>
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Citizen Portal</span>
                    </div>
                </Link>

                {/* 2. Desktop Navigation (Mega Menus) */}
                <nav className="hidden lg:flex items-center gap-8">
                    {/* Home */}
                    <Link to="/" className="font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                        Home
                    </Link>

                    {/* Schemes Dropdown */}
                    <div className="relative group" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex items-center gap-1 font-medium transition-colors py-6 ${isDropdownOpen ? 'text-primary dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400'}`}
                        >
                            Schemes <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} />
                        </button>
                        {/* Mega Menu Dropdown */}
                        <div className={`absolute top-full -left-10 w-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300 transform p-6 grid grid-cols-2 gap-4 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                            {schemesCategories.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.path}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 group-hover/item:scale-110 transition-transform">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-white group-hover/item:text-primary transition-colors">{item.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                            <div className="col-span-2 mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                                <Link
                                    to="/schemes"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="text-sm font-semibold text-primary hover:underline flex items-center justify-center gap-1"
                                >
                                    View All Schemes <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tools Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors py-6">
                            Calculators <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                        <div className="absolute top-full -left-10 w-[350px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-4 flex flex-col gap-2">
                            {toolsCategories.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.path}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item"
                                >
                                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-slate-800 flex items-center justify-center text-secondary group-hover/item:scale-110 transition-transform">
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.name}</h4>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link to="/news" className="font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                        News
                    </Link>
                </nav>

                {/* 3. Right Actions (Smart Features) */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Language */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-300 text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        <Globe size={16} />
                        <span>{i18n.language === 'en' ? 'EN' : 'HI'}</span>
                    </button>

                    {/* Theme */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Login */}
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-secondary text-secondary font-bold text-sm hover:bg-secondary hover:text-white transition-all duration-300 shadow-sm hover:shadow-orange-200">
                        <LogIn size={18} />
                        Login / Sign Up
                    </button>
                </div>

                {/* 4. Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="lg:hidden p-2 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* 5. Mobile Sidebar Menu */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={closeMenu}
            ></div>

            {/* Sidebar Slide-in */}
            <div className={`fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-slate-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    <span className="font-heading font-bold text-lg text-slate-800 dark:text-white">Menu</span>
                    <button onClick={closeMenu} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-2 overflow-y-auto h-[calc(100%-80px)]">
                    {/* Mobile Links */}
                    <div className="flex flex-col gap-1">
                        <Link to="/" onClick={closeMenu} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200">
                            Home
                        </Link>

                        {/* Schemes Accordion */}
                        <div className="rounded-xl overflow-hidden">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'schemes' ? null : 'schemes')}
                                className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200"
                            >
                                Schemes <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'schemes' ? 'rotate-180' : ''}`} />
                            </button>
                            {activeDropdown === 'schemes' && (
                                <div className="bg-slate-50 dark:bg-slate-800/50 flex flex-col p-2 space-y-1">
                                    {schemesCategories.map((item, idx) => (
                                        <Link key={idx} to={item.path} onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300">
                                            <item.icon size={16} className="text-primary" /> {item.name}
                                        </Link>
                                    ))}
                                    <Link to="/schemes" onClick={closeMenu} className="flex items-center gap-2 p-2 text-sm font-bold text-primary pl-9">
                                        View All <ArrowRight size={14} />
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Tools Accordion */}
                        <div className="rounded-xl overflow-hidden">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                                className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200"
                            >
                                Calculators <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
                            </button>
                            {activeDropdown === 'tools' && (
                                <div className="bg-slate-50 dark:bg-slate-800/50 flex flex-col p-2 space-y-1">
                                    {toolsCategories.map((item, idx) => (
                                        <Link key={idx} to={item.path} onClick={closeMenu} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300">
                                            <item.icon size={16} className="text-secondary" /> {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/news" onClick={closeMenu} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200">
                            News & Updates
                        </Link>
                        <Link to="/career" onClick={closeMenu} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200">
                            Jobs & Career
                        </Link>
                    </div>

                    {/* Mobile Bottom Actions */}
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Appearance</span>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400"
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Language</span>
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-sm font-bold"
                            >
                                <Globe size={16} />
                                <span>{i18n.language === 'en' ? 'English' : 'Hindi'}</span>
                            </button>
                        </div>
                        <button onClick={closeMenu} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none">
                            <LogIn size={18} /> Login / Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
import { ArrowRight } from 'lucide-react';

export default Navbar;
