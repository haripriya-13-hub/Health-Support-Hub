import { HeartHandshake } from "lucide-react";
import { Hero } from "@/components/hero";
import { WaysToHelp } from "@/components/ways-to-help";
import { VolunteerForm } from "@/components/volunteer-form";
import { Chatbot } from "@/components/chatbot";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <HeartHandshake className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">CareConnect</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About Us</a>
            <a href="#ways-to-help" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Ways to Help</a>
            <a href="#volunteer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Volunteer</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <WaysToHelp />
        
        <section id="volunteer" className="py-20 md:py-32 bg-card relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Join our community of caregivers</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We're always looking for compassionate individuals to help support our neighbors. Whether you have a few hours a week or just one day a month, your time makes a profound difference.
                </p>
                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Why volunteer with us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground">Make a direct, visible impact in your local community</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground">Flexible scheduling that works around your life</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground">Meet other caring individuals and build lasting friendships</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-background rounded-3xl p-6 md:p-10 shadow-xl border border-border/50 relative z-10">
                <VolunteerForm />
              </div>
            </div>
          </div>
        </section>

        <Chatbot />
      </main>

      <Footer />
    </div>
  );
}
