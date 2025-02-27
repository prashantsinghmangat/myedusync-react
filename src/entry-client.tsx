
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: any;
  }
}

// Only run this code in the browser
if (typeof window !== 'undefined') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
  })

  // Hydrate the React Query cache if available
  if (window.__REACT_QUERY_STATE__) {
    queryClient.setQueriesData(window.__REACT_QUERY_STATE__)
  }

  hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
