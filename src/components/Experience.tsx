
import { useEffect, useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Product Manager',
    company: 'EximPe',
    location: 'Bangalore, India',
    period: 'March 2022 - Current',
    achievements: [
      'Led a cross-functional team of 12 to deliver key features for cross-border payments and financing.',
      'Successfully led and contributed to product lines responsible for over $100 million in transactions, showcasing the scalability and market impact of the products.',
      'Spearheaded the launch of the latest product, achieving $50,000 in transaction volume within 3 months of launch, with strong growth potential.',
      'Led the rapid development and launch of ZimplyTrade, a B2B e-commerce platform built using Bolt.New, delivering a fully functional prototype in just 3 days.',
      'Streamlined customer onboarding, reducing TAT by 80% through integration of KYC APIs and guided inputs.',
      'Reduced operational costs by 60% by identifying and integrating new vendors for SMS delivery and KYC APIs.'
    ]
  },
  {
    id: 2,
    title: 'Assistant Data Scientist',
    company: 'Nielsen Media',
    location: 'Kochi, India',
    period: 'June 2018 - March 2022',
    achievements: [
      'Deployed advanced machine learning models to optimize TV media investments, delivering a 20% uplift in ROI.',
      'Enhanced model robustness by 30% through a VIF-driven feature selection pipeline, reducing prediction errors by 25%.',
      'Built a smart TV attribution workflow using R, Shell scripts, and Jenkins, cutting TAT by 40%.',
      'Led the EDA for the Nielsen Identity Engine, identifying critical data anomalies and elevating reporting accuracy.'
    ]
  },
  {
    id: 3,
    title: 'Junior Software Engineer',
    company: 'Carestack',
    location: 'Trivandrum, India',
    period: 'May 2017 - December 2017',
    achievements: [
      'Built backend infrastructure for the Patient Forms Module using .NET, processing 1,000+ forms monthly.',
      'Transitioned into frontend development with AngularJS, earning commendation for teamwork and performance.'
    ]
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineItems = useRef<(HTMLLIElement | null)[]>([]);
  
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
    
    timelineItems.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      timelineItems.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);
  
  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 bg-violet-dark/50 backdrop-blur-sm opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="mt-12">
          <ul className="ml-4">
            {experiences.map((exp, index) => (
              <li
                key={exp.id}
                ref={(el) => (timelineItems.current[index] = el)}
                className="timeline-item opacity-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="timeline-dot"></div>
                
                <div className="glass-card p-6 mb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <Briefcase size={18} className="text-violet-accent mr-2" />
                        {exp.title}
                      </h3>
                      <p className="text-lg text-violet-highlight mt-1">{exp.company}</p>
                      <p className="text-sm text-white/60 mt-1">{exp.location}</p>
                    </div>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <Calendar size={16} className="text-violet-accent mr-1" />
                      <span className="text-sm text-white/70">{exp.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-violet-accent mr-2 mt-1">•</span>
                        <span className="text-white/80">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
