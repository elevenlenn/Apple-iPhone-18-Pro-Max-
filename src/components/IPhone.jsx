import React, { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { VARIANTS, MODEL_CONFIG, getVariant } from '../config/phoneConfig';

// Preload semua 4 varian model GLB dan tekstur layar agar transisi instan
VARIANTS.forEach((v) => {
  useGLTF.preload(v.modelUrl);
  if (v.screenWallpaperUrl) {
    useTexture.preload(v.screenWallpaperUrl);
  }
});

/**
 * Komponen sub-model untuk satu varian GLB.
 * - Mempertahankan 100% struktur mesh, material, dan layar asli bawaan file GLB
 * - Menampilkan wallpaper Super Retina XDR hidup dengan warna dan cahaya serasi di semua 4 model
 * - Menambahkan 16x Anisotropic Filtering untuk ketajaman tekstur HD 4K
 */
function PhoneGLBInstance({ variant }) {
  const { scene } = useGLTF(variant.modelUrl);
  const screenTexture = useTexture(variant.screenWallpaperUrl);

  useMemo(() => {
    if (screenTexture) {
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      screenTexture.flipY = false;
      screenTexture.anisotropy = 16;
      screenTexture.generateMipmaps = true;
      screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
      screenTexture.magFilter = THREE.LinearFilter;
      screenTexture.needsUpdate = true;
    }
  }, [screenTexture]);

  // Clone scene hanya sekali per varian agar material bersih
  const cloned = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((child) => {
      if (child.isMesh) {
        // Pertahankan visibilitas semua mesh bawaan model asli
        child.visible = true;
        if (child.material) {
          const mat = child.material.clone();
          child.material = mat;

          // HD 4K Anisotropic Filtering pada seluruh tekstur
          ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'envMap', 'emissiveMap'].forEach((texKey) => {
            if (mat[texKey]) {
              mat[texKey].anisotropy = 16;
              mat[texKey].generateMipmaps = true;
              mat[texKey].minFilter = THREE.LinearMipmapLinearFilter;
              mat[texKey].magFilter = THREE.LinearFilter;
              mat[texKey].needsUpdate = true;
            }
          });

          // Apple Pro Studio PBR Material Tuning
          if (child.name.includes('Back_Panel')) {
            // Hilangkan transparansi bawaan GLB agar rangka dalam hitam tidak bocor tembus pandang
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
            mat.roughness = 0.28; // Frosted matte glass back khas Apple
            mat.clearcoat = 0.6;
            mat.clearcoatRoughness = 0.12;
            mat.envMapIntensity = 1.9;
          } else if (child.name.includes('Back_Cam_Base')) {
            // Dudukan modul kamera safir
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
            mat.envMapIntensity = 2.2;
          } else if (
            child.name.includes('Side_Panel') ||
            child.name.includes('Side_Button') ||
            child.name.includes('Back_Cam_Edge') ||
            child.name.includes('USB_Metal')
          ) {
            mat.roughness = 0.22; // Brushed aerospace titanium
            mat.metalness = 0.92;
            mat.envMapIntensity = 2.6;
          } else if (child.name.includes('Back_Logo')) {
            mat.roughness = 0.04; // Mirror-polished Apple emblem
            mat.metalness = 1.0;
            mat.envMapIntensity = 3.8;
          } else if (child.name.includes('Cam_Lens')) {
            mat.roughness = 0.02; // Sapphire crystal camera optics
            mat.envMapIntensity = 3.2;
          } else if (child.name.includes('Glass')) {
            mat.roughness = 0.03;
            mat.envMapIntensity = 2.4;
          } else if (child.name.includes('Front_Screen')) {
            // Tampilan layar Super Retina XDR OLED bercahaya hidup & serasi di semua 4 varian
            if (!mat.map && !mat.emissiveMap && screenTexture) {
              mat.map = screenTexture;
              mat.emissiveMap = screenTexture;
            } else if (screenTexture && !mat.map) {
              mat.map = screenTexture;
            }
            mat.emissive = new THREE.Color(variant.screenLight || '#ffffff');
            mat.emissiveIntensity = 1.35;
            mat.roughness = 0.08;
            mat.metalness = 0.0;
            mat.clearcoat = 1.0;
            mat.clearcoatRoughness = 0.02;
            mat.envMapIntensity = 1.1;
          } else {
            mat.envMapIntensity = 1.8;
          }
        }
      }
    });

    return root;
  }, [scene, variant, screenTexture]);

  return (
    <group>
      {/* 100% Model GLB resmi dengan tuning fotorealistis studio */}
      <primitive object={cloned} />
    </group>
  );
}

/**
 * <IPhone />
 * Komponen iPhone 18 Pro berbasis file .glb resmi murni:
 * - Hanya me-render 1 model varian aktif (tidak ada kamera/objek bertumpuk)
 * - Posisi pivot simetris tepat di tengah (0, 0, 0)
 * - Kualitas dan geometri asli dari file .glb dipertahankan penuh
 */
export const IPhone = forwardRef(function IPhone(
  {
    variantId = 'burgundy',
    ...props
  },
  ref
) {
  const rootRef = useRef();
  useImperativeHandle(ref, () => rootRef.current);

  const activeVariant = useMemo(() => getVariant(variantId), [variantId]);

  // Normalisasi skala & center offset
  const uniformScale = MODEL_CONFIG.targetHeight / MODEL_CONFIG.sourceHeight;
  const [ox, oy, oz] = MODEL_CONFIG.centerOffset;

  return (
    <group ref={rootRef} {...props} dispose={null}>
      {/* Container pivot tengah & orientasi tepat */}
      <group
        scale={[uniformScale, uniformScale, uniformScale]}
        position={[ox * uniformScale, oy * uniformScale, oz * uniformScale]}
      >
        <PhoneGLBInstance
          key={activeVariant.id}
          variant={activeVariant}
        />
      </group>
    </group>
  );
});
export default IPhone;
