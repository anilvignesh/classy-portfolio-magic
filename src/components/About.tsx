
import { useEffect, useRef } from 'react';
import { User, MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="py-20 opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="glass-card p-6 h-full">
              <div className="flex flex-col items-center">
                <Avatar className="w-40 h-40 rounded-full mb-4 border-2 border-violet-accent/40">
                  <AvatarImage 
                    src="/lovable-uploads/368f8fef-b893-412b-ad21-4fa97bf7e660.png" 
                    alt="Anil Vignesh" 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-violet-light to-violet-accent 
                    flex items-center justify-center text-4xl font-bold text-white">
                    AV
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-2">Anil Vignesh</h3>
                <p className="text-violet-highlight/70 text-sm mb-4">Fintech Product Manager</p>
                
                <div className="w-full space-y-3 mt-4">
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="text-violet-accent mr-2" />
                    <span className="text-white/80">Bangalore, India</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="text-violet-accent mr-2" />
                    <a 
                      href="mailto:anilvignesh.08@gmail.com" 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      anilvignesh.08@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone size={16} className="text-violet-accent mr-2" />
                    <a 
                      href="tel:+919605182142" 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      +91 9605182142
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Globe size={16} className="text-violet-accent mr-2" />
                    <a 
                      href="https://medium.com/@anilvignesh-08" 
                      className="text-white/80 hover:text-white transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      @anilvignesh-08
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Linkedin size={16} className="text-violet-accent mr-2" />
                    <a 
                      href="https://www.linkedin.com/in/anil-vignesh/" 
                      className="text-white/80 hover:text-white transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/anil-vignesh
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="glass-card p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
                <User size={20} className="text-violet-accent mr-2" />
                Professional Summary
              </h3>
              
              <p className="text-white/80 mb-4 leading-relaxed">
                Anil Vignesh is a Fintech Product Manager with nearly 8 years of experience, transitioning from 5 years 
                in development and data science. An entrepreneur at heart, he excels in <span className="text-violet-accent font-medium">ownership</span>, 
                <span className="text-violet-accent font-medium"> adaptability</span>, and <span className="text-violet-accent font-medium">continuous improvement</span>.
              </p>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                His strengths lie in taking responsibility, listening, and evolving based on feedback. 
                With a solid technical foundation, Anil effectively bridges <span className="text-violet-accent font-medium">business</span> and 
                <span className="text-violet-accent font-medium"> technology</span>, delivering impactful solutions.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="glass-card bg-white/5 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Govt. Model Engineering College</h4>
                    <p className="text-violet-highlight/70 text-sm mt-1">B.Tech in Computer Science & Engineering</p>
                  </div>
                  <div className="text-sm text-white/60">
                    June 2013 - May 2017
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6">
                <h3 className="text-lg font-semibold mb-3">Key Strengths:</h3>
                <div className="flex flex-wrap gap-2">
                  {['Ownership', 'Adaptability', 'Problem-solving', 'Communication', 'Stakeholder Management'].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-violet-medium/40 rounded-full text-sm text-white/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
