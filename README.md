<div align="center">
  <img src="./website/public/favicon.svg" alt="@sankyu/react-circle-flags" width="120" height="120" />
</div>

<div align="center">

# @sankyu/react-circle-flags

[![npm version](https://img.shields.io/npm/v/%40sankyu%2Freact-circle-flags?style=flat-square&label=%40sankyu%2Freact-circle-flags)](https://www.npmjs.com/package/@sankyu/react-circle-flags) [![npm downloads](https://img.shields.io/npm/dm/@sankyu/react-circle-flags.svg?style=flat-square&label=NPM%20Downloads)](https://www.npmjs.com/package/@sankyu/react-circle-flags) [![Bundle Size](https://img.shields.io/bundlephobia/minzip/@sankyu/react-circle-flags?style=flat-square&label=Bundle%20Size)](https://bundlephobia.com/package/@sankyu/react-circle-flags)

[![TypeScript Supported](https://img.shields.io/badge/TypeScript-Supported-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![React Ready](https://img.shields.io/badge/React-%3E%3D16.0.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/) [![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square&logo=opensourceinitiative)](./LICENSE)

:star: **Star us on <a href="https://github.com/Sankyu-Lab/react-circle-flags" target="_blank">GitHub</a>** | :bug: **Report Issues <a href="https://github.com/Sankyu-Lab/react-circle-flags/issues" target="_blank">here</a>**

</div>

---

Welcome to `@sankyu/react-circle-flags`, a modern React library for circular flag components.

## 📖 Overview

This library provides **400+ circular SVG flag components** with **Full-TypeScript support** & **Tree-shaking Optimization**.

Perfect for applications that need fast, crisp country flags without external image requests.

:rocket: **Explore the <a href="https://sankyu-lab.github.io/react-circle-flags/browse" target="_blank">Demo Gallery</a>** | :book: **Read the <a href="https://sankyu-lab.github.io/react-circle-flags/docs/guides/getting-started/" target="_blank">Documentation</a>**

---

## ✨ Key Features

> [!TIP]
> For more information, you may refer to the <a href="https://sankyu-lab.github.io/react-circle-flags/docs/guides/getting-started/#-key-features" target="_blank">Documentation</a>.

- 🎯 **Tree-shakable** - Only bundle the flags you use
- 📦 **TypeScript** - Full type definitions included
- ⚡ **Zero dependencies** - Only requires React as peer dependency
- 🎨 **Inline SVG** - No external requests, works offline
- 🔧 **Fully customizable** - All standard SVG props supported
- 📱 **SSR compatible** - Works with `Next.js`, `Remix`, etc.
- 🪶 **Lightweight** - Each flag is ~1-3KB

## 📦 Installation

> [!TIP]
> For more information, you may refer to the <a href="https://sankyu-lab.github.io/react-circle-flags/docs/guides/installation/" target="_blank">Installation Guide</a>.

```bash
npm install @sankyu/react-circle-flags
# or
pnpm add @sankyu/react-circle-flags
# or
yarn add @sankyu/react-circle-flags
# or
bun add @sankyu/react-circle-flags
```

## 🚀 Usage

> [!TIP]
> For more information, you may refer to the <a href="https://sankyu-lab.github.io/react-circle-flags/docs/guides/getting-started/usage/" target="_blank">Usage Guide</a>.

### Import individual flags (Recommended)

```tsx
import { FlagUs, FlagCn, FlagGb } from '@sankyu/react-circle-flags'

export default function App() {
  return (
    <div>
      <FlagUs width={48} height={48} />
      <FlagCn width={48} height={48} />
      <FlagGb width={48} height={48} />
    </div>
  )
}
```

### With custom styling

```tsx
import { FlagUs } from '@sankyu/react-circle-flags'

export default function StyledFlag() {
  return (
    <FlagUs
      width={64}
      height={64}
      className="shadow-lg rounded-full"
      style={{ border: '2px solid #000' }}
    />
  )
}
```

### Dynamic flag selection

> [!WARNING]
> ⚠️ Using `DynamicFlag` or `import * as Flags` will pull all flag components into the bundle, which can reduce tree-shaking efficiency and increase bundle size.

> [!TIP]
> For more information, you may refer to the <a href="https://sankyu-lab.github.io/react-circle-flags/docs/guides/getting-started/dynamic-flags/" target="_blank">Dynamic Flag Selection</a> section in the documentation.

```tsx
import { DynamicFlag } from '@sankyu/react-circle-flags'

interface CountryFlagProps {
  countryCode: string
  size?: number
}

export const CountryFlag = ({ countryCode, size = 48 }: CountryFlagProps) => {
  return <DynamicFlag code={countryCode} width={size} height={size} />
}

// Usage
;<CountryFlag countryCode="us" size={64} />
```

## 📚 API

### Flag Components

Each flag component accepts all standard SVG props:

```tsx
interface FlagProps extends SVGProps<SVGSVGElement> {
  width?: number | string
  height?: number | string
  className?: string
  style?: CSSProperties
  // ... all other SVG props
}
```

### Available Flags

Each flag is exported with the pattern `Flag{PascalCase ISO_CODE}` (for example, `FlagUs`, `FlagCn`). Convenience aliases are provided for common two-letter codes: `FlagUs`, `FlagCn`, `FlagGb`, `FlagJp`.

- `FlagUs` - United States
- `FlagCn` - China
- `FlagGb` - United Kingdom
- `FlagJp` - Japan
- ... and many more

See the <a href="https://sankyu-lab.github.io/react-circle-flags/browse" target="_blank">Full list of flags</a> in the circle-flags gallery.

## 🎨 Styling

> [!TIP]
> For more information, you may refer to the <a href="https://sankyu-lab.github.io/react-circle-flags/docs/guides/getting-started/styling/" target="_blank">Styling Guide</a>.

## 🔧 TypeScript

Full TypeScript support is included out of the box.

> For more information, you may refer to the <a href="https://sankyu-lab.github.io/react-circle-flags/docs/guides/getting-started/typescript/" target="_blank">TypeScript Guide</a>.

## 📖 Examples

### Next.js App Router

```tsx
import { FlagUs, FlagCn } from '@sankyu/react-circle-flags'

export default function Page() {
  return (
    <main>
      <h1>Country Flags</h1>
      <div className="flex gap-4">
        <FlagUs width={64} height={64} />
        <FlagCn width={64} height={64} />
      </div>
    </main>
  )
}
```

### With React Query

```tsx
import { useQuery } from '@tanstack/react-query'
import { DynamicFlag } from '@sankyu/react-circle-flags'

function CountryInfo({ code }: { code: string }) {
  const { data } = useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountryData(code),
  })

  return (
    <div>
      <DynamicFlag code={code.toLowerCase()} width={48} height={48} />
      <p>{data?.name}</p>
    </div>
  )
}
```

## 🤝 Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

`@sankyu/react-circle-flags` is licensed under the MIT License, © <a href="https://github.com/Sankyu-Lab" target="_blank">Sankyu Lab</a>

[website](./website/) is licensed under the GPL-3.0 License, © <a href="https://github.com/Sankyu-Lab" target="_blank">Sankyu Lab</a>

## 🙏 Credits

- Flag designs from <a href="https://github.com/HatScripts/circle-flags" target="_blank">HatScripts/circle-flags</a>
- Built with <a href="https://github.com/egoist/tsup" target="_blank">tsup</a>
