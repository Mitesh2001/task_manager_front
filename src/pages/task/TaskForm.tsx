import { ChangeEvent, FC, useEffect, useState } from "react";
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    FileInput
} from "rizzui";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { taskCreate, taskUpdate } from "../../requests/_request";
import { Task } from "../../redux/task/TaskSlice";
import { formateDate } from "../../util/DateFormat";
import { toastAlert } from "../../util/ToastAlert";

interface TaskForm {
    modalState: boolean,
    setModalState: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: () => void,
    editTask?: Task | null,
    setEditTask: React.Dispatch<React.SetStateAction<null | Task>>,
}

const validationSchema = Yup.object({
    title: Yup.string().
        required('Title is Required'),
    dueDate: Yup.date().min(new Date(Date.now() - 86400000), "Date cannot be in the past")
        .required('Set some due date for the task'),
    image: Yup.mixed()
})

const TaskForm: FC<TaskForm> = ({ editTask, modalState, setModalState, refetch, setEditTask }) => {

    const initialValues = {
        title: editTask ? editTask.title : "New Task",
        dueDate: editTask ? formateDate(editTask.dueDate) : formateDate(new Date().toDateString()),
        image: ""
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                setSubmitting(true);
                if (editTask) {
                    await taskUpdate(values, editTask._id).then((res: any) => {
                        if (res.status === 200) {
                            setModalState(false);
                            toastAlert("success", "Task Updated !");
                            refetch();
                            setEditTask(null);
                        } else {
                            toastAlert("error", res.data.error)
                        }
                    });
                    return;
                }
                await taskCreate(values).then((res: any) => {
                    if (res.status === 201) {
                        setModalState(false);
                        toastAlert("success", "Task Created !");
                        resetForm();
                        refetch();
                    } else {
                        toastAlert("error", res.data.error)
                    }
                });
                setSubmitting(false);
            } catch (error: any) {
                toastAlert("error", error.message)
            }
        }
    });

    return (
        <>
            <Modal isOpen={modalState} onClose={() => { }}>
                <div className="m-auto px-7 pt-6 pb-8">
                    <form className="space-y-6" onSubmit={formik.handleSubmit} encType="multipart/form-data" >
                        <div className="mb-7 flex items-center justify-between">
                            <Text>New Task</Text>
                            <ActionIcon
                                size="sm"
                                variant="text"
                                onClick={() => { setModalState(false); setEditTask(null) }}
                            >
                                <XMarkIcon className="h-auto w-6" strokeWidth={1.8} />
                            </ActionIcon>
                        </div>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
                            <Input
                                label="Title *"
                                inputClassName="border-2"
                                size="lg"
                                className="col-span-2"
                                placeholder="give some title..."
                                {...formik.getFieldProps("title")}
                                error={formik.touched.title && formik.errors.title ? formik.errors.title : ""}
                            />
                            <Input
                                type="date"
                                label="Due Date"
                                inputClassName="border-2"
                                size="lg"
                                className="col-span-2"
                                {...formik.getFieldProps("dueDate")}
                                error={formik.touched.dueDate && formik.errors.dueDate ? formik.errors.dueDate : ""}
                            />
                            <FileInput
                                label="Media"
                                inputClassName="border-2"
                                size="lg"
                                className="col-span-2"
                                accept="image/png, .svg, .jpg, .jpeg"
                                // {...formik.getFieldProps("image")}
                                onChange={(event) => {
                                    if (event.currentTarget.files) {
                                        formik.setFieldValue("image", event.currentTarget.files[0])
                                    }
                                }}
                                error={formik.touched.image && formik.errors.image ? formik.errors.image : ""}
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="col-span-2 mt-2"
                            >
                                {(editTask) ? "Update" : "Create"} Task
                            </Button>
                        </div>
                    </form>
                </div >
            </Modal >
        </>
    );
}

export default TaskForm;