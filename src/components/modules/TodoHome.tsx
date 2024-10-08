import { useForm, ValidationRule } from 'react-hook-form';
import { handleMesages, MESSAGE } from '../../constants/messages';
import { TodoService } from '../../services/TodoService';
import { TodoLayout } from '../layout/TodoLayout/TodoLayout';
import { useEffect, useState } from 'react';
import { FormInput } from '../template/FormInput/FormInput';
import { Checkbox, DatePicker, Table } from 'antd';
import { IStatusRecord } from '../../mock/TodoHandler';
import moment from 'moment';
import './index.scss';

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

interface ITodoData {
    id: string;
    todoName: string;
    finishDate: any;
    status: IStatusRecord;
}

const defaultTodoForm: IFormInputs = {
    todoName: '',
    finishDate: new Date()
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
    },
    [TODO_PROPERTIES_FORM_ENUM.FINISH_DATE]: {
        name: TODO_PROPERTIES_FORM_ENUM.FINISH_DATE,
        title: "Finish date",
        required: handleMesages(MESSAGE.E0001, ["Finish date"]),
    }
}

export const TodoHome = () => {
    const [listTodo, setListTodo] = useState<IFormInputs[]>([]);
    const {
        register,
        reset,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInputs>({ defaultValues: defaultTodoForm });

    const { todoName, finishDate } = TodoForm;

    const onErrorTodo = async (values: any) => {
        // Noting coding
        try {
            const res = await TodoService.createTodoService(values);
            const { status, data } = res;
            if (status == 200) {

            }
        } catch (error) {
            console.log(error)
        }
    };

    const onSubmitTodo = async (values: IFormInputs) => {
        console.log(errors, values);
        try {
            const res = await TodoService.createTodoService(values);
            const { status, data } = res;

            if (status == 201) {
                const todoObj: IFormInputs = JSON.parse(data);
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

    const columns: any = [
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
            title: 'Finish date',
            dataIndex: 'finishDate',
            key: 'finishDate',
            render: (date: any) => moment(date).format('YYYY-MM-DD HH:mm:ss')
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
            onFilter: (value: any, record: ITodoData) => record.status.includes(value),
            width: '30%',
        },
    ];

    const dataSource = listTodo.map((item: any) => ({
        key: item.id,
        ...item
    }));

    // const onChange = (date: any, dateString: any) => {
    //     console.log("dateString", date, dateString);
    //   };

    return (
        <TodoLayout>
            <div id="container-form">
                <div id="form-input" >
                    <form onSubmit={handleSubmit(onSubmitTodo, onErrorTodo)} >
                        <FormInput
                            title={todoName.title}
                            content={register(todoName.name, { ...todoName })}
                            errorMessage={errors.todoName?.message}
                        ></FormInput>
                        <FormInput
                            title={finishDate.title}
                            content={register(finishDate.name, { ...finishDate })}
                            errorMessage={errors.finishDate?.message}
                        ></FormInput>
                        {/* <DatePicker onChange={onChange} needConfirm ></DatePicker> */}
                        <input type="submit" value="Add Task" />
                    </form>
                </div>
                <div id="result-list"></div>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
            // footer={() => }
            ></Table>
        </TodoLayout>
    )
}
