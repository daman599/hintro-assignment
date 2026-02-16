"use client";

import { TaskCard } from "./TaskCard";
import { useStore } from "@/store";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Search } from "lucide-react";

type ColumnProps = {
    status: string;
    title: string;
};

export const Column = ({ status, title }: ColumnProps) => {
    const addTaskModel = useStore((state) => state.openTaskModel);

    const tasks = useStore((state) => state.tasks)
    const [searchText, setSearchText] = useState<string>("");

    const [showFilter, setShowFilter] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState<"low" | "medium" | "high" | "all">("all");

    const finalTasks = tasks
        ?.filter((task) => task.status === status)
        .filter((task) =>
            task.title.toLowerCase().includes(searchText.trim().toLowerCase())
        )
        .filter((task) =>
            priorityFilter === "all" ? true : task.priority === priorityFilter
        )
        .sort(
            (a, b) =>
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

    return (
        <div className="bg-neutral-800 rounded-lg px-6 py-4 gap-4 flex flex-col min-h-120">
            <div className="flex items-center justify-between w-full gap-4">
                <h2 className="text-lg font-semibold text-white">{title}</h2>

                <div className="relative max-w-2xl">
                    <div className="absolute left-3 cursor-pointer top-1/2 
            -translate-y-1/2 text-neutral-400 hover:text-white transition-all duration-300">
                        <Search />
                    </div>

                    <input
                        type="text"
                        id="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search by title..."
                        className="bg-neutral-900 p-3 pl-12 rounded-lg text-lg
                 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="relative p-1 bg-neutral-600 rounded-sm" onClick={() => setShowFilter(!showFilter)}>
                    <Filter size={18} />
                    {showFilter && (
                        <div className="absolute right-0 top-8 overflow-hidden bg-neutral-900 border border-neutral-700 rounded-md shadow-lg w-32">
                            <ul className="flex flex-col text-sm">
                                {["all", "low", "medium", "high"].map((priority) => (
                                    <li
                                        key={priority}
                                        onClick={() => {
                                            setPriorityFilter(priority as "low" | "medium" | "high" | "all");
                                            setShowFilter(false);
                                        }}
                                        className={`px-3 py-2 cursor-pointer hover:bg-neutral-500 ${priorityFilter === priority ? "bg-neutral-700" : ""
                                            }`}
                                    >
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
                {finalTasks?.length === 0 ? (
                    <p className="text-neutral-400">
                        Nothing to see here. Please add task.
                    </p>
                ) : (
                    finalTasks?.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))
                )}
            </div>

            <button onClick={() => addTaskModel("add")} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                Add Task
            </button>
        </div>
    );
};
