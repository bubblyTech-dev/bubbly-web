'use client';

import { useCallback, useEffect, useRef, useState, type SetStateAction } from 'react';

import { errorMessage, isCancelled } from '@/lib/api/errors';
import { useSnackbar } from '@/providers/SnackbarProvider';

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
 * The first load's error is returned as `error` (the page shows it); when a later reload fails while data is already
 * on screen, a snackbar tells the user instead. Never throws.
 */
export function useApiData<T>(load: () => Promise<T>, deps: Key[]) {
  const snackbar = useSnackbar();
  const [state, setState] = useState<State<T>>({ data: null, error: null, key: null });
  const [version, setVersion] = useState(0);
  const loadRef = useRef(load);
  const hasData = useRef(false);

  useEffect(() => {
    loadRef.current = load;
  });

  const key = `${JSON.stringify(deps)}#${version}`;

  useEffect(() => {
    let active = true;
    const handle = async () => {
      try {
        const data = await loadRef.current();
        if (!active) return;
        hasData.current = true;
        setState({ data, error: null, key });
      } catch (error) {
        if (!active || isCancelled(error)) return;
        const message = errorMessage(error);
        if (hasData.current) snackbar.error(message);
        setState((prev) => ({ data: prev.data, error: message, key }));
      }
    };
    void handle();
    return () => {
      active = false;
    };
  }, [key, snackbar]);

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
