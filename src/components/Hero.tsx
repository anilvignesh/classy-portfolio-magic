import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle properties
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(window.innerWidth / 10, 100);
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    };

    // Track mouse position
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Create Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        
        // Generate a teal/seafoam color with transparency
        const hue = 180 + Math.random() * 20; // 180-200 hue range (teal/seafoam)
        const saturation = 70 + Math.random() * 30; // 70-100% saturation
        const lightness = 60 + Math.random() * 20; // 60-80% lightness
        const alpha = 0.6 + Math.random() * 0.4; // 0.6-1.0 alpha
        
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }
        } else {
          // When mouse is out, particles return to original position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
      }
    }

    // Create particles
    const init = () => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    init();

    // Connect particles with lines
    const connect = () => {
      let opacityValue = 1;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            opacityValue = 1 - (distance / 120);
            if (!ctx) continue;
            
            // Use a teal color for connecting lines
            ctx.strokeStyle = `rgba(142, 202, 230, ${opacityValue * 0.8})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      
      connect();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-violet-dark/30 to-violet-dark/70 -z-10"></div>
      
      <div className="container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Anil</span>
            <span className="text-violet-accent"> Vignesh</span>
          </h1>
          <div className="h-px w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-violet-accent to-transparent my-6"></div>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Fintech Product Manager
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="#about" 
              className="px-6 py-3 bg-violet-accent/90 hover:bg-violet-accent text-white rounded-full 
              transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,135,245,0.5)]"
            >
              Discover More
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 bg-transparent border border-violet-accent/50 hover:border-violet-accent 
              text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,135,245,0.3)]"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/50 hover:text-white transition-colors duration-300">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;