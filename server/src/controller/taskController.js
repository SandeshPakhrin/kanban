import { createTaskService, deleteTaskService, getTasksService, updateTaskService } from "../service/tasckService.js";

export const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await createTaskService(taskData);
        res.status(201).json(
            {
                success:true,
                message: "Task created successfully",
                data: task
            }
        );
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await getTasksService();  
        res.status(200).json(
            {
                success:true,
                message: "Tasks retrieved successfully",
                data: tasks
            }
        );
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;
        const task = await updateTaskService(taskId, updateData);
        res.status(200).json(
            {
                success:true,
                message: "Task updated successfully",
                data: task
            }
        );
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await deleteTaskService(taskId);
        res.status(200).json(
            {
                success:true,
                message: "Task deleted successfully"
            }
        );
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
}