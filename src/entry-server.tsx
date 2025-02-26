
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function render(url: string) {
  const queryClient = new QueryClient()

  const html = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </QueryClientProvider>
  )

  // Serialize the React Query cache
  const dehydratedState = JSON.stringify(queryClient.getQueryCache().getAll())

  return { html, dehydratedState }
}
