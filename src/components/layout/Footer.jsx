import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <h3 style={{ color: 'var(--white)', marginBottom: '1rem' }}>MySmartBharat</h3>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                            {t('footer.about_desc')}
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--white)', marginBottom: '1rem', fontSize: '1rem' }}>{t('footer.quick_links')}</h4>
                        <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link to="/about">{t('nav.about')}</Link></li>
                            <li><Link to="/contact">{t('nav.contact')}</Link></li>
                            <li><Link to="/privacy-policy">{t('footer.privacy')}</Link></li>
                            <li><Link to="/terms">{t('footer.terms')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--white)', marginBottom: '1rem', fontSize: '1rem' }}>{t('nav.schemes')}</h4>
                        <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link to="/schemes">{t('schemes.title')}</Link></li>
                            <li><Link to="/finance">{t('finance.title')}</Link></li>
                            <li><Link to="/career">{t('career.title')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
                    {t('footer.copyright')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
