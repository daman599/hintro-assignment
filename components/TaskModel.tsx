"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { TaskType, useStore } from "@/store";

export const TaskModel = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<"todo" | "doing" | "done">("todo");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("high");
    const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const createTask = useStore((state) => state.createTask);
    const closeModel = useStore((state) => state.closeTaskModel);
    const taskType = useStore((state) => state.taskModelPurpose);
    const taskToBeEdited = useStore((state) => state.taskToBeEdited);

    const updatedTask = useStore((state) => state.updateTask);

    useEffect(() => {
        if (taskType === "edit" && taskToBeEdited) {
            setTitle(taskToBeEdited.title);
            setDescription(taskToBeEdited.description);
            setStatus(taskToBeEdited.status);
            setPriority(taskToBeEdited.priority);
            setDueDate(taskToBeEdited.dueDate);
        }
    }, [taskType])

    function validationCheck() {
        if (new Date(dueDate) < new Date()) {
            alert("Due date can not be in past.")
            return false;
        }

        return true;
    }

    function handleTaskCreation() {
        if (validationCheck()) {
            const task: TaskType = {
                id: Date.now().toString(),
                title,
                description,
                status,
                priority,
                dueDate,
                createdAt: new Date().toISOString().split("T")[0]
            }

            if (createTask) {
                createTask(task);
                closeModel();
            }
        }
    }

    function handleTaskEdit() {
        if (validationCheck()) {
            const finalEditedTask: TaskType = {
                id: taskToBeEdited!.id,
                title,
                description,
                status,
                priority,
                dueDate
            }

            if (finalEditedTask) {
                updatedTask(finalEditedTask);
                closeModel();
            }
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="bg-neutral-900 text-white rounded-lg p-4 md:p-6 w-lg relative">
                <h2 className="text-lg font-semibold mb-4">{taskType.charAt(0).toUpperCase() + taskType.slice(1)} Task</h2>

                {/* form fields */}
                <form onSubmit={(e) => {
                    e.preventDefault();

                    if (taskType === "add") {
                        handleTaskCreation();
                    } else {
                        handleTaskEdit();
                    }
                }} className="flex flex-col gap-4">
                    {/* Title */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-1 text-sm font-medium">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            className="bg-neutral-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className=" text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="bg-neutral-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    {/* Priority */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="priority" className="text-sm font-medium">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                            className="bg-neutral-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={"high"}>High</option>
                            <option value={"medium"}>Medium</option>
                            <option value={"low"}>Low</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dueDate" className="text-sm font-medium">
                            Due Date
                        </label>
                        <input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="bg-neutral-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="priority" className="text-sm font-medium">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "todo" | "doing" | "done")}
                            className="bg-neutral-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={"todo"}>Todo</option>
                            <option value={"doing"}>Doing</option>
                            <option value={"done"}>Done</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-900 hover:bg-blue-900 text-white py-2 rounded mt-2"
                    >
                        {taskType.charAt(0).toUpperCase() + taskType.slice(1)} Task
                    </button>
                </form>

                <button
                    onClick={closeModel}
                    className="absolute top-3 right-3 text-neutral-400 hover:text-white"
                >
                    <X />
                </button>
            </div >
        </div >
    );
};