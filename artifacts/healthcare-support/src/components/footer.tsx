import { HeartHandshake } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-lg">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">CareConnect</span>
          </div>
          <div className="flex gap-6">
            <a href="mailto:hello@example.org" className="text-primary-foreground/80 hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} CareConnect. All rights reserved.</p>
          <p className="max-w-xl text-xs text-center md:text-right leading-relaxed">
            <strong>Disclaimer:</strong> CareConnect is a community volunteer coordination service, not a medical provider. 
            Our volunteers provide logistical and social support. For medical advice, diagnosis, or treatment, 
            please consult a qualified healthcare professional. In an emergency, call 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
