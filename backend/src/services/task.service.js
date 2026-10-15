import { AppError } from "../utils/AppError.js";

//temp storage
let tasks = [];
let nextId = 1;

export const taskService = {
    async findAll() {
        return tasks;
    },

    async findById(id) {
        const task = tasks.find(task => task.id === id);
        if(!task) {
            throw new AppError("Task not found", 404);
        }

        return task;
    },

    async createTask(data) {
        const task = {
            id: nextId++,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        tasks.push(task);

        return task;
    },

    async update(id, data) {
        const task = await this.findById(id);
        Object.assign(task, {
            ...data,
            updatedAt: new Date().toISOString()
        });

        return task;
    },

    async remove(id) {
        await this.findById(id);
        tasks = tasks.fiter(task => task.id !== id);
    }
}