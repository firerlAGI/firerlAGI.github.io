import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Performance: Limit resize events
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();

    // Performance: Cap particles to avoid lag on large screens
    const particleCount = Math.min(Math.floor(width * 0.05), 60); 
    const connectionDistance = 150;
    const connectionDistanceSq = connectionDistance * connectionDistance; // Optimization
    const mouseDistance = 200;

    let mouse = { x: 0, y: 0 };
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3; // Slower, smoother movement
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        // Cyberpunk colors: Cyan, Magenta, White
        const colors = ['#00ffff', '#ff00ff', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (repel)
        // Optimization: Use squared distance check before Math.sqrt
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseDistance * mouseDistance) {
            const distance = Math.sqrt(distSq);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * 2; 
            const directionY = forceDirectionY * force * 2;

            this.vx -= directionX;
            this.vy -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        // Removed shadowBlur from individual particles for performance
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Clear entire canvas
      ctx.clearRect(0, 0, width, height);

      // We removed the grid drawing loop here. It is now handled by CSS .cyber-grid-bg

      // Update and Draw Particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Connect particles
        // Optimization: Loop starting from j = index + 1 to avoid double checking pairs
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          // Only draw line if close enough
          if (distSq < connectionDistanceSq) {
             const distance = Math.sqrt(distSq);
             ctx.beginPath();
             ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / connectionDistance})`;
             ctx.lineWidth = 1;
             ctx.moveTo(particle.x, particle.y);
             ctx.lineTo(particles[j].x, particles[j].y);
             ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    // Debounce resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setSize();
        init();
      }, 200);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>
      <div className="cyber-grid-bg" />
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 bg-transparent"
      />
    </>
  );
};

export default ParticleBackground;