/// <reference types="vite/client" />

/**
 * 环境变量类型定义
 * 所有以 VITE_ 开头的环境变量都需要在这里定义类型
 */
interface ImportMetaEnv {
  /**
   * API 基础 URL
   * @example http://localhost:3001/api
   * @example http://8.159.141.134:3001/api
   */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

