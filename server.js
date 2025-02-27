
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      // Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template)

      // Load server entry
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      // Render the app
      const { html: appHtml, dehydratedState, helmetContext } = await render(url)

      // Get Helmet data
      const { helmet } = helmetContext

      // Inject meta tags and other SEO elements
      const seoHtml = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      `

      // Inject the app-rendered HTML and React Query state into the template
      const html = template
        .replace('</head>', `${seoHtml}</head>`)
        .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
        .replace(
          '</head>',
          `<script>window.__REACT_QUERY_STATE__ = ${dehydratedState}</script></head>`
        )

      // Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
  })
}

createServer()
