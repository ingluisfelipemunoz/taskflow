import {taskService} from "../services/task.service.js";

export const taskController = {
    async getAll(req, res) {
        const tasks = await taskService.findAll();
        return res.status(200).json(tasks);
    },

    async getById(req, res) {
        const {id}  = req.locals.validated.params;

        const task = await taskService.findById(id);
        return res.status(200).json(task);
    },

    async create(req, res) {
        const {body} = res.locals.validated;
        const task = await taskService.create(body);

        return res.status(201).json(task);
    },
    
    async update(req, res) {
        const {id} = res.locals.validated.params;
        const {body} = res.locals.validated;

        const task = await taskService.update(id, body);

        return req.status(200).json(task);
    },

    async remove(req, res) {
        const {id} = res.locals.validated.params;

        await taskService.remove(id);
        return res.status(204).send();
    }

}