
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
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

  const helmetContext = {};

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )

  const dehydratedState = JSON.stringify(queryClient.getQueryCache().getAll().map(query => {
    return {
      queryKey: query.queryKey,
      data: query.state.data
    }
  }))

  return { html, dehydratedState, helmetContext }
}
