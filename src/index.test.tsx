import { render, screen, waitFor } from '@testing-library/react'
import {
  CircleFlag,
  DynamicFlag,
  FlagUtils,
  FlagSizes,
  getSizeName,
  buildMeta,
  FLAG_REGISTRY,
} from './index'
import { FlagUs } from '../generated/flags/us'
import { FlagCn } from '../generated/flags/cn'

describe('Main exports', () => {
  test('should export CircleFlag component', () => {
    expect(CircleFlag).toBeDefined()
    expect(typeof CircleFlag).toBe('function')
  })

  test('should export DynamicFlag component', () => {
    expect(DynamicFlag).toBeDefined()
    expect(typeof DynamicFlag).toBe('function')
  })

  test('should export individual flag components', () => {
    expect(FlagUs).toBeDefined()
    expect(FlagCn).toBeDefined()
    expect(typeof FlagUs).toBe('function')
    expect(typeof FlagCn).toBe('function')
  })
})

describe('CircleFlag component', () => {
  test('should render with default props', () => {
    render(<CircleFlag countryCode="us" />)
    const flag = screen.getByRole('img')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveAttribute('viewBox')
  })

  test('should support backward compatible "code" prop', () => {
    render(<CircleFlag code="us" />)
    const flag = screen.getByRole('img')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveAttribute('viewBox')
  })

  test('should prioritize countryCode over code', () => {
    render(<CircleFlag countryCode="cn" code="us" data-testid="flag" />)
    const flag = screen.getByTestId('flag')
    expect(flag).toBeInTheDocument()
  })

  test('should render with custom props', () => {
    render(<CircleFlag countryCode="cn" width={48} height={48} className="test-flag" />)
    const flag = screen.getByRole('img')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveClass('test-flag')
  })

  test('should render different country codes', () => {
    const { rerender } = render(<CircleFlag countryCode="us" />)
    expect(screen.getByRole('img')).toBeInTheDocument()

    rerender(<CircleFlag countryCode="cn" />)
    expect(screen.getByRole('img')).toBeInTheDocument()

    rerender(<CircleFlag countryCode="jp" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('should handle uppercase country codes', () => {
    render(<CircleFlag countryCode="US" />)
    const flag = screen.getByRole('img')
    expect(flag).toBeInTheDocument()
  })

  test('should pass through SVG props', () => {
    const style = { border: '1px solid red' }
    render(<CircleFlag countryCode="us" style={style} data-testid="flag" />)
    const flag = screen.getByTestId('flag')
    expect(flag).toBeInTheDocument()
  })
})

describe('FlagUtils', () => {
  test('should validate country codes using the registry', () => {
    expect(FlagUtils.isValidCountryCode('us')).toBe(true)
    expect(FlagUtils.isValidCountryCode('invalid')).toBe(false)
  })

  test('should format country codes to uppercase', () => {
    expect(FlagUtils.formatCountryCode('uS')).toBe('US')
  })

  test('should get component names from codes with delimiters', () => {
    expect(FlagUtils.getComponentName('gb-wls')).toBe('FlagGbWls')
    expect(FlagUtils.getComponentName('123-abc')).toBe('FlagFlag_123Abc')
  })

  test('should expose sizes and resolve size names', () => {
    expect(FlagUtils.sizes).toEqual(FlagSizes)
    expect(FlagUtils.getSizeName(32)).toBe('md')
    expect(FlagUtils.getSizeName(999)).toBeNull()
  })
})

describe('Individual flag components', () => {
  test('FlagUs should render correctly', () => {
    render(<FlagUs data-testid="us-flag" />)
    const flag = screen.getByTestId('us-flag')
    expect(flag).toBeInTheDocument()
    expect(flag.tagName).toBe('svg')
  })

  test('FlagCn should render correctly', () => {
    render(<FlagCn data-testid="cn-flag" />)
    const flag = screen.getByTestId('cn-flag')
    expect(flag).toBeInTheDocument()
    expect(flag.tagName).toBe('svg')
  })

  test('should accept custom props', () => {
    render(
      <FlagUs
        width={64}
        height={64}
        className="custom-class"
        style={{ opacity: 0.8 }}
        data-testid="custom-flag"
      />
    )
    const flag = screen.getByTestId('custom-flag')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveClass('custom-class')
  })
})

describe('CircleFlag CDN loading', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should show loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(<CircleFlag countryCode="us" data-testid="flag" />)
    const flag = screen.getByTestId('flag')
    expect(flag).toBeInTheDocument()
  })

  test('should show error fallback on fetch failure', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<CircleFlag countryCode="us" data-testid="flag" />)

    await waitFor(() => {
      const text = screen.getByText('US')
      expect(text).toBeInTheDocument()
    })
  })

  test('should use custom CDN URL when provided', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => '<svg></svg>',
    })

    render(
      <CircleFlag countryCode="io" cdnUrl="https://hatscripts.github.io/circle-flags/flags/" />
    )

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://hatscripts.github.io/circle-flags/flags/io.svg'
      )
    })
  })
})

describe('getSizeName helper', () => {
  test('should return null when size not found', () => {
    expect(getSizeName(1)).toBeNull()
  })
})

describe('DynamicFlag component', () => {
  test('should render with default props', () => {
    render(<DynamicFlag code="us" />)
    const flag = screen.getByRole('img')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveAttribute('viewBox')
  })

  test('should render with custom props', () => {
    render(<DynamicFlag code="cn" width={64} height={64} className="test-flag" />)
    const flag = screen.getByRole('img')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveClass('test-flag')
  })

  test('should render different country codes', () => {
    const { rerender } = render(<DynamicFlag code="us" />)
    expect(screen.getByRole('img')).toBeInTheDocument()

    rerender(<DynamicFlag code="cn" />)
    expect(screen.getByRole('img')).toBeInTheDocument()

    rerender(<DynamicFlag code="jp" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('should handle uppercase country codes', () => {
    render(<DynamicFlag code="US" />)
    const flag = screen.getByRole('img')
    expect(flag).toBeInTheDocument()
  })

  test('should handle invalid country codes', () => {
    render(<DynamicFlag code="invalid" data-testid="invalid-flag" />)
    const flag = screen.getByTestId('invalid-flag')
    expect(flag).toBeInTheDocument()
    // Should show fallback with country code text
    expect(flag.textContent).toContain('INVALID')
  })
})

describe('Registry and metadata', () => {
  test('FLAG_REGISTRY should expose known mappings', () => {
    expect(FLAG_REGISTRY.us).toBe('FlagUs')
    expect(FLAG_REGISTRY.cn).toBe('FlagCn')
  })

  test('buildMeta should include version, commit, and builtAt', () => {
    expect(buildMeta.version).toMatch(/^[0-9]+\./)
    expect(buildMeta.commit).toBeTruthy()
    expect(Number.isFinite(buildMeta.builtAt)).toBe(true)
  })
})
