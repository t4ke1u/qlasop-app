const buildSuffix = (url?: {hash?: string, query?: Record<string, string>}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  $url: (url?: { hash?: string }) => ({ hash: url?.hash, path: `/${buildSuffix(url)}`, pathname: '/' as const }),
  "dashboard": {
    "log_in": {
      $url: (url?: { hash?: string }) => ({ hash: url?.hash, path: `/dashboard/log-in${buildSuffix(url)}`, pathname: '/dashboard/log-in' as const })
    }
  },
  "trial_project": {
    $url: (url?: { hash?: string }) => ({ hash: url?.hash, path: `/trial-project${buildSuffix(url)}`, pathname: '/trial-project' as const }),
    "optimize": {
      $url: (url?: { hash?: string }) => ({ hash: url?.hash, path: `/trial-project/optimize${buildSuffix(url)}`, pathname: '/trial-project/optimize' as const })
    },
    "search": {
      $url: (url?: { hash?: string }) => ({ hash: url?.hash, path: `/trial-project/search${buildSuffix(url)}`, pathname: '/trial-project/search' as const }),
      _courseId: (courseId: string | number) => ({
        $url: (url?: { hash?: string }) => ({ hash: url?.hash, path: `/trial-project/search/${courseId}${buildSuffix(url)}`, pathname: '/trial-project/search/[courseId]' as const, query: { courseId } })
      })
    },
    "timetable": {
      $url: (url?: { hash?: string }) => ({ hash: url?.hash, path: `/trial-project/timetable${buildSuffix(url)}`, pathname: '/trial-project/timetable' as const })
    }
  }
};

export type PagesPath = typeof pagesPath;
