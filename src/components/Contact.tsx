
import { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const Contact = () => {
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
  
  const contactMethods = [
    {
      icon: <Mail className="h-10 w-10 text-violet-accent" />,
      title: 'Email',
      value: 'anilvignesh.08@gmail.com',
      link: 'mailto:anilvignesh.08@gmail.com',
    },
    {
      icon: <Phone className="h-10 w-10 text-violet-accent" />,
      title: 'Phone',
      value: '+91 9605182142',
      link: 'tel:+919605182142',
    },
    {
      icon: <MapPin className="h-10 w-10 text-violet-accent" />,
      title: 'Location',
      value: 'Bangalore, India',
      link: null,
    },
    {
      icon: <Linkedin className="h-10 w-10 text-violet-accent" />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/anil-vignesh',
      link: 'https://www.linkedin.com/in/anil-vignesh/',
    },
    {
      icon: <Globe className="h-10 w-10 text-violet-accent" />,
      title: 'Blog',
      value: '@anilvignesh-08',
      link: 'https://medium.com/@anilvignesh-08',
    },
  ];
  
  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-violet-dark/50 backdrop-blur-sm opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get in Touch</h2>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="glass-card p-8 flex flex-col items-center text-center hover:border-violet-accent/50 
              transition-all duration-300 hover:shadow-[0_5px_15px_rgba(155,135,245,0.2)]"
            >
              <div className="mb-4">{method.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              {method.link ? (
                <a 
                  href={method.link} 
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-white/70 hover:text-violet-accent transition-colors duration-300"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-white/70">{method.value}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="mailto:anilvignesh.08@gmail.com" 
              className="social-link"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/anil-vignesh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://medium.com/@anilvignesh-08" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Medium"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
