import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// WhatsApp/Facebook link previews need an absolute image URL.
// The site address comes from SITE_URL (set it in .env or your host's settings),
// or automatically from Netlify (URL) / Vercel (VERCEL_PROJECT_PRODUCTION_URL).
function siteUrlPlugin(env) {
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  const url = (env.SITE_URL || env.URL || vercel || '').replace(/\/+$/, '')
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
  }
}

// Extra pages, each with its own index.html (and its own WhatsApp preview)
const PAGES = ['vijay-invitation']

// In dev, /vijay-invitation → /vijay-invitation/ (static hosts do this for you)
function trailingSlashPlugin() {
  return {
    name: 'page-trailing-slash',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const [path, query] = req.url.split('?')
        if (PAGES.includes(path.replace(/^\//, ''))) {
          res.writeHead(301, { Location: `${path}/${query ? `?${query}` : ''}` })
          return res.end()
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  return {
    plugins: [react(), siteUrlPlugin(env), trailingSlashPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          ...Object.fromEntries(PAGES.map((p) => [p, resolve(import.meta.dirname, p, 'index.html')])),
        },
      },
    },
  }
})
