import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';

const TENANT_URL = "https://todo-domain.com/api";
const baseAPIUrl = "todo"

export enum IStatusRecord {
    All = "All",
    Completed = "Completed",
    Incomplete = "Incomplete"
}

const todoForm = {
    todoName: {
        name: 'todoName',
        require: true,
        maxLength: 100,
        type: 'TEXT'
    },
    finishDate: {
        name: 'finishDate',
        require: true,
        type: 'DATE'
    },
}

export const handlers = [
    http.get(`${TENANT_URL}/${baseAPIUrl}/getAll`, () => {
        return HttpResponse.json([
            {
                id: uuidv4(),
                todoName: 'John',
                status: IStatusRecord.Completed
            },
            {
                id: uuidv4(),
                todoName: 'Amber',
                status: IStatusRecord.Incomplete
            },
            {
                id: uuidv4(),
                todoName: 'Herry',
                status: IStatusRecord.Incomplete
            },
            {
                id: uuidv4(),
                todoName: 'Curtis',
                status: IStatusRecord.Completed
            },
            {
                id: uuidv4(),
                todoName: 'Hank',
                status: IStatusRecord.Completed
            },
        ]);
    }),

    http.post(`${TENANT_URL}/${baseAPIUrl}/create`, async (resolver) => {
        const { request } = resolver;
        const newTodoObj: Record<string, any> = (await request.json()) as Record<string, any>;
        const errorMess: Record<string, any> = {};
        Object.values(todoForm).forEach((obj: any) => {
            const { name, require, type, maxLength } = obj;
            const value = newTodoObj[name];
            switch (type) {
                case 'TEXT':
                    if (require && !value) {
                        errorMess[name] = 'The item is required';
                    } else if (value > maxLength) {
                        errorMess[name] = `The items must be less than ${maxLength} characters`;
                    }
                    break;
                case 'DATE':
                    if (require && !value) {
                        errorMess[name] = 'The item is required';
                    } else if (new Date(value).toString() == "Invalid Date") {
                        errorMess[name] = `The item is invalid date`;
                    }
                    break;
            }
        });

        if (Object.keys(errorMess).length > 0) {
            return HttpResponse.json(errorMess, { status: 400 });
        }

        return HttpResponse.json({
            ...newTodoObj,
            id: '1',
            status: IStatusRecord.Incomplete,
        }, { status: 201 });
    }),
]