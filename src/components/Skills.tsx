
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const skillCategories = [
  {
    id: 1,
    name: 'Product Management',
    skills: [
      { name: 'Product Lifecycle', level: 90 },
      { name: 'Product Analytics', level: 85 },
      { name: 'User Feedback Integration', level: 80 },
      { name: 'Agile Methodologies', level: 85 },
      { name: 'Strategic Roadmapping', level: 80 },
    ]
  },
  {
    id: 2,
    name: 'Fintech & SaaS',
    skills: [
      { name: 'B2B/B2C SaaS', level: 90 },
      { name: 'Cloud Technologies', level: 80 },
      { name: 'Scalable Product Design', level: 85 },
      { name: 'Rapid Experimentation', level: 80 },
      { name: 'API Integrations', level: 85 },
    ]
  },
  {
    id: 3,
    name: 'Technical Skills',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'R', level: 75 },
      { name: 'SQL', level: 85 },
      { name: 'Scripting', level: 80 },
      { name: 'Data Science', level: 75 },
    ]
  },
  {
    id: 4,
    name: 'Tools',
    skills: [
      { name: 'Click Up', level: 90 },
      { name: 'Mixpanel', level: 85 },
      { name: 'OpenReplay', level: 80 },
      { name: 'Miro', level: 85 },
      { name: 'Bolt New', level: 80 },
      { name: 'Fyno', level: 80 },
      { name: 'Metabase', level: 75 },
    ]
  },
  {
    id: 5,
    name: 'Soft Skills',
    skills: [
      { name: 'Cross-Functional Leadership', level: 95 },
      { name: 'Problem-Solving', level: 90 },
      { name: 'Stakeholder Management', level: 90 },
      { name: 'Customer-Centric Strategy', level: 85 },
      { name: 'Data-Driven Decision Making', level: 90 },
    ]
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  
  const selectedCategory = skillCategories.find(category => category.id === activeCategory);
  
  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-violet-accent/5 rounded-full filter blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-violet-light/5 rounded-full filter blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-card p-6 h-full border border-violet-light/10 transition-all duration-300 hover:border-violet-light/30">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-violet-highlight/90 bg-clip-text text-transparent">Skill Categories</h3>
              
              <div className="space-y-2 mt-6">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 transform ${
                      activeCategory === category.id
                        ? 'bg-violet-accent text-white font-medium scale-105 shadow-lg shadow-violet-accent/20'
                        : 'bg-violet-medium/30 text-white/70 hover:bg-violet-medium/50 hover:scale-102'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-violet-medium/30 to-violet-medium/10 border border-violet-light/20">
                <p className="text-white/70 text-sm italic">
                  With nearly 8 years of experience across fintech, data science, and software development, 
                  I've developed a diverse skill set that bridges business and technology.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-full border border-violet-light/10 transition-all duration-300 hover:border-violet-light/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{selectedCategory?.name}</h3>
                <div className="px-3 py-1 rounded-full bg-violet-accent/20 border border-violet-accent/30 text-sm text-violet-highlight">
                  {selectedCategory?.skills.length} skills
                </div>
              </div>
              
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {selectedCategory?.skills.map((skill, index) => (
                    <div 
                      key={skill.name} 
                      className={`transition-all duration-500 ${
                        isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-violet-highlight/80">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 rounded-full overflow-hidden bg-violet-medium/50">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-accent to-violet-light rounded-full"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            boxShadow: '0 0 10px rgba(155, 135, 245, 0.5)',
                            transition: 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s ease',
                            transitionDelay: `${index * 150 + 300}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
