/**
 * App-wide signals raised by the API client's interceptors. The AuthProvider and the SnackbarProvider listen, so a
 * page never has to handle "session expired" or "subscription paused" itself.
 */
export type ApiEvent =
  | { type: 'sessionExpired' }
  | { type: 'subscriptionInactive'; message: string }
  | { type: 'passwordChangeRequired' }
  | { type: 'forbidden'; message: string };

type Listener = (event: ApiEvent) => void;
const listeners = new Set<Listener>();

export const apiEvents = {
  on(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  emit(event: ApiEvent) {
    listeners.forEach((listener) => {
      try {
        listener(event);
      } catch {
        // a broken listener must never break the request that triggered it
      }
    });
  },
};
