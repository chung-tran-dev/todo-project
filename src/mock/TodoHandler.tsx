import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';

const TENANT_URL = "https://todo-domain.com/api";
const baseAPIUrl = "todo"

export enum IStatusRecord {
    All = "All",
    Completed = "Completed",
    Incomplete = "Incomplete"
}

export const handlers = [
    http.get(`${TENANT_URL}/${baseAPIUrl}/getAll`, () => {
        return HttpResponse.json([
            {
                id: uuidv4(),
                todoName: 'John',
                finishDate: new Date(),
                status: IStatusRecord.Completed
            },
            {
                id: uuidv4(),
                todoName: 'Amber',
                finishDate: new Date(),
                status: IStatusRecord.Incomplete
            },
            {
                id: uuidv4(),
                todoName: 'Herry',
                finishDate: new Date(),
                status: IStatusRecord.Incomplete
            },
            {
                id: uuidv4(),
                todoName: 'Curtis',
                finishDate: new Date(),
                status: IStatusRecord.Completed
            },
            {
                id: uuidv4(),
                todoName: 'Hank',
                finishDate: new Date(),
                status: IStatusRecord.Completed
            },
        ]);
    }),

    http.post(`${TENANT_URL}/${baseAPIUrl}/create`, async (resolver) => {
        const { request } = resolver;
        const newTodoObj: Record<string, any> = (await request.json()) as Record<string, any>;

        return HttpResponse.json({
            ...newTodoObj,
            id: uuidv4(),
            status: IStatusRecord.Incomplete,
        }, { status: 201 });
    }),
]