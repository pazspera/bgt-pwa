// <reference types="vite/client" />
interface ImportMetaEnv {
VITE_API_BASE_URL: string,
  VITE_API_HEALTH_BASE_URL: string,
  VITE_MOCK_API: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*?raw" {
  const content: string;
  export default content;
}