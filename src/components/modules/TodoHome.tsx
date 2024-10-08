import { useForm, ValidationRule } from 'react-hook-form';
import { handleMesages, MESSAGE } from '../../constants/messages';
import { TodoService } from '../../services/TodoService';
import { TodoLayout } from '../layout/TodoLayout/TodoLayout';
import { useEffect, useState } from 'react';
import { FormInput } from '../template/FormHook/FormInput/FormInput';
import { Checkbox, Table, TableColumnsType } from 'antd';
import { IStatusRecord } from '../../mock/TodoHandler';
import './index.scss';

enum TODO_PROPERTIES_FORM_ENUM {
    TODO_NAME = "todoName",
};

type TodoFormTypes = {
    [key in TODO_PROPERTIES_FORM_ENUM]: {
        name: TODO_PROPERTIES_FORM_ENUM,
        title: string,
        required?: string,
        minLength?: ValidationRule<number>,
        maxLength?: ValidationRule<number>,
    }
}

interface ITodoData {
    id: string;
    todoName: string;
    status?: IStatusRecord;
}

const defaultTodoForm: ITodoData = {
    id: '',
    todoName: '',
    status: IStatusRecord.Incomplete
}
const TodoForm: TodoFormTypes = {
    [TODO_PROPERTIES_FORM_ENUM.TODO_NAME]: {
        name: TODO_PROPERTIES_FORM_ENUM.TODO_NAME,
        title: "Name",
        required: handleMesages(MESSAGE.E0001, ["Name of todo"]),
        maxLength: {
            value: 100,
            message: handleMesages(MESSAGE.E0002, ["Name of todo", 100])
        }
    }
}

export const TodoHome = () => {
    const [listTodo, setListTodo] = useState<ITodoData[]>([]);
    const {
        register,
        reset,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<ITodoData>({ defaultValues: defaultTodoForm });

    const { todoName } = TodoForm;

    const onSubmitTodo = async (values: ITodoData) => {
        try {
            const res = await TodoService.createTodoService(values);
            const { status, data } = res;
            if (status == 201) {
                const todoObj: ITodoData = JSON.parse(data);
                setListTodo((preState) => [todoObj, ...preState]);
                reset();
            }
        } catch (error) {
            console.log(error)
        }
    };

    const getAllTodo = async () => {
        try {
            const res = await TodoService.getAllTodoService();
            const { status, data } = res;
            if (status == 200) {
                setListTodo(JSON.parse(data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTodo();
    }, []);

    const columns: TableColumnsType<ITodoData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'To do name',
            dataIndex: 'todoName',
            key: 'todoName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (data: any) => {
                const isCompeted = data === IStatusRecord.Completed;
                return <Checkbox defaultChecked={isCompeted} disabled />
            },
            filters: [
                {
                    text: IStatusRecord.Completed,
                    value: IStatusRecord.Completed,
                },
                {
                    text: IStatusRecord.Incomplete,
                    value: IStatusRecord.Incomplete,
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value?: any, record?: ITodoData) => record!.status!.includes(value),
            width: '30%',
        },
    ];

    const dataSource = listTodo.map((item: any) => ({
        key: item.id,
        ...item
    }));

    return (
        <TodoLayout>
            <div id="container-form">
                <div id="form-input" >
                    <form onSubmit={handleSubmit(onSubmitTodo)} >
                        <FormInput
                            title={todoName.title}
                            content={register(todoName.name, { ...todoName })}
                            errorMessage={errors.todoName?.message}
                        ></FormInput>
                        <input type="submit" value="Add Task" />
                    </form>
                </div>
                <div id="result-list"></div>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                locale={{ selectAll: 'All' }}
            ></Table>
        </TodoLayout>
    )
}
