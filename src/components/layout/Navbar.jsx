import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const closeMenu = () => setIsMenuOpen(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="header">
            <div className="container header-container">
                {/* Logo */}
                <Link to="/" className="logo-link" onClick={closeMenu} style={{ gap: '0.8rem' }}>
                    <img src="/logo.png" alt="MySmartBharat Logo" style={{ height: '36px', width: '36px' }} />
                    <span className="logo-text" style={{
                        fontWeight: '700',
                        letterSpacing: '-0.5px',
                        fontSize: '1.25rem',
                        color: 'var(--primary)'
                    }}>MySmartBharat</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <Link to="/schemes">{t('nav.schemes')}</Link>
                    <Link to="/finance">{t('nav.finance')}</Link>
                    <Link to="/career">{t('nav.career')}</Link>
                    <Link to="/tools">{t('nav.tools')}</Link>
                    <Link to="/news">{t('nav.news')}</Link>
                    <Link to="/explained">{t('nav.explained')}</Link>

                    {/* Language Switcher Button */}
                    <button
                        onClick={toggleLanguage}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            borderRadius: '20px',
                            padding: '0.4rem 1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontWeight: '600',
                            marginLeft: '1rem',
                            color: 'var(--primary)',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'var(--bg-light)'}
                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                    >
                        <Globe size={16} />
                        {t('nav.toggle_label')}
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mobile-toggle"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/schemes" onClick={closeMenu}>{t('nav.schemes')}</Link>
                    <Link to="/finance" onClick={closeMenu}>{t('nav.finance')}</Link>
                    <Link to="/career" onClick={closeMenu}>{t('nav.career')}</Link>
                    <Link to="/tools" onClick={closeMenu}>{t('nav.tools')}</Link>
                    <Link to="/news" onClick={closeMenu}>{t('nav.news')}</Link>
                    <Link to="/explained" onClick={closeMenu}>{t('nav.explained')}</Link>

                    {/* Mobile Language Toggle */}
                    <button
                        onClick={() => { toggleLanguage(); closeMenu(); }}
                        style={{
                            marginTop: '1rem',
                            padding: '0.8rem',
                            width: '100%',
                            background: 'var(--bg-light)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <Globe size={18} />
                        Switch to {i18n.language === 'en' ? 'Hindi' : 'English'}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
