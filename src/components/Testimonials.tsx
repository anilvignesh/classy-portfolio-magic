
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
    company: "Nielsen Media",
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
      className="py-20 bg-violet-medium/10 backdrop-blur-sm opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title">Testimonials</h2>
        
        <div className="mt-12 grid grid-cols-1 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (testimonialsRef.current[index] = el)}
              className="glass-card p-6 opacity-0"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-violet-accent/40">
                    <AvatarImage 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-violet-light to-violet-accent 
                      flex items-center justify-center text-xl font-bold text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <Quote size={24} className="text-violet-accent/60 mb-2" />
                    <p className="text-white/80 italic leading-relaxed">{testimonial.content}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-violet-highlight/70">{testimonial.position}</p>
                    <p className="text-white/60 text-sm">{testimonial.company}</p>
                    <div className="flex items-center mt-2 text-xs text-white/50 gap-2">
                      <span>{testimonial.date}</span>
                      <span>•</span>
                      <span>{testimonial.relationship}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {testimonials.length === 1 && (
          <div className="mt-10 text-center">
            <p className="text-white/60 italic">More testimonials coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
