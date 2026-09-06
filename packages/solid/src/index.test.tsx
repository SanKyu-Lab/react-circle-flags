import { describe, expect, it } from 'vitest'
import { coerceFlagCode } from '@sankyu/circle-flags-core'
import { FlagUtils } from './index'
import { render } from 'solid-js/web'
import { FlagUs } from '../generated/flags/us'

describe('@sankyu/solid-circle-flags', () => {
  it('namespaces inline SVG ids per flag to avoid document-wide collisions', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(() => <FlagUs width={32} />, container)
    const mask = container.querySelector('mask')
    expect(mask?.id).toBe('cf-us-a')
    expect(container.innerHTML).toContain('url(#cf-us-a)')
  })

  it('FlagUtils.isValidCountryCode works', () => {
    expect(FlagUtils.isValidCountryCode('us')).toBe(true)
    expect(FlagUtils.isValidCountryCode('zzzz')).toBe(false)
  })

  it('FlagUtils.formatCountryCode works', () => {
    expect(FlagUtils.formatCountryCode('us')).toBe('US')
    expect(FlagUtils.formatCountryCode('cn')).toBe('CN')
  })

  it('FlagUtils.getComponentName works', () => {
    expect(FlagUtils.getComponentName('us')).toBe('FlagUs')
    expect(FlagUtils.getComponentName('gb-eng')).toBe('FlagGbEng')
  })

  it('coerceFlagCode coerces unknown code to xx', () => {
    expect(coerceFlagCode('zzzz')).toBe('xx')
  })
})
