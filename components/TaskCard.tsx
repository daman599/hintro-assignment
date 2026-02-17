"use client";

import { TaskType, useStore } from "@/store";
import { useState } from "react";
import { useDraggable } from '@dnd-kit/react';

type TaskCardProps = {
    task: TaskType,
};

export const TaskCard = ({ task }: TaskCardProps) => {
    const deleteTask = useStore((state) => state.deleteTask);
    const editTaskModel = useStore((state) => state.openTaskModel);
    const [openCard, setOpenCard] = useState<boolean>(false);

    const { ref } = useDraggable({
        id: task.id
    });

    return (
        <div onClick={() => setOpenCard((prev) => !prev)} ref={ref}
            className="bg-neutral-700 px-4 py-1.5 rounded-lg shadow-md flex flex-col items-center gap-1 max-w-xl">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center gap-2">
                    <div className={`size-2 md:size-3 shrink-0 rounded-full animate-pulse ${task.priority === "high"
                        ? "bg-red-600"
                        : task.priority === "medium"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                    />

                    <h3 className="text-white font-semibold text-base lg:text-lg">
                        {task.title}
                    </h3>
                </div>

                <div className="flex items-center justify-center gap-3 font-medium">
                    <button onClick={() => editTaskModel("edit", task)} className="cursor-pointer hover:text-blue-500 text-sm md:text-base">Edit</button>
                    <button onClick={() => deleteTask(task.id)} className="cursor-pointer hover:text-red-500 text-sm md:text-base">Delete</button>
                </div>
            </div>

            {openCard && <div className="flex flex-col items-start px-4 w-full gap-1 font-medium">
                <p className="text-neutral-400 text-sm md:text-base"> {task.description}</p>
                <p className="text-neutral-400 text-sm md:text-base "><span className="text-red-400">Due date:</span> {task.dueDate} </p>
            </div>}
        </div>
    );
};
