
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const skillCategories = [
  {
    id: 1,
    name: 'Product Management',
    skills: [
      { name: 'Agile methodologies', level: 90 },
      { name: 'Cross Functional Team Leadership', level: 85 },
      { name: 'Customer Interviews', level: 80 },
      { name: 'Product Strategy', level: 85 },
      { name: 'Roadmap Planning', level: 90 },
    ]
  },
  {
    id: 2,
    name: 'Technical Skills',
    skills: [
      { name: 'Prompting', level: 85 },
      { name: 'Scripting', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'R', level: 65 },
      { name: 'SQL', level: 80 },
    ]
  },
  {
    id: 3,
    name: 'Tools',
    skills: [
      { name: 'Click Up', level: 90 },
      { name: 'Mixpanel', level: 85 },
      { name: 'OpenReplay', level: 80 },
      { name: 'Miro', level: 95 },
      { name: 'Bolt.New', level: 85 },
      { name: 'Fyno', level: 75 },
    ]
  },
  {
    id: 4,
    name: 'Soft Skills',
    skills: [
      { name: 'Problem-solving', level: 95 },
      { name: 'Communication', level: 90 },
      { name: 'Stakeholder Management', level: 85 },
      { name: 'Vendor Management', level: 80 },
      { name: 'Team Leadership', level: 90 },
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
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-card p-6 h-full">
              <h3 className="text-xl font-semibold mb-4">Skill Categories</h3>
              
              <div className="space-y-2 mt-6">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-violet-accent text-white font-medium'
                        : 'bg-violet-medium/30 text-white/70 hover:bg-violet-medium/50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-violet-medium/20 border border-violet-light/20">
                <p className="text-white/70 text-sm italic">
                  With nearly 8 years of experience across fintech, data science, and software development, 
                  I've developed a diverse skill set that bridges business and technology.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-full">
              <h3 className="text-xl font-semibold mb-6">{selectedCategory?.name}</h3>
              
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
                      <div className="skill-bar">
                        <div 
                          className="skill-progress transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
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
