import ResizeObserver from "resize-observer-polyfill";

globalThis.ResizeObserver = ResizeObserver;

const cssMock = { default: {} };

if (typeof require !== 'undefined') {
    (require as any).extensions['.css'] = () => cssMock;
    (require as any).extensions['.scss'] = () => cssMock;
}

import.meta.env.VITE_API_BASE_URL = "/api/";
