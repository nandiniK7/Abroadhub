// Adapter switch — UI components import `api` from here and never know if mock/real is used.
// Switch is controlled by REACT_APP_USE_MOCKS.
import { mockAdapter } from './mockAdapter';
import { realAdapter } from './realAdapter';

const useMocks = String(process.env.REACT_APP_USE_MOCKS).toLowerCase() === 'true';

export const api = useMocks ? mockAdapter : realAdapter;
export const IS_MOCK = useMocks;
