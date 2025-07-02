import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5500,  // 포트를 5500으로 고정
    host: true   // 모든 네트워크 인터페이스에서 접근 가능
  }
})
