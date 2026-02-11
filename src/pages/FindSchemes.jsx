import React from 'react';
import SchemeWizard from '../components/schemes/SchemeWizard';
import { Helmet } from 'react-helmet-async';

const FindSchemes = () => {
    return (
        <div className="container section">
            <Helmet>
                <title>Find Your Scheme - MySmartBharat</title>
                <meta name="description" content="Use our smart wizard to find government schemes tailored to your profile." />
            </Helmet>
            <SchemeWizard />
        </div>
    );
};

export default FindSchemes;
