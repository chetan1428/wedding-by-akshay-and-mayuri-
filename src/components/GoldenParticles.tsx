'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Golden Particles & Rose Petals – raw Three.js (no R3F)
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 200;
const PETAL_COUNT = 30;

const PETAL_COLORS = [0xff6b8a, 0xff4d6d, 0xc9184a];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/** Build a simple 2‑D petal shape as a BufferGeometry (flat oval). */
function createPetalGeometry(): THREE.BufferGeometry {
  const segments = 12;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // Centre vertex
  positions.push(0, 0, 0);
  uvs.push(0.5, 0.5);

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const rx = 0.12; // half‑width
    const ry = 0.22; // half‑height – elongated oval
    const x = Math.cos(angle) * rx;
    const y = Math.sin(angle) * ry;
    positions.push(x, y, 0);
    uvs.push((x / rx + 1) / 2, (y / ry + 1) / 2);
    if (i > 0) {
      indices.push(0, i, i + 1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GoldenParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ---- Renderer --------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ---- Scene & Camera ---------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    // ---- Golden Dust Particles (Points) -----------------------------------
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pOpacities = new Float32Array(PARTICLE_COUNT);
    const pSpeeds = new Float32Array(PARTICLE_COUNT);
    const pPhases = new Float32Array(PARTICLE_COUNT);

    const aspect = window.innerWidth / window.innerHeight;
    const spreadX = 6 * aspect;
    const spreadY = 7;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3] = randomRange(-spreadX, spreadX);
      pPositions[i * 3 + 1] = randomRange(-spreadY, spreadY);
      pPositions[i * 3 + 2] = randomRange(-2, 2);
      pOpacities[i] = randomRange(0.25, 0.85);
      pSpeeds[i] = randomRange(0.003, 0.012);
      pPhases[i] = randomRange(0, Math.PI * 2);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Circular sprite texture for soft glow
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,215,0,1)');
    gradient.addColorStop(0.3, 'rgba(255,215,0,0.6)');
    gradient.addColorStop(0.7, 'rgba(255,215,0,0.15)');
    gradient.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: spriteTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffd700,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- Rose Petals (Meshes) ---------------------------------------------
    const petalBaseGeo = createPetalGeometry();
    interface PetalData {
      mesh: THREE.Mesh;
      speed: number;
      swayAmp: number;
      swayFreq: number;
      rotSpeed: THREE.Vector3;
      phase: number;
    }
    const petals: PetalData[] = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      const color = PETAL_COLORS[i % PETAL_COLORS.length];
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: randomRange(0.35, 0.65),
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(petalBaseGeo, mat);
      mesh.position.set(
        randomRange(-spreadX, spreadX),
        randomRange(spreadY, spreadY + 6),
        randomRange(-1, 1),
      );
      mesh.rotation.set(
        randomRange(0, Math.PI),
        randomRange(0, Math.PI),
        randomRange(0, Math.PI),
      );
      scene.add(mesh);

      petals.push({
        mesh,
        speed: randomRange(0.005, 0.015),
        swayAmp: randomRange(0.3, 0.9),
        swayFreq: randomRange(0.4, 1.2),
        rotSpeed: new THREE.Vector3(
          randomRange(0.002, 0.008),
          randomRange(0.002, 0.008),
          randomRange(0.001, 0.005),
        ),
        phase: randomRange(0, Math.PI * 2),
      });
    }

    // ---- Animation Loop ---------------------------------------------------
    let animId = 0;
    let elapsed = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      elapsed += 0.016; // ~60 fps assumed delta

      // Update gold particles
      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;

        // Float upward
        pos.array[iy] += pSpeeds[i];

        // Horizontal sine drift
        (pos.array as Float32Array)[ix] +=
          Math.sin(elapsed * 0.8 + pPhases[i]) * 0.002;

        // Wrap around when above view
        if (pos.array[iy] > spreadY + 1) {
          (pos.array as Float32Array)[iy] = -spreadY - 1;
          (pos.array as Float32Array)[ix] = randomRange(-spreadX, spreadX);
        }
      }
      pos.needsUpdate = true;

      // Gentle global opacity pulse for shimmer
      particleMat.opacity = 0.7 + Math.sin(elapsed * 1.2) * 0.15;

      // Update petals
      for (const p of petals) {
        p.mesh.position.y -= p.speed;
        p.mesh.position.x +=
          Math.sin(elapsed * p.swayFreq + p.phase) * 0.006 * p.swayAmp;

        p.mesh.rotation.x += p.rotSpeed.x;
        p.mesh.rotation.y += p.rotSpeed.y;
        p.mesh.rotation.z += p.rotSpeed.z;

        // Reset when below viewport
        if (p.mesh.position.y < -spreadY - 2) {
          p.mesh.position.y = spreadY + randomRange(1, 4);
          p.mesh.position.x = randomRange(-spreadX, spreadX);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ---- Resize Handler ---------------------------------------------------
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ---- Cleanup ----------------------------------------------------------
    cleanupRef.current = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      spriteTexture.dispose();
      petalBaseGeo.dispose();
      petals.forEach((p) => {
        (p.mesh.material as THREE.MeshBasicMaterial).dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    />
  );
}
