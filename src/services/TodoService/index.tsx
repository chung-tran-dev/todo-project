import { instance } from ".."

const baseAPIUrl = "todo";

export class TodoService {

    static createTodoService(data: any) {
        return instance.post(`${baseAPIUrl}/create`, data, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    static getAllTodoService() {
        return instance.get(`${baseAPIUrl}/getAll`);
    }
};