import type { FlagInfo } from '../../utils/flagData'
import { flagComponentMap } from './flagComponent'

interface FlagItemProps {
  flag: FlagInfo
  isSelected: boolean
  onSelect: (flag: FlagInfo) => void
}

export default function FlagItem({ flag, isSelected, onSelect }: FlagItemProps) {
  const FlagComponent = flagComponentMap[flag.componentName]
  if (!FlagComponent) {
    return null
  }

  return (
    <button
      onClick={() => onSelect(flag)}
      className={`group relative overflow-hidden rounded-2xl border transition-all ${
        isSelected
          ? 'border-(--accent) bg-[oklch(0.6692_0.1607_245.011_/0.16)] shadow-(--shadow-md) scale-105'
          : 'border-(--border-weak) bg-(--overlay-soft) hover:border-(--border-strong) hover:bg-(--overlay-mid) hover:shadow-(--shadow-sm) hover:scale-105'
      }`}
    >
      <div className="flex aspect-square flex-col items-center justify-center gap-2 p-3">
        <FlagComponent
          width={48}
          height={48}
          className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        />
        <span className="text-[9px] uppercase tracking-[0.25em] text-(--muted) truncate w-full text-center">
          {flag.code}
        </span>
      </div>

      <div className="absolute inset-0 bg-[oklch(0.2097_0.008_274.5332_/_0.82)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
        <span className="text-xs font-medium text-(--ink) text-center line-clamp-2">
          {flag.countryName}
        </span>
        <span className="text-[9px] text-(--accent) uppercase tracking-wider">{flag.code}</span>
      </div>
    </button>
  )
}
