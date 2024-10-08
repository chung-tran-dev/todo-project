// src/mocks/node.js
import { setupWorker } from 'msw/browser';
import { handlers as TodoHandlers } from './TodoHandler';

export const handlers = [
    ...TodoHandlers,
    // Other handlers
]
export const workerMock = setupWorker(...TodoHandlers);