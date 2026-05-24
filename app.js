(function () {
  const $ = (id) => document.getElementById(id);

  const fileInput = $('fileInput');
  const photo = $('photo');
  const placeholder = $('placeholder');
  const stage = $('stage');
  const hairLayer = $('hairLayer');
  const hairHandle = $('hairHandle');
  const stylesGrid = $('styles');
  const scaleEl = $('scale');
  const rotateEl = $('rotate');
  const offsetXEl = $('offsetX');
  const offsetYEl = $('offsetY');
  const colorEl = $('color');
  const opacityEl = $('opacity');
  const resetBtn = $('resetBtn');
  const downloadBtn = $('downloadBtn');

  const state = {
    currentStyleId: null,
    photoDataUrl: null,
    cx: 50,
    cy: 30,
    baseSize: 60,
    scale: 1,
    rotate: 0,
    color: '#3a2418',
    opacity: 1,
  };

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
    const old = hairLayer.querySelector('svg');
    if (old) old.remove();
    hairLayer.insertAdjacentHTML('afterbegin', style.svg);
    hairLayer.style.color = state.color;
    document.querySelectorAll('.style-card').forEach((c) => {
      c.classList.toggle('active', c.dataset.id === id);
    });
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
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.photoDataUrl = reader.result;
      photo.src = reader.result;
      placeholder.hidden = true;
    };
    reader.readAsDataURL(file);
  });

  scaleEl.addEventListener('input', () => {
    state.scale = scaleEl.value / 100;
    applyTransform();
  });
  rotateEl.addEventListener('input', () => {
    state.rotate = +rotateEl.value;
    applyTransform();
  });
  offsetXEl.addEventListener('input', () => {
    state.cx = 50 + (+offsetXEl.value / 8);
    applyTransform();
  });
  offsetYEl.addEventListener('input', () => {
    state.cy = 30 + (+offsetYEl.value / 8);
    applyTransform();
  });
  colorEl.addEventListener('input', () => {
    state.color = colorEl.value;
    hairLayer.style.color = state.color;
    document.querySelectorAll('.style-card').forEach((c) => {
      c.style.color = state.color;
    });
  });
  opacityEl.addEventListener('input', () => {
    state.opacity = opacityEl.value / 100;
    applyTransform();
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
      const factor = 1 + dx / 100;
      state.scale = Math.max(0.2, Math.min(2.5, dragging.scale * factor));
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
    const factor = 1 + dx / 100;
    state.scale = Math.max(0.2, Math.min(2.5, dragging.scale * factor));
    scaleEl.value = state.scale * 100;
    applyTransform();
  });
  hairHandle.addEventListener('pointerup', () => { dragging = null; });

  resetBtn.addEventListener('click', () => {
    hairLayer.hidden = true;
    state.currentStyleId = null;
    document.querySelectorAll('.style-card').forEach((c) => c.classList.remove('active'));
    state.scale = 1; state.rotate = 0; state.cx = 50; state.cy = 30;
    state.opacity = 1;
    scaleEl.value = 100; rotateEl.value = 0; offsetXEl.value = 0; offsetYEl.value = 0;
    opacityEl.value = 100;
  });

  window.addEventListener('resize', applyTransform);

  downloadBtn.addEventListener('click', async () => {
    if (!state.photoDataUrl) {
      alert('Сначала загрузите фото.');
      return;
    }
    const photoImg = await loadImage(state.photoDataUrl);
    const canvas = document.createElement('canvas');
    canvas.width = photoImg.naturalWidth;
    canvas.height = photoImg.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(photoImg, 0, 0);

    if (!hairLayer.hidden && state.currentStyleId) {
      const stageRect = stage.getBoundingClientRect();
      const fit = fitContain(photoImg.naturalWidth, photoImg.naturalHeight, stageRect.width, stageRect.height);
      const hairW = (state.baseSize / 100) * Math.min(stageRect.width, stageRect.height) * state.scale;
      const hairCx = (state.cx / 100) * stageRect.width;
      const hairCy = (state.cy / 100) * stageRect.height;

      const relCx = hairCx - fit.x;
      const relCy = hairCy - fit.y;
      const ratio = photoImg.naturalWidth / fit.w;
      const outCx = relCx * ratio;
      const outCy = relCy * ratio;
      const outSize = hairW * ratio;

      const style = HAIRSTYLES.find((s) => s.id === state.currentStyleId);
      const coloredSvg = style.svg.replace('<svg', `<svg color="${state.color}"`);
      const svgBlob = new Blob([coloredSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const hairImg = await loadImage(url);

      ctx.save();
      ctx.globalAlpha = state.opacity;
      ctx.translate(outCx, outCy);
      ctx.rotate((state.rotate * Math.PI) / 180);
      ctx.drawImage(hairImg, -outSize / 2, -outSize / 2, outSize, outSize);
      ctx.restore();
      URL.revokeObjectURL(url);
    }

    const link = document.createElement('a');
    link.download = 'hairstyle.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

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
})();
