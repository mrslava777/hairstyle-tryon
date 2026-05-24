// Каждая причёска — SVG-маркап с использованием currentColor для перекраски.
// viewBox у всех 0 0 200 200, верх головы примерно на y=20, лоб на y=60.
window.HAIRSTYLES = [
  {
    id: 'long',
    name: 'Длинные',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 18c-38 0-66 28-66 64 0 14 4 24 4 36 0 22-6 38-6 66h28c0-22 0-40 4-58 2 28 4 52 4 74h64c0-22 2-46 4-74 4 18 4 36 4 58h28c0-28-6-44-6-66 0-12 4-22 4-36 0-36-28-64-66-64z"/>
    </svg>`,
  },
  {
    id: 'bob',
    name: 'Каре',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 22c-34 0-60 24-60 58 0 18 4 28 6 40-2 6-4 14-4 22h32c-2-10-4-22-2-32 4 14 8 26 12 36h32c4-10 8-22 12-36 2 10 0 22-2 32h32c0-8-2-16-4-22 2-12 6-22 6-40 0-34-26-58-60-58z"/>
    </svg>`,
  },
  {
    id: 'pixie',
    name: 'Пикси',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 26c-30 0-54 20-54 50 0 8 2 16 4 22 4-4 10-6 16-8-2-6-2-12 0-18 6 8 14 14 24 14 4-8 12-12 22-12 4 8 12 12 22 12 10 0 18-6 24-14 2 6 2 12 0 18 6 2 12 4 16 8 2-6 4-14 4-22 0-30-24-50-54-50z"/>
    </svg>`,
  },
  {
    id: 'curly',
    name: 'Кудри',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <g fill="currentColor">
        <circle cx="60" cy="60" r="18"/>
        <circle cx="80" cy="40" r="20"/>
        <circle cx="100" cy="32" r="22"/>
        <circle cx="120" cy="40" r="20"/>
        <circle cx="140" cy="60" r="18"/>
        <circle cx="50" cy="86" r="16"/>
        <circle cx="150" cy="86" r="16"/>
        <circle cx="44" cy="110" r="14"/>
        <circle cx="156" cy="110" r="14"/>
        <circle cx="46" cy="134" r="14"/>
        <circle cx="154" cy="134" r="14"/>
      </g>
    </svg>`,
  },
  {
    id: 'ponytail',
    name: 'Хвост',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 24c-32 0-58 22-58 54 0 14 4 22 6 32-2 8-4 14-4 22h24c0-8 2-16 4-22 8 10 18 14 28 14s20-4 28-14c2 6 4 14 4 22h24c0-8-2-14-4-22 2-10 6-18 6-32 0-32-26-54-58-54z"/>
      <path fill="currentColor" d="M126 90c8 6 16 18 18 36 2 22-2 44-6 60h-10c2-16 4-32 2-50-2-16-8-30-14-38z"/>
    </svg>`,
  },
  {
    id: 'undercut',
    name: 'Андеркат',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 28c-30 0-56 18-56 46 0 8 2 14 4 18 0-2 4-4 8-4 10-10 24-16 38-16 4-8 22-14 36-6 12 4 18 12 22 26 6 0 8 2 8 4 2-4 4-10 4-18 0-28-26-50-64-50z"/>
    </svg>`,
  },
  {
    id: 'mohawk',
    name: 'Ирокез',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M88 16c-2 14-4 28-4 42 0 16 4 28 6 38h20c2-10 6-22 6-38 0-14-2-28-4-42-4-4-10-6-12-6s-8 2-12 6z"/>
      <path fill="currentColor" opacity="0.4" d="M70 70c-6 6-10 14-10 22 4-4 10-6 14-6zM130 70c6 6 10 14 10 22-4-4-10-6-14-6z"/>
    </svg>`,
  },
  {
    id: 'wavy',
    name: 'Волны',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 22c-34 0-62 24-62 58 0 12 2 22 4 30-4 6-8 12-8 20 4-2 8-4 12-4-2 8-2 16 0 24 6-2 12-6 16-12-2 10 0 18 4 26 6-4 12-10 14-16 0 8 4 14 8 18 6-4 10-10 12-16 2 6 6 12 12 16 4-4 8-10 8-18 2 6 8 12 14 16 4-8 6-16 4-26 4 6 10 10 16 12 2-8 2-16 0-24 4 0 8 2 12 4 0-8-4-14-8-20 2-8 4-18 4-30 0-34-28-58-62-58z"/>
    </svg>`,
  },
  {
    id: 'braids',
    name: 'Косички',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="currentColor" d="M100 22c-32 0-58 22-58 52 0 16 4 26 6 36h104c2-10 6-20 6-36 0-30-26-52-58-52z"/>
      <g fill="currentColor">
        <ellipse cx="56" cy="120" rx="10" ry="8"/>
        <ellipse cx="54" cy="138" rx="10" ry="8"/>
        <ellipse cx="56" cy="156" rx="10" ry="8"/>
        <ellipse cx="58" cy="174" rx="9" ry="7"/>
        <ellipse cx="144" cy="120" rx="10" ry="8"/>
        <ellipse cx="146" cy="138" rx="10" ry="8"/>
        <ellipse cx="144" cy="156" rx="10" ry="8"/>
        <ellipse cx="142" cy="174" rx="9" ry="7"/>
      </g>
    </svg>`,
  },
];
