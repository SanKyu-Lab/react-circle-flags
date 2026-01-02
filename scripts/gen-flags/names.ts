import isoEntries from './libs/iso-3166.json'
import otherNames from './libs/others.json'

type IsoEntry = {
  alpha2: string
  name: string
}

type OtherEntry = {
  id: number | null
  alpha2: string
  alpha3: string | null
  name: string
}

const isoNameMap = (isoEntries as IsoEntry[]).reduce<Record<string, string>>((acc, entry) => {
  const code = entry.alpha2.toLowerCase()
  acc[code] = entry.name
  return acc
}, {})

const otherNameMap = (otherNames as OtherEntry[]).reduce<Record<string, string>>((acc, entry) => {
  const code = entry.alpha2.toLowerCase()
  acc[code] = entry.name
  return acc
}, {})
const stringMap: Record<string, string> = {
  ...isoNameMap,
  ...otherNameMap,
}

export function getString(code: string): string {
  const codeLower = code.toLowerCase()
  return stringMap[codeLower] || code.toUpperCase()
}

export function getStringMap(): Record<string, string> {
  return stringMap
}

export function getCountryNameMap(): Record<string, string> {
  return stringMap
}

export function getCountryName(code: string): string {
  return getString(code)
}
