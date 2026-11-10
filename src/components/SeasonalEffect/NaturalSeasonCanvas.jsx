import { useEffect, useRef } from 'react';

// Generates high-quality leaf and particle sprites for each season
function createSeasonSprites(season) {
  const S = 80;
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
    // 6-arm snowflake with dendrite branches
    const flakeColors = ['#ffffff', '#f0f7ff', '#e2edff'];
    return flakeColors.map((color) =>
      makeCanvas((ctx) => {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(170, 215, 255, 0.65)';
        ctx.shadowBlur = 6;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';

        for (let i = 0; i < 6; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI) / 3);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -22);
          ctx.moveTo(0, -9);
          ctx.lineTo(7, -15);
          ctx.moveTo(0, -9);
          ctx.lineTo(-7, -15);
          ctx.moveTo(0, -16);
          ctx.lineTo(5, -20);
          ctx.moveTo(0, -16);
          ctx.lineTo(-5, -20);
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
      })
    );
  }

  if (season === 'spring') {
    // Delicate sakura cherry blossom petals
    const sakuraColors = ['#ffb7c5', '#ffaec0', '#ffd1dc', '#f472b6'];
    return sakuraColors.map((color) =>
      makeCanvas((ctx) => {
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(244, 114, 182, 0.35)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(0, 16);
        ctx.bezierCurveTo(-16, 8, -16, -12, -4, -18);
        ctx.lineTo(0, -13);
        ctx.lineTo(4, -18);
        ctx.bezierCurveTo(16, -12, 16, 8, 0, 16);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -4);
        ctx.stroke();
      })
    );
  }

  if (season === 'summer') {
    // Warm glowing fireflies / sun dust
    const summerColors = ['#ffd700', '#f59e0b', '#fbbf24', '#fef08a'];
    return summerColors.map((color) =>
      makeCanvas((ctx) => {
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(232, 193, 90, 0.9)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-11, 0);
        ctx.lineTo(11, 0);
        ctx.moveTo(0, -11);
        ctx.lineTo(0, 11);
        ctx.stroke();
      })
    );
  }

  // Autumn: Realistic Maple, Ginkgo, Oak, and Birch leaves
  const autumnPalette = [
    { color: '#cf352e', type: 'maple' },
    { color: '#e8590c', type: 'maple' },
    { color: '#d96b27', type: 'maple' },
    { color: '#e5a919', type: 'ginkgo' },
    { color: '#f5ba2a', type: 'ginkgo' },
    { color: '#a0522d', type: 'oak' },
    { color: '#d97706', type: 'birch' }
  ];

  return autumnPalette.map(({ color, type }) =>
    makeCanvas((ctx) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = 'rgba(40, 10, 0, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 2;

      ctx.beginPath();
      if (type === 'ginkgo') {
        // Fan-shaped ginkgo leaf with central notch
        ctx.moveTo(0, 16);
        ctx.quadraticCurveTo(-14, 6, -22, -8);
        ctx.quadraticCurveTo(-12, -22, -3, -16);
        ctx.lineTo(0, -11);
        ctx.lineTo(3, -16);
        ctx.quadraticCurveTo(12, -22, 22, -8);
        ctx.quadraticCurveTo(14, 6, 0, 16);
      } else if (type === 'maple') {
        // Maple leaf with 5 distinct pointy lobes
        ctx.moveTo(0, 16);
        ctx.lineTo(3, 7);
        ctx.lineTo(13, 9);
        ctx.lineTo(9, 2);
        ctx.lineTo(18, -4);
        ctx.lineTo(10, -8);
        ctx.lineTo(14, -18);
        ctx.lineTo(5, -14);
        ctx.lineTo(0, -22);
        ctx.lineTo(-5, -14);
        ctx.lineTo(-14, -18);
        ctx.lineTo(-10, -8);
        ctx.lineTo(-18, -4);
        ctx.lineTo(-9, 2);
        ctx.lineTo(-13, 9);
        ctx.lineTo(-3, 7);
      } else if (type === 'oak') {
        // Lobed wavy oak leaf
        ctx.moveTo(0, 18);
        ctx.bezierCurveTo(-12, 14, -16, 6, -12, 2);
        ctx.bezierCurveTo(-18, -2, -18, -10, -10, -14);
        ctx.bezierCurveTo(-8, -20, 0, -22, 0, -22);
        ctx.bezierCurveTo(0, -22, 8, -20, 10, -14);
        ctx.bezierCurveTo(18, -10, 18, -2, 12, 2);
        ctx.bezierCurveTo(16, 6, 12, 14, 0, 18);
      } else {
        // Birch teardrop leaf
        ctx.moveTo(0, 18);
        ctx.bezierCurveTo(-14, 10, -15, -4, 0, -22);
        ctx.bezierCurveTo(15, -4, 14, 10, 0, 18);
      }
      ctx.closePath();
      ctx.fill();

      // Stem
      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.lineTo(0, 23);
      ctx.stroke();

      // Fine leaf veins
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.lineTo(0, -14);
      ctx.moveTo(0, 2);
      ctx.lineTo(7, -3);
      ctx.moveTo(0, 2);
      ctx.lineTo(-7, -3);
      ctx.moveTo(0, -6);
      ctx.lineTo(6, -11);
      ctx.moveTo(0, -6);
      ctx.lineTo(-6, -11);
      ctx.stroke();
    })
  );
}

export default function NaturalSeasonCanvas({ season = 'autumn' }) {
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

    const sprites = createSeasonSprites(season);

    // Landing surfaces on tactile buttons, stats, and ledges (avoiding empty text box boundaries)
    const TARGET_SPECS = [
      { selector: '.hero-cta .btn-solid', maxLanded: 4, yOffset: -5, inset: 12 },
      { selector: '.hero-cta .btn-ghost', maxLanded: 4, yOffset: -5, inset: 12 },
      { selector: '.hero-meta div:nth-child(1)', maxLanded: 2, yOffset: -3, inset: 6 },
      { selector: '.hero-meta div:nth-child(2)', maxLanded: 2, yOffset: -3, inset: 6 },
      { selector: '.hero-meta div:nth-child(3)', maxLanded: 2, yOffset: -3, inset: 6 },
      { selector: '.season-badge', maxLanded: 1, yOffset: -4, inset: 8 },
      { selector: '.bgm-btn', maxLanded: 1, yOffset: -4, inset: 8 },
      { selector: '.marquee', maxLanded: 6, yOffset: -4, inset: 20 }
    ];

    const targets = TARGET_SPECS.map((spec) => ({
      ...spec,
      el: null,
      rect: null,
      count: 0
    }));

    // Constant flow of falling particles in the sky that NEVER stops
    const DESIRED_FALLING_COUNT = season === 'winter' ? 65 : (season === 'autumn' ? 55 : 45);
    const particles = [];

    const spawnParticle = (startY = -45) => {
      let scale;
      let baseVy;
      if (season === 'winter') {
        scale = 0.18 + Math.random() * 0.20;
        baseVy = 42 + Math.random() * 38;
      } else if (season === 'spring') {
        scale = 0.24 + Math.random() * 0.18;
        baseVy = 34 + Math.random() * 34;
      } else if (season === 'summer') {
        scale = 0.22 + Math.random() * 0.20;
        baseVy = 18 + Math.random() * 26;
      } else {
        // Autumn: 18-30px on screen
        scale = 0.26 + Math.random() * 0.15;
        baseVy = 38 + Math.random() * 42;
      }

      return {
        x: Math.random() * width,
        y: startY,
        scale,
        baseVy,
        vy: baseVy,
        vx: (Math.random() - 0.5) * 14,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.5,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 1.2 + Math.random() * 1.8,
        swayAmp: 25 + Math.random() * 30,
        flipPhase: Math.random() * Math.PI * 2,
        flipSpeed: 1.5 + Math.random() * 2.2,
        sprite: sprites[Math.floor(Math.random() * sprites.length)],
        state: 'falling', // 'falling' | 'landed'
        targetObj: null,
        offsetRatio: 0,
        hasBeenKnocked: false,
        settleWobble: 0,
        baseAngle: 0
      };
    };

    // Stagger initial falling particles across screen
    for (let i = 0; i < DESIRED_FALLING_COUNT; i++) {
      particles.push(spawnParticle(Math.random() * height * 1.15 - 50));
    }

    // Mouse tracking for sweep & air displacement
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
    };

    const onPointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      lastMouseX = -1000;
      lastMouseY = -1000;
      mouseVx = 0;
      mouseVy = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Dampen tracked mouse velocity
      mouseVx *= 0.82;
      mouseVy *= 0.82;

      // Update and cache target elements bounding rects (once per frame)
      for (const t of targets) {
        if (!t.el || !t.el.isConnected) {
          t.el = document.querySelector(t.selector);
        }
        if (t.el) {
          t.rect = t.el.getBoundingClientRect();
        } else {
          t.rect = null;
        }
      }

      // Count currently falling particles to ensure continuous atmospheric rainfall
      let activeFalling = 0;
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].state === 'falling') activeFalling++;
      }

      // Replenish the sky whenever leaves land, so leaves NEVER stop falling
      while (activeFalling < DESIRED_FALLING_COUNT && particles.length < DESIRED_FALLING_COUNT + 30) {
        particles.push(spawnParticle(-45));
        activeFalling++;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.state === 'falling') {
          // Check organic landing on button, text, or ledge top rims
          if (!p.hasBeenKnocked && p.vy > 0) {
            for (const t of targets) {
              // STRICTLY respect t.maxLanded so surfaces never get overcrowded
              if (t.count >= t.maxLanded || !t.rect) continue;
              const rect = t.rect;
              if (rect.bottom < 0 || rect.top > height) continue;

              const hitLeft = rect.left + t.inset;
              const hitRight = rect.right - t.inset;
              const topRim = rect.top;
              const prevY = p.y - p.vy * dt;
              const crossesTop = prevY <= topRim + 12 && p.y >= topRim - 8;

              if (p.x >= hitLeft && p.x <= hitRight && crossesTop) {
                const candidateRatio = (p.x - rect.left) / rect.width;

                // Ensure leaves don't stack directly on top of another resting leaf
                const isSpotOccupied = particles.some(
                  (other) =>
                    other !== p &&
                    other.state === 'landed' &&
                    other.targetObj === t &&
                    Math.abs((other.offsetRatio - candidateRatio) * rect.width) < 18
                );

                if (!isSpotOccupied && Math.random() < 0.75) {
                  p.state = 'landed';
                  p.targetObj = t;
                  p.offsetRatio = candidateRatio;
                  p.settleWobble = 1.0;
                  p.baseAngle = (Math.random() * 44 - 22) * (Math.PI / 180);
                  t.count++;
                  break;
                }
              }
            }
          }

          if (p.state === 'falling') {
            // Gravity recovery if particle was knocked upward
            if (p.vy < p.baseVy) {
              p.vy = Math.min(p.baseVy, p.vy + 180 * dt);
            }
            // Air friction on knock impulse
            p.vx *= Math.pow(0.25, dt);

            // Air displacement from moving cursor
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 70 && mdist > 0) {
              const push = (70 - mdist) / 70;
              p.vx += (mdx / mdist) * push * 30 + mouseVx * push * 0.25;
              p.vy += (mdy / mdist) * push * 20;
            }

            // Normal sway & wind drifting
            p.swayPhase += p.swaySpeed * dt;
            p.flipPhase += p.flipSpeed * dt;
            p.angle += p.spin * dt;

            const sway = Math.sin(p.swayPhase) * p.swayAmp * dt;
            const wind = 14 * dt;

            p.x += p.vx * dt + sway + wind;
            p.y += p.vy * dt;

            // Recalculate once dropped off-screen
            if (p.y > height + 50 || p.x < -60 || p.x > width + 60) {
              if (activeFalling > DESIRED_FALLING_COUNT) {
                // Trim excess knock particles
                particles.splice(i, 1);
                i--;
                activeFalling--;
                continue;
              } else {
                particles[i] = spawnParticle(-45);
                continue;
              }
            }

            // Render falling particle with 3D flip effect
            const flip = Math.cos(p.flipPhase);
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.scale(p.scale * flip, p.scale);
            ctx.drawImage(p.sprite, -40, -40, 80, 80);
            ctx.restore();
          }
        }

        if (p.state === 'landed') {
          const t = p.targetObj;
          if (!t || !t.el || !t.el.isConnected || !t.rect) {
            p.state = 'falling';
            if (t) t.count = Math.max(0, t.count - 1);
            p.targetObj = null;
            continue;
          }

          // Anchored to the element's live viewport position
          const rect = t.rect;
          p.x = rect.left + rect.width * p.offsetRatio;
          p.y = rect.top + t.yOffset;

          // Check mouse sweep / knock-off
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const isMouseOverTarget =
            mouseX >= rect.left - 8 &&
            mouseX <= rect.right + 8 &&
            mouseY >= rect.top - 16 &&
            mouseY <= rect.bottom + 10;

          // Sweep triggers when cursor passes near leaf or enters target
          if (dist < 42 || isMouseOverTarget) {
            p.state = 'falling';
            p.hasBeenKnocked = true;

            const dirX = Math.abs(mouseVx) > 1.5 ? Math.sign(mouseVx) : (dx < 0 ? 1 : -1);
            p.vx = dirX * (45 + Math.random() * 50) + mouseVx * 0.45;
            p.vy = -40 - Math.random() * 45 - Math.abs(mouseVy * 0.25); // Upward pop bounce
            p.spin = dirX * (2.5 + Math.random() * 3.5);

            t.count = Math.max(0, t.count - 1);
            p.targetObj = null;
          } else {
            // Settle wobble upon fresh landing
            if (p.settleWobble > 0.02) {
              p.angle = p.baseAngle + Math.sin(now * 0.02) * p.settleWobble * 0.15;
              p.settleWobble *= 0.93;
            } else {
              p.angle = p.baseAngle;
            }

            // Draw resting particle
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.scale(p.scale, p.scale);
            ctx.drawImage(p.sprite, -40, -40, 80, 80);
            ctx.restore();
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
      window.removeEventListener('pointerdown', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [season]);

  if (season === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className="natural-season-canvas"
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
