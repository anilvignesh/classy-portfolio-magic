import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type TestimonialType = {
  id: number;
  content: string;
  name: string;
  position: string;
  company: string;
  relationship: string;
  date: string;
  image: string;
};

const testimonials: TestimonialType[] = [
  {
    id: 1,
    content: "This is the person who has become for me an ideal in taking ownership. Vignesh expertly filled the Assistant Data Scientist and Data Analyst roles in my data science team for about four years. I was impressed by Vignesh's ability to take ownership of projects and drive it forward with urgency. His natural skill of questioning the status quo has helped us drive process improvements throughout our journey. Vignesh was happy to take initiatives and we miss him volunteering at the fun-at-work gatherings. Thanks a lot, man! Vignesh would become an appreciated member of any team.",
    name: "Deepu Mathew",
    position: "Delivery Manager for Data, Reporting and Analytics",
    company: "Air India",
    relationship: "Direct Manager",
    date: "March 11, 2022",
    image: "/lovable-uploads/ce85b855-e219-4584-93df-c7cada117d1f.png"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    testimonialsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      testimonialsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);
  
  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 bg-teal-medium/10 backdrop-blur-sm opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title">Testimonials</h2>
        
        <div className="mt-12 relative">
          <div
            ref={(el) => (testimonialsRef.current[0] = el)}
            className="glass-card p-6 opacity-0"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-teal-accent/40">
                  <AvatarImage 
                    src={testimonials[0].image} 
                    alt={testimonials[0].name} 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-teal-light to-teal-accent 
                    flex items-center justify-center text-xl font-bold text-white">
                    {testimonials[0].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <Quote size={24} className="text-teal-accent/60 mb-2" />
                  <p className="text-white/80 italic leading-relaxed">{testimonials[0].content}</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white">{testimonials[0].name}</h4>
                  <p className="text-seafoam-light/70">{testimonials[0].position}</p>
                  <p className="text-white/60 text-sm">{testimonials[0].company}</p>
                  <div className="flex items-center mt-2 text-xs text-white/50 gap-2">
                    <span>{testimonials[0].date}</span>
                    <span>•</span>
                    <span>{testimonials[0].relationship}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;