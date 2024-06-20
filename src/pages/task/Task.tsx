import classNames from 'classnames'
import { useState } from 'react'
import { TrashIcon, PencilIcon, PlusIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { Button, Dropdown, Empty } from 'rizzui'
import TaskForm from './TaskForm'
import { Task as TaskInterface, TaskStatus, useGetAllTasksQuery } from '../../redux/task/TaskSlice'
import { taskDelete, taskUpdate } from '../../requests/_request'
import { toastAlert } from '../../util/ToastAlert'

type statuses = { [K in TaskStatus]: string }

const statuses: statuses = {
    [TaskStatus.TO_DO]: 'text-green-700 bg-green-50 ring-green-600/20',
    [TaskStatus.IN_PROGRSS]: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    [TaskStatus.COMPLETED]: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}

const Task = () => {

    const { data, refetch } = useGetAllTasksQuery("");
    const [modalState, setModalState] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<TaskInterface | null>(null);


    const tasks: TaskInterface[] | null = data?.data;

    const orderedTask = tasks && [...tasks].sort((a: TaskInterface, b: TaskInterface) => {
        const order = { [TaskStatus.TO_DO]: 1, [TaskStatus.IN_PROGRSS]: 2, [TaskStatus.COMPLETED]: 3 };
        return order[a.status] - order[b.status];
    });

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

    const updateStatus = async (taskId: string, status: TaskStatus) => {
        try {
            await taskUpdate({ status }, taskId).then((res: any) => {
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

    return (
        <>
            <div className="mx-auto w-3/4 max-w-full overflow-auto">
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
                    {orderedTask?.map((task: TaskInterface) => (
                        <li key={task._id} className="flex items-center justify-between gap-x-6 py-5">
                            <div className="min-w-0">
                                <div className="flex items-start gap-x-3">
                                    <img className='h-20 w-32 rounded' src={`${process.env.REACT_APP_API_BASE_URL}${task.imagePath}`} />
                                    <div>
                                        <p className="font-semibold leading-6 text-gray-900">{task.title}
                                            <span
                                                className={classNames(statuses[task.status], 'rounded-md whitespace-nowrap m-2 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset')}
                                            >
                                                {task.status}
                                            </span>
                                        </p>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                            <p className="whitespace-nowrap">
                                                Due on {new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-none items-center gap-x-7">
                                <div className='flex'>
                                    <PencilIcon className="mr-2 h-4 w-4 cursor-pointer" onClick={() => editHandle(task)} />
                                    <TrashIcon className="mr-2 h-4 w-4 cursor-pointer" onClick={() => deleteHandle(task._id)} />
                                </div>
                                <Dropdown placement='right'>
                                    <Dropdown.Trigger>
                                        <Button variant="outline">
                                            Move to <ChevronDownIcon className="ml-2 w-5" />
                                        </Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu>
                                        {
                                            Object.values(TaskStatus).map((status: TaskStatus) => {
                                                return (
                                                    <Dropdown.Item
                                                        className={classNames(statuses[status], "mt-1")}
                                                        key={status}
                                                        onClick={() => {
                                                            status !== task.status && updateStatus(task._id, status)
                                                        }}
                                                    >
                                                        {status} {status === task.status && <CheckIcon className="mx-5 h-4 w-4" />}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
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