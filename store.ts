import { create } from "zustand";

type stateTypes = {
    authState: boolean,
    login: () => void,
    logout: () => void,

    isModelOpen: boolean,
    taskModelPurpose: string,
    taskToBeEdited: TaskType | null,
    openTaskModel: (purpose: string, task?: TaskType) => void,
    closeTaskModel: () => void,

    activityLog: string,
    clearActivityLog: () => void,

    tasks: TaskType[],
    createTask: (task: TaskType) => void,
    deleteTask: (taskId: string) => void,
    updateTask: (updatedTask: TaskType) => void,
    moveTask: (taskId: string, newStatus: "todo" | "doing" | "done") => void,

    getTasksFromStorage: () => void,
    setTasksInStorage: () => void,

    resetBoard: () => void,
}

export type TaskType = {
    id: string,
    title: string,
    description: string,
    status: "todo" | "doing" | "done",
    priority: "low" | "medium" | "high",
    createdAt?: string,
    dueDate: string,
}

export const useStore = create<stateTypes>((set, get) => ({
    authState: false,
    login: () => {
        localStorage.setItem("isLoggedIn", "true");
        set({ authState: true });
    },

    logout: () => {
        localStorage.removeItem("isLoggedIn");
        set({ authState: false });
    },

    isModelOpen: false,
    taskModelPurpose: "",
    taskToBeEdited: null,
    openTaskModel: (purpose, task) => {
        set({ isModelOpen: true, taskModelPurpose: purpose, taskToBeEdited: task ? task : null });
    },
    closeTaskModel: () => set({ isModelOpen: false }),

    activityLog: "",
    clearActivityLog: () => set({ activityLog: "" }),

    tasks: [],
    getTasksFromStorage: () => {
        const tasksPersist = localStorage.getItem("tasks");
        if (!tasksPersist) {
            set({ tasks: [] });
        } else {
            const parsedTasks: TaskType[] | [] = JSON.parse(tasksPersist);
            set({ tasks: parsedTasks });
        }
    },

    setTasksInStorage: () => {
        const stringifyTasks = JSON.stringify(get().tasks);
        localStorage.setItem("tasks", stringifyTasks);
    },

    createTask: (task) => {
        set((state) => ({ tasks: [...state.tasks, task] }));
        set({ activityLog: "Task Created" });
    },

    deleteTask: (taskId) => {
        set((state) => ({ tasks: state.tasks?.filter((task) => task.id !== taskId) }));
        set({ activityLog: "Task Deleted" })
    },

    updateTask: (updatedTask) => {
        set((state) => ({ tasks: state.tasks?.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task)) }));
        set({ activityLog: "Task Updated" })
    },

    moveTask: (taskId, newStatus) => {
        set((state) => ({ tasks: state.tasks?.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)) }))
        set({ activityLog: "Task Moved" })
    },

    resetBoard: () => {
        set({ tasks: [] });
        localStorage.removeItem("tasks");
    }
}));