import { Utensils, CarFront, Users, CalendarHeart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const waysToHelp = [
  {
    title: "Meal Delivery",
    description: "Prepare or deliver nutritious, diet-compliant meals to individuals recovering from surgery or managing chronic conditions.",
    icon: Utensils,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    title: "Transportation",
    description: "Provide safe rides to and from clinic appointments, physical therapy, or the pharmacy for those without reliable transit.",
    icon: CarFront,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    title: "Wellness Check-ins",
    description: "Stop by or call to provide companionship, ensure medications are taken, and offer a friendly connection for isolated neighbors.",
    icon: Users,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    title: "Event Support",
    description: "Help organize, set up, and run local health fairs, vaccination clinics, and community wellness workshops.",
    icon: CalendarHeart,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  }
];

export function WaysToHelp() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30" id="ways-to-help">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Small acts, huge impact</h2>
          <p className="text-lg text-muted-foreground">
            You don't need a medical degree to improve someone's health outcomes. Sometimes, all it takes is a reliable ride, a warm meal, or a friendly conversation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {waysToHelp.map((way, index) => {
            const Icon = way.icon;
            return (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card group">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${way.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl">{way.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {way.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
