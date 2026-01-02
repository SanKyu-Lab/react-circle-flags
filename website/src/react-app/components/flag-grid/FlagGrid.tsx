import {
  FlagGb,
  FlagUs,
  FlagCn,
  FlagRu,
  FlagFr,
  FlagBr,
  FlagCa,
  FlagSg,
  FlagSu,
} from '@sankyu/react-circle-flags'
import { useState } from 'react'
import clm from 'country-locale-map'

const countries = [
  { code: 'GB', Component: FlagGb, color: 'flag-blue' },
  { code: 'US', Component: FlagUs, color: 'flag-red' },
  { code: 'CN', Component: FlagCn, color: 'flag-red' },
  { code: 'RU', Component: FlagRu, color: 'flag-blue' },
  { code: 'FR', Component: FlagFr, color: 'flag-blue' },
  { code: 'BR', Component: FlagBr, color: 'flag-green' },
  { code: 'CA', Component: FlagCa, color: 'flag-red' },
  { code: 'SG', Component: FlagSg, color: 'flag-red' },
  { code: 'SU', Component: FlagSu, color: 'flag-red' },
]

const resolveCountryName = (code: string) => clm.getCountryNameByAlpha2(code) ?? code

export default function FlagGrid() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [hoveredCode, setHoveredCode] = useState<string | null>(null)
  const selectedCountry = countries.find(c => c.code === selectedCode)

  return (
    <div className="space-y-6">
      {/* Flag grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {countries.map(({ code, Component, color }, idx) => {
          const isSelected = selectedCode === code
          const isHovered = hoveredCode === code

          return (
            <button
              key={code}
              onClick={() => setSelectedCode(selectedCode === code ? null : code)}
              onMouseEnter={() => setHoveredCode(code)}
              onMouseLeave={() => setHoveredCode(null)}
              aria-pressed={isSelected}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 animate-rise ${
                isSelected
                  ? 'border-(--flag-blue) bg-gradient-to-br from-(--flag-blue-glow) to-transparent shadow-(--glow-blue) scale-105'
                  : 'border-(--border) bg-gradient-to-br from-(--surface) to-(--surface-2) hover:border-(--border-strong) hover:scale-105'
              }`}
              style={{
                animationDelay: `${idx * 40}ms`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 3D flag container */}
              <div className="flex aspect-square flex-col items-center justify-center gap-2.5 p-3 relative z-10">
                <div
                  className={`transition-all duration-500 ${
                    isHovered ? 'scale-110 -rotate-6' : isSelected ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    filter:
                      isSelected || isHovered
                        ? 'drop-shadow(0 12px 24px rgba(59, 130, 246, 0.6))'
                        : 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                  }}
                >
                  <Component width={60} height={60} />
                </div>

                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    isSelected ? 'text-(--flag-blue)' : 'text-(--muted)'
                  } group-hover:text-(--flag-blue)`}
                >
                  {code}
                </span>
              </div>

              {/* Hover name label */}
              <div
                className={`absolute inset-x-0 bottom-0 flex items-center justify-center px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <span className="truncate">{resolveCountryName(code)}</span>
              </div>

              {/* Glow background */}
              <div
                className={`absolute inset-0 bg-[var(--${color}-glow)] blur-2xl transition-opacity duration-300 ${
                  isSelected || isHovered ? 'opacity-60' : 'opacity-0'
                }`}
              />

              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-(--flag-blue) border-2 border-white shadow-lg z-20 animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      {/* Details panel */}
      <div
        className={`rounded-2xl border-2 transition-all duration-500 ${
          selectedCountry
            ? 'border-(--flag-blue) bg-gradient-to-br from-(--surface-glass) to-(--surface) shadow-(--glow-blue) scale-100 opacity-100'
            : 'border-(--border) bg-gradient-to-br from-(--surface) to-(--surface-2) scale-95 opacity-70'
        } p-6`}
        style={{
          backdropFilter: selectedCountry ? 'blur(16px) saturate(180%)' : 'none',
        }}
      >
        {selectedCountry ? (
          <div className="flex flex-wrap items-center gap-6 animate-rise">
            {/* Flag display */}
            <div className="flex items-center gap-5">
              <div
                className="relative"
                style={{
                  transformStyle: 'preserve-3d',
                  filter: 'drop-shadow(0 16px 32px rgba(59, 130, 246, 0.7))',
                }}
              >
                <selectedCountry.Component width={72} height={72} />

                {/* Orbiting halo */}
                <div className="absolute inset-0 rounded-full border-2 border-(--flag-blue) opacity-50 animate-ping" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-(--flag-blue) mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--flag-blue) animate-pulse" />
                  Pinned
                </p>
                <h3 className="text-xl font-extrabold text-(--ink)">
                  {resolveCountryName(selectedCountry.code)}
                </h3>
              </div>
            </div>

            {/* Metadata pills */}
            <div className="ml-auto flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full border-2 border-(--flag-blue) bg-(--flag-blue-glow) px-4 py-2 font-bold text-(--flag-blue) shadow-(--glow-blue)">
                ISO {selectedCountry.code}
              </span>
              <span className="rounded-full border-2 border-(--border-strong) bg-(--surface) px-4 py-2 font-mono font-medium text-(--muted)">
                Flag{selectedCountry.code}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-(--muted) text-center leading-relaxed">
            Click any flag to view its ISO code and component name ✨
          </p>
        )}
      </div>
    </div>
  )
}
