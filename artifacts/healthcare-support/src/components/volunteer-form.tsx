import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  city: z.string().min(2, "Please enter your city/area."),
  interests: z.array(z.string()).min(1, "Please select at least one area of interest."),
  availability: z.string({ required_error: "Please select your availability." }),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms to volunteer.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const volunteerRoles = [
  { id: "meal_delivery", label: "Meal Delivery" },
  { id: "transportation", label: "Transportation" },
  { id: "wellness_check", label: "Wellness Check-ins" },
  { id: "event_support", label: "Event Support" },
];

export function VolunteerForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(142); // Seed number

  useEffect(() => {
    // Load from local storage
    const storedCount = localStorage.getItem("volunteerCount");
    if (storedCount) {
      setVolunteerCount(parseInt(storedCount, 10));
    }
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      interests: [],
      availability: "",
      message: "",
      consent: false,
    },
  });

  function onSubmit(data: FormValues) {
    // Save to local storage
    const newCount = volunteerCount + 1;
    setVolunteerCount(newCount);
    localStorage.setItem("volunteerCount", newCount.toString());
    
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    registrations.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem("registrations", JSON.stringify(registrations));

    setIsSubmitted(true);
    toast.success("Registration successful! Welcome to the team.");
    form.reset();
    
    // Reset success state after a few seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 text-sm font-medium text-primary bg-primary/10 w-fit px-3 py-1.5 rounded-full">
        <Users className="w-4 h-4" />
        <span>{volunteerCount} neighbors have already signed up</span>
      </div>

      {isSubmitted ? (
        <Card className="bg-primary/5 border-primary/20 animate-in fade-in zoom-in-95 duration-500">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
            <p className="text-muted-foreground mb-6">
              Your registration has been received. Our community coordinator will be in touch within 2 business days to get you started.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Register another person
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Neighborhood / City</FormLabel>
                    <FormControl>
                      <Input placeholder="Northside" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">How would you like to help?</FormLabel>
                    <FormDescription>Select all that apply.</FormDescription>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {volunteerRoles.map((role) => (
                      <FormField
                        key={role.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:bg-accent/10 transition-colors"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, role.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== role.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer w-full">
                                {role.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>General Availability</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays (Business Hours)</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="flexible">Flexible / Variable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want to volunteer? (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share a brief message about your motivation or any special skills you have." 
                      className="resize-none min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal text-sm text-muted-foreground">
                      I agree to the volunteer terms and understand that some roles may require a basic background check for safety.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full text-base h-12 rounded-xl">
              Submit Registration
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
