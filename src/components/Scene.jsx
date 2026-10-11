import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Lightformer,
  Environment,
  ContactShadows,
  useProgress,
} from '@react-three/drei';
import { IPhone } from './IPhone';
import { useStore, frameState } from '../state/store';
import { samplePose, createPose } from '../config/scrollPoses';

function RenderReadyNotifier({ onReady }) {
  const renderedOnce = useRef(false);
  const { progress } = useProgress();

  useFrame(() => {
    if (!renderedOnce.current && progress >= 100) {
      renderedOnce.current = true;
      if (onReady) onReady();
    }
  });

  return null;
}

function SceneRig({ variantId }) {
  const phoneGroupRef = useRef();
  const phoneModelRef = useRef();
  const { camera, size, gl } = useThree();

  const activeSection = useStore((s) => s.active);
  const isPortrait = size.width < 768;

  // Active in Colors section (Section 6)
  const isColorSection = activeSection === 6;

  // Drag interaction state for iPhone model
  const dragRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    targetRotY: 0,
    targetRotX: 0,
    currentRotY: 0,
    currentRotX: 0,
  });

  // Handle pointer drag rotation in Colors section
  React.useEffect(() => {
    if (!isColorSection) {
      document.body.style.cursor = '';
      return;
    }

    document.body.style.cursor = 'grab';

    const handlePointerDown = (e) => {
      // Don't intercept button or link clicks (e.g., color swatches)
      if (e.target && e.target.closest('button, a, input')) return;
      if (e.button !== undefined && e.button !== 0) return; // Only left-click

      dragRef.current.isDragging = true;
      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e) => {
      if (!dragRef.current.isDragging) return;

      const deltaX = e.clientX - dragRef.current.prevX;
      const deltaY = e.clientY - dragRef.current.prevY;
      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;

      // Sensitivity factor
      dragRef.current.targetRotY += deltaX * 0.009;
      dragRef.current.targetRotX = Math.max(
        -0.45,
        Math.min(0.45, dragRef.current.targetRotX + deltaY * 0.006)
      );
    };

    const handlePointerUp = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        document.body.style.cursor = isColorSection ? 'grab' : '';
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.body.style.cursor = '';
    };
  }, [isColorSection]);

  const poseBuf = useMemo(() => createPose(), []);

  useFrame((_, delta) => {
    let continuousPos = 0;
    for (let i = 0; i < 8; i++) {
      continuousPos += frameState.progress[i];
    }

    samplePose(continuousPos, isPortrait, poseBuf);

    const lerpRate = Math.min(delta * 4.5, 1);
    const tiltX = frameState.mouse.x * 0.08;
    const tiltY = frameState.mouse.y * 0.08;

    if (phoneGroupRef.current) {
      phoneGroupRef.current.position.x = THREE.MathUtils.lerp(
        phoneGroupRef.current.position.x,
        poseBuf.px,
        lerpRate
      );
      phoneGroupRef.current.position.y = THREE.MathUtils.lerp(
        phoneGroupRef.current.position.y,
        poseBuf.py,
        lerpRate
      );
      phoneGroupRef.current.position.z = THREE.MathUtils.lerp(
        phoneGroupRef.current.position.z,
        poseBuf.pz,
        lerpRate
      );

      if (isColorSection) {
        // Smoothly interpolate user drag rotation with natural damping
        const dragLerp = Math.min(delta * 9, 1);
        dragRef.current.currentRotY = THREE.MathUtils.lerp(
          dragRef.current.currentRotY,
          dragRef.current.targetRotY,
          dragLerp
        );
        dragRef.current.currentRotX = THREE.MathUtils.lerp(
          dragRef.current.currentRotX,
          dragRef.current.targetRotX,
          dragLerp
        );

        phoneGroupRef.current.rotation.x = poseBuf.rx + dragRef.current.currentRotX + tiltY * 0.4;
        phoneGroupRef.current.rotation.y = poseBuf.ry + dragRef.current.currentRotY + tiltX * 0.4;
        phoneGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          phoneGroupRef.current.rotation.z,
          poseBuf.rz,
          lerpRate
        );
      } else {
        // Return drag offsets back to neutral when leaving Colors section
        const resetRate = Math.min(delta * 3.5, 1);
        dragRef.current.targetRotY = THREE.MathUtils.lerp(dragRef.current.targetRotY, 0, resetRate);
        dragRef.current.targetRotX = THREE.MathUtils.lerp(dragRef.current.targetRotX, 0, resetRate);
        dragRef.current.currentRotY = THREE.MathUtils.lerp(dragRef.current.currentRotY, 0, resetRate);
        dragRef.current.currentRotX = THREE.MathUtils.lerp(dragRef.current.currentRotX, 0, resetRate);

        phoneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          phoneGroupRef.current.rotation.x,
          poseBuf.rx + tiltY,
          lerpRate
        );
        phoneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          phoneGroupRef.current.rotation.y,
          poseBuf.ry + tiltX,
          lerpRate
        );
        phoneGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          phoneGroupRef.current.rotation.z,
          poseBuf.rz,
          lerpRate
        );
      }
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, poseBuf.cx, lerpRate);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, poseBuf.cy, lerpRate);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, poseBuf.cz, lerpRate);

    camera.lookAt(poseBuf.tx, poseBuf.ty, 0);
  });

  return (
    <>
      {/* Studio Lighting Apple Keynote Style (Balanced Neutral Studio Contrast) */}
      <ambientLight intensity={0.42} color="#f0f2f5" />

      {/* Main Front Key Light */}
      <directionalLight
        position={[3.5, 5.5, 4]}
        intensity={1.8}
        color="#ffffff"
      />

      {/* Front Fill Light (Cool Neutral Fill) */}
      <directionalLight
        position={[-4.5, 2.5, 2]}
        intensity={0.85}
        color="#d2daf0"
      />

      {/* Dedicated Rear Key Light — Clear studio illumination without blown highlights */}
      <directionalLight
        position={[2.5, 4.5, -4.5]}
        intensity={isColorSection ? 2.2 : 1.4}
        color="#ffffff"
      />

      {/* Rear Fill Light — Soft wrap-around lighting */}
      <directionalLight
        position={[-3.5, 2.5, -4]}
        intensity={isColorSection ? 1.6 : 0.9}
        color="#eef2f8"
      />

      {/* Rim / Kicker Backlight (Sharp Titanium Edge Highlights) */}
      <directionalLight
        position={[0, -2.5, -3.5]}
        intensity={1.4}
        color="#ffffff"
      />

      {/* Bottom Ground Bounce Light */}
      <directionalLight
        position={[0, -4, 2.5]}
        intensity={0.5}
        color="#edf2f7"
      />

      {/* Studio Softboxes untuk pantulan titanium dan kaca di latar studio abu-abu — HD 512 resolution */}
      <Environment resolution={512}>
        {/* Overhead ceiling softbox */}
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[0, 6, -1]}
          scale={[10, 5, 1]}
          target={[0, 0, 0]}
        />
        {/* Left vertical reflection strip */}
        <Lightformer
          form="rect"
          intensity={2.6}
          position={[-4.5, 0.5, 2]}
          scale={[0.8, 9, 1]}
          color="#ffffff"
          target={[0, 0, 0]}
        />
        {/* Right vertical reflection strip */}
        <Lightformer
          form="rect"
          intensity={2.8}
          position={[4.5, 1.5, 2]}
          scale={[0.8, 9, 1]}
          color="#ffffff"
          target={[0, 0, 0]}
        />
        {/* Rear Studio Softbox for bright, vivid color inspection */}
        <Lightformer
          form="rect"
          intensity={isColorSection ? 2.4 : 1.3}
          position={[0, 3, -4.5]}
          scale={[6, 7, 1]}
          color="#ffffff"
          target={[0, 0, 0]}
        />
        {/* Bottom subtle ground fill */}
        <Lightformer
          form="rect"
          intensity={1.0}
          position={[0, -4, 2]}
          scale={[8, 2, 1]}
          color="#ffffff"
          target={[0, 0, 0]}
        />
      </Environment>

      {/* Bayangan presisi 1024 HD di bawah ponsel di lantai studio abu-abu netral */}
      <ContactShadows
        position={[0, -1.18, 0]}
        opacity={0.65}
        scale={6.2}
        blur={1.6}
        far={3.2}
        resolution={1024}
        color="#050508"
      />

      <group ref={phoneGroupRef}>
        <IPhone
          ref={phoneModelRef}
          variantId={variantId}
        />
      </group>
    </>
  );
}

export function Scene({ onLoaded }) {
  const variantId = useStore((s) => s.variant);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          alpha: true,
        }}
        camera={{ position: [0, 0, 6.4], fov: 32 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 2, 2.5)]}
        className="w-full h-full pointer-events-auto"
      >
        <SceneRig variantId={variantId} />
        <RenderReadyNotifier onReady={onLoaded} />
      </Canvas>
    </div>
  );
}
export default Scene;
