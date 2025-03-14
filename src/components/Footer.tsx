
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-gradient-to-t from-violet-dark to-violet-dark/95 border-t border-violet-accent/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center">
            <a href="#hero" className="text-2xl font-bold">
              Anil<span className="text-violet-light">Vignesh</span>
            </a>
          </div>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-violet-light/50 to-transparent my-4"></div>
          
          <div className="flex space-x-8 text-white/60">
            <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
            <a href="#experience" className="hover:text-white transition-colors duration-300">Experience</a>
            <a href="#skills" className="hover:text-white transition-colors duration-300">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
          
          <p className="text-white/60 text-sm mt-6 flex items-center">
            © {currentYear} Anil Vignesh. Made with <Heart size={14} className="text-violet-light mx-1" /> 
          </p>
          <p className="text-white/40 text-xs">
            Last updated in September 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
