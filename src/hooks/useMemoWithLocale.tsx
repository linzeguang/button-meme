import { useMemo } from 'react'

import { useAtomValue } from 'jotai/react'

import { localeAtom } from '@/stores/settings'

function useMemoWithLocale<T>(...[factory, deps]: Parameters<typeof useMemo<T>>) {
  const locale = useAtomValue(localeAtom)

  return useMemo<T>(factory, [...deps, locale])
}

export default useMemoWithLocale
