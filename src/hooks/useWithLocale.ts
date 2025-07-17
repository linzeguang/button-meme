import { useMemo, useCallback } from 'react'

import { useAtomValue } from 'jotai/react'

import { localeAtom } from '@/stores/settings'

export function useMemoWithLocale<T>(...[factory, deps]: Parameters<typeof useMemo<T>>) {
  const locale = useAtomValue(localeAtom)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<T>(factory, [...deps, locale])
}

export function useCallbackWithLocale(...[factory, deps]: Parameters<typeof useCallback>) {
  const locale = useAtomValue(localeAtom)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(factory, [...deps, locale])
}
