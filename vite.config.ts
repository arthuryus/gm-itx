import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, env)

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: env.VITE_FRONTEND_HOST || '0.0.0.0',
      port: Number(env.VITE_FRONTEND_PORT) || 5174,
      proxy: {
        [env.VITE_API_BASE_PATH]: {
          target: env.VITE_API_ORIGIN,
          changeOrigin: false,
          secure: false,
        }
      }
    },
  }
})


// TMP   //const apiProxyPath = apiBasePath.replace(/\/api\/client/, "");
/*server: {
  //host: '0.0.0.0', // '0.0.0.0', // 'lm-itx.loc', // true
  //port: 3000,
  //allowedHosts: ["lm-itx.loc"],
  //strictPort: true,
  //cors: true,
  cors: true,
  proxy: {
    // Прокси для API, если ваше API работает на сервере Yii2
    '/api': 'http://lm-itx.loc',
    '/api/client': 'http://localhost:8082',//http://lm-itx.loc/lm-itx',
  },
  proxy: {
    "/api": {
      target: "http://lm-itx.loc",
      changeOrigin: true,
      secure: false,
    }
  },
},*/