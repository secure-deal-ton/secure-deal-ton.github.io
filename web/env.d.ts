/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TONWEB_API_BASE_URI: string;
    readonly VITE_TONWEB_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
