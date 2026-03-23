"use client";
import { useEffect, useRef } from "react";
import { codeSymbols } from "@/lib/syntax";
import * as THREE from "three";

export default function MatrixBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, W, 0, -H, -1, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Create canvas texture for each symbol
    const COLS = Math.floor(W / 22);
    const drops: number[] = [];
    const speeds: number[] = [];
    const symbols: string[] = [];

    for (let i = 0; i < COLS; i++) {
      drops[i] = Math.random() * -H;
      speeds[i] = 0.4 + Math.random() * 0.8;
      symbols[i] = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
    }

    // Use 2D canvas as texture
    const canvas2d = document.createElement("canvas");
    canvas2d.width = W;
    canvas2d.height = H;
    const ctx2d = canvas2d.getContext("2d")!;

    const texture = new THREE.CanvasTexture(canvas2d);
    const geo = new THREE.PlaneGeometry(W, H);
    const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(W / 2, -H / 2, 0);
    scene.add(mesh);

    let animId: number;
    const FONT_SIZE = 12;
    const COL_W = 22;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      ctx2d.fillStyle = "rgba(13, 17, 23, 0.08)";
      ctx2d.fillRect(0, 0, W, H);

      ctx2d.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < COLS; i++) {
        const sym = symbols[i];
        const x = i * COL_W;
        const y = drops[i];

        // Bright head
        ctx2d.fillStyle = "rgba(63,185,80,0.18)";
        ctx2d.fillText(sym, x, y);

        drops[i] += speeds[i] * FONT_SIZE;

        // Reset drop
        if (drops[i] > H + 60) {
          drops[i] = Math.random() * -100;
          speeds[i] = 0.4 + Math.random() * 0.8;
          symbols[i] = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        }
      }

      texture.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mat.dispose();
      geo.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
