import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import { BarChart2 } from 'lucide-react';

const DailyPoll = () => {
    const POLL_KEY = 'mysmartbharat_daily_poll_v1';

    // Mock Poll Data
    const pollData = {
        question: "Which government benefit do you find most useful?",
        options: [
            { id: 1, text: "Direct Cash Transfer", votes: 45 },
            { id: 2, text: "Health Insurance (Ayushman)", votes: 38 },
            { id: 3, text: "Subsidies (Gas/Electricity)", votes: 22 },
            { id: 4, text: "Pension Schemes", votes: 15 }
        ]
    };

    const [hasVoted, setHasVoted] = useState(false);
    const [votes, setVotes] = useState(pollData.options);
    const [totalVotes, setTotalVotes] = useState(120);

    useEffect(() => {
        const voted = localStorage.getItem(POLL_KEY);
        if (voted) {
            setHasVoted(true);
        }
    }, []);

    const handleVote = (optionId) => {
        const newVotes = votes.map(opt => {
            if (opt.id === optionId) {
                return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
        });
        setVotes(newVotes);
        setTotalVotes(totalVotes + 1);
        setHasVoted(true);
        localStorage.setItem(POLL_KEY, 'true');
    };

    return (
        <div className="h-full bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-slate-900 border border-green-200 dark:border-green-900 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-green-700 dark:text-green-400">
                <BarChart2 size={24} />
                <h3 className="font-bold text-lg m-0">Poll of the Day</h3>
            </div>

            <h4 className="mb-6 text-lg font-semibold text-slate-800 dark:text-white leading-snug">
                {pollData.question}
            </h4>

            <div className="flex flex-col gap-3">
                {votes.map(opt => {
                    const percentage = Math.round((opt.votes / totalVotes) * 100);

                    return (
                        <div key={opt.id}>
                            {!hasVoted ? (
                                <button
                                    onClick={() => handleVote(opt.id)}
                                    className="w-full text-left p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-400 transition-all font-medium text-slate-700 dark:text-slate-200"
                                >
                                    {opt.text}
                                </button>
                            ) : (
                                <div className="animate-fade-in">
                                    <div className="flex justify-between mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <span>{opt.text}</span>
                                        <span>{percentage}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-slate-400 mt-1 block">{opt.votes} votes</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyPoll;
