// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';

const TENANT_URL = "https://todo-domain.com/api";
const baseAPIUrl = "todo"

export const handlers = [
    http.get(`${TENANT_URL}/${baseAPIUrl}/getAll`, (resolver) => {
        console.log(resolver);
        // ...and respond to them using this JSON response.
        return HttpResponse.json([
            {
                id: uuidv4(),
                todoName: 'John',
                finishDate: new Date(),
            },
            {
                id: uuidv4(),
                todoName: 'John',
                finishDate: new Date(),
            },
            {
                id: uuidv4(),
                todoName: 'John',
                finishDate: new Date(),
            },
            {
                id: uuidv4(),
                todoName: 'John',
                finishDate: new Date(),
            },
            {
                id: uuidv4(),
                todoName: 'John',
                finishDate: new Date(),
            },
        ]);
    }),

    http.post(`${TENANT_URL}/${baseAPIUrl}/create`, (req) => {
        console.log(req);
        const { request } = req;
        // ...and respond to them using this JSON response.
        return HttpResponse.json({
            id: uuidv4(),
            ...request.body
        });
    }),
]