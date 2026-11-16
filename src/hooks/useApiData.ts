'use client';

import { useCallback, useEffect, useRef, useState, type SetStateAction } from 'react';

import { errorMessage } from '@/lib/api/errors';

type Key = string | number | boolean | null | undefined;

interface State<T> {
  data: T | null;
  error: string | null;
  /** which inputs the current data/error belong to */
  key: string | null;
}

/**
 * Loads data from the API and keeps loading / error state.
 *
 *   const { data, loading, error, reload, setData } = useApiData(() => studentService.list({ search }), [search]);
 *
 * `deps` are the plain values the request depends on; it runs again when one changes, and answers that arrive after
 * the inputs changed are ignored. The previous data stays visible while the next request runs.
 */
export function useApiData<T>(load: () => Promise<T>, deps: Key[]) {
  const [state, setState] = useState<State<T>>({ data: null, error: null, key: null });
  const [version, setVersion] = useState(0);
  const loadRef = useRef(load);

  useEffect(() => {
    loadRef.current = load;
  });

  const key = `${JSON.stringify(deps)}#${version}`;

  useEffect(() => {
    let active = true;
    loadRef.current().then(
      (data) => active && setState({ data, error: null, key }),
      (err: unknown) =>
        active && setState((prev) => ({ data: prev.data, error: errorMessage(err), key })),
    );
    return () => {
      active = false;
    };
  }, [key]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  const setData = useCallback(
    (next: SetStateAction<T | null>) =>
      setState((prev) => ({
        ...prev,
        data:
          typeof next === 'function' ? (next as (value: T | null) => T | null)(prev.data) : next,
      })),
    [],
  );

  return { data: state.data, loading: state.key !== key, error: state.error, reload, setData };
}
