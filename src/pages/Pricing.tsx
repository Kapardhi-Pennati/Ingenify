import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
    return (
        <section className="relative w-full min-h-screen pt-32 pb-24 text-white overflow-hidden flex flex-col items-center z-10 p-4">

            <div className="text-center space-y-4 mb-16 px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-sans font-semibold text-5xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-white"
                >
                    Built for Scale.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-sans text-lg sm:text-xl text-white/60 max-w-xl mx-auto font-light"
                >
                    We design, build, and deploy premium architecture tailored exactly to your unique business parameters.
                </motion.p>
            </div>

            {/* Apple Glass Custom Pricing Tier */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative w-full max-w-lg bg-white/[0.03] backdrop-blur-[80px] rounded-[3rem] p-8 sm:p-12 border border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.4)]"
            >
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-2xl font-serif text-white tracking-tight mb-2">Platform Custom</h3>
                        <p className="text-sm font-sans text-white/50">Enterprise-grade security, 24/7 server runtime, and proactive management & maintenance.</p>
                    </div>
                </div>

                <div className="mb-8 pb-8 border-b border-white/10">
                    <span className="text-5xl font-sans font-bold text-white tracking-tighter">Enterprise</span>
                </div>

                <ul className="space-y-4 mb-10 font-sans text-[15px] text-white/80">
                    {[
                        "Advanced Security Protocols",
                        "24/7 Guaranteed Server Runtime",
                        "End-to-End Management & Maintenance",
                        "Proactive Infrastructure Monitoring",
                        "Automated Backups & Recovery"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                <Check size={14} className="text-[#3054ff]" />
                            </div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link to="/book-demo" className="block w-full">
                    <button className="group relative overflow-hidden w-full bg-white text-[#030614] py-4 rounded-2xl font-semibold hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.01] tracking-tight text-[16px]">
                        <span className="relative z-10">Book a Technical Demo</span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-shimmer z-0" />
                    </button>
                </Link>
            </motion.div>
        </section>
    );
};

export default Pricing;
