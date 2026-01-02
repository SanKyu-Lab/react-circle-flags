import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'ghost' | 'solid'

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: Variant
}

export default function LinkButton({
  children,
  variant = 'ghost',
  className = '',
  ...rest
}: LinkButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition cursor-alias'

  const styles =
    variant === 'solid'
      ? 'bg-(--accent) text-(--accent-contrast) border border-(--border-accent) shadow-(--shadow-sm) hover:shadow-(--shadow-md)'
      : 'border border-(--border-weak) bg-(--overlay-soft) text-(--ink) hover:border-(--accent) hover:text-(--accent)'

  const rel =
    rest.target === '_blank'
      ? [rest.rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ')
      : rest.rel

  return (
    <a className={`${base} ${styles} ${className}`.trim()} rel={rel} {...rest}>
      {children}
    </a>
  )
}
