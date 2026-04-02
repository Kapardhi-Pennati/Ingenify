'use client';

import { useEffect, useRef } from 'react';

export default function DigitalRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Characters dictionary: Katakana + Hexadecimal + Tech Symbols
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+*$=';
    const charArray = chars.split('');

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];

    // Initialize columns
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start at random height above canvas
      speeds[x] = Math.random() * 0.5 + 0.5; // Random fall speed
    }

    // Handle Resize Re-calc
    const handleResizeReCalc = () => {
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns > columns) {
        for (let x = columns; x < newColumns; x++) {
          drops[x] = Math.random() * -100;
          speeds[x] = Math.random() * 0.5 + 0.5;
        }
      }
      columns = newColumns;
    };
    window.addEventListener('resize', handleResizeReCalc);

    // Mouse Interaction
    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    const draw = () => {
      // Create the trailing/fading effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Higher opacity = shorter tails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        const xPos = i * fontSize;
        const yPos = drops[i] * fontSize;

        // Base Monochrome Silver aesthetic
        let fillStyle = '#ffffff';

        // Mouse Hover Disturbance -> Scramble and brighten
        const distance = Math.sqrt(Math.pow(xPos - mouseX, 2) + Math.pow(yPos - mouseY, 2));
        if (distance < 150) {
          // If close to cursor, glow brightly and randomly offset y slightly to "glitch"
          fillStyle = '#ffffff';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#ffffff';
        } else {
          // Normal stream is a subtle silver/slate
          fillStyle = 'rgba(200, 200, 200, 0.4)';
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = fillStyle;
        ctx.fillText(text, xPos, yPos);

        // Reset drop to top randomly
        if (yPos > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.5 + 0.5; // randomize speed on reset
        }

        // Move drop down
        drops[i] += speeds[i];
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Fast initial fill so it doesn't start completely blank
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', handleResizeReCalc);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
