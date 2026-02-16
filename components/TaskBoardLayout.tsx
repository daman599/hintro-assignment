"use client";

import { Column } from "./Column";
import { TaskModel } from "./TaskModel";
import { useStore } from "@/store";
import { useEffect } from "react";

export const TaskBoardLayout = () => {
    const openModel = useStore((state) => state.isModelOpen);

    const logout = useStore((state) => state.logout);

    const activityLog = useStore((state) => state.activityLog);
    const clearActivityLog = useStore((state) => state.clearActivityLog);

    const resetBoard = useStore((state) => state.resetBoard);

    const tasks = useStore((state) => state.tasks);
    const getTasksFromStorage = useStore((state) => state.getTasksFromStorage);
    const setTasksInStorage = useStore((state) => state.setTasksInStorage);

    useEffect(() => {
        if (!activityLog) return;

        const timer = setTimeout(() => {
            clearActivityLog();
        }, 2000);

        return () => clearTimeout(timer);
    }, [activityLog]);

    useEffect(() => {
        getTasksFromStorage();
    }, []);

    useEffect(() => {
        setTasksInStorage();
    }, [tasks])

    return (
        <div className="relative w-full flex flex-col items-center justify-center min-h-screen px-5 py-2 gap-5">
            {activityLog && (
                <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md
                    text-white font-medium shadow-lg bg-blue-500 z-50`}
                >
                    {activityLog}
                </div>
            )}
            <div className={`${openModel ? "blur-sm pointer-events-none" : ""}`}>
                <header className="flex items-center justify-between w-full">
                    <h1 className="text-xl font-medium">All Tasks</h1>

                    <div className="flex items-center justify-center gap-2">
                        <button onClick={resetBoard} className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer p-2 text-red-100 rounded-lg">Reset Board</button>
                        <button onClick={logout} className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer p-2 text-red-500 rounded-lg">Logout</button>
                    </div>
                </header >

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
                    <Column status={"todo"} title={"Todo"} />
                    <Column status={"doing"} title={"Doing"} />
                    <Column status={"done"} title={"Done"} />
                </div>
            </div>

            {openModel && <TaskModel />}
        </div>
    );
}