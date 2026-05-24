// Каждая причёска — это только базовый силуэт в currentColor.
// Тени, блики и шум добавляются в app.js / CSS через слои с blend-mode.
// viewBox 0 0 200 200. Голова в SVG занимает примерно x=68..132, верхушка y≈20.
// Метаданные anchor описывают, где в SVG находится макушка и какая ширина у головы,
// чтобы app.js мог точно подгонять причёску под лицо.
window.HAIRSTYLES = [
  {
    id: 'long', name: 'Длинные',
    anchor: { topY: 18, faceTopY: 60, headCx: 100, headWidth: 80 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 16c-40 0-68 28-68 64 0 14 4 24 4 38 0 24-8 40-8 70h32c0-22 2-42 6-58 2 28 4 52 4 74h60c0-22 2-46 4-74 4 16 6 36 6 58h32c0-30-8-46-8-70 0-14 4-24 4-38 0-36-28-64-68-64z"/>
    </svg>`,
  },
  {
    id: 'bob', name: 'Каре',
    anchor: { topY: 20, faceTopY: 60, headCx: 100, headWidth: 80 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 20c-36 0-62 24-62 60 0 18 4 28 6 40-2 8-6 16-6 24h36c-2-10-4-22-2-32 4 14 8 26 14 36h28c6-10 10-22 14-36 2 10 0 22-2 32h36c0-8-4-16-6-24 2-12 6-22 6-40 0-36-26-60-62-60z"/>
    </svg>`,
  },
  {
    id: 'pixie', name: 'Пикси',
    anchor: { topY: 24, faceTopY: 58, headCx: 100, headWidth: 78 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 24c-30 0-54 20-54 50 0 10 2 18 6 24 4-4 10-6 16-8-2-6-2-12 2-18 6 10 16 16 26 16 4-8 12-12 22-12 6-6 12-6 18 0 2 4 4 8 6 12 8 0 14 4 22 14 4-6 6-14 6-24 0-30-24-54-54-54z"/>
    </svg>`,
  },
  {
    id: 'curly', name: 'Кудри',
    anchor: { topY: 8, faceTopY: 64, headCx: 100, headWidth: 116 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <g fill="currentColor">
        <circle cx="60" cy="58" r="18"/>
        <circle cx="78" cy="38" r="20"/>
        <circle cx="100" cy="30" r="22"/>
        <circle cx="122" cy="38" r="20"/>
        <circle cx="140" cy="58" r="18"/>
        <circle cx="48" cy="84" r="16"/>
        <circle cx="152" cy="84" r="16"/>
        <circle cx="42" cy="110" r="14"/>
        <circle cx="158" cy="110" r="14"/>
        <circle cx="46" cy="134" r="14"/>
        <circle cx="154" cy="134" r="14"/>
        <circle cx="56" cy="156" r="12"/>
        <circle cx="144" cy="156" r="12"/>
      </g>
    </svg>`,
  },
  {
    id: 'ponytail', name: 'Хвост',
    anchor: { topY: 22, faceTopY: 60, headCx: 100, headWidth: 80 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 22c-32 0-58 22-58 56 0 14 4 22 6 32-2 8-4 14-4 22h22c0-8 2-16 4-22 8 10 18 14 28 14s20-4 28-14c2 6 4 14 4 22h22c0-8-2-14-4-22 2-10 6-18 6-32 0-34-26-56-58-56z"/>
      <path fill="currentColor" d="M124 86c10 4 20 16 24 38 4 26-2 50-8 64h-12c4-16 6-32 4-50-2-18-8-32-14-44z"/>
    </svg>`,
  },
  {
    id: 'undercut', name: 'Андеркат',
    anchor: { topY: 26, faceTopY: 60, headCx: 100, headWidth: 78 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 26c-30 0-56 18-56 46 0 8 2 14 4 18 0-2 4-4 8-4 10-10 24-16 38-16 4-8 22-14 36-6 12 4 18 12 22 26 6 0 8 2 8 4 2-4 4-10 4-18 0-28-26-50-64-50z"/>
    </svg>`,
  },
  {
    id: 'mohawk', name: 'Ирокез',
    anchor: { topY: 10, faceTopY: 70, headCx: 100, headWidth: 80 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M88 14c-2 14-4 28-4 44 0 18 4 30 6 40h20c2-10 6-22 6-40 0-16-2-30-4-44-4-4-10-6-12-6s-8 2-12 6z"/>
      <path fill="currentColor" opacity="0.35" d="M68 70c-6 8-10 16-10 24 4-4 10-6 16-6zM132 70c6 8 10 16 10 24-4-4-10-6-16-6z"/>
    </svg>`,
  },
  {
    id: 'wavy', name: 'Волны',
    anchor: { topY: 20, faceTopY: 60, headCx: 100, headWidth: 84 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 20c-34 0-62 24-62 58 0 12 2 22 4 30-4 6-8 12-8 22 4-2 8-4 12-4-2 8-2 16 0 26 6-2 12-6 16-12-2 10 0 20 4 28 6-4 12-10 14-16 0 8 4 16 8 20 6-4 10-10 12-18 2 8 6 14 12 18 4-4 8-12 8-20 2 6 8 12 14 16 4-8 6-18 4-28 4 6 10 10 16 12 2-10 2-18 0-26 4 0 8 2 12 4 0-10-4-16-8-22 2-8 4-18 4-30 0-34-28-58-62-58z"/>
    </svg>`,
  },
  {
    id: 'braids', name: 'Косички',
    anchor: { topY: 20, faceTopY: 60, headCx: 100, headWidth: 80 },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 20c-32 0-58 22-58 54 0 16 4 26 6 36h104c2-10 6-20 6-36 0-32-26-54-58-54z"/>
      <g fill="currentColor">
        <ellipse cx="54" cy="120" rx="10" ry="8"/>
        <ellipse cx="52" cy="138" rx="10" ry="8"/>
        <ellipse cx="54" cy="156" rx="10" ry="8"/>
        <ellipse cx="56" cy="174" rx="9" ry="7"/>
        <ellipse cx="146" cy="120" rx="10" ry="8"/>
        <ellipse cx="148" cy="138" rx="10" ry="8"/>
        <ellipse cx="146" cy="156" rx="10" ry="8"/>
        <ellipse cx="144" cy="174" rx="9" ry="7"/>
      </g>
    </svg>`,
  },
];
