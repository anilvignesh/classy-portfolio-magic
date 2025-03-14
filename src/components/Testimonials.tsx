
import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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
  },
  {
    id: 2,
    content: "I had the pleasure of working with Vignesh at Nielsen. He was always eager to learn and contribute to the team's success. His analytical skills and attention to detail made him a valuable asset to our data science projects. He consistently demonstrated a strong work ethic and ability to collaborate effectively with cross-functional teams.",
    name: "Jane Smith",
    position: "Senior Data Scientist",
    company: "Nielsen Media",
    relationship: "Colleague",
    date: "February 15, 2022",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    content: "Vignesh brought fresh perspectives and innovative solutions to our challenging data problems. His ability to quickly understand complex requirements and translate them into actionable insights was impressive. He was always willing to go the extra mile to ensure project success and client satisfaction.",
    name: "Robert Johnson",
    position: "Product Owner",
    company: "Data Analytics Inc.",
    relationship: "Project Lead",
    date: "April 22, 2022",
    image: "/placeholder.svg"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
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
            ref={(el) => (testimonialsRef.current[currentIndex] = el)}
            className="glass-card p-6 opacity-0"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-teal-accent/40">
                  <AvatarImage 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-teal-light to-teal-accent 
                    flex items-center justify-center text-xl font-bold text-white">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <Quote size={24} className="text-teal-accent/60 mb-2" />
                  <p className="text-white/80 italic leading-relaxed">{testimonials[currentIndex].content}</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-seafoam-light/70">{testimonials[currentIndex].position}</p>
                  <p className="text-white/60 text-sm">{testimonials[currentIndex].company}</p>
                  <div className="flex items-center mt-2 text-xs text-white/50 gap-2">
                    <span>{testimonials[currentIndex].date}</span>
                    <span>•</span>
                    <span>{testimonials[currentIndex].relationship}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-teal-medium/30 hover:bg-teal-accent/60 
                  transition-colors duration-300 text-white/80 hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 
                      ${currentIndex === index 
                        ? 'bg-teal-accent scale-110' 
                        : 'bg-teal-medium/40 hover:bg-teal-medium/80'}`
                    }
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-teal-medium/30 hover:bg-teal-accent/60 
                  transition-colors duration-300 text-white/80 hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
