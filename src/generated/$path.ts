const buildSuffix = (url?: { hash?: string; query?: Record<string, string> }) => {
  const query = url?.query
  const hash = url?.hash
  if (!query && !hash) return ''
  const search = query ? `?${new URLSearchParams(query)}` : ''
  return `${search}${hash ? `#${hash}` : ''}`
}

export const pagesPath = {
  $url: (url?: { hash?: string }) => ({
    hash: url?.hash,
    path: `/${buildSuffix(url)}`,
    pathname: '/' as const,
  }),
  dashboard: {
    log_in: {
      $url: (url?: { hash?: string }) => ({
        hash: url?.hash,
        path: `/dashboard/log-in${buildSuffix(url)}`,
        pathname: '/dashboard/log-in' as const,
      }),
    },
  },
  trial_project: {
    $url: (url?: { hash?: string }) => ({
      hash: url?.hash,
      path: `/trial-project${buildSuffix(url)}`,
      pathname: '/trial-project' as const,
    }),
    timetable: {
      $url: (url?: { hash?: string }) => ({
        hash: url?.hash,
        path: `/trial-project/timetable${buildSuffix(url)}`,
        pathname: '/trial-project/timetable' as const,
      }),
    },
  },
}

export type PagesPath = typeof pagesPath
