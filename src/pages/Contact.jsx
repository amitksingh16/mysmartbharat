import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Contact Us | MySmartBharat</title>
            </Helmet>

            <div className="container section">
                <h1 style={{ marginBottom: '3rem', textAlign: 'center' }}>Get in Touch</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Contact Info */}
                    <div>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Contact Information</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#E3F2FD', padding: '0.8rem', borderRadius: '50%', color: 'var(--primary)' }}><Mail size={20} /></div>
                                <div>
                                    <h4 style={{ marginBottom: '0.2rem' }}>Email</h4>
                                    <p style={{ color: 'var(--text-grey)' }}>help@mysmartbharat.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#E3F2FD', padding: '0.8rem', borderRadius: '50%', color: 'var(--primary)' }}><MapPin size={20} /></div>
                                <div>
                                    <h4 style={{ marginBottom: '0.2rem' }}>Office</h4>
                                    <p style={{ color: 'var(--text-grey)' }}>Lucknow, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Your Name</label>
                            <input type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} placeholder="Enter your name" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                            <input type="email" style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} placeholder="Enter your email" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                            <textarea rows="4" style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="btn btn-primary" type="submit">Send Message</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Contact;
