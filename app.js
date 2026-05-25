// MediaPipe Tasks Vision — face landmarker для авто-подгонки причёски под лицо.
// Загружается с CDN. Первая инициализация подтягивает ~5–10 МБ WASM + модель.
import {
  FaceLandmarker,
  FilesetResolver,
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/vision_bundle.mjs';

const $ = (id) => document.getElementById(id);

const fileInput = $('fileInput');
const photo = $('photo');
const placeholder = $('placeholder');
const stage = $('stage');
const hairLayer = $('hairLayer');
const hairBase = $('hairBase');
const hairShadow = $('hairShadow');
const hairLight = $('hairLight');
const hairHandle = $('hairHandle');
const stylesGrid = $('styles');
const statusEl = $('status');

const scaleEl = $('scale');
const rotateEl = $('rotate');
const offsetXEl = $('offsetX');
const offsetYEl = $('offsetY');
const colorEl = $('color');
const opacityEl = $('opacity');
const shadowEl = $('shadowAmt');
const lightEl = $('lightAmt');
const grainEl = $('grainAmt');

const resetBtn = $('resetBtn');
const autoFitBtn = $('autoFitBtn');
const downloadBtn = $('downloadBtn');

const state = {
  currentStyleId: null,
  photoDataUrl: null,
  photoNatural: { w: 0, h: 0 },
  cx: 50, cy: 30,
  baseSize: 60,
  scale: 1,
  rotate: 0,
  color: '#3a2418',
  opacity: 1,
  shadow: 0.55,
  light: 0.45,
  grain: 0.4,
  face: null,
};

let landmarker = null;
const landmarkerReady = (async () => {
  try {
    setStatus('Загрузка модели распознавания…');
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm'
    );
    landmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      },
      runningMode: 'IMAGE',
      numFaces: 1,
    });
    setStatus('');
  } catch (e) {
    console.warn('MediaPipe init failed:', e);
    setStatus('Авто-подгонка недоступна — настройте вручную', 3000);
  }
})();

function setStatus(text, hideAfterMs = 0) {
  statusEl.textContent = text;
  statusEl.classList.toggle('show', !!text);
  if (hideAfterMs > 0) {
    setTimeout(() => { statusEl.classList.remove('show'); }, hideAfterMs);
  }
}

function renderStyleCards() {
  stylesGrid.innerHTML = '';
  HAIRSTYLES.forEach((style) => {
    const card = document.createElement('div');
    card.className = 'style-card';
    card.dataset.id = style.id;
    card.innerHTML = style.svg + `<span>${style.name}</span>`;
    card.style.color = state.color;
    card.addEventListener('click', () => selectStyle(style.id));
    stylesGrid.appendChild(card);
  });
}

function selectStyle(id) {
  state.currentStyleId = id;
  const style = HAIRSTYLES.find((s) => s.id === id);
  if (!style) return;
  hairLayer.hidden = false;
  hairBase.innerHTML = style.svg;
  hairShadow.innerHTML = style.svg;
  hairLight.innerHTML = style.svg;
  document.querySelectorAll('.style-card').forEach((c) => {
    c.classList.toggle('active', c.dataset.id === id);
  });
  if (state.face) autoFit();
  applyTransform();
}

function applyTransform() {
  if (hairLayer.hidden) return;
  const rect = stage.getBoundingClientRect();
  const minSide = Math.min(rect.width, rect.height);
  const size = (state.baseSize / 100) * minSide * state.scale;
  hairLayer.style.width = size + 'px';
  hairLayer.style.height = size + 'px';
  hairLayer.style.left = state.cx + '%';
  hairLayer.style.top = state.cy + '%';
  hairLayer.style.transform = `translate(-50%, -50%) rotate(${state.rotate}deg)`;
  hairLayer.style.opacity = state.opacity;
  hairLayer.style.color = state.color;
  hairShadow.style.opacity = state.shadow;
  hairLight.style.opacity = state.light;

  const grainScale = (state.grain * 6).toFixed(2);
  hairBase.querySelectorAll('svg').forEach((svg) => {
    svg.style.filter = state.grain > 0 ? `url(#hair-grain)` : 'none';
  });
  hairShadow.querySelectorAll('svg').forEach((svg) => {
    svg.style.filter = `url(#hair-grain-soft) brightness(0.35) saturate(1.4) contrast(1.1)`;
  });
  const fdm = document.querySelector('#hair-grain feDisplacementMap');
  if (fdm) fdm.setAttribute('scale', grainScale);
}

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    state.photoDataUrl = reader.result;
    photo.src = reader.result;
    placeholder.hidden = true;
    await new Promise((res) => (photo.complete ? res() : photo.addEventListener('load', res, { once: true })));
    state.photoNatural = { w: photo.naturalWidth, h: photo.naturalHeight };
    await detectFace();
    if (state.currentStyleId) autoFit();
  };
  reader.readAsDataURL(file);
});

async function detectFace() {
  await landmarkerReady;
  if (!landmarker || !photo.src) {
    state.face = null;
    return;
  }
  try {
setStatus('Поиск лица…');
    const off = document.createElement('canvas');
    off.width = state.photoNatural.w;
    off.height = state.photoNatural.h;
    off.getContext('2d').drawImage(photo, 0, 0);
    const result = landmarker.detect(off);
    if (result.faceLandmarks && result.faceLandmarks.length) {
      const lm = result.faceLandmarks[0];
      const left = lm[234];
      const right = lm[454];
      const chin = lm[152];
      const forehead = lm[10];
      const nose = lm[1];
      state.face = {
        left, right, chin, forehead, nose,
        cx: (left.x + right.x) / 2,
        cy: (forehead.y + chin.y) / 2,
        width: Math.hypot(right.x - left.x, right.y - left.y),
        height: Math.hypot(chin.x - forehead.x, chin.y - forehead.y),
        roll: Math.atan2(right.y - left.y, right.x - left.x),
      };
      setStatus('Лицо найдено — подгоняю причёску', 1500);
    } else {
      state.face = null;
      setStatus('Лицо не найдено — настройте вручную', 2500);
    }
  } catch (e) {
    console.warn('Detection error', e);
    state.face = null;
  }
}

function autoFit() {
  if (!state.face || !state.currentStyleId) return;
  const style = HAIRSTYLES.find((s) => s.id === state.currentStyleId);
  if (!style) return;
  const stageRect = stage.getBoundingClientRect();
  const fit = fitContain(
    state.photoNatural.w,
    state.photoNatural.h,
    stageRect.width,
    stageRect.height
  );
  const f = state.face;

  const faceCxPx = fit.x + f.cx * fit.w;
  const foreheadPy = fit.y + f.forehead.y * fit.h;
  const faceWidthPx = f.width * fit.w;
  const faceHeightPx = f.height * fit.h;

  const a = style.anchor;
  const desiredHeadPx = faceWidthPx * 1.35;
  const desiredSvgWidthPx = desiredHeadPx * (200 / a.headWidth);

  const minSide = Math.min(stageRect.width, stageRect.height);
  const baseSizePx = (state.baseSize / 100) * minSide;
  state.scale = Math.max(0.3, Math.min(3, desiredSvgWidthPx / baseSizePx));

  const svgScale = desiredSvgWidthPx / 200;
  const dyFromTopToCenter = (100 - a.topY) * svgScale;

  const hairTopY = foreheadPy - faceHeightPx * 0.15;
  const centerYPx = hairTopY + dyFromTopToCenter;

  state.cx = Math.max(0, Math.min(100, (faceCxPx / stageRect.width) * 100));
  state.cy = Math.max(0, Math.min(100, (centerYPx / stageRect.height) * 100));
  state.rotate = (f.roll * 180) / Math.PI;

  scaleEl.value = state.scale * 100;
  rotateEl.value = state.rotate;
  offsetXEl.value = (state.cx - 50) * 8;
  offsetYEl.value = (state.cy - 30) * 8;

  applyTransform();
}

scaleEl.addEventListener('input', () => { state.scale = scaleEl.value / 100; applyTransform(); });
rotateEl.addEventListener('input', () => { state.rotate = +rotateEl.value; applyTransform(); });
offsetXEl.addEventListener('input', () => { state.cx = 50 + (+offsetXEl.value / 8); applyTransform(); });
offsetYEl.addEventListener('input', () => { state.cy = 30 + (+offsetYEl.value / 8); applyTransform(); });
opacityEl.addEventListener('input', () => { state.opacity = opacityEl.value / 100; applyTransform(); });
shadowEl.addEventListener('input', () => { state.shadow = shadowEl.value / 100; applyTransform(); });
lightEl.addEventListener('input', () => { state.light = lightEl.value / 100; applyTransform(); });
grainEl.addEventListener('input', () => { state.grain = grainEl.value / 100; applyTransform(); });
colorEl.addEventListener('input', () => {
  state.color = colorEl.value;
  hairLayer.style.color = state.color;
  document.querySelectorAll('.style-card').forEach((c) => { c.style.color = state.color; });
});

let dragging = null;
hairLayer.addEventListener('pointerdown', (e) => {
  if (e.target === hairHandle) return;
  hairLayer.setPointerCapture(e.pointerId);
  dragging = { type: 'move', startX: e.clientX, startY: e.clientY, cx: state.cx, cy: state.cy };
});
hairLayer.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const rect = stage.getBoundingClientRect();
  if (dragging.type === 'move') {
    const dx = ((e.clientX - dragging.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragging.startY) / rect.height) * 100;
    state.cx = Math.max(0, Math.min(100, dragging.cx + dx));
    state.cy = Math.max(0, Math.min(100, dragging.cy + dy));
    offsetXEl.value = (state.cx - 50) * 8;
    offsetYEl.value = (state.cy - 30) * 8;
    applyTransform();
  } else if (dragging.type === 'resize') {
    const dx = e.clientX - dragging.startX;
    state.scale = Math.max(0.2, Math.min(3, dragging.scale * (1 + dx / 100)));
    scaleEl.value = state.scale * 100;
    applyTransform();
  }
});
hairLayer.addEventListener('pointerup', () => { dragging = null; });
hairLayer.addEventListener('pointercancel', () => { dragging = null; });

hairHandle.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  hairHandle.setPointerCapture(e.pointerId);
  dragging = { type: 'resize', startX: e.clientX, scale: state.scale };
});
hairHandle.addEventListener('pointermove', (e) => {
  if (!dragging || dragging.type !== 'resize') return;
  const dx = e.clientX - dragging.startX;
  state.scale = Math.max(0.2, Math.min(3, dragging.scale * (1 + dx / 100)));
  scaleEl.value = state.scale * 100;
  applyTransform();
});
hairHandle.addEventListener('pointerup', () => { dragging = null; });

autoFitBtn.addEventListener('click', autoFit);
resetBtn.addEventListener('click', () => {
  hairLayer.hidden = true;
  state.currentStyleId = null;
  document.querySelectorAll('.style-card').forEach((c) => c.classList.remove('active'));
  state.scale = 1; state.rotate = 0; state.cx = 50; state.cy = 30; state.opacity = 1;
  scaleEl.value = 100; rotateEl.value = 0; offsetXEl.value = 0; offsetYEl.value = 0; opacityEl.value = 100;
});

window.addEventListener('resize', () => {
  applyTransform();
  if (state.face && state.currentStyleId) autoFit();
});

downloadBtn.addEventListener('click', async () => {
  if (!state.photoDataUrl) { alert('Сначала загрузите фото.'); return; }
  if (!state.currentStyleId) {
    const link = Object.assign(document.createElement('a'), { download: 'photo.png', href: state.photoDataUrl });
    link.click();
    return;
  }
  setStatus('Сохраняю…');
  try {
    const blob = await renderComposite();
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { download: 'hairstyle.png', href: url });
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } finally {
    statusEl.classList.remove('show');
  }
});

async function renderComposite() {
  const img = await loadImage(state.photoDataUrl);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const stageRect = stage.getBoundingClientRect();
  const fit = fitContain(img.naturalWidth, img.naturalHeight, stageRect.width, stageRect.height);
  const minSide = Math.min(stageRect.width, stageRect.height);
  const hairWpx = (state.baseSize / 100) * minSide * state.scale;
  const hairCxPx = (state.cx / 100) * stageRect.width;
  const hairCyPx = (state.cy / 100) * stageRect.height;
  const ratio = img.naturalWidth / fit.w;
  const outCx = (hairCxPx - fit.x) * ratio;
  const outCy = (hairCyPx - fit.y) * ratio;
  const outSize = hairWpx * ratio;

  const style = HAIRSTYLES.find((s) => s.id === state.currentStyleId);
  const drawSvg = async (svgStr, blend, alpha) => {
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const hairImg = await loadImage(url);
    ctx.save();
    ctx.globalAlpha = state.opacity * alpha;
    ctx.globalCompositeOperation = blend;
    ctx.translate(outCx, outCy);
    ctx.rotate((state.rotate * Math.PI) / 180);
    ctx.drawImage(hairImg, -outSize / 2, -outSize / 2, outSize, outSize);
    ctx.restore();
    URL.revokeObjectURL(url);
  };

  const grainSvgFilter =
    state.grain > 0
      ? `<filter id="g" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="${(state.grain * 6).toFixed(2)}" xChannelSelector="R" yChannelSelector="G"/>
        </filter>`
      : '';

  const baseSvg = wrapSvg(style.svg, {
    color: state.color,
    extraDefs: grainSvgFilter,
    rootAttrs: state.grain > 0 ? `filter="url(#g)"` : '',
  });
  await drawSvg(baseSvg, 'source-over', 1);

  const shadowSvg = wrapSvg(style.svg, {
    color: state.color,
    extraDefs: `
      <linearGradient id="sm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="white" stop-opacity="1"/>
        <stop offset="0.4" stop-color="white" stop-opacity="0.9"/>
        <stop offset="0.7" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <mask id="sma"><rect width="200" height="200" fill="url(#sm)"/></mask>
      <filter id="dk"><feColorMatrix values="0.3 0 0 0 0  0 0.3 0 0 0  0 0 0.3 0 0  0 0 0 1 0"/></filter>
    `,
    rootAttrs: `mask="url(#sma)" filter="url(#dk)"`,
  });
  await drawSvg(shadowSvg, 'multiply', state.shadow);

  const lightSvg = wrapSvg(style.svg, {
    color: state.color,
    extraDefs: `
      <radialGradient id="rm" cx="0.5" cy="0.2" r="0.5">
        <stop offset="0" stop-color="white" stop-opacity="1"/>
        <stop offset="0.6" stop-color="white" stop-opacity="0"/>
      </radialGradient>
      <mask id="rma"><rect width="200" height="200" fill="url(#rm)"/></mask>
      <filter id="lt"><feColorMatrix values="3 0 0 0 0  0 3 0 0 0  0 0 3 0 0  0 0 0 1 0"/></filter>
    `,
    rootAttrs: `mask="url(#rma)" filter="url(#lt)"`,
  });
  await drawSvg(lightSvg, 'soft-light', state.light);

  return new Promise((res) => canvas.toBlob(res, 'image/png'));
}

function wrapSvg(svg, { color, extraDefs = '', rootAttrs = '' }) {
  let out = svg.replace(/currentColor/g, color);
  if (extraDefs) {
    out = out.replace(/<svg([^>]*)>/, `<svg$1><defs>${extraDefs}</defs>`);
  }
  if (rootAttrs) {
    out = out.replace(/<svg([^>]*)>([\s\S]*?)<\/svg>/, (m, attrs, body) => {
      const defsMatch = body.match(/<defs>[\s\S]*?<\/defs>/);
      const defs = defsMatch ? defsMatch[0] : '';
      const rest = defsMatch ? body.replace(defs, '') : body;
      return `<svg${attrs}>${defs}<g ${rootAttrs}>${rest}</g></svg>`;
    });
  }
  return out;
}

function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

function fitContain(iw, ih, cw, ch) {
  const r = Math.min(cw / iw, ch / ih);
  const w = iw * r;
  const h = ih * r;
  return { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
}

renderStyleCards();
