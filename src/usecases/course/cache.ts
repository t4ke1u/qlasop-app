export const courseCacheKeyGenerator = {
  generateItemKey: (id: string) => {
    return ['COURSE', 'ITEM', id] as const
  },
}
