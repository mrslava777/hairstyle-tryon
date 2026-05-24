// Каждая причёска — это базовый силуэт в currentColor +
// полупрозрачные слои с тёмными прядями и светлыми бликами,
// чтобы выглядело объёмно при любом цвете волос.
// viewBox 0 0 200 200: центр лица около x=100, лоб ~ y=70.
window.HAIRSTYLES = (() => {
  const shadow = 'rgba(0,0,0,0.35)';
  const deep = 'rgba(0,0,0,0.55)';
  const light = 'rgba(255,255,255,0.28)';
  const glow = 'rgba(255,255,255,0.5)';

  return [
    {
      id: 'long',
      name: 'Длинные',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="long-clip">
            <path d="M100 16c-40 0-68 28-68 64 0 14 4 24 4 38 0 24-8 40-8 70h32c0-22 2-42 6-58 2 28 4 52 4 74h60c0-22 2-46 4-74 4 16 6 36 6 58h32c0-30-8-46-8-70 0-14 4-24 4-38 0-36-28-64-68-64z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M100 16c-40 0-68 28-68 64 0 14 4 24 4 38 0 24-8 40-8 70h32c0-22 2-42 6-58 2 28 4 52 4 74h60c0-22 2-46 4-74 4 16 6 36 6 58h32c0-30-8-46-8-70 0-14 4-24 4-38 0-36-28-64-68-64z"/>
        <g clip-path="url(#long-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="2">
            <path d="M60 30 Q50 80 40 180"/>
            <path d="M76 22 Q66 80 58 185"/>
            <path d="M92 18 Q86 80 80 188"/>
            <path d="M108 18 Q114 80 120 188"/>
            <path d="M124 22 Q134 80 142 185"/>
            <path d="M140 30 Q150 80 160 180"/>
          </g>
          <g stroke="${deep}" stroke-width="1.2">
            <path d="M68 24 Q60 90 50 188"/>
            <path d="M84 20 Q78 95 70 190"/>
            <path d="M100 18 Q100 100 100 192"/>
            <path d="M116 20 Q122 95 130 190"/>
            <path d="M132 24 Q140 90 150 188"/>
          </g>
          <g stroke="${light}" stroke-width="1">
            <path d="M72 30 Q68 90 62 180"/>
            <path d="M88 26 Q86 95 84 188"/>
            <path d="M112 26 Q114 95 116 188"/>
            <path d="M128 30 Q132 90 138 180"/>
          </g>
          <path fill="${glow}" d="M84 30 Q100 22 116 30 Q100 28 84 30Z"/>
        </g>
      </svg>`,
    },
    {
      id: 'bob',
      name: 'Каре',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="bob-clip">
            <path d="M100 20c-36 0-62 24-62 60 0 18 4 28 6 40-2 8-6 16-6 24h36c-2-10-4-22-2-32 4 14 8 26 14 36h28c6-10 10-22 14-36 2 10 0 22-2 32h36c0-8-4-16-6-24 2-12 6-22 6-40 0-36-26-60-62-60z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M100 20c-36 0-62 24-62 60 0 18 4 28 6 40-2 8-6 16-6 24h36c-2-10-4-22-2-32 4 14 8 26 14 36h28c6-10 10-22 14-36 2 10 0 22-2 32h36c0-8-4-16-6-24 2-12 6-22 6-40 0-36-26-60-62-60z"/>
        <g clip-path="url(#bob-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="2">
            <path d="M52 50 Q44 90 44 140"/>
            <path d="M72 30 Q60 90 56 140"/>
            <path d="M92 22 Q86 90 88 142"/>
            <path d="M108 22 Q114 90 112 142"/>
            <path d="M128 30 Q140 90 144 140"/>
            <path d="M148 50 Q156 90 156 140"/>
          </g>
          <g stroke="${deep}" stroke-width="1.2">
            <path d="M62 36 Q54 100 50 142"/>
            <path d="M84 24 Q78 100 76 142"/>
            <path d="M100 22 Q100 100 100 142"/>
            <path d="M116 24 Q122 100 124 142"/>
            <path d="M138 36 Q146 100 150 142"/>
          </g>
          <g stroke="${light}" stroke-width="1">
            <path d="M70 38 Q66 100 64 138"/>
            <path d="M92 28 Q92 100 94 140"/>
            <path d="M108 28 Q108 100 106 140"/>
            <path d="M130 38 Q134 100 136 138"/>
          </g>
          <path fill="${glow}" d="M82 32 Q100 24 118 32 Q100 30 82 32Z"/>
        </g>
      </svg>`,
    },
    {
      id: 'pixie',
      name: 'Пикси',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="pixie-clip">
            <path d="M100 24c-30 0-54 20-54 50 0 10 2 18 6 24 4-4 10-6 16-8-2-6-2-12 2-18 6 10 16 16 26 16 4-8 12-12 22-12 6-6 12-6 18 0 2 4 4 8 6 12 8 0 14 4 22 14 4-6 6-14 6-24 0-30-24-54-54-54z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M100 24c-30 0-54 20-54 50 0 10 2 18 6 24 4-4 10-6 16-8-2-6-2-12 2-18 6 10 16 16 26 16 4-8 12-12 22-12 6-6 12-6 18 0 2 4 4 8 6 12 8 0 14 4 22 14 4-6 6-14 6-24 0-30-24-54-54-54z"/>
        <g clip-path="url(#pixie-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="2">
            <path d="M60 60 Q70 50 82 56"/>
            <path d="M76 38 Q86 32 100 40"/>
            <path d="M118 36 Q130 40 140 56"/>
            <path d="M140 70 Q148 78 150 92"/>
          </g>
          <g stroke="${deep}" stroke-width="1.2">
            <path d="M66 56 Q80 44 96 50"/>
            <path d="M100 36 Q116 38 130 48"/>
            <path d="M134 60 Q146 70 148 86"/>
          </g>
          <g stroke="${light}" stroke-width="1">
            <path d="M74 50 Q90 42 104 48"/>
            <path d="M108 42 Q124 44 134 54"/>
          </g>
          <path fill="${glow}" d="M88 36 Q100 30 116 36 Q102 34 88 36Z"/>
        </g>
      </svg>`,
    },
    {
      id: 'curly',
      name: 'Кудри',
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
        <g fill="${shadow}">
          <circle cx="58" cy="64" r="6"/>
          <circle cx="76" cy="46" r="6"/>
          <circle cx="98" cy="38" r="6"/>
          <circle cx="120" cy="46" r="6"/>
          <circle cx="138" cy="64" r="6"/>
          <circle cx="46" cy="92" r="5"/>
          <circle cx="154" cy="92" r="5"/>
          <circle cx="42" cy="118" r="5"/>
          <circle cx="158" cy="118" r="5"/>
          <circle cx="48" cy="142" r="5"/>
          <circle cx="152" cy="142" r="5"/>
        </g>
        <g fill="${glow}">
          <circle cx="62" cy="50" r="4"/>
          <circle cx="80" cy="30" r="5"/>
          <circle cx="102" cy="22" r="5"/>
          <circle cx="124" cy="30" r="5"/>
          <circle cx="142" cy="50" r="4"/>
          <circle cx="50" cy="78" r="3"/>
          <circle cx="150" cy="78" r="3"/>
          <circle cx="44" cy="104" r="3"/>
          <circle cx="156" cy="104" r="3"/>
        </g>
      </svg>`,
    },
    {
      id: 'ponytail',
      name: 'Хвост',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="pony-clip">
            <path d="M100 22c-32 0-58 22-58 56 0 14 4 22 6 32-2 8-4 14-4 22h22c0-8 2-16 4-22 8 10 18 14 28 14s20-4 28-14c2 6 4 14 4 22h22c0-8-2-14-4-22 2-10 6-18 6-32 0-34-26-56-58-56z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M100 22c-32 0-58 22-58 56 0 14 4 22 6 32-2 8-4 14-4 22h22c0-8 2-16 4-22 8 10 18 14 28 14s20-4 28-14c2 6 4 14 4 22h22c0-8-2-14-4-22 2-10 6-18 6-32 0-34-26-56-58-56z"/>
        <path fill="currentColor" d="M124 86c10 4 20 16 24 38 4 26-2 50-8 64h-12c4-16 6-32 4-50-2-18-8-32-14-44z"/>
        <g clip-path="url(#pony-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="2">
            <path d="M58 40 Q50 80 50 110"/>
            <path d="M80 24 Q72 80 76 112"/>
            <path d="M100 20 Q100 70 110 110"/>
            <path d="M120 24 Q132 60 140 100"/>
            <path d="M140 40 Q150 70 154 100"/>
          </g>
          <g stroke="${light}" stroke-width="1">
            <path d="M66 36 Q60 80 60 108"/>
            <path d="M88 26 Q86 80 92 110"/>
            <path d="M112 26 Q120 70 128 100"/>
          </g>
          <path fill="${glow}" d="M86 28 Q100 22 114 28 Q100 26 86 28Z"/>
        </g>
        <g fill="none" stroke-linecap="round">
          <path stroke="${shadow}" stroke-width="2.5" d="M128 100 Q140 130 132 188"/>
          <path stroke="${shadow}" stroke-width="2.5" d="M136 100 Q146 130 142 186"/>
          <path stroke="${deep}" stroke-width="1.5" d="M132 96 Q142 128 138 188"/>
          <path stroke="${light}" stroke-width="1.2" d="M126 100 Q138 130 130 184"/>
        </g>
      </svg>`,
    },
    {
      id: 'undercut',
      name: 'Андеркат',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="uc-clip">
            <path d="M100 26c-30 0-56 18-56 46 0 8 2 14 4 18 0-2 4-4 8-4 10-10 24-16 38-16 4-8 22-14 36-6 12 4 18 12 22 26 6 0 8 2 8 4 2-4 4-10 4-18 0-28-26-50-64-50z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M100 26c-30 0-56 18-56 46 0 8 2 14 4 18 0-2 4-4 8-4 10-10 24-16 38-16 4-8 22-14 36-6 12 4 18 12 22 26 6 0 8 2 8 4 2-4 4-10 4-18 0-28-26-50-64-50z"/>
        <g clip-path="url(#uc-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="2">
            <path d="M70 60 Q70 50 90 44"/>
            <path d="M88 36 Q100 30 116 36"/>
            <path d="M120 36 Q140 44 146 60"/>
          </g>
          <g stroke="${deep}" stroke-width="1.3">
            <path d="M78 54 Q86 44 102 40"/>
            <path d="M104 36 Q124 40 136 50"/>
          </g>
          <g stroke="${light}" stroke-width="1">
            <path d="M82 48 Q96 40 108 42"/>
            <path d="M112 42 Q128 46 138 56"/>
          </g>
          <path fill="${glow}" d="M88 38 Q100 32 116 38 Q102 36 88 38Z"/>
        </g>
      </svg>`,
    },
    {
      id: 'mohawk',
      name: 'Ирокез',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="mo-clip">
            <path d="M88 14c-2 14-4 28-4 44 0 18 4 30 6 40h20c2-10 6-22 6-40 0-16-2-30-4-44-4-4-10-6-12-6s-8 2-12 6z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M88 14c-2 14-4 28-4 44 0 18 4 30 6 40h20c2-10 6-22 6-40 0-16-2-30-4-44-4-4-10-6-12-6s-8 2-12 6z"/>
        <path fill="currentColor" opacity="0.35" d="M68 70c-6 8-10 16-10 24 4-4 10-6 16-6zM132 70c6 8 10 16 10 24-4-4-10-6-16-6z"/>
        <g clip-path="url(#mo-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="1.8">
            <path d="M88 16 Q86 50 90 96"/>
            <path d="M94 12 Q94 50 96 96"/>
            <path d="M100 10 Q100 50 100 98"/>
            <path d="M106 12 Q106 50 104 96"/>
            <path d="M112 16 Q114 50 110 96"/>
          </g>
          <g stroke="${deep}" stroke-width="1">
            <path d="M91 14 Q90 50 92 90"/>
            <path d="M97 12 Q98 50 98 92"/>
            <path d="M103 12 Q102 50 102 92"/>
            <path d="M109 14 Q110 50 108 90"/>
          </g>
          <g stroke="${light}" stroke-width="0.9">
            <path d="M93 18 Q94 50 95 88"/>
            <path d="M99 14 Q100 50 100 90"/>
            <path d="M105 18 Q106 50 105 88"/>
          </g>
        </g>
      </svg>`,
    },
    {
      id: 'wavy',
      name: 'Волны',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="wavy-clip">
            <path d="M100 20c-34 0-62 24-62 58 0 12 2 22 4 30-4 6-8 12-8 22 4-2 8-4 12-4-2 8-2 16 0 26 6-2 12-6 16-12-2 10 0 20 4 28 6-4 12-10 14-16 0 8 4 16 8 20 6-4 10-10 12-18 2 8 6 14 12 18 4-4 8-12 8-20 2 6 8 12 14 16 4-8 6-18 4-28 4 6 10 10 16 12 2-10 2-18 0-26 4 0 8 2 12 4 0-10-4-16-8-22 2-8 4-18 4-30 0-34-28-58-62-58z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M100 20c-34 0-62 24-62 58 0 12 2 22 4 30-4 6-8 12-8 22 4-2 8-4 12-4-2 8-2 16 0 26 6-2 12-6 16-12-2 10 0 20 4 28 6-4 12-10 14-16 0 8 4 16 8 20 6-4 10-10 12-18 2 8 6 14 12 18 4-4 8-12 8-20 2 6 8 12 14 16 4-8 6-18 4-28 4 6 10 10 16 12 2-10 2-18 0-26 4 0 8 2 12 4 0-10-4-16-8-22 2-8 4-18 4-30 0-34-28-58-62-58z"/>
        <g clip-path="url(#wavy-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="2.2">
            <path d="M52 50 Q58 80 50 110 Q42 140 56 180"/>
            <path d="M72 30 Q80 70 70 110 Q60 145 76 188"/>
            <path d="M92 22 Q100 70 92 112 Q86 150 100 192"/>
            <path d="M108 22 Q108 70 110 112 Q116 150 102 192"/>
            <path d="M128 30 Q124 70 132 110 Q142 145 128 188"/>
            <path d="M148 50 Q146 80 152 110 Q160 140 148 180"/>
          </g>
          <g stroke="${deep}" stroke-width="1.3">
            <path d="M62 36 Q66 80 58 120 Q50 152 64 184"/>
            <path d="M82 26 Q88 70 80 116 Q72 150 86 190"/>
            <path d="M100 22 Q100 70 100 116 Q102 156 100 192"/>
            <path d="M118 26 Q116 70 122 116 Q130 150 116 190"/>
            <path d="M138 36 Q136 80 144 120 Q152 152 138 184"/>
          </g>
          <g stroke="${light}" stroke-width="1">
            <path d="M68 36 Q70 80 64 120 Q60 154 70 184"/>
            <path d="M88 28 Q92 70 86 116 Q82 152 92 188"/>
            <path d="M112 28 Q110 70 114 116 Q120 152 110 188"/>
            <path d="M132 36 Q132 80 138 120 Q142 154 132 184"/>
          </g>
          <path fill="${glow}" d="M84 30 Q100 22 116 30 Q100 28 84 30Z"/>
        </g>
      </svg>`,
    },
    {
      id: 'braids',
      name: 'Косички',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <clipPath id="br-clip">
            <path d="M100 20c-32 0-58 22-58 54 0 16 4 26 6 36h104c2-10 6-20 6-36 0-32-26-54-58-54z"/>
          </clipPath>
        </defs>
        <path fill="currentColor" d="M100 20c-32 0-58 22-58 54 0 16 4 26 6 36h104c2-10 6-20 6-36 0-32-26-54-58-54z"/>
        <g clip-path="url(#br-clip)" fill="none" stroke-linecap="round">
          <g stroke="${shadow}" stroke-width="1.6">
            <path d="M60 30 Q66 60 56 100"/>
            <path d="M72 24 Q76 60 70 100"/>
            <path d="M86 22 Q90 60 86 100"/>
            <path d="M100 20 Q100 60 100 100"/>
            <path d="M114 22 Q110 60 114 100"/>
            <path d="M128 24 Q124 60 130 100"/>
            <path d="M140 30 Q134 60 144 100"/>
          </g>
          <g stroke="${light}" stroke-width="0.9">
            <path d="M68 30 Q72 60 64 98"/>
            <path d="M82 24 Q86 60 80 98"/>
            <path d="M96 22 Q98 60 96 98"/>
            <path d="M104 22 Q102 60 104 98"/>
            <path d="M118 24 Q114 60 120 98"/>
            <path d="M132 30 Q128 60 136 98"/>
          </g>
          <path fill="${glow}" d="M88 28 Q100 22 112 28 Q100 26 88 28Z"/>
        </g>
        <g>
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
          <g fill="${shadow}">
            <ellipse cx="54" cy="126" rx="9" ry="3"/>
            <ellipse cx="52" cy="144" rx="9" ry="3"/>
            <ellipse cx="54" cy="162" rx="9" ry="3"/>
            <ellipse cx="146" cy="126" rx="9" ry="3"/>
            <ellipse cx="148" cy="144" rx="9" ry="3"/>
            <ellipse cx="146" cy="162" rx="9" ry="3"/>
          </g>
          <g fill="${light}">
            <ellipse cx="54" cy="116" rx="6" ry="2"/>
            <ellipse cx="52" cy="134" rx="6" ry="2"/>
            <ellipse cx="54" cy="152" rx="6" ry="2"/>
            <ellipse cx="146" cy="116" rx="6" ry="2"/>
            <ellipse cx="148" cy="134" rx="6" ry="2"/>
            <ellipse cx="146" cy="152" rx="6" ry="2"/>
          </g>
        </g>
      </svg>`,
    },
  ];
})();
