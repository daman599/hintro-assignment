import { TaskType, useStore } from "@/store";

type TaskCardProps = {
    task: TaskType,
};

export const TaskCard = ({ task }: TaskCardProps) => {
    const deleteTask = useStore((state) => state.deleteTask);
    const editTaskModel = useStore((state) => state.openTaskModel);

    return (
        <div className="bg-neutral-700 px-4 py-2 rounded-lg shadow-md flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <div className={`size-3 rounded-full animate-pulse ${task.priority === "high"
                    ? "bg-red-600"
                    : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    } text-white`}
                >
                </div>
                <h3 className="text-white font-semibold text-lg">{task.title}</h3>
            </div>

            <div className="flex items-center justify-center gap-3 font-medium">
                <button onClick={() => editTaskModel("edit", task)} className="cursor-pointer hover:text-blue-500 text-base">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="cursor-pointer hover:text-red-500 text-base">Delete</button>
            </div>
        </div >
    );
};
