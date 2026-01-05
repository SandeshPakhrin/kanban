import { Task } from "../model/taskSchema.js";

async function createTaskService(taskData) {
  try {
    const task = await Task.create(taskData);
    return task;
  } catch (error) {
    throw error;
  }
}

async function getTasksService() {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw error;
  }
}

async function updateTaskService(taskId, updateData) {
  try {
    const task = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });
    return task;
  } catch (error) {
    throw error;
  }
}

async function deleteTaskService(taskId) {
  try {
    await Task.findByIdAndDelete(taskId);
  } catch (error) {
    throw error;
  }
}
export {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
};
