
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-navy-dark border-t border-navy-accent/20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/60 text-sm">
          © {currentYear} Anil Vignesh. All rights reserved.
        </p>
        <p className="text-white/40 text-xs mt-2">
          Last updated in September 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
