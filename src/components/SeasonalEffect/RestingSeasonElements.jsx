import { useEffect, useRef } from 'react';

// Generates crisp canvas sprites for seasonal elements
function createSprites(season) {
  const S = 64; // sprite canvas size

  const makeCanvas = (drawFn) => {
    const c = document.createElement('canvas');
    c.width = S;
    c.height = S;
    const ctx = c.getContext('2d');
    if (!ctx) return c;
    ctx.translate(S / 2, S / 2);
    drawFn(ctx);
    return c;
  };

  if (season === 'winter') {
    // Snow puffs / snow caps
    const snowColors = ['#ffffff', '#f8fafc', '#edf2f7'];
    return snowColors.map((color) =>
      makeCanvas((ctx) => {
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(160, 195, 240, 0.45)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(-8, 2, 9, 0, Math.PI * 2);
        ctx.arc(0, -3, 11, 0, Math.PI * 2);
        ctx.arc(8, 1, 8, 0, Math.PI * 2);
        ctx.arc(3, 4, 7, 0, Math.PI * 2);
        ctx.fill();
        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(-2, -6, 5, 0, Math.PI * 2);
        ctx.fill();
      })
    );
  }

  if (season === 'spring') {
    // Sakura / cherry blossom petals
    const sakuraColors = ['#ffb7c5', '#ffaec0', '#ffd1dc', '#f472b6'];
    return sakuraColors.map((color) =>
      makeCanvas((ctx) => {
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(244, 114, 182, 0.3)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(0, 14);
        ctx.bezierCurveTo(-14, 6, -14, -10, -3, -15);
        ctx.lineTo(0, -11); // notch in petal
        ctx.lineTo(3, -15);
        ctx.bezierCurveTo(14, -10, 14, 6, 0, 14);
        ctx.closePath();
        ctx.fill();
      })
    );
  }

  if (season === 'summer') {
    // Golden sparks / sun dust
    const sparkColors = ['#ffd700', '#f59e0b', '#fbbf24', '#fef08a'];
    return sparkColors.map((color) =>
      makeCanvas((ctx) => {
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(232, 193, 90, 0.8)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(10, 0);
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 10);
        ctx.stroke();
      })
    );
  }

  // Default: Autumn leaves (Maple, Ginkgo, Oak, Birch)
  const autumnPalette = [
    { color: '#d9480f', type: 'maple' },
    { color: '#e8590c', type: 'maple' },
    { color: '#c92a2a', type: 'maple' },
    { color: '#e0a800', type: 'ginkgo' },
    { color: '#f2c12e', type: 'ginkgo' },
    { color: '#b5651d', type: 'oak' },
    { color: '#f08c00', type: 'birch' }
  ];

  return autumnPalette.map(({ color, type }) =>
    makeCanvas((ctx) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = 'rgba(60, 20, 0, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;

      ctx.beginPath();
      if (type === 'ginkgo') {
        // Fan-shaped ginkgo
        ctx.moveTo(0, 12);
        ctx.quadraticCurveTo(-10, 4, -18, -8);
        ctx.quadraticCurveTo(-10, -18, -2, -14);
        ctx.lineTo(0, -9);
        ctx.lineTo(2, -14);
        ctx.quadraticCurveTo(10, -18, 18, -8);
        ctx.quadraticCurveTo(10, 4, 0, 12);
      } else if (type === 'maple') {
        // 5-point pointed maple leaf
        ctx.moveTo(0, 14);
        ctx.lineTo(3, 6);
        ctx.lineTo(12, 8);
        ctx.lineTo(8, 2);
        ctx.lineTo(16, -4);
        ctx.lineTo(9, -7);
        ctx.lineTo(13, -15);
        ctx.lineTo(5, -12);
        ctx.lineTo(0, -18);
        ctx.lineTo(-5, -12);
        ctx.lineTo(-13, -15);
        ctx.lineTo(-9, -7);
        ctx.lineTo(-16, -4);
        ctx.lineTo(-8, 2);
        ctx.lineTo(-12, 8);
        ctx.lineTo(-3, 6);
      } else {
        // Wavy oval / oak
        ctx.moveTo(0, 14);
        ctx.bezierCurveTo(-12, 8, -14, -6, 0, -16);
        ctx.bezierCurveTo(14, -6, 12, 8, 0, 14);
      }
      ctx.closePath();
      ctx.fill();

      // Stem
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(0, 17);
      ctx.stroke();
    })
  );
}

export default function RestingSeasonElements({ season = 'autumn' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (season === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const sprites = createSprites(season);

    // Target elements to gather resting leaves/snow on
    const TARGET_SELECTORS = [
      '.hero-cta .btn-solid',
      '.hero-cta .btn-ghost',
      '.nav-right .season-badge',
      '.hero-meta div:nth-child(1)',
      '.hero-meta div:nth-child(2)',
      '.hero-meta div:nth-child(3)'
    ];

    // Create resting particle items
    let items = [];

    const spawnItems = () => {
      items = [];
      TARGET_SELECTORS.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;

        // How many items on this element
        const isButton = sel.includes('.btn');
        const count = isButton ? 4 : 2;

        for (let i = 0; i < count; i++) {
          const ratio = (i + 0.6 + (Math.random() - 0.5) * 0.4) / (count + 0.5);
          items.push({
            el,
            ratio: Math.max(0.08, Math.min(0.92, ratio)),
            yOffset: -6 - Math.random() * 6,
            x: -100,
            y: -100,
            restingAngle: (Math.random() * 50 - 25) * (Math.PI / 180),
            scale: 0.65 + Math.random() * 0.35,
            state: 'resting', // 'resting' | 'falling' | 'dead'
            sprite: sprites[Math.floor(Math.random() * sprites.length)],
            vx: 0,
            vy: 0,
            spin: 0,
            angle: 0,
            swayPhase: Math.random() * Math.PI * 2,
            flipPhase: Math.random() * Math.PI * 2,
            respawnTimer: 0
          });
        }
      });
    };

    // Initial spawn
    spawnItems();

    // Mouse velocity and position tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let mouseVx = 0;
    let mouseVy = 0;

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (lastMouseX !== -1000) {
        mouseVx = mouseX - lastMouseX;
        mouseVy = mouseY - lastMouseY;
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Dislodge check on mouse move
      checkDislodge(mouseX, mouseY, mouseVx, mouseVy);
    };

    const checkDislodge = (mx, my, vx, vy) => {
      const SWEEP_RADIUS = 38; // pixel distance to sweep off
      for (const item of items) {
        if (item.state !== 'resting') continue;

        const dx = item.x - mx;
        const dy = item.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < SWEEP_RADIUS) {
          // Detach leaf! Apply physics impulse
          item.state = 'falling';
          const pushX = dx / (dist || 1);
          item.vx = pushX * 2.2 + vx * 0.3 + (Math.random() - 0.5) * 2;
          item.vy = -Math.abs(vy * 0.25) - 2 - Math.random() * 2.5; // upward kick
          item.spin = (Math.random() - 0.5) * 0.16;
          item.angle = item.restingAngle;
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Main animation loop
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Dampen mouse velocity
      mouseVx *= 0.85;
      mouseVy *= 0.85;

      for (const item of items) {
        if (item.state === 'resting') {
          // Track current position of host element
          const rect = item.el.getBoundingClientRect();
          if (rect.bottom < -20 || rect.top > height + 20) {
            continue; // off-screen
          }

          item.x = rect.left + rect.width * item.ratio;
          item.y = rect.top + item.yOffset;

          // Draw resting leaf
          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.restingAngle);
          ctx.scale(item.scale, item.scale);
          ctx.drawImage(item.sprite, -32, -32, 64, 64);
          ctx.restore();
        } else if (item.state === 'falling') {
          // Physics: gravity + wind sway
          item.vy += 220 * dt; // gravity
          item.vx *= 0.98; // air friction
          item.swayPhase += 4 * dt;
          item.flipPhase += 3.5 * dt;

          const sway = Math.sin(item.swayPhase) * 40 * dt;
          item.x += (item.vx + 15) * dt + sway;
          item.y += item.vy * dt;
          item.angle += item.spin;

          // 3D tumble flip
          const flip = Math.cos(item.flipPhase);

          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.angle);
          ctx.scale(item.scale * flip, item.scale);
          ctx.drawImage(item.sprite, -32, -32, 64, 64);
          ctx.restore();

          // Dropped below screen -> mark dead & schedule respawn
          if (item.y > height + 40 || item.x < -60 || item.x > width + 60) {
            item.state = 'dead';
            item.respawnTimer = now + 12000 + Math.random() * 8000; // 12-20 seconds
          }
        } else if (item.state === 'dead') {
          // Respawn after timer
          if (now > item.respawnTimer) {
            item.state = 'resting';
            item.scale = 0.65 + Math.random() * 0.35;
            item.restingAngle = (Math.random() * 50 - 25) * (Math.PI / 180);
          }
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [season]);

  if (season === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className="resting-elements-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 850
      }}
    />
  );
}
