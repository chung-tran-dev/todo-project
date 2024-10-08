import { setupWorker } from 'msw/browser';
import { handlers as TodoHandlers } from './TodoHandler';

export const handlers = [
    ...TodoHandlers,
]
export const workerMock = setupWorker(...TodoHandlers);