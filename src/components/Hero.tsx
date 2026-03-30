import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative w-full min-h-[90vh] bg-transparent text-white overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 z-10 px-4">
            
            {/* Apple Liquid Glass Content Container (Translucent Restored) */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-12 bg-white/[0.03] backdrop-blur-[80px] rounded-[2rem] sm:rounded-[3rem] px-6 py-10 sm:p-12 md:p-16 border border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.4)]">
                
                {/* Pre-headline */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-2xl sm:text-4xl lg:text-[40px] leading-[1.1] text-white/80"
                >
                    Welcome to Ingenify Workspace
                </motion.h2>

                {/* Main Headline - Mobile Responsive */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[1] tracking-[-0.04em] text-white drop-shadow-sm w-full"
                >
                    Build Faster.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="font-sans text-base sm:text-lg md:text-[22px] leading-[1.65] text-white/70 max-w-2xl mx-auto font-light"
                >
                    We build, scale, and securely manage your full-stack applications so you can focus entirely on growing your business.
                </motion.p>

                {/* CTA Buttons - VisionOS Style w/ Liquid Hover */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
                >
                    {/* Primary Button */}
                    <Link to="/book-demo" className="w-full sm:w-auto overflow-hidden group relative flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-md rounded-full transition-all hover:bg-white hover:scale-[1.02] shadow-[0_4px_14px_rgba(255,255,255,0.25)] cursor-pointer">
                        <span className="text-[#030614] text-[15px] sm:text-[17px] font-semibold font-sans tracking-tight relative z-10 w-full text-center">Start Your Project</span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-shimmer z-0" />
                    </Link>

                    {/* Secondary Button */}
                    <button className="w-full sm:w-auto overflow-hidden group relative flex items-center justify-center px-8 py-4 bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-full transition-all hover:bg-white/[0.12] hover:scale-[1.02] cursor-pointer">
                        <span className="text-white text-[15px] sm:text-[17px] font-medium font-sans tracking-tight relative z-10 w-full text-center">See Our Examples</span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-shimmer z-0" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
