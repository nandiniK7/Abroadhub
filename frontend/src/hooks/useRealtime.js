import { useEffect } from 'react';
import { realtime } from '../services/realtime';

export function useRealtime(event, handler) {
  useEffect(() => realtime.subscribe(event, handler), [event, handler]);
}
