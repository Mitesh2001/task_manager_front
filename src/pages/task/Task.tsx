import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { TrashIcon, EllipsisVerticalIcon, PencilIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Button, Dropdown, Empty } from 'rizzui'
import TaskForm from './TaskForm'
import { Task as TaskInterface, useGetAllTasksQuery } from '../../redux/task/TaskSlice'
import { taskDelete } from '../../requests/_request'
import { toastAlert } from '../../util/ToastAlert'

export enum TaskStatus {
    TO_DO = 'To do',
    IN_PROGRSS = 'In Progress',
    COMPLETED = 'Completed',
}

const statuses: any = {
    [TaskStatus.TO_DO]: 'text-green-700 bg-green-50 ring-green-600/20',
    [TaskStatus.IN_PROGRSS]: 'text- gray - 600 bg-gray - 50 ring - gray - 500 / 10',
    [TaskStatus.COMPLETED]: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

const Task = () => {

    const { data, refetch } = useGetAllTasksQuery("");
    const [modalState, setModalState] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<TaskInterface | null>(null);

    const tasks: TaskInterface[] | null = data?.data;

    const deleteHandle = async (taskId: string) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }
        try {
            await taskDelete(taskId).then((res: any) => {
                if (res.status === 200) {
                    setModalState(false);
                    refetch();
                } else {
                    toastAlert("error", res.data.error)
                }
            });
        } catch (error: any) {
            toastAlert("error", error.message)
        }
    }

    const editHandle = (task: TaskInterface) => {
        setEditTask(task);
        setModalState(true);
    }

    return (
        <>
            <div className="mx-auto w-full max-w-lg">
                <div className='flex justify-end m-2'>
                    <Button rounded="lg" onClick={() => setModalState(!modalState)}>
                        <span>New Task</span>{" "}
                        <PlusIcon strokeWidth="2" className="h-4 w-4 ml-2" />
                    </Button>
                </div>
                {
                    tasks?.length === 0 && <Empty text="No Tasks" textClassName="mt-2" />
                }
                <ul role="list" className="divide-y divide-gray-100">
                    {tasks?.map((task: TaskInterface) => (
                        <li key={task._id} className="flex items-center justify-between gap-x-6 py-5">
                            <div className="min-w-0">
                                <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{task.title}</p>
                                    <p
                                        className={classNames(statuses[task.status], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset')}
                                    >
                                        {task.status}
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <p className="whitespace-nowrap">
                                        Due on {new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                        <circle cx={1} cy={1} r={1} />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-none items-center gap-x-4">
                                <Dropdown placement='right'>
                                    <Dropdown.Trigger>
                                        <Button variant="text" >
                                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                        </Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu className="divide-y">
                                        <div className="mb-2" >
                                            <Dropdown.Item onClick={() => editHandle(task)}>
                                                <PencilIcon className="mr-2 h-4 w-4" />
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => deleteHandle(task._id)}>
                                                <TrashIcon className="mr-2 h-4 w-4" />
                                                Delete
                                            </Dropdown.Item>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </li>
                    ))}
                </ul>
            </div >
            <TaskForm editTask={editTask} setEditTask={setEditTask} modalState={modalState} setModalState={setModalState} refetch={refetch} />
        </>
    )
}

export default Task