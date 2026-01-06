import {
  FlagUs,
  FlagCn,
  FlagJp,
  FlagDe,
  FlagGb,
  FlagFr,
  FlagIn,
  FlagRu,
  FlagCa,
  FlagKr,
  FlagIt,
  FlagEs,
  FlagAu,
  FlagBr,
  FlagMx,
  FlagNl,
  FlagCh,
  FlagSe,
  FlagNo,
  FlagBe,
} from '@sankyu/react-circle-flags'

interface FlagShowcaseProps {
  onFlagClick?: (code: string) => void
}

const flagData = [
  { Component: FlagUs, code: 'us' },
  { Component: FlagCn, code: 'cn' },
  { Component: FlagJp, code: 'jp' },
  { Component: FlagDe, code: 'de' },
  { Component: FlagGb, code: 'gb' },
  { Component: FlagFr, code: 'fr' },
  { Component: FlagIn, code: 'in' },
  { Component: FlagRu, code: 'ru' },
  { Component: FlagCa, code: 'ca' },
  { Component: FlagKr, code: 'kr' },
  { Component: FlagIt, code: 'it' },
  { Component: FlagEs, code: 'es' },
  { Component: FlagAu, code: 'au' },
  { Component: FlagBr, code: 'br' },
  { Component: FlagMx, code: 'mx' },
  { Component: FlagNl, code: 'nl' },
  { Component: FlagCh, code: 'ch' },
  { Component: FlagSe, code: 'se' },
  { Component: FlagNo, code: 'no' },
  { Component: FlagBe, code: 'be' },
] as const

export default function FlagShowcase({ onFlagClick }: FlagShowcaseProps) {
  return (
    <div className="space-y-7">
      {/* Styled Variants */}
      <section className="rounded-2xl border-2 border-(--border) bg-linear-to-br from-(--surface) to-(--surface-2) p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-(--muted) mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-(--flag-red) animate-pulse" />
          Styled
        </p>
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              Component: FlagCn,
              style: { filter: 'drop-shadow(0 8px 16px rgba(239,68,68,0.6))' },
              label: 'Shadow',
              color: 'flag-red',
            },
            {
              Component: FlagGb,
              style: {
                border: '3px solid var(--flag-blue)',
                borderRadius: '999px',
                boxShadow: 'var(--glow-blue)',
              },
              label: 'Outline',
              color: 'flag-blue',
            },
            {
              Component: FlagJp,
              style: { filter: 'saturate(0.7) brightness(1.1)' },
              label: 'Soft',
              color: 'flag-gold',
            },
          ].map((item, idx) => (
            <div
              key={item.label}
              className="group flex flex-col items-center gap-3 relative animate-rise"
              style={{ animationDelay: `${(idx + 4) * 50}ms` }}
            >
              {/* 3D container */}
              <div
                className="relative transition-transform duration-500 hover:scale-110 hover:-rotate-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <item.Component
                  width={56}
                  height={56}
                  style={item.style}
                  className="relative z-10"
                />

                {/* Hover glow */}
                <div
                  className={`absolute inset-0 bg-[var(--${item.color}-glow)] blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 -z-10`}
                />
              </div>

              <span className="text-xs font-medium text-(--muted) group-hover:text-(--ink) transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Language Switcher Demo */}
      <section className="rounded-2xl border-2 border-(--border) bg-linear-to-br from-(--surface) to-(--surface-2) p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-(--muted) mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-(--flag-green) animate-pulse" />
          Language Switcher
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {flagData.map(({ Component, code }, idx) => (
            <button
              key={code}
              className="group relative rounded-full p-1 hover:bg-(--surface-glass) border-2 border-transparent hover:border-(--flag-blue) transition-all duration-300 hover:scale-110 animate-rise"
              style={{ animationDelay: `${(idx + 7) * 50}ms` }}
              aria-label={`Country ${code.toUpperCase()}`}
              onClick={() => onFlagClick?.(code)}
            >
              <Component
                width={32}
                height={32}
                className="opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-md group-hover:drop-shadow-[0_4px_12px_rgba(59,130,246,0.6)]"
              />

              {/* Hover ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-(--flag-blue) opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 transition-all duration-300" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
