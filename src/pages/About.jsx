import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | MySmartBharat</title>
                <meta name="description" content="Mission of MySmartBharat: To simplify information for every Indian." />
            </Helmet>

            <div className="container section" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>About MySmartBharat</h1>

                <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                    MySmartBharat is a digital initiative to empower every Indian with <strong>smart, simplified, and verified information.</strong>
                </p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>Our Mission</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--text-grey)' }}>
                    To bridge the gap between complex government/financial information and the common man. We believe that knowledge is power, but only when it is understood.
                </p>

                <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Why We Started</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Millions of Indians miss out on government schemes and financial benefits simply because the information is too complex or hard to find. We are here to change that.
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
                        <li>No fake news</li>
                        <li>No clickbait</li>
                        <li>Simple language</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default About;
