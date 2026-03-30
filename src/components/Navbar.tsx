import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-transparent backdrop-blur-sm border-b border-white/5">
            {/* Left Section: Branding */}
            <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-[#3054ff]/20 backdrop-blur-md p-2 rounded-xl group-hover:bg-[#3054ff]/40 transition-colors border border-[rgba(48,84,255,0.2)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="M5 12H3" />
                        <path d="M21 12h-2" />
                        <path d="M18.36 5.64l-1.42 1.42" />
                        <path d="M7.06 18.36l-1.42 1.42" />
                        <path d="M18.36 18.36l-1.42-1.42" />
                        <path d="M7.06 5.64l-1.42-1.42" />
                    </svg>
                </div>
                <span className="text-white font-bold font-sans tracking-tight text-xl hidden sm:block">Ingenify</span>
            </Link>

            {/* Middle Section: Navigation */}
            <div className="hidden md:flex items-center gap-8 bg-black/10 backdrop-blur-3xl px-6 py-2 rounded-full border border-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                <Link to="/customer-stories" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Stories</Link>
                <Link to="/pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</Link>
            </div>

            {/* Right Section: Mobile menu (Stories / Pricing only visible on desktop, mobile has slim CTA) and Desktop CTAs */}
            <div className="flex items-center gap-3">

                <Link 
                    to="/book-demo" 
                    className="relative px-5 py-2.5 bg-white text-[#030614] rounded-full text-sm font-semibold hover:bg-white border border-white/10 hover:scale-[1.02] shadow-[0_2px_10px_rgba(255,255,255,0.2)] transition-all"
                >
                    Book a Demo
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
