export default function CTASection({ theme, isDark }) {
  return (
    <section className="py-44 relative overflow-hidden text-center">
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none gsap-float -z-10" data-speed="15"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 gsap-scale-up">
        <h2 className={`text-5xl md:text-8xl font-black ${theme.heading} tracking-tighter mb-10 leading-[0.9]`}>Ready to stop losing money?</h2>
        <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium">Setup takes 15 minutes. Impact is immediate. </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className={`w-full sm:w-auto font-black px-12 py-6 rounded-[2rem] text-2xl transition-all shadow-2xl hover:-translate-y-1 hover:shadow-violet-500/20 ${theme.primaryBtn}`}>
            Start Free Trial
          </button>
          <button className={`w-full sm:w-auto font-black px-12 py-6 rounded-[2rem] border text-2xl transition-all hover:-translate-y-1 ${theme.secondaryBtn}`}>
            Book Demo
          </button>
        </div>
      </div>
      {/* Large background text for aesthetic depth */}
      <div className={`gsap-cta-bg-text absolute bottom-[-10%] left-0 w-full font-black text-[20vw] select-none pointer-events-none opacity-[0.02] ${theme.heading} whitespace-nowrap`}>
        AUTOSHIP AUTOSHIP AUTOSHIP
      </div>
    </section>
  );
}
