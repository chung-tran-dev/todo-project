import { useForm, ValidationRule } from 'react-hook-form';
import { handleMesages, MESSAGE } from '../../constants/messages';
import { TodoService } from '../../services/TodoService';
import { TodoLayout } from '../layout/TodoLayout/TodoLayout';
import { useEffect, useState } from 'react';

enum TODO_PROPERTIES_FORM_ENUM {
    TODO_NAME = "todoName",
    FINISH_DATE = "finishDate",
};

type IFormInputs = {
    todoName: string,
    finishDate: Date,
}

type TodoFormTypes = {
    [key in TODO_PROPERTIES_FORM_ENUM]: {
        name: TODO_PROPERTIES_FORM_ENUM,
        title: string,
        required?: string,
        minLength?: ValidationRule<number>,
        maxLength?: ValidationRule<number>,
    }
}

const TodoForm: TodoFormTypes = {
    [TODO_PROPERTIES_FORM_ENUM.TODO_NAME]: {
        name: TODO_PROPERTIES_FORM_ENUM.TODO_NAME,
        title: "Name of todo",
        required: handleMesages(MESSAGE.E0001, ["Name of todo"]),
        maxLength: {
            value: 100,
            message: handleMesages(MESSAGE.E0002, ["Name of todo", 100])
        }
    },
    [TODO_PROPERTIES_FORM_ENUM.FINISH_DATE]: {
        name: TODO_PROPERTIES_FORM_ENUM.FINISH_DATE,
        title: "Finish date",
        required: handleMesages(MESSAGE.E0001, ["Finish date"]),
    }
}

export const TodoHome = () => {
    const [listTodo, setListTodo] = useState([]);

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInputs>();

    const { todoName, finishDate } = TodoForm;

    const onErrorTodo = async(values: any) => {
        // Noting coding
        try {
            const res = await TodoService.createTodoService({
                todoName: "sadsadsad",
                finishDate: new Date(),
            });
            const { status, data } = res;
            if (status == 200) {
                
            }
        } catch (error) {

        }
    }

    const onSubmitTodo = async (values: IFormInputs) => {
        console.log(errors, values);
        try {
            const res = await TodoService.createTodoService(values);
            const { status, data } = res;
            if (status == 200) {
                
            }
        } catch (error) {

        }
    }

    const getAllTodo = async () => {
        try {
            const res = await TodoService.getAllTodoService();
            const { status, data } = res;
            if (status == 200) {
                setListTodo(JSON.parse(data.data));
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllTodo();
    }, []);

    return (
        <TodoLayout>
            <div id="container-form">
                <div id="form-input">
                    <form onSubmit={handleSubmit(onSubmitTodo, onErrorTodo)}>
                        {/* <div id="form-header">
                            <h1>Todo List</h1>
                        </div> */}
                        <div className="form-input">
                            <label>{todoName.title}</label>
                            <input {...register(todoName.name, { ...todoName })} />
                            <label className="error-message">{errors.todoName?.message}</label>
                        </div>

                        <div className="form-input">
                            <label>{finishDate.title}</label>
                            <input {...register(finishDate.name, { ...finishDate })} />
                            <label className="error-message">{errors.finishDate?.message}</label>
                        </div>

                        <input type="submit" value="Add" />
                    </form>
                </div>
                <div id="result-list"></div>
            </div>
        </TodoLayout>
    )
}
