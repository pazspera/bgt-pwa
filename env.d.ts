// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_BASE_URL: string,
  VITE_API_HEALTH_BASE_URL: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}