import React, { useState } from 'react';
import { CheckCircle, ArrowRight, User, MapPin, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const QuickEligibilityTool = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        state: '',
        income: ''
    });

    const totalSteps = 3;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Submit logic - navigate to schemes with filters
            navigate(`/schemes?age=${formData.age}&state=${formData.state}&income=${formData.income}`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isStepValid = () => {
        if (step === 1) return formData.age && parseInt(formData.age) > 0;
        if (step === 2) return formData.state !== '';
        if (step === 3) return formData.income !== '';
        return false;
    };

    return (
        <div className="max-w-4xl mx-auto -mt-10 mb-16 relative z-20 px-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700">
                <div className="flex flex-col md:flex-row gap-8 items-center">

                    {/* Left Side: Header & Progress */}
                    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700 pb-6 md:pb-0 md:pr-6 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white mb-2">
                            {t('home.eligibility_title') || "Quick Eligibility Check"}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                            {t('home.eligibility_desc') || "Answer 3 simple questions to find schemes meant for you."}
                        </p>

                        {/* Stepper Dots */}
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-secondary' :
                                            s < step ? 'w-2 bg-green-500' : 'w-2 bg-slate-200 dark:bg-slate-700'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Form Content */}
                    <div className="w-full md:w-2/3">
                        <div className="min-h-[150px] flex flex-col justify-center">
                            {step === 1 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <label className="block text-slate-700 dark:text-slate-200 font-medium text-lg flex items-center gap-2">
                                        <User className="text-secondary" /> {t('common.enter_age') || "What is your Age?"}
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="e.g. 25"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        autoFocus
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <label className="block text-slate-700 dark:text-slate-200 font-medium text-lg flex items-center gap-2">
                                        <MapPin className="text-secondary" /> {t('common.select_state') || "Select your State"}
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="">-- Select State --</option>
                                        <option value="All India">All India</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Delhi">Delhi</option>
                                        {/* Add more states as needed */}
                                    </select>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <label className="block text-slate-700 dark:text-slate-200 font-medium text-lg flex items-center gap-2">
                                        <Wallet className="text-secondary" /> {t('common.annual_income') || "Annual Family Income?"}
                                    </label>
                                    <select
                                        name="income"
                                        value={formData.income}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="">-- Select Income Range --</option>
                                        <option value="0-2.5L">Less than 2.5 Lakhs</option>
                                        <option value="2.5L-5L">2.5 Lakhs - 5 Lakhs</option>
                                        <option value="5L-8L">5 Lakhs - 8 Lakhs</option>
                                        <option value="8L+">Above 8 Lakhs</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all ${isStepValid()
                                        ? 'bg-primary hover:bg-primary-light text-white shadow-md transform hover:translate-x-1'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {step === totalSteps ? (t('common.check_eligibility') || "Check Eligibility") : (t('common.next') || "Next")}
                                {step === totalSteps ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickEligibilityTool;
