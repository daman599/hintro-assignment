"use client";

import { Column } from "./Column";
import { TaskModel } from "./TaskModel";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { DragDropProvider } from "@dnd-kit/react";

type Status = "todo" | "doing" | "done";

export const TaskBoardLayout = () => {
    const moveTask = useStore((state) => state.moveTask);
    const openModel = useStore((state) => state.isModelOpen);

    const logout = useStore((state) => state.logout);

    const activityLog = useStore((state) => state.activityLog);
    const clearActivityLog = useStore((state) => state.clearActivityLog);

    const resetBoard = useStore((state) => state.resetBoard);

    const tasks = useStore((state) => state.tasks);
    const getTasksFromStorage = useStore((state) => state.getTasksFromStorage);
    const setTasksInStorage = useStore((state) => state.setTasksInStorage);

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    useEffect(() => {
        if (!activityLog) return;

        const timer = setTimeout(() => {
            clearActivityLog();
        }, 3000);

        return () => clearTimeout(timer);
    }, [activityLog]);

    useEffect(() => {
        getTasksFromStorage();
    }, []);

    useEffect(() => {
        setTasksInStorage();
    }, [tasks]);

    function handleResetBoard() {
        const confirmReset = window.confirm("Are you sure you want to reset the board?");

        if (confirmReset) {
            resetBoard();
        }
    }

    return (
        <DragDropProvider onDragEnd={(event) => {
            if (event.canceled) return;
            const { source, target } = event.operation;

            if (source && target) {
                moveTask(String(source.id), target.id as Status);
            }
        }}
        >
            <div className="relative w-full flex flex-col xl:items-center justify-center min-h-screen px-6 lg:px-8 xl:px-10 py-5">
                {activityLog && (
                    <div className={`fixed top-2 md:top-4 lg:top-6 left-1/2 transform -translate-x-1/2 px-4 lg:px-6 py-2 lg:py-3 
                    rounded-md text-sm md:text-base
                    text-blue-500 font-medium shadow-lg bg-neutral-800 z-50`}
                    >
                        {activityLog}
                    </div>
                )}

                <div className={`${openModel ? "blur-sm pointer-events-none" : ""}`}>
                    <header className="flex items-center justify-between w-full">
                        <h1 className="text-base md:text-lg lg:text-xl font-medium">All Tasks</h1>

                        <div className="md:hidden">
                            {!openMenu ?
                                <div onClick={() => setOpenMenu(true)}>
                                    <Menu size={20} />
                                </div> :
                                <div onClick={() => setOpenMenu(false)}>
                                    <X size={22} />
                                </div>
                            }

                            {openMenu && (
                                <div className="fixed top-12 left-0 px-4 py-2
    text-white bg-neutral-900 font-medium shadow-lg z-50 w-full h-full flex items-center justify-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2 mt-5">
                                        <button onClick={handleResetBoard}
                                            className="text-base text-red-100 rounded-lg"
                                        >
                                            Reset Board
                                        </button>

                                        <button onClick={logout}
                                            className="text-base text-red-500 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="hidden md:flex items-center justify-center gap-3">
                            <button onClick={handleResetBoard} className="bg-neutral-800 hover:bg-red-700 cursor-pointer text-sm lg:text-base p-2 text-white rounded-lg px-3">Reset Board</button>
                            <button onClick={logout} className="bg-neutral-800 hover:bg-red-700 hover:text-white text-sm lg:text-base cursor-pointer p-2 text-red-500 rounded-lg px-3">Logout</button>
                        </div>
                    </header >

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5 py-5">
                        <Column status={"todo"} title={"Todo"} />
                        <Column status={"doing"} title={"Doing"} />
                        <Column status={"done"} title={"Done"} />
                    </div>
                </div >

                {openModel && <TaskModel />}
            </div >
        </DragDropProvider>
    );
}