/**
 * ============================================================
 *  SPECIFICATION & COPY DATA — iPHONE 18 PRO MAX (APPLE STYLE)
 * ============================================================
 *  All product titles, taglines, specs, and pricing are in
 *  authentic Apple keynote English typography and phrasing.
 * ============================================================
 */
export const IS_PLACEHOLDER = true;

export const specs = {
  product: 'iPhone 18 Pro Max',

  hero: {
    title: 'iPhone 18 Pro Max.',
    tagline: 'Pro. Beyond.',
    subheadline: 'Forged in aerospace titanium. Expansive 6.9" Super Retina XDR with tandem OLED. The groundbreaking A20 Pro chip.',
    priceLine: 'From $1,199 or $49.95/mo. for 24 mo.*',
    buy: 'Buy',
    explore: 'Explore design',
    scrollPrompt: 'Scroll to explore',
  },

  design: {
    a: {
      eyebrow: 'Titanium Design',
      title: 'Titanium.\nForged to perfection.',
      body: 'Aerospace-grade titanium frame with precision-refined contoured edges. Lightweight, remarkably durable, and seamlessly unified with the micro-textured matte glass back.',
      stats: [
        { value: '7.9 mm', label: 'thinness*' },
        { value: '221 g', label: 'weight*' },
      ],
    },
    b: {
      eyebrow: 'Precision Control',
      title: 'Action button.\nCamera Control.',
      body: 'Customize the Action button for immediate access to your essential tool. Slide and press Camera Control for optical zoom, exposure depth, and instant capture without ever leaving the frame.',
    },
  },

  display: {
    eyebrow: 'Super Retina XDR Display',
    title: 'Brighter. Sharper.\nPure brilliance.',
    left: [
      { value: '120Hz', label: 'ProMotion adaptive refresh 1–120Hz*' },
      { value: '3,000 nits', label: 'Peak outdoor brightness*' },
    ],
    right: [
      { value: 'Always-On', label: 'Power-efficient ambient glance*' },
      { value: '6.9"', label: 'All-screen OLED with narrowest borders*' },
    ],
  },

  camera: {
    eyebrow: 'Pro Camera System',
    title: 'Three lenses.\nAll 48MP.',
    body: 'Remarkable clarity at every focal length. From ultra-detailed macro photography to 5x tetraprism optical telephoto, powered by next-generation Photonic Engine processing.',
    cards: [
      { value: '48MP', label: 'Fusion Camera', detail: '24 mm · ƒ/1.78 · 2nd-gen Sensor-shift OIS*' },
      { value: '48MP', label: 'Ultra Wide', detail: '13 mm · 120° field of view · 2 cm macro*' },
      { value: '5x', label: 'Telephoto', detail: '48MP · 120 mm equivalent · 40x digital zoom*' },
      { value: '8K', label: 'ProRes Video', detail: '8K at 30 fps · 4K 120 fps Dolby Vision HDR*' },
    ],
  },

  chip: {
    eyebrow: 'A20 Pro Silicon',
    title: 'Mind-blowing speed.\nEffortless cool.',
    body: 'Engineered on next-gen 2-nanometer architecture. 6-core GPU with hardware-accelerated ray tracing and a 16-core Neural Engine designed for on-device Apple Intelligence.*',
    rings: [
      { label: 'CPU Performance', value: 25, prefix: '+', suffix: '%', fill: 0.65, colors: ['#7ab8ff', '#2f6bff'] },
      { label: 'GPU Graphics', value: 35, prefix: '+', suffix: '%', fill: 0.78, colors: ['#d4a2ff', '#7a3dff'] },
      { label: 'Neural Engine', value: 40, prefix: '+', suffix: '%', fill: 0.88, colors: ['#ffc29a', '#ff4d2e'] },
    ],
    ringsCaption: 'Faster computing power compared to previous generation*',
    battery: {
      value: 35,
      suffix: ' hrs',
      label: 'Video playback*',
      fill: 0.95,
      note: 'Fast-charge up to 50% in approximately 20 minutes*',
    },
  },

  intelligence: {
    eyebrow: 'Apple Intelligence',
    title: 'AI built for you.\nPrivate by design.',
    body: 'Deeply integrated into iOS 19. Apple Intelligence helps you write, express yourself, and accomplish everyday tasks effortlessly — with groundbreaking Private Cloud Compute protecting your personal data.',
    features: [
      { title: 'Writing Tools', desc: 'Proofread, summarize, and rewrite text everywhere you write.' },
      { title: 'Visual Intelligence', desc: 'Click Camera Control to instantly learn about places and objects around you.' },
      { title: 'Genmoji & Image Wand', desc: 'Create entirely custom expressive emojis on the fly with text prompts.' },
      { title: 'Siri Reimagined', desc: 'Richer language comprehension, onscreen awareness, and deep personal context.' },
    ],
  },

  colors: {
    eyebrow: 'Finishes',
    title: 'Choose your titanium.',
    hint: 'Drag to inspect rear camera and chassis',
  },

  cta: {
    title: 'iPhone 18 Pro Max.',
    subtitle: 'Pro. Beyond.',
    price: 'From $1,199 or $49.95/mo. for 24 mo.*',
    buy: 'Buy',
    learn: 'Back to top',
    toast: 'This is a conceptual demo — online checkout is disabled.',
  },

  footnotes: [
    '* All specifications, benchmark metrics, color names, and pricing on this page are creative conceptual placeholders for demonstration purposes.',
    '3D models rendered in real-time WebGL. Product visualization concept does not represent official announcements.',
    'Note: Concept demo website. Not affiliated with or endorsed by Apple Inc.',
  ],
};
