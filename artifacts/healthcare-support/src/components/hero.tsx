import { ArrowRight, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden" id="about">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 bg-background overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/30 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <HeartPulse className="w-4 h-4" />
            <span>Community-first health support</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
            Neighbors helping neighbors stay <span className="text-primary relative whitespace-nowrap">
              healthy
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
            CareConnect bridges the gap between everyday volunteers and community members who need a little extra support with their health and wellness routines.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 fill-mode-both">
            <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1" asChild>
              <a href="#volunteer">
                Become a Volunteer
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-white hover:bg-white/90 text-foreground border border-border shadow-sm transition-all hover:-translate-y-1" asChild>
              <a href="#ways-to-help">
                See How to Help
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
