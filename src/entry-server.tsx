
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Don't retry on the server
        retry: false,
        // Don't refetch on the server
        refetchOnWindowFocus: false,
        // Don't refetch on mount on the server
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

  // Get the dehydrated state
  const dehydratedState = JSON.stringify(queryClient.getQueryCache().getAll().map(query => {
    return {
      queryKey: query.queryKey,
      data: query.state.data
    }
  }))

  return { html, dehydratedState }
}
