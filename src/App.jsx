import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Brain, Network, Bot, Lock, Command, Twitter, Send, ShoppingCart, X, Rocket } from 'lucide-react';

// Terminal Component
const TerminalWindow = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', content: 'Matrix Terminal v1.0.0' },
    { type: 'system', content: 'Type "help" for available commands' }
  ]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (isOpen && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, isOpen]);

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => [
        'Available commands:',
        'help    - Show this help message',
        'clear   - Clear terminal',
        'about   - About GITT AI TECH',
        'social  - Show social media links',
        'whoami  - Display user info'
      ]
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setOutput([]);
        return [];
      }
    },
    about: {
      description: 'About GITT AI TECH',
      execute: () => [
        'GITT AI TECH',
        '----------------',
        'A revolutionary AI technology company',
        'Building the future of decentralized artificial intelligence',
        'Established: 2024',
        'Status: Operational'
      ]
    },
    social: {
      description: 'Show social media links',
      execute: () => [
        'Social Media Links',
        '----------------',
        'Twitter: https://twitter.com/GITTAITECH',
        'Telegram: https://t.me/GITTAITECH',
        'Website: https://pump.fun'
      ]
    },
    whoami: {
      description: 'Display user info',
      execute: () => [
        'User Information',
        '----------------',
        'Role: Matrix Explorer',
        'Status: Connected',
        'Access Level: Public'
      ]
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    
    if (trimmedInput) {
      const newOutput = [...output, { type: 'input', content: `> ${input}` }];
      
      if (commands[trimmedInput]) {
        const commandOutput = commands[trimmedInput].execute();
        commandOutput.forEach(line => {
          newOutput.push({ type: 'output', content: line });
        });
      } else {
        newOutput.push({ type: 'error', content: 'Command not found. Type "help" for available commands.' });
      }
      
      setOutput(newOutput);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-3xl bg-black border border-green-500/50 rounded-lg shadow-lg shadow-green-500/20">
        <div className="flex justify-between items-center p-2 border-b border-green-500/50">
          <span className="text-green-500">Matrix Terminal</span>
          <button 
            onClick={onClose}
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div 
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm"
        >
          {output.map((line, i) => (
            <div 
              key={i} 
              className={`mb-1 ${
                line.type === 'error' ? 'text-red-500' : 
                line.type === 'input' ? 'text-blue-500' : 
                'text-green-500'
              }`}
            >
              {line.content}
            </div>
          ))}
          <form onSubmit={handleCommand} className="mt-2 flex gap-2">
            <span className="text-green-500">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-green-500 focus:outline-none"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
};

// TypeWriter Component
const TypeWriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(c => c + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="border-r-2 border-green-500 animate-pulse">
      {displayedText}
    </span>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`border border-green-500/30 p-6 rounded-lg transition-all duration-300 cursor-pointer
        ${isHovered ? 'bg-green-500/10 transform scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
        <Icon size={40} className={`${isHovered ? 'text-green-400' : 'text-green-500'}`} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-green-400/80">{description}</p>
    </div>
  );
};

// Matrix Rain Component
const MatrixRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <div className="matrix-rain animate-matrix">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-green-500 text-xl font-mono" style={{
            animation: `matrixDrop ${Math.random() * 2 + 1}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
            marginLeft: `${Math.random() * 100}vw`
          }}>
            {Array.from({ length: 20 }).map(() => 
              String.fromCharCode(0x30A0 + Math.random() * 96)
            ).join('')}
          </div>
        ))}
      </div>
    </div>
  );
};

// Floating Rocket Component
const FloatingRocket = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const animateRocket = () => {
      const time = Date.now() * 0.001;
      setPosition({
        x: Math.sin(time * 0.5) * 20,
        y: Math.cos(time * 0.3) * 15,
        z: Math.sin(time * 0.4) * 10
      });
      setRotation(time * 15);
    };

    const animationFrame = requestAnimationFrame(function animate() {
      animateRocket();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div 
      className="fixed right-20 top-1/3 pointer-events-none z-20"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`
      }}
    >
      <div 
        className="relative"
        style={{
          transform: `rotate(${rotation}deg)`
        }}
      >
        <Rocket 
          size={48} 
          className="text-green-500 transform rotate-45"
        />
        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full scale-150"></div>
      </div>
    </div>
  );
};

// Navigation Link Component
const NavLink = ({ href, icon: Icon, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon 
        size={20} 
        className={`transition-colors duration-300 ${isHovered ? 'text-green-400' : 'text-green-500'}`}
      />
      <span className={`transition-colors duration-300 ${isHovered ? 'text-green-400' : 'text-green-500'}`}>
        {label}
      </span>
    </a>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-green-500/30 backdrop-blur-sm">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">GITT AI TECH</h3>
            <p className="text-green-400/80">
              Building the future of decentralized artificial intelligence
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://twitter.com/GITTAITECH" className="text-green-400/80 hover:text-green-400 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://t.me/GITTAITECH" className="text-green-400/80 hover:text-green-400 transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://pump.fun/board" className="text-green-400/80 hover:text-green-400 transition-colors">
                  Buy Token
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-green-400/80">
              <li>Email: info@gittai.tech</li>
              <li>Support: support@gittai.tech</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-green-500/30 text-center text-green-400/60">
          <p>© {currentYear} GITT AI TECH. All rights reserved.</p>
          <p className="mt-2 text-sm">
            The future is decentralized. The future is now.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    { 
      icon: Terminal, 
      title: "Advanced AI Systems",
      description: "State-of-the-art artificial intelligence solutions for complex problems."
    },
    { 
      icon: Brain, 
      title: "Machine Learning",
      description: "Adaptive algorithms that evolve and improve over time."
    },
    { 
      icon: Network, 
      title: "Neural Networks",
      description: "Deep learning systems modeled after biological neural networks."
    },
    { 
      icon: Bot, 
      title: "Smart Algorithms",
      description: "Efficient problem-solving through intelligent computation."
    },
    { 
      icon: Lock, 
      title: "Secure AI",
      description: "Protected and encrypted artificial intelligence systems."
    },
    { 
      icon: Command, 
      title: "Custom Solutions",
      description: "Tailored AI implementations for your specific needs."
    }
  ];

  const navLinks = [
    {
      href: "https://twitter.com/GITTAITECH",
      icon: Twitter,
      label: "Twitter"
    },
    {
      href: "https://t.me/GITTAITECH",
      icon: Send,
      label: "Telegram"
    },
    {
      href: "https://pump.fun",
      icon: ShoppingCart,
      label: "Buy on pump.fun"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono relative overflow-hidden">
      <MatrixRain />
      <FloatingRocket />
      
      <div className="relative z-10">
        <nav className="border-b border-green-500/30 p-4 backdrop-blur-sm">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold tracking-wider">
              <TypeWriter text="GITT AI TECH" speed={100} />
            </div>
            <div className="flex space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20">
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl font-bold mb-6">
              <TypeWriter text="Welcome to the Future of AI" speed={70} />
              </h1>
            <p className="text-xl mb-8 text-green-400">
              <TypeWriter text="Advancing the boundaries of artificial intelligence through innovative solutions" speed={30} />
            </p>
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="bg-green-500 text-black px-8 py-3 rounded hover:bg-green-400 transition-colors transform hover:scale-105 duration-300"
            >
              Enter the Matrix
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>

      <TerminalWindow 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </div>
  );
};

export default App;