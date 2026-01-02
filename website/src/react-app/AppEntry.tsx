import '@fontsource/syne/400.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/crimson-pro/400.css'
import '@fontsource/crimson-pro/600.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/fira-code/400.css'
import '@fontsource/fira-code/500.css'
import './index.css'
import { StrictMode } from 'react'
import App from './App'
import { NuqsAdapter } from 'nuqs/adapters/react'

export default function AppEntry() {
  return (
    <StrictMode>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </StrictMode>
  )
}
