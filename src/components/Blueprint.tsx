export default function Blueprint() {
  return (
    <svg className="blueprint-art" viewBox="0 0 480 344" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="blueprint-paper" x1="12" y1="0" x2="190" y2="202" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--art-paper)" />
          <stop offset="1" stopColor="var(--art-paper-edge)" />
        </linearGradient>
        <linearGradient id="blueprint-lower" x1="0" y1="6" x2="200" y2="194" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--art-paper-edge)" />
          <stop offset="1" stopColor="var(--art-paper-bottom)" />
        </linearGradient>
        <radialGradient id="blueprint-shadow">
          <stop stopColor="var(--art-ink)" stopOpacity=".2" />
          <stop offset="1" stopColor="var(--art-ink)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="var(--art-wire)" strokeWidth="1" strokeLinecap="round">
        <path d="M72 60h10m-5-5v10m327-11h10m-5-5v10M62 244h10m-5-5v10m362 58h10m-5-5v10M158 303h10m-5-5v10m289-167h10m-5-5v10" />
        <path d="M147 101V76h34V54h40m121 64V94h26m-29 164 27 25v13h32M91 238h20l19-17m-15-81h23l21 16m75 117v18h30v21h43m52-95h22l20 18h13" strokeDasharray="3 5" />
        <path d="m103 183 184-55 145 126-186 56-143-127Z" strokeDasharray="3 5" opacity=".6" />
        <circle cx="225" cy="54" r="3.5" fill="var(--art-paper)" />
        <circle cx="371" cy="94" r="3" fill="var(--art-paper)" />
        <circle cx="311" cy="312" r="3.5" fill="var(--art-paper)" />
        <circle cx="402" cy="296" r="3.5" fill="var(--art-paper)" />
        <circle cx="89" cy="238" r="2.5" fill="var(--art-paper)" />
      </g>

      <ellipse cx="255" cy="249" rx="170" ry="39" fill="url(#blueprint-shadow)" transform="rotate(-13 255 249)" />
      <g className="art-float" strokeLinejoin="round">
        <g transform="matrix(.96 -.29 .70 .69 90 150)">
          <path d="M0 190v5h206v-5" fill="var(--art-paper-edge)" stroke="var(--art-rule)" strokeWidth="1.1" />
          <path d="M0 0h172l34 33v157H0z" fill="url(#blueprint-lower)" stroke="var(--art-outline)" strokeWidth="1.1" />
          <path d="M19 172h168M19 179h113" stroke="var(--art-rule)" strokeWidth="1" />
        </g>
        <g transform="matrix(.96 -.29 .70 .69 93 135)">
          <path d="M0 190v5h206v-5" fill="var(--art-paper-edge)" stroke="var(--art-rule)" strokeWidth="1.1" />
          <path d="M0 0h172l34 33v157H0z" fill="url(#blueprint-lower)" stroke="var(--art-outline)" strokeWidth="1.1" />
          <path d="M19 172h168M19 179h113" stroke="var(--art-rule)" strokeWidth="1" />
        </g>
        <g transform="matrix(.96 -.29 .70 .69 97 119)">
          <path d="M0 190v5h206v-5" fill="var(--art-paper-edge)" stroke="var(--art-rule)" strokeWidth="1.1" />
          <path d="M0 3a3 3 0 0 1 3-3h164l39 37v150a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3Z" fill="url(#blueprint-paper)" stroke="var(--art-ink)" strokeWidth="1.3" />
          <path d="M167 0v34a3 3 0 0 0 3 3h36z" fill="var(--art-wash)" stroke="var(--art-ink)" strokeWidth="1.1" />
          <rect x="22" y="21" width="33" height="34" rx="4" fill="var(--art-wash)" stroke="var(--art-rule)" />
          <path d="M33 31h9l4 4v11H33zM41 31v5h5m-10 4h7m-7 3h7" stroke="var(--art-ink)" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M67 31h74" stroke="var(--art-ink)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M67 42h53m-53 8h35M22 69h162" stroke="var(--art-rule)" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M22 85h66m-66 10h47" stroke="var(--art-outline)" strokeWidth="1.35" strokeLinecap="round" />
          <g stroke="var(--art-outline)" strokeWidth="1">
            <rect x="22" y="113" width="10" height="10" rx="1.2" />
            <rect x="22" y="132" width="10" height="10" rx="1.2" />
            <rect x="22" y="151" width="10" height="10" rx="1.2" />
          </g>
          <path d="m24.5 118 2 2 3.5-4.5m-5.5 21.5 2 2 3.5-4.5" stroke="var(--art-ink)" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M42 118h44m-44 19h51m-51 19h34m-54 19h162" stroke="var(--art-rule)" strokeWidth="1.3" strokeLinecap="round" />
          <rect x="110" y="85" width="74" height="76" rx="4" fill="var(--art-wash)" stroke="var(--art-rule)" />
          <g stroke="var(--art-outline)" strokeWidth="1.1">
            <path d="M147 114v12m-18 7v-7h37v7" />
            <rect x="136" y="101" width="22" height="13" rx="2" fill="var(--art-paper)" />
            <rect x="120" y="133" width="18" height="12" rx="2" fill="var(--art-paper)" />
            <rect x="157" y="133" width="18" height="12" rx="2" fill="var(--art-paper)" />
          </g>
        </g>
      </g>

      <g transform="translate(70 115)">
        <rect width="47" height="47" rx="9" fill="var(--art-paper)" stroke="var(--art-rule)" />
        <g stroke="var(--art-ink)" strokeWidth="1.35" strokeLinejoin="round" strokeLinecap="round">
          <rect x="19" y="12" width="9" height="8" rx="1" />
          <path d="M23.5 20v6M16 29v-3h15v3" />
          <rect x="12" y="29" width="8" height="6" rx="1" />
          <rect x="27" y="29" width="8" height="6" rx="1" />
        </g>
      </g>
      <g transform="translate(399 208)">
        <rect width="49" height="48" rx="9" fill="var(--art-paper)" stroke="var(--art-rule)" />
        <g stroke="var(--art-ink)" strokeWidth="1.35" strokeLinecap="round">
          <ellipse cx="24.5" cy="16.5" rx="9.5" ry="4" />
          <path d="M15 17v14c0 2.2 4.3 4 9.5 4s9.5-1.8 9.5-4V17M15 24c0 2.2 4.3 4 9.5 4s9.5-1.8 9.5-4" />
        </g>
      </g>
      <g fill="var(--art-outline)">
        <circle cx="147" cy="76" r="2.3" />
        <circle cx="366" cy="283" r="2.3" />
        <circle cx="265" cy="291" r="2.1" />
      </g>
    </svg>
  );
}