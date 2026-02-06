interface NordLabLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  variant?: "default" | "hover";
}

export function NordLabLogo({
  size = 40,
  className = "",
  showWordmark = true,
}: NordLabLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* The Mark */}
      <div className="relative group/logo" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Copper gradient for the N */}
            <linearGradient
              id="nordlab-copper"
              x1="0"
              y1="0"
              x2="48"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#d4a574" />
              <stop offset="50%" stopColor="#c9915a" />
              <stop offset="100%" stopColor="#b07a45" />
            </linearGradient>

            {/* Subtle dark gradient for frame fill on hover */}
            <linearGradient
              id="nordlab-frame-fill"
              x1="0"
              y1="0"
              x2="48"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#c9915a" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#c9915a" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Chamfered octagonal frame - industrial cut corners */}
          <path
            d="M 9 1.5 L 39 1.5 L 46.5 9 L 46.5 39 L 39 46.5 L 9 46.5 L 1.5 39 L 1.5 9 Z"
            fill="url(#nordlab-frame-fill)"
            stroke="url(#nordlab-copper)"
            strokeWidth="1.2"
            className="transition-all duration-500"
          />

          {/* Inner frame detail - subtle double-line effect */}
          <path
            d="M 11 4.5 L 37 4.5 L 43.5 11 L 43.5 37 L 37 43.5 L 11 43.5 L 4.5 37 L 4.5 11 Z"
            fill="none"
            stroke="url(#nordlab-copper)"
            strokeWidth="0.4"
            opacity="0.25"
          />

          {/* The N - three geometric elements */}
          {/* Left vertical bar */}
          <rect
            x="12"
            y="12"
            width="4.8"
            height="24"
            fill="url(#nordlab-copper)"
          />

          {/* Diagonal connector */}
          <polygon
            points="12,12 16.8,12 36,36 31.2,36"
            fill="url(#nordlab-copper)"
          />

          {/* Right vertical bar */}
          <rect
            x="31.2"
            y="12"
            width="4.8"
            height="24"
            fill="url(#nordlab-copper)"
          />

          {/* North diamond accent - top of right stroke */}
          <polygon
            points="33.6,7.5 36.8,12 33.6,14.5 30.4,12"
            fill="url(#nordlab-copper)"
          />

          {/* Precision baseline accent */}
          <line
            x1="10"
            y1="40"
            x2="38"
            y2="40"
            stroke="url(#nordlab-copper)"
            strokeWidth="0.8"
            opacity="0.35"
          />

          {/* Small corner detail marks - technical drawing feel */}
          <line
            x1="1.5"
            y1="24"
            x2="4"
            y2="24"
            stroke="url(#nordlab-copper)"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <line
            x1="44"
            y1="24"
            x2="46.5"
            y2="24"
            stroke="url(#nordlab-copper)"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="hidden sm:flex flex-col leading-none">
          <div className="flex items-baseline">
            <span className="text-cream font-light tracking-[0.22em] text-sm uppercase">
              Nord
            </span>
            <span className="text-copper font-medium tracking-[0.22em] text-sm uppercase">
              Lab
            </span>
          </div>
          <span
            className="text-warm-gray tracking-[0.35em] uppercase mt-0.5"
            style={{ fontSize: "6.5px" }}
          >
            Digital Solutions
          </span>
        </div>
      )}
    </div>
  );
}

/* Compact icon-only version for favicons or small usage */
export function NordLabIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <defs>
        <linearGradient
          id="nordlab-copper-sm"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="50%" stopColor="#c9915a" />
          <stop offset="100%" stopColor="#b07a45" />
        </linearGradient>
      </defs>

      <path
        d="M 9 1.5 L 39 1.5 L 46.5 9 L 46.5 39 L 39 46.5 L 9 46.5 L 1.5 39 L 1.5 9 Z"
        fill="none"
        stroke="url(#nordlab-copper-sm)"
        strokeWidth="1.5"
      />
      <rect x="12" y="12" width="4.8" height="24" fill="url(#nordlab-copper-sm)" />
      <polygon points="12,12 16.8,12 36,36 31.2,36" fill="url(#nordlab-copper-sm)" />
      <rect x="31.2" y="12" width="4.8" height="24" fill="url(#nordlab-copper-sm)" />
      <polygon points="33.6,7.5 36.8,12 33.6,14.5 30.4,12" fill="url(#nordlab-copper-sm)" />
    </svg>
  );
}
