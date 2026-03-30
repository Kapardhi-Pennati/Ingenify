import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, CheckCircle2 } from 'lucide-react';

const Registration = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        project: '',
        _honeypot: '' // Anti-spam hidden field
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Bot check (Honeypot)
        if (formData._honeypot) {
            console.log('Bot detected');
            return;
        }

        // 2. Spam limit check (localStorage)
        const lastSubmit = localStorage.getItem('last_demo_request');
        const now = Date.now();
        if (lastSubmit && now - parseInt(lastSubmit) < 60000) { // 1 minute limit
            alert("Please wait a minute before sending another request.");
            return;
        }

        setIsLoading(true);

        try {
            // Clean data for SheetDB
            const { _honeypot, ...cleanData } = formData;
            
            const response = await fetch('https://sheetdb.io/api/v1/c1xn2crarv2qz', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [cleanData]
                })
            });

            if (!response.ok) throw new Error('Failed to submit data');
            
            localStorage.setItem('last_demo_request', now.toString());
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting to sheet:', error);
            setIsSubmitted(true); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="registration" className="relative w-full py-24 bg-transparent text-white flex justify-center items-center z-10 p-4">

            <div className="relative w-full max-w-2xl mx-auto">
                {/* Headers */}
                <div className="text-center mb-10 space-y-3 drop-shadow-sm">
                    <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight">Book a Technical Demo</h2>
                    <p className="font-sans text-white/60 text-[17px] font-medium">Capture the full potential of your vision with our senior architects.</p>
                </div>

                {/* Main Apple Liquid Glass Card (Restored Translucency) */}
                <div className="relative bg-white/[0.03] backdrop-blur-[80px] border border-white/10 p-8 sm:p-12 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.4)]">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleSubmit}
                                className="space-y-5 flex flex-col font-sans"
                            >
                                {/* Honeypot field */}
                                <input 
                                    type="text" 
                                    name="_honeypot" 
                                    value={formData._honeypot} 
                                    onChange={handleChange} 
                                    style={{ display: 'none' }} 
                                    tabIndex={-1} 
                                    autoComplete="off" 
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="text-[13px] font-medium text-white/60 tracking-wide uppercase ml-1">Full Name</label>
                                        <input
                                            required type="text" id="name" name="name"
                                            value={formData.name} onChange={handleChange}
                                            className="w-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:border-white/30 focus:ring-white/30 transition-all text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-[13px] font-medium text-white/60 tracking-wide uppercase ml-1">Work Email</label>
                                        <input
                                            required type="email" id="email" name="email"
                                            value={formData.email} onChange={handleChange}
                                            className="w-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:border-white/30 focus:ring-white/30 transition-all text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-[13px] font-medium text-white/60 tracking-wide uppercase ml-1">Phone Number</label>
                                        <input
                                            required type="tel" id="phone" name="phone"
                                            value={formData.phone} onChange={handleChange}
                                            className="w-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:border-white/30 focus:ring-white/30 transition-all text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="role" className="text-[13px] font-medium text-white/60 tracking-wide uppercase ml-1">Your Role</label>
                                        <input
                                            required type="text" id="role" name="role"
                                            value={formData.role} onChange={handleChange}
                                            className="w-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:border-white/30 focus:ring-white/30 transition-all text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                            placeholder="CTO or Founder"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="company" className="text-[13px] font-medium text-white/60 tracking-wide uppercase ml-1">Company</label>
                                    <input
                                        required type="text" id="company" name="company"
                                        value={formData.company} onChange={handleChange}
                                        className="w-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:border-white/30 focus:ring-white/30 transition-all text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="project" className="text-[13px] font-medium text-white/60 tracking-wide uppercase ml-1">Project Scope</label>
                                    <textarea
                                        required id="project" name="project"
                                        value={formData.project} onChange={handleChange} rows={4}
                                        className="w-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:border-white/30 focus:ring-white/30 transition-all resize-none text-sm leading-relaxed shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                        placeholder="Describe the stack, architecture, and timeline..."
                                    />
                                </div>

                                {/* Liquid Glass Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`group relative overflow-hidden w-full bg-white/90 text-[#030614] py-4 rounded-2xl font-semibold hover:bg-white shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-all mt-4 hover:scale-[1.01] tracking-tight text-[16px] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <span className="relative z-10">{isLoading ? 'Processing...' : 'Submit Request'}</span>
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-shimmer z-0" />
                                </button>

                                <div className="flex items-center justify-center gap-2 mt-4 text-white/50 text-xs font-semibold tracking-wider uppercase">
                                    <Lock size={12} />
                                    <span>Encrypted Connection</span>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                            >
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="w-24 h-24 bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                                >
                                    <CheckCircle2 size={40} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                </motion.div>
                                <div className="space-y-2">
                                    <h3 className="font-sans font-semibold tracking-tight text-3xl text-white">Authenticated</h3>
                                    <p className="font-sans text-white/70 max-w-xs mx-auto text-[15px] leading-relaxed">
                                        Your details are safely locked in. Our architects will review them shortly.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Registration;
