import type { ComponentType, SVGProps } from 'react'
import * as Flags from '@sankyu/react-circle-flags'

export type FlagComponent = ComponentType<SVGProps<SVGSVGElement>>

export const flagComponentMap = Flags as unknown as Record<string, FlagComponent>
