import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';

const DidYouKnow = () => {
    const facts = [
        "The Constitution of India is the longest written constitution of any country in the world.",
        "PM-KISAN is one of the largest Direct Benefit Transfer (DBT) schemes globally.",
        "UPI (Unified Payments Interface) handles more digital transactions than major global card networks combined.",
        "India has the second-largest road network in the world, spanning over 6.3 million kilometers.",
        "Ayushman Bharat PM-JAY is the world's largest government-funded healthcare program.",
        "India is the largest producer of milk, pulses, and jute in the world.",
        "The Indian Railways is the fourth largest national railway system in the world by size.",
        "Aadhaar is the world's largest biometric ID system, covering over 1.3 billion residents."
    ];

    const [currentFact, setCurrentFact] = useState(facts[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Random initial fact
        setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
    }, []);

    const nextFact = () => {
        setIsAnimating(true);
        setTimeout(() => {
            let nextIndex = Math.floor(Math.random() * facts.length);
            while (facts[nextIndex] === currentFact) {
                nextIndex = Math.floor(Math.random() * facts.length);
            }
            setCurrentFact(facts[nextIndex]);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-3xl p-8 relative overflow-hidden text-center shadow-sm">

            {/* Background Icon Opacity */}
            <Lightbulb
                size={120}
                className="absolute -top-2 -right-2 text-yellow-400 opacity-20 transform rotate-12 pointer-events-none"
            />

            <div className="relative z-10">
                <h3 className="text-yellow-700 dark:text-yellow-400 flex items-center justify-center gap-2 mb-4 text-xl font-bold font-heading">
                    <Lightbulb size={24} className="text-yellow-500" /> Did You Know?
                </h3>

                <div className={`min-h-[100px] flex items-center justify-center transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                        "{currentFact}"
                    </p>
                </div>

                <button
                    onClick={nextFact}
                    className="mt-4 bg-white dark:bg-slate-800 border border-yellow-400 text-yellow-700 dark:text-yellow-400 px-5 py-2 rounded-full font-semibold text-sm flex items-center justify-center gap-2 mx-auto hover:bg-yellow-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                    <RefreshCw size={14} className={isAnimating ? 'animate-spin' : ''} /> Next Fact
                </button>
            </div>
        </div>
    );
};

export default DidYouKnow;
