/**
 * ============================================================
 *  KONFIGURASI MODEL & VARIAN WARNA IPHONE 18 PRO
 * ============================================================
 *  Memetakan 4 file .glb resmi di public/models/ ke varian
 *  warna pada pemilih warna, lengkap dengan material tuning.
 * ============================================================
 */

export const VARIANTS = [
  {
    id: 'burgundy',
    name: 'Cosmic Burgundy',
    modelUrl: '/models/apple_iphone_18_pro_max_burgundy_HD_screen_off.glb',
    screenWallpaperUrl: '/models/iPhone_18_Pro_Screen_Burgundy.jpg',
    screenLight: '#ffffff',
    swatch: '#7c1c2b',
    glow: '#e04868',
    textGradient: 'linear-gradient(90deg, #ff9bb2 0%, #d6335c 45%, #6e0c1f 100%)',
  },
  {
    id: 'glacier',
    name: 'Glacier Blue',
    modelUrl: '/models/iphone_18_pro_max_glacier_HD.glb',
    screenWallpaperUrl: '/models/iPhone_18_Pro_Screen_Glacier.jpg',
    screenLight: '#e4f2ff',
    swatch: '#5a7e9e',
    glow: '#89b6e8',
    textGradient: 'linear-gradient(90deg, #d3e7ff 0%, #76a8db 50%, #2f5480 100%)',
  },
  {
    id: 'silver',
    name: 'Natural Silver',
    modelUrl: '/models/iphone_18_pro_max_silver_HD.glb',
    screenWallpaperUrl: '/models/iPhone_18_Pro_Screen_Silver.jpg',
    screenLight: '#ffffff',
    swatch: '#e4e5e8',
    glow: '#ffffff',
    textGradient: 'linear-gradient(90deg, #ffffff 0%, #e2e3e6 50%, #9e9ea3 100%)',
  },
  {
    id: 'black',
    name: 'Space Black',
    modelUrl: '/models/apple_iphone_18_pro_max_black(2)_HD_screen_off.glb',
    screenWallpaperUrl: '/models/iPhone_18_Pro_Screen_Black.jpg',
    screenLight: '#ffffff',
    swatch: '#222224',
    glow: '#828290',
    textGradient: 'linear-gradient(90deg, #f5f5f7 0%, #909096 50%, #353538 100%)',
  },
];

export const DEFAULT_VARIANT_ID = VARIANTS[0].id;

export function getVariant(id) {
  if (id === 'blue') return VARIANTS.find((v) => v.id === 'glacier');
  return VARIANTS.find((v) => v.id === id) || VARIANTS[0];
}

export const DISPLAY = {
  canvasWidth: 640,
  canvasHeight: 1400,
};

/**
 * Parameter tuning material GLTF agar fotorealistis (Apple look):
 * Meningkatkan pantulan logam & kaca frosted, serta kontras highlight.
 */
export const MODEL_CONFIG = {
  // Faktor skala & offset untuk normalisasi ukuran dan pivot di (0, 0, 0)
  targetHeight: 1.5,
  sourceHeight: 0.163356,
  centerOffset: [ -0.000021, -0.08166, 0.002448 ],

  // Parameter tuning material MeshPhysicalMaterial / MeshStandardMaterial
  materials: {
    backpanel: {
      envMapIntensity: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
    },
    sidePanel: {
      envMapIntensity: 2.5,
      metalness: 1.0,
      roughness: 0.28,
      clearcoat: 0.4,
    },
    camLens: {
      envMapIntensity: 3.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    },
    glass: {
      envMapIntensity: 2.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    },
    appleLogo: {
      envMapIntensity: 3.2,
      metalness: 1.0,
      roughness: 0.12,
    },
    screen: {
      envMapIntensity: 1.0,
      roughness: 0.08,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    },
  },
};
