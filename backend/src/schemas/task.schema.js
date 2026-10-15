import {z} from "zod";


const tasksFields = z.object({
    title: z.string().trim().min(1, "Title is required").max(150),
    description: z.string().max(1000).default(""),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
    priority: z.enum(["LOW", "MEDIUM", "HIGHT"]).default("MEDIUM")
}).strict();

export const createTaskSchema = z.object({
    body: tasksFields
});

export const updateTaskSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive().safe()
    }),
    body: tasksFields.partial().refine((data) => Object.keys(data).length > 0, "At least one field is required")
});

export const taskIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive().safe()
    })
});

