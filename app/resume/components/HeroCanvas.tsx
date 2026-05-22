"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Get current dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create Neural Network System
    const particleCount = 80;
    const maxDistance = 25;
    const particlesData: {
      velocity: THREE.Vector3;
      numConnections: number;
    }[] = [];

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Initial positions and random vectors
    const rRange = 60;
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * rRange - rRange / 2;
      const y = Math.random() * rRange - rRange / 2;
      const z = Math.random() * rRange - rRange / 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Velocities
      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 0.12
        ),
        numConnections: 0,
      });
    }

    // Node particle geometry
    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Circle sprite for smooth circular particles
    const createCircleTexture = () => {
      const canvasEl = document.createElement("canvas");
      canvasEl.width = 64;
      canvasEl.height = 64;
      const ctx = canvasEl.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(0, 245, 255, 1)");
        gradient.addColorStop(0.2, "rgba(0, 245, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(79, 70, 229, 0.4)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvasEl);
    };

    // Node particle material
    const pMaterial = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 3.5,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createCircleTexture(),
    });

    const pointCloud = new THREE.Points(pGeometry, pMaterial);
    scene.add(pointCloud);

    // Line segments geometry
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineColors = new Float32Array(particleCount * particleCount * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.35,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 5. Ambient star background (tiny background particles)
    const starCount = 200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.6,
      transparent: true,
      opacity: 0.5,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse movement response
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetMouseX = (x / width - 0.5) * 15;
      targetMouseY = (y / height - 0.5) * 15;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate mouse coordinates for fluid dampening
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Slow orbital drift combined with mouse rotation
      pointCloud.rotation.y = Date.now() * 0.00015 + mouseX * 0.04;
      pointCloud.rotation.x = Date.now() * 0.00008 + mouseY * 0.04;
      linesMesh.rotation.y = pointCloud.rotation.y;
      linesMesh.rotation.x = pointCloud.rotation.x;

      stars.rotation.y = Date.now() * 0.00003;

      // Dynamic positions update for custom drift
      const positionsAttr = pGeometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      let vertexIndex = 0;
      let colorIndex = 0;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        // Drift position by velocity
        let px = posArray[i * 3] + particlesData[i].velocity.x;
        let py = posArray[i * 3 + 1] + particlesData[i].velocity.y;
        let pz = posArray[i * 3 + 2] + particlesData[i].velocity.z;

        // Sphere bounds constraint: reverse velocity if too far
        const distFromCenter = Math.sqrt(px * px + py * py + pz * pz);
        if (distFromCenter > rRange / 2) {
          particlesData[i].velocity.negate();
        }

        posArray[i * 3] = px;
        posArray[i * 3 + 1] = py;
        posArray[i * 3 + 2] = pz;

        particlesData[i].numConnections = 0;
      }

      // Check distances between particles & build connection lines
      for (let i = 0; i < particleCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Add connection points to Lines Geometry
            const lPos = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
            const lPosArray = lPos.array as Float32Array;

            lPosArray[vertexIndex++] = x1;
            lPosArray[vertexIndex++] = y1;
            lPosArray[vertexIndex++] = z1;

            lPosArray[vertexIndex++] = x2;
            lPosArray[vertexIndex++] = y2;
            lPosArray[vertexIndex++] = z2;

            // Fade line color based on proximity
            const alpha = 1.0 - dist / maxDistance;

            const lCol = lineGeometry.getAttribute("color") as THREE.BufferAttribute;
            const lColArray = lCol.array as Float32Array;

            // Color gradient from Cyan to Purple
            lColArray[colorIndex++] = 0.0; // R
            lColArray[colorIndex++] = 0.96; // G (Cyan accent)
            lColArray[colorIndex++] = 1.0; // B
            
            lColArray[colorIndex++] = 0.66; // R
            lColArray[colorIndex++] = 0.33; // G (Purple accent)
            lColArray[colorIndex++] = 0.97; // B

            lineIndex++;
          }
        }
      }

      // Update geometry attributes
      pGeometry.getAttribute("position").needsUpdate = true;
      lineGeometry.getAttribute("position").needsUpdate = true;
      lineGeometry.getAttribute("color").needsUpdate = true;

      // Draw connection lines dynamically
      lineGeometry.setDrawRange(0, lineIndex * 2);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Window resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      pGeometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />
    </div>
  );
}
