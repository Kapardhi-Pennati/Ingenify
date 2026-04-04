'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─── Config ─── */

const SECTION_COLORS = [
  new THREE.Color('#6366f1'), // indigo  — Surge
  new THREE.Color('#06b6d4'), // cyan    — Scale
  new THREE.Color('#8b5cf6'), // violet  — Silence
  new THREE.Color('#10b981'), // emerald — Presence
];

function createGeometry(index: number): THREE.BufferGeometry {
  switch (index) {
    case 0:
      return new THREE.IcosahedronGeometry(1.6, 1);        // Crystal
    case 1:
      return new THREE.TorusKnotGeometry(1.1, 0.35, 128, 16); // Complex knot
    case 2:
      return new THREE.OctahedronGeometry(1.7, 0);          // Fortress
    case 3:
      return new THREE.DodecahedronGeometry(1.5, 1);        // Neural
    default:
      return new THREE.SphereGeometry(1.5, 32, 32);
  }
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/* ─── Component ─── */

export default function ScrollScene3D({ sectionCount = 4 }: { sectionCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const w = container.clientWidth;
    const h = container.clientHeight;

    // ── Scene ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Lights ──
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0x6366f1, 4, 25);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x06b6d4, 2, 25);
    fillLight.position.set(-5, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.5, 20);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    // ── Objects per section ──
    interface SectionObject {
      group: THREE.Group;
      solidMat: THREE.MeshPhysicalMaterial;
      wireMat: THREE.LineBasicMaterial;
      glowMat: THREE.LineBasicMaterial;
      particleMat: THREE.PointsMaterial;
    }

    const objects: SectionObject[] = [];

    for (let i = 0; i < sectionCount; i++) {
      const group = new THREE.Group();
      const color = SECTION_COLORS[i] || SECTION_COLORS[0];
      const geo = createGeometry(i);

      // Solid glass mesh
      const solidMat = new THREE.MeshPhysicalMaterial({
        color,
        transparent: true,
        opacity: 0.07,
        roughness: 0.15,
        metalness: 0.9,
        side: THREE.DoubleSide,
      });
      group.add(new THREE.Mesh(geo, solidMat));

      // Primary wireframe
      const edges = new THREE.EdgesGeometry(geo, 15);
      const wireMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
      });
      group.add(new THREE.LineSegments(edges, wireMat));

      // Glow wireframe (slightly larger, soft)
      const glowMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.12,
      });
      const glowWire = new THREE.LineSegments(edges, glowMat);
      glowWire.scale.setScalar(1.04);
      group.add(glowWire);

      // Orbiting particles
      const pCount = 120;
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(pCount * 3);
      for (let j = 0; j < pCount; j++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.2 + Math.random() * 1.3;
        positions[j * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = r * Math.cos(phi);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color,
        size: 0.018,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
      group.add(new THREE.Points(pGeo, particleMat));

      group.scale.setScalar(0.001);
      scene.add(group);

      objects.push({ group, solidMat, wireMat, glowMat, particleMat });
    }

    // ── Animation state ──
    const currentVis = new Float32Array(sectionCount).fill(0);
    currentVis[0] = 1;

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const scrollY = window.scrollY;
      const wh = window.innerHeight;
      const scrollSection = scrollY / wh;

      // Fade out 3D entirely when past the feature sections
      const globalFade = clamp(1 - (scrollSection - (sectionCount - 0.3)) * 1.5, 0, 1);
      container.style.opacity = String(globalFade);

      // Per-section visibility
      for (let i = 0; i < sectionCount; i++) {
        const distance = Math.abs(scrollSection - i);
        const targetVis = clamp(1 - distance * 1.6, 0, 1);

        // Smooth lerp
        currentVis[i] += (targetVis - currentVis[i]) * 0.06;

        const vis = currentVis[i];
        const eased = smoothstep(0, 1, vis);
        const s = Math.max(eased, 0.001);

        const obj = objects[i];
        obj.group.scale.setScalar(s);

        // Material opacities
        obj.solidMat.opacity = eased * 0.07;
        obj.wireMat.opacity = eased * 0.8;
        obj.glowMat.opacity = eased * 0.12;
        obj.particleMat.opacity = eased * 0.5;

        // Rotation — each object gets unique speed
        obj.group.rotation.x = time * (0.08 + i * 0.03) + i * 1.2;
        obj.group.rotation.y = time * (0.12 + i * 0.02) + i * 0.8;

        // Gentle float
        obj.group.position.y = Math.sin(time * 0.35 + i * 1.5) * 0.18;
      }

      // Interpolate light colors toward active section
      const activeIdx = clamp(Math.round(scrollSection), 0, sectionCount - 1);
      keyLight.color.lerp(SECTION_COLORS[activeIdx], 0.04);

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ──
    const handleResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [sectionCount]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-0 w-[55%] h-screen z-10 pointer-events-none hidden md:block"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
      }}
    />
  );
}
