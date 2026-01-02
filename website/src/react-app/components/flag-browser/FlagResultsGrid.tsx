import type { FlagInfo } from '../../utils/flagData'
import FlagItem from './FlagItem'

interface FlagResultsGridProps {
  flags: FlagInfo[]
  selectedFlagCode?: string
  onSelect: (flag: FlagInfo) => void
}

export default function FlagResultsGrid({
  flags,
  selectedFlagCode,
  onSelect,
}: FlagResultsGridProps) {
  if (flags.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <p className="text-(--muted) text-sm">No flags match your filters.</p>
        <p className="text-(--muted)/70 text-xs mt-2">Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <>
      {flags.map(flag => (
        <FlagItem
          key={flag.code}
          flag={flag}
          isSelected={selectedFlagCode === flag.code}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}
