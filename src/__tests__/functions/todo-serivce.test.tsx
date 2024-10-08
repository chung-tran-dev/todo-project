import axios, { AxiosError } from "axios";
import { IStatusRecord } from "../../mock/TodoHandler";
import { TodoService } from "../../services/TodoService";
import { workerMock } from "../../mock/node";

// Establish API mocking before all tests.
beforeAll(() => workerMock.start())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => workerMock.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => workerMock.stop())

describe('Unit test for createTodoService function', () => {
    const todoData = {
        todoName: 'Todo name 1',
        finishDate: new Date()
    };

    test('create successful the todo record when call API', async () => {
        const res = await TodoService.createTodoService(todoData);
        const { data, status, } = res;
        const todoObj = JSON.parse(data);

        // Check status
        expect(status).toBe(201);

        expect(todoObj).toHaveProperty('id');
        expect(todoObj).toHaveProperty('todoName', todoData.todoName);
        expect(todoObj).toHaveProperty('finishDate', todoData.finishDate);
        expect(todoObj).toHaveProperty('status', IStatusRecord.Incomplete);
    });

    test('create failure the todo record when call API with validation', async () => {
        try {
            const res = await TodoService.createTodoService({
                todoName: '',
                finishDate: null
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { status, response } = (error as AxiosError);
                const errorMessage = JSON.parse((response?.data as string));

                // Check status
                expect(status).toBe(400);

                expect(errorMessage).toHaveProperty('todoName', 'The item is required');
                expect(errorMessage).toHaveProperty('finishDate', 'The item is required');
            }
        }
    });
});