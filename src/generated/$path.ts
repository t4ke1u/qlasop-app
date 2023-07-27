export const pagesPath = {
  "project": {
    "timetable": {
      $url: (url?: { hash?: string }) => ({ pathname: '/project/timetable' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/project' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
