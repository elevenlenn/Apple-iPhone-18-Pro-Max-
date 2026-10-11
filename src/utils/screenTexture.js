import * as THREE from 'three';
import { DISPLAY } from '../config/phoneConfig';

/**
 * Polyfill helper untuk menggambar rounded rectangle pada Canvas2D
 * yang kompatibel dengan semua browser / versi WebView.
 */
function drawRoundRect(ctx, x, y, width, height, radius) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  let r = typeof radius === 'number' ? radius : (Array.isArray(radius) ? radius[0] : 0);
  if (width < 2 * r) r = width / 2;
  if (height < 2 * r) r = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

/**
 * Membuat CanvasTexture yang realistis untuk wallpaper & layar iPhone:
 * Termasuk Dynamic Island, jam besar khas Apple (SF-style lock screen), widget, dan status bar.
 */
export function createScreenTexture(variant) {
  const canvas = document.createElement('canvas');
  canvas.width = DISPLAY.canvasWidth;
  canvas.height = DISPLAY.canvasHeight;
  const ctx = canvas.getContext('2d');

  function render(v) {
    const w = canvas.width;
    const h = canvas.height;

    // Background gradient mewah sesuai varian warna
    const grad = ctx.createLinearGradient(0, 0, w, h);
    if (v.id === 'burgundy') {
      grad.addColorStop(0, '#120206');
      grad.addColorStop(0.35, '#3a0815');
      grad.addColorStop(0.7, '#8f1734');
      grad.addColorStop(1, '#db325b');
    } else if (v.id === 'glacier') {
      grad.addColorStop(0, '#040d1a');
      grad.addColorStop(0.4, '#122c4d');
      grad.addColorStop(0.75, '#376899');
      grad.addColorStop(1, '#78aedf');
    } else if (v.id === 'silver') {
      grad.addColorStop(0, '#0d0d10');
      grad.addColorStop(0.45, '#28292e');
      grad.addColorStop(0.8, '#585a63');
      grad.addColorStop(1, '#d8d9e2');
    } else {
      // Space Black
      grad.addColorStop(0, '#000000');
      grad.addColorStop(0.4, '#0c0c0e');
      grad.addColorStop(0.7, '#242429');
      grad.addColorStop(1, '#4c4c54');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Glowing modern dynamic bloom orb di tengah layar
    const orb = ctx.createRadialGradient(w * 0.5, h * 0.58, 20, w * 0.5, h * 0.58, 420);
    orb.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    orb.addColorStop(0.35, 'rgba(255, 255, 255, 0.15)');
    orb.addColorStop(0.8, 'rgba(255, 255, 255, 0.02)');
    orb.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = orb;
    ctx.fillRect(0, 0, w, h);

    // Status bar (Jam kecil, Sinyal, Baterai, 5G)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('09:41', 54, 86);

    // Ikon status kanan (5G, WiFi, Battery)
    ctx.textAlign = 'right';
    ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    ctx.fillText('5G', w - 140, 86);
    
    // Battery pill
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3;
    drawRoundRect(ctx, w - 110, 62, 54, 28, 7);
    ctx.stroke();

    ctx.fillStyle = '#34c759'; // Full green
    drawRoundRect(ctx, w - 107, 65, 48, 22, 5);
    ctx.fill();

    // Tanggal Lockscreen
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '500 36px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Minggu, 11 Oktober', w * 0.5, 270);

    // Jam Besar khas iOS (Lockscreen typography)
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 178px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    ctx.letterSpacing = '-4px';
    ctx.fillText('09:41', w * 0.5, 430);

    // Widget Lockscreen Baris
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '500 30px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    ctx.fillText('⚡ Baterai 100%   ·   ☀️ 28° Cerah   ·   🪐 A20 Pro', w * 0.5, 510);

    // Dynamic Island Glow / Notification preview halus
    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    drawRoundRect(ctx, w * 0.5 - 150, 48, 300, 56, 28);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    drawRoundRect(ctx, w * 0.5 - 150, 48, 300, 56, 28);
    ctx.stroke();

    // Kamera selfie & FaceID sensors di Dynamic Island
    ctx.fillStyle = '#060a12';
    ctx.beginPath();
    ctx.arc(w * 0.5 + 85, 76, 12, 0, Math.PI * 2);
    ctx.fill();

    // Home bar pill di bawah
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    drawRoundRect(ctx, w * 0.5 - 120, h - 34, 240, 10, 5);
    ctx.fill();

    // Pintasan senter & kamera di bawah
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.beginPath();
    ctx.arc(90, h - 110, 36, 0, Math.PI * 2);
    ctx.arc(w - 90, h - 110, 36, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '34px sans-serif';
    ctx.fillText('🔦', 90, h - 98);
    ctx.fillText('📷', w - 90, h - 98);
  }

  render(variant);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return {
    texture,
    update: (newVariant) => {
      render(newVariant);
      texture.needsUpdate = true;
    },
    dispose: () => {
      texture.dispose();
    },
  };
}
