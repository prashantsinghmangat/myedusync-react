
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false
      }
    }
  })

  const html = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </QueryClientProvider>
  )

  const dehydratedState = JSON.stringify(queryClient.getQueryCache().getAll().map(query => {
    return {
      queryKey: query.queryKey,
      data: query.state.data
    }
  }))

  return { html, dehydratedState }
}
