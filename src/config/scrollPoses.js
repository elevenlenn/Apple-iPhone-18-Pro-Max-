/**
 * Pose kamera & ponsel yang terikat progres scroll (8 Sections).
 * `at` = indeks section + progres section (0..8).
 * Pada Section Colors (at: 6), ponsel berputar menghadap BELAKANG (ry = PI)
 * agar kamera belakang & frosted titanium panel terlihat jelas.
 */
const PI = Math.PI;

export const POSE_KEYS = ['px', 'py', 'pz', 'rx', 'ry', 'rz', 'cx', 'cy', 'cz', 'tx', 'ty', 'screen', 'glow', 'shadow'];

const KEYFRAMES = [
  // 0 — Hero: Ponsel miring elegan menghadap depan
  { at: 0, px: 0, py: -0.32, pz: 0, rx: 0.1, ry: -0.4, rz: 0.05, cx: 0, cy: 0, cz: 6.4, tx: 0, ty: 0, screen: 1, glow: 1, shadow: 1, mobile: { cz: 7.2 } },
  { at: 0.85, py: -0.15, ry: -0.15, rx: 0.05, cz: 5.8, mobile: { cz: 6.8 } },

  // 1 — Design: Rotasi samping melihat chamfer titanium & buttons
  { at: 1.15, px: 0.52, py: 0, rx: 0.12, ry: 0.5 * PI - 0.25, rz: -0.15, cz: 3.4, screen: 0, shadow: 0.4, mobile: { px: 0, py: -0.1, cz: 4.8 } },
  { at: 1.5, px: 0, ry: 0.5 * PI, rz: 0, rx: 0.02 },
  { at: 1.85, px: -0.52, ry: -0.5 * PI + 0.25, rz: 0.15, rx: 0.12, mobile: { px: 0 } },

  // 2 — Display: Ponsel menghadap lurus ke depan, layar menyala terang
  { at: 2.15, px: 0, py: 0, rx: 0, ry: 0, rz: 0, cz: 4.8, screen: 1, shadow: 0.6, mobile: { cz: 6.2, py: 0 } },
  { at: 2.5, screen: 1, glow: 1.2 },
  { at: 2.85, cz: 4.2, mobile: { cz: 5.8 } },

  // 3 — Camera: Kamera mendekat ke modul 3 lensa belakang
  { at: 3.15, px: 0.35, py: -0.38, rx: -0.08, ry: PI - 0.22, rz: 0, cx: -0.08, cy: 0.12, cz: 2.1, tx: -0.08, ty: 0.12, screen: 0, shadow: 0, mobile: { px: 0, cx: -0.12, cy: -0.05, tx: -0.12, ty: -0.05, cz: 2.7 } },
  { at: 3.85, ry: PI + 0.15, rx: -0.04, cz: 1.85, cx: -0.05, tx: -0.05, mobile: { cz: 2.5, cx: -0.12, tx: -0.12 } },

  // 4 — Chip & Performance: Ponsel menjauh sedikit dengan sudut dinamis
  { at: 4.15, px: 1.0, py: 0, rx: 0.08, ry: 2 * PI - 0.35, rz: 0, cx: 0, cy: 0, cz: 6.6, tx: 0, ty: 0, screen: 1, shadow: 0.5, mobile: { px: 0, py: -3.2, cz: 7.8 } },
  { at: 4.85, ry: 2 * PI },

  // 5 — Apple Intelligence: Ponsel di tengah, tilt halus, layar bercahaya
  { at: 5.15, px: -0.85, py: 0, rx: 0.05, ry: -0.35, rz: -0.04, cx: 0, cy: 0, cz: 5.8, tx: 0, ty: 0, screen: 1, glow: 1.4, shadow: 0.6, mobile: { px: 0, py: -3.0, cz: 7.2 } },
  { at: 5.85, ry: 0.1 },

  // 6 — Colors (FINISHES): Ponsel MENGHADAP BELAKANG (ry = PI) agar warna & kamera belakang terlihat jelas!
  { at: 6.15, px: 0, py: 0.08, rx: 0.05, ry: PI, rz: 0, cx: 0, cy: 0, cz: 4.6, tx: 0, ty: 0, screen: 0, shadow: 0.8, glow: 0.2, mobile: { py: 0.15, cz: 6.2 } },
  { at: 6.85, ry: PI },

  // 7 — CTA: Kembali ke depan dengan rotasi megah
  { at: 7.15, px: 0, py: -0.32, rx: 0.04, ry: 2 * PI, rz: 0, cz: 5.4, screen: 1, glow: 0.8, mobile: { py: -0.42, cz: 7.2 } },
  { at: 8.0, glow: 1.0 },
];

function resolve(portrait) {
  const out = [];
  let prev = {};
  for (const kf of KEYFRAMES) {
    const { at, mobile, ...rest } = kf;
    const pose = { ...prev, ...rest, ...(portrait && mobile ? mobile : {}) };
    out.push({ at, pose });
    prev = pose;
  }
  return out;
}

const DESKTOP = resolve(false);
const PORTRAIT = resolve(true);

export function createPose() {
  const p = {};
  for (const k of POSE_KEYS) p[k] = 0;
  return p;
}

const smooth = (t) => t * t * (3 - 2 * t);

export function samplePose(pos, portrait, out) {
  const keys = portrait ? PORTRAIT : DESKTOP;
  const last = keys.length - 1;
  let a = keys[0];
  let b = keys[0];
  if (pos <= keys[0].at) {
    a = b = keys[0];
  } else if (pos >= keys[last].at) {
    a = b = keys[last];
  } else {
    for (let i = 0; i < last; i++) {
      if (pos >= keys[i].at && pos <= keys[i + 1].at) {
        a = keys[i];
        b = keys[i + 1];
        break;
      }
    }
  }
  const span = b.at - a.at;
  const t = span > 0 ? smooth((pos - a.at) / span) : 0;
  for (let i = 0; i < POSE_KEYS.length; i++) {
    const k = POSE_KEYS[i];
    out[k] = a.pose[k] + (b.pose[k] - a.pose[k]) * t;
  }
  return out;
}
