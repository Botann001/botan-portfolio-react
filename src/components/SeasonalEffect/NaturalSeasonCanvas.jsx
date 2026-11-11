import { useEffect, useRef } from 'react';

// Generates high-quality leaf, snowflake, and particle sprites for each season
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
    // Cinematic snow: soft glowing snow flurries + delicate 6-arm ice crystals
    const sprites = [];

    // 1. Soft glowing circular snowflakes (various radii)
    [6, 10, 14].forEach((r) => {
      sprites.push(
        makeCanvas((ctx) => {
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
          grad.addColorStop(0.4, 'rgba(240, 248, 255, 0.85)');
          grad.addColorStop(1, 'rgba(215, 238, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
        })
      );
    });

    // 2. Delicate 6-arm dendritic crystal
    ['#ffffff', '#f0f8ff'].forEach((color) => {
      sprites.push(
        makeCanvas((ctx) => {
          ctx.strokeStyle = color;
          ctx.fillStyle = color;
          ctx.shadowColor = 'rgba(180, 220, 255, 0.65)';
          ctx.shadowBlur = 5;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';

          for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 3);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -20);
            ctx.moveTo(0, -8);
            ctx.lineTo(6, -14);
            ctx.moveTo(0, -8);
            ctx.lineTo(-6, -14);
            ctx.moveTo(0, -15);
            ctx.lineTo(4, -18);
            ctx.moveTo(0, -15);
            ctx.lineTo(-4, -18);
            ctx.stroke();
            ctx.restore();
          }

          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
        })
      );
    });

    return sprites;
  }

  if (season === 'spring') {
    // Sakura cherry blossom petals
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
    // Warm fireflies / golden sun motes
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
        ctx.moveTo(0, 16);
        ctx.quadraticCurveTo(-14, 6, -22, -8);
        ctx.quadraticCurveTo(-12, -22, -3, -16);
        ctx.lineTo(0, -11);
        ctx.lineTo(3, -16);
        ctx.quadraticCurveTo(12, -22, 22, -8);
        ctx.quadraticCurveTo(14, 6, 0, 16);
      } else if (type === 'maple') {
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
        ctx.moveTo(0, 18);
        ctx.bezierCurveTo(-12, 14, -16, 6, -12, 2);
        ctx.bezierCurveTo(-18, -2, -18, -10, -10, -14);
        ctx.bezierCurveTo(-8, -20, 0, -22, 0, -22);
        ctx.bezierCurveTo(0, -22, 8, -20, 10, -14);
        ctx.bezierCurveTo(18, -10, 18, -2, 12, 2);
        ctx.bezierCurveTo(16, 6, 12, 14, 0, 18);
      } else {
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

      // Veins
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

    // Target buttons across hero, navbar, marquee, and contact section
    const TARGET_SPECS = [
      { selector: '.hero-cta .btn-solid', maxLanded: 4, yOffset: -5, inset: 22, maxDepth: 8 },
      { selector: '.hero-cta .btn-ghost', maxLanded: 4, yOffset: -5, inset: 22, maxDepth: 8 },
      { selector: '.season-badge', maxLanded: 1, yOffset: -4, inset: 16, maxDepth: 6 },
      { selector: '.bgm-btn', maxLanded: 1, yOffset: -4, inset: 16, maxDepth: 6 },
      { selector: '.marquee', maxLanded: 6, yOffset: -4, inset: 10, maxDepth: 7 },
      // Contact Section Buttons (at the bottom of the page):
      { selector: '.contact-links a:nth-child(1)', maxLanded: 3, yOffset: -5, inset: 22, maxDepth: 8 },
      { selector: '.contact-links a:nth-child(2)', maxLanded: 3, yOffset: -5, inset: 22, maxDepth: 8 },
      { selector: '.contact-links a:nth-child(3)', maxLanded: 3, yOffset: -5, inset: 22, maxDepth: 8 },
      { selector: '.contact-links a:nth-child(4)', maxLanded: 3, yOffset: -5, inset: 22, maxDepth: 8 }
    ];

    const targets = TARGET_SPECS.map((spec) => {
      const segCount = 14;
      const snowDepths = new Array(segCount + 1).fill(0);
      const maxDepths = new Array(segCount + 1).fill(0);

      for (let i = 0; i <= segCount; i++) {
        const domeRatio = Math.sin((i / segCount) * Math.PI);
        const wave = 0.85 + 0.15 * Math.sin(i * 1.6);
        maxDepths[i] = spec.maxDepth * domeRatio * wave;
      }

      return {
        ...spec,
        el: null,
        rect: null,
        count: 0,
        snowDepths,
        maxDepths
      };
    });

    // =========================================================================
    // FOOTER GROUND PILE (Leaves & Snow at the BOTTOM OF THE WEBPAGE DOCUMENT)
    // Only visible when user scrolls down to the bottom of the page!
    // =========================================================================
    let footerEl = document.querySelector('.footer');

    // Winter Footer Snowbank Segments
    const footerSnowSegs = Math.max(24, Math.round(width / 16));
    const footerSnowDepths = [];
    const footerSnowMax = [];
    for (let i = 0; i <= footerSnowSegs; i++) {
      const wave = 0.75 + 0.25 * Math.sin((i / footerSnowSegs) * Math.PI * 6);
      const maxD = 18 * wave;
      footerSnowMax.push(maxD);
      footerSnowDepths.push(season === 'winter' ? maxD * 0.8 : 0);
    }

    // Autumn / Spring Ground Leaves anchored to the Footer
    const MAX_GROUND_LEAVES = 36;
    const particles = [];

    const spawnParticle = (startY = -45, isGround = false, offsetRatio = null) => {
      let scale;
      let baseVy;
      if (season === 'winter') {
        scale = 0.12 + Math.random() * 0.16;
        baseVy = 35 + Math.random() * 35;
      } else if (season === 'spring') {
        scale = 0.24 + Math.random() * 0.18;
        baseVy = 34 + Math.random() * 34;
      } else if (season === 'summer') {
        scale = 0.22 + Math.random() * 0.20;
        baseVy = 18 + Math.random() * 26;
      } else {
        scale = 0.26 + Math.random() * 0.15;
        baseVy = 38 + Math.random() * 42;
      }

      const ratio = offsetRatio !== null ? offsetRatio : Math.random();
      const pX = ratio * width;
      const baseAngle = (Math.random() * 60 - 30) * (Math.PI / 180);

      return {
        x: pX,
        y: startY,
        scale,
        baseVy,
        vy: isGround ? 0 : baseVy,
        vx: isGround ? 0 : (Math.random() - 0.5) * 14,
        angle: isGround ? baseAngle : Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.5,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 1.2 + Math.random() * 1.8,
        swayAmp: season === 'winter' ? 12 + Math.random() * 16 : 25 + Math.random() * 30,
        flipPhase: Math.random() * Math.PI * 2,
        flipSpeed: season === 'winter' ? 0.6 : 1.5 + Math.random() * 2.2,
        sprite: sprites[Math.floor(Math.random() * sprites.length)],
        state: isGround ? 'ground' : 'falling', // 'falling' | 'landed' | 'ground'
        targetObj: null,
        offsetRatio: ratio,
        groundOffset: -3 - Math.random() * 10,
        hasBeenKnocked: false,
        settleWobble: 0,
        baseAngle
      };
    };

    // Stagger initial falling particles in the sky
    const DESIRED_FALLING_COUNT = season === 'winter' ? 85 : (season === 'autumn' ? 55 : 45);
    for (let i = 0; i < DESIRED_FALLING_COUNT; i++) {
      particles.push(spawnParticle(Math.random() * height * 1.15 - 50));
    }

    // Pre-populate ground leaves pile on the footer (at the bottom of the page)
    if (season === 'autumn' || season === 'spring') {
      const initialGroundCount = 28;
      for (let i = 0; i < initialGroundCount; i++) {
        particles.push(spawnParticle(0, true, i / initialGroundCount + (Math.random() - 0.5) * 0.05));
      }
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

      // Update button target bounding rects
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

      // Check footer position in the document (live scroll tracking)
      if (!footerEl || !footerEl.isConnected) {
        footerEl = document.querySelector('.footer');
      }
      const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;

      // The footer pile is ONLY visible & interactive when scrolled into view!
      const isFooterInView = footerRect && footerRect.top < height + 40 && footerRect.bottom > -40;
      const footerGroundY = footerRect ? footerRect.top : 99999;

      // ========================================================
      // 1. WINTER: Snow on Buttons + Snowbank on Footer
      // ========================================================
      if (season === 'winter') {
        // A. Button Snow Ledges
        for (const t of targets) {
          if (!t.rect || !t.snowDepths) continue;
          const rect = t.rect;
          if (rect.bottom < 0 || rect.top > height) continue;

          const sLeft = rect.left + t.inset;
          const sRight = rect.right - t.inset;
          const sWidth = sRight - sLeft;
          if (sWidth <= 10) continue;

          const N = t.snowDepths.length - 1;

          // Check cursor brushing across button snow
          const isCursorNearLedge =
            mouseX >= sLeft - 12 &&
            mouseX <= sRight + 12 &&
            mouseY >= rect.top - 18 &&
            mouseY <= rect.bottom + 6;

          if (isCursorNearLedge) {
            for (let i = 0; i <= N; i++) {
              const sx = sLeft + (i / N) * sWidth;
              const distToMouse = Math.abs(sx - mouseX);
              if (distToMouse < 22 && t.snowDepths[i] > 0.4) {
                if (Math.random() < 0.55) {
                  const pushX = (mouseVx || (Math.random() - 0.5) * 16) * 0.45;
                  particles.push({
                    x: sx + (Math.random() - 0.5) * 6,
                    y: rect.top - t.snowDepths[i] + Math.random() * 3,
                    scale: 0.10 + Math.random() * 0.12,
                    baseVy: 38 + Math.random() * 32,
                    vy: -14 - Math.random() * 20,
                    vx: pushX + (Math.random() - 0.5) * 14,
                    angle: Math.random() * Math.PI * 2,
                    spin: (Math.random() - 0.5) * 2.5,
                    swayPhase: Math.random() * Math.PI * 2,
                    swaySpeed: 2.2,
                    swayAmp: 14,
                    flipPhase: 0,
                    flipSpeed: 0,
                    sprite: sprites[0],
                    state: 'falling',
                    targetObj: null,
                    offsetRatio: 0,
                    hasBeenKnocked: true,
                    settleWobble: 0,
                    baseAngle: 0
                  });
                }
                t.snowDepths[i] = 0;
              }
            }
          }

          let hasSnow = false;
          for (let i = 0; i <= N; i++) {
            if (t.snowDepths[i] > 0.4) {
              hasSnow = true;
              break;
            }
          }

          if (hasSnow) {
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(180, 220, 255, 0.75)';
            ctx.shadowBlur = 5;

            ctx.beginPath();
            ctx.moveTo(sLeft, rect.top);
            ctx.lineTo(sRight, rect.top);
            ctx.lineTo(sRight, rect.top - t.snowDepths[N]);
            for (let i = N - 1; i >= 0; i--) {
              const currX = sLeft + (i / N) * sWidth;
              const nextX = sLeft + ((i + 1) / N) * sWidth;
              const currY = rect.top - t.snowDepths[i];
              const nextY = rect.top - t.snowDepths[i + 1];
              const midX = (currX + nextX) / 2;
              const midY = (currY + nextY) / 2 - 0.6;
              ctx.quadraticCurveTo(midX, midY, currX, currY);
            }
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = 'rgba(235, 246, 255, 0.9)';
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.restore();
          }
        }

        // B. Footer Snowbank (Only drawn when scrolled to the bottom of the page!)
        if (isFooterInView) {
          const gN = footerSnowDepths.length - 1;

          // Cursor sweeping / carving footer snow
          if (Math.abs(mouseY - footerGroundY) < 45) {
            for (let i = 0; i <= gN; i++) {
              const sx = (i / gN) * width;
              const dist = Math.abs(sx - mouseX);
              if (dist < 28 && footerSnowDepths[i] > 1) {
                if (Math.random() < 0.6) {
                  const pushX = (mouseVx || (Math.random() - 0.5) * 18) * 0.45;
                  particles.push({
                    x: sx + (Math.random() - 0.5) * 8,
                    y: footerGroundY - footerSnowDepths[i] + Math.random() * 4,
                    scale: 0.12 + Math.random() * 0.12,
                    baseVy: 38 + Math.random() * 32,
                    vy: -18 - Math.random() * 26,
                    vx: pushX + (Math.random() - 0.5) * 16,
                    angle: Math.random() * Math.PI * 2,
                    spin: (Math.random() - 0.5) * 2.5,
                    swayPhase: Math.random() * Math.PI * 2,
                    swaySpeed: 2.2,
                    swayAmp: 16,
                    flipPhase: 0,
                    flipSpeed: 0,
                    sprite: sprites[0],
                    state: 'falling',
                    targetObj: null,
                    offsetRatio: 0,
                    hasBeenKnocked: true,
                    settleWobble: 0,
                    baseAngle: 0
                  });
                }
                footerSnowDepths[i] = 0;
              }
            }
          }

          // Draw Snowbank along the top line of the footer
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(175, 215, 255, 0.8)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = -2;

          ctx.beginPath();
          ctx.moveTo(0, footerGroundY + 2);
          ctx.lineTo(width, footerGroundY + 2);
          ctx.lineTo(width, footerGroundY - footerSnowDepths[gN]);

          for (let i = gN - 1; i >= 0; i--) {
            const currX = (i / gN) * width;
            const nextX = ((i + 1) / gN) * width;
            const currY = footerGroundY - footerSnowDepths[i];
            const nextY = footerGroundY - footerSnowDepths[i + 1];
            const midX = (currX + nextX) / 2;
            const midY = (currY + nextY) / 2 - 1.2;
            ctx.quadraticCurveTo(midX, midY, currX, currY);
          }
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = 'rgba(235, 248, 255, 0.95)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }
      }

      // ========================================================
      // 2. AUTUMN & SPRING: Sweeping Ground Leaves on the Footer
      // ========================================================
      if ((season === 'autumn' || season === 'spring') && isFooterInView) {
        // Cursor sweeping ground pile on the footer
        if (Math.abs(mouseY - footerGroundY) < 55) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.state === 'ground') {
              const dx = p.x - mouseX;
              const dy = p.y - mouseY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 55) {
                // Kick up leaf into air with realistic sweep velocity!
                p.state = 'falling';
                p.hasBeenKnocked = true;
                const dirX = Math.abs(mouseVx) > 1.2 ? Math.sign(mouseVx) : (p.x < mouseX ? -1 : 1);
                p.vx = dirX * (55 + Math.random() * 60) + mouseVx * 0.5;
                p.vy = -75 - Math.random() * 75 - Math.abs(mouseVy * 0.4);
                p.spin = dirX * (3 + Math.random() * 4);
              }
            }
          }
        }
      }

      // Count active falling & ground particles
      let activeFalling = 0;
      let activeGround = 0;
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].state === 'falling') activeFalling++;
        if (particles[i].state === 'ground') activeGround++;
      }

      // Replenish the sky continuously
      while (activeFalling < DESIRED_FALLING_COUNT && particles.length < DESIRED_FALLING_COUNT + 55) {
        particles.push(spawnParticle(-45));
        activeFalling++;
      }

      // ========================================================
      // 3. MAIN PARTICLE SIMULATION
      // ========================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // --- GROUND STATE (Anchored to the Footer at the bottom of the page) ---
        if (p.state === 'ground') {
          // If the footer is not in view (e.g. user is up at the Hero), don't draw anything!
          if (!isFooterInView) continue;

          // Ground position scrolls naturally with the footer!
          p.x = p.offsetRatio * width;
          p.y = footerGroundY + p.groundOffset;

          if (p.settleWobble > 0.02) {
            p.angle = p.baseAngle + Math.sin(now * 0.02) * p.settleWobble * 0.15;
            p.settleWobble *= 0.93;
          } else {
            p.angle = p.baseAngle;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(p.scale, p.scale);
          ctx.drawImage(p.sprite, -40, -40, 80, 80);
          ctx.restore();
          continue;
        }

        // --- FALLING STATE ---
        if (p.state === 'falling') {
          // Winter: collision with buttons and footer snow
          if (season === 'winter' && !p.hasBeenKnocked && p.vy > 0) {
            let absorbed = false;

            // 1. Button Snow Ledges
            for (const t of targets) {
              if (!t.rect || !t.snowDepths) continue;
              const rect = t.rect;
              if (rect.bottom < 0 || rect.top > height) continue;

              const sLeft = rect.left + t.inset;
              const sRight = rect.right - t.inset;
              const sWidth = sRight - sLeft;

              if (p.x >= sLeft && p.x <= sRight) {
                const prevY = p.y - p.vy * dt;
                const crossesRim = prevY <= rect.top + 6 && p.y >= rect.top - 8;

                if (crossesRim) {
                  const ratio = (p.x - sLeft) / sWidth;
                  const N = t.snowDepths.length - 1;
                  const idx = Math.max(1, Math.min(N - 1, Math.round(ratio * N)));

                  if (t.snowDepths[idx] < t.maxDepths[idx]) {
                    t.snowDepths[idx] = Math.min(t.maxDepths[idx], t.snowDepths[idx] + 1.3);
                    if (idx > 1) {
                      t.snowDepths[idx - 1] = Math.min(t.maxDepths[idx - 1], t.snowDepths[idx - 1] + 0.6);
                    }
                    if (idx < N - 1) {
                      t.snowDepths[idx + 1] = Math.min(t.maxDepths[idx + 1], t.snowDepths[idx + 1] + 0.6);
                    }
                  }

                  particles[i] = spawnParticle(-45);
                  absorbed = true;
                  break;
                }
              }
            }

            // 2. Footer Snowbank (when footer is in view at the bottom of the page)
            if (!absorbed && isFooterInView && p.y >= footerGroundY - 14 && p.y <= footerGroundY + 12) {
              const gN = footerSnowDepths.length - 1;
              const gIdx = Math.max(0, Math.min(gN, Math.round((p.x / width) * gN)));
              if (footerSnowDepths[gIdx] < footerSnowMax[gIdx]) {
                footerSnowDepths[gIdx] = Math.min(footerSnowMax[gIdx], footerSnowDepths[gIdx] + 1.2);
                if (gIdx > 0) footerSnowDepths[gIdx - 1] = Math.min(footerSnowMax[gIdx - 1], footerSnowDepths[gIdx - 1] + 0.5);
                if (gIdx < gN) footerSnowDepths[gIdx + 1] = Math.min(footerSnowMax[gIdx + 1], footerSnowDepths[gIdx + 1] + 0.5);
              }
              particles[i] = spawnParticle(-45);
              continue;
            }

            if (absorbed) continue;
          }

          // Autumn & Spring: collision with buttons and footer ground
          if (season !== 'winter' && !p.hasBeenKnocked && p.vy > 0) {
            // 1. Button ledges
            for (const t of targets) {
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

            // 2. Landing on the FOOTER GROUND when scrolled to the bottom!
            if (p.state === 'falling' && isFooterInView && p.y >= footerGroundY - 14 && activeGround < MAX_GROUND_LEAVES) {
              p.state = 'ground';
              p.offsetRatio = p.x / width;
              p.groundOffset = -3 - Math.random() * 10;
              p.vx = 0;
              p.vy = 0;
              p.settleWobble = 0.9;
              p.baseAngle = (Math.random() * 60 - 30) * (Math.PI / 180);
              activeGround++;
              particles.push(spawnParticle(-45));
              continue;
            }
          }

          if (p.state === 'falling') {
            // Gravity recovery
            if (p.vy < p.baseVy) {
              p.vy = Math.min(p.baseVy, p.vy + 180 * dt);
            }
            p.vx *= Math.pow(0.25, dt);

            // Air displacement from moving cursor
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 70 && mdist > 0) {
              const push = (70 - mdist) / 70;
              p.vx += (mdx / mdist) * push * 28 + mouseVx * push * 0.25;
              p.vy += (mdy / mdist) * push * 18;
            }

            // Sway & wind
            p.swayPhase += p.swaySpeed * dt;
            p.flipPhase += p.flipSpeed * dt;
            p.angle += p.spin * dt;

            const sway = Math.sin(p.swayPhase) * p.swayAmp * dt;
            const wind = (season === 'winter' ? 8 : 14) * dt;

            p.x += p.vx * dt + sway + wind;
            p.y += p.vy * dt;

            // Recalculate once dropped off-screen
            if (p.y > height + 50 || p.x < -60 || p.x > width + 60) {
              if (activeFalling > DESIRED_FALLING_COUNT) {
                particles.splice(i, 1);
                i--;
                activeFalling--;
                continue;
              } else {
                particles[i] = spawnParticle(-45);
                continue;
              }
            }

            // Draw falling particle
            const flip = season === 'winter' ? 1 : Math.cos(p.flipPhase);
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.scale(p.scale * flip, p.scale);
            ctx.drawImage(p.sprite, -40, -40, 80, 80);
            ctx.restore();
          }
        }

        // --- LANDED STATE ON BUTTONS ---
        if (p.state === 'landed') {
          const t = p.targetObj;
          if (!t || !t.el || !t.el.isConnected || !t.rect) {
            p.state = 'falling';
            if (t) t.count = Math.max(0, t.count - 1);
            p.targetObj = null;
            continue;
          }

          const rect = t.rect;
          p.x = rect.left + rect.width * p.offsetRatio;
          p.y = rect.top + t.yOffset;

          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const isMouseOverTarget =
            mouseX >= rect.left - 8 &&
            mouseX <= rect.right + 8 &&
            mouseY >= rect.top - 16 &&
            mouseY <= rect.bottom + 10;

          if (dist < 42 || isMouseOverTarget) {
            p.state = 'falling';
            p.hasBeenKnocked = true;

            const dirX = Math.abs(mouseVx) > 1.5 ? Math.sign(mouseVx) : (dx < 0 ? 1 : -1);
            p.vx = dirX * (45 + Math.random() * 50) + mouseVx * 0.45;
            p.vy = -40 - Math.random() * 45 - Math.abs(mouseVy * 0.25);
            p.spin = dirX * (2.5 + Math.random() * 3.5);

            t.count = Math.max(0, t.count - 1);
            p.targetObj = null;
          } else {
            if (p.settleWobble > 0.02) {
              p.angle = p.baseAngle + Math.sin(now * 0.02) * p.settleWobble * 0.15;
              p.settleWobble *= 0.93;
            } else {
              p.angle = p.baseAngle;
            }

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
