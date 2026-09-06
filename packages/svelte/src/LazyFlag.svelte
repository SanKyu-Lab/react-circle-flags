<script lang="ts">
  import type { Component, Snippet } from 'svelte'
  import type { SVGAttributes } from 'svelte/elements'
  import { coerceFlagCode } from '@sankyu/circle-flags-core'
  import { flagLoaders } from './flags/lazy'

  /**
   * Lazy-loading flag component for runtime country codes.
   *
   * Renders nothing (or the `fallback` snippet) until the flag's async chunk
   * resolves. Bundlers split one chunk per flag, so only the rendered flags
   * are ever downloaded — unlike `DynamicFlag`, which bundles every flag.
   *
   * @example
   * <LazyFlag code={countryCode} width={32} height={32} />
   */
  interface Props
    extends Omit<SVGAttributes<SVGSVGElement>, 'width' | 'height' | 'title'> {
    code: string
    width?: number | string
    height?: number | string
    className?: string
    title?: string
    fallback?: Snippet
  }

  let {
    code,
    width = 48,
    height = 48,
    class: classProp = undefined,
    className: classNameProp = undefined,
    title,
    fallback,
    ...rest
  }: Props = $props()

  const finalClass = $derived(classNameProp ?? classProp)
  const resolvedCode = $derived(coerceFlagCode(code, 'xx'))
  const loadFlag = $derived(flagLoaders[resolvedCode])

  let Flag = $state<Component | undefined>(undefined)

  $effect(() => {
    let cancelled = false
    Flag = undefined
    loadFlag?.().then(module => {
      if (!cancelled) Flag = module.default
    })
    return () => {
      cancelled = true
    }
  })
</script>

{#if Flag}
  <Flag {...rest} {width} {height} class={finalClass} {title} />
{:else if fallback}
  {@render fallback()}
{/if}
