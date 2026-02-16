import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TaskBoardLayout } from "@/components/TaskBoardLayout";

export default function Board() {
    return (
        <ProtectedRoute>
            <TaskBoardLayout />
        </ProtectedRoute>
    );
}