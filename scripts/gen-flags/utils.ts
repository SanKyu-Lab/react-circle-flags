/**
 * Convert ISO country code to flag emoji
 * Examples:
 * - us -> 🇺🇸
 * - cn -> 🇨🇳
 * - ad -> 🇦🇩
 */
export function codeToEmoji(code: string): string {
  const upperCode = code.toUpperCase().slice(0, 2)
  if (upperCode.length < 2) return '🏳️'

  // Regional Indicator Symbol A starts at 0x1F1E6
  const base = 0x1f1e6
  const aCode = 'A'.charCodeAt(0)

  return [...upperCode]
    .map(char => String.fromCodePoint(base + char.charCodeAt(0) - aCode))
    .join('')
}

/**
 * Convert file code to valid JavaScript identifier
 * Examples:
 * - `af-emirate` -> `AfEmirate` -> `FlagAfEmirate`
 * - `aq-true_south` -> `AqTrueSouth` -> `FlagAqTrueSouth`
 * - `it-72` -> `It72` -> `FlagIt72`
 * - `ru-cu` -> `RuCu` -> `FlagRuCu`
 */
export function codeToComponentName(code: string): string {
  // Remove special characters and convert to PascalCase
  const cleanName = code
    .toLowerCase()
    .split(/[-_\s]+/) // Split on hyphens, underscores, spaces
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  // Ensure it doesn't start with a number
  const safeName = /^[0-9]/.test(cleanName) ? `Flag_${cleanName}` : cleanName

  return `Flag${safeName}`
}
