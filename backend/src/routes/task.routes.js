import {Router} from "express";

import { taskController } from "../controllers/task.controller.js";
import {validate} from "../middlewares/validate.middleware.js";

import {createTaskSchema, updateTaskSchema, taskIdSchema} from "../schemas/task.schema.js";

const router = Router();

router.get("/", taskController.getAll);

router.get("/:id", validate(taskIdSchema), taskController.getById);

router.post("/", validate(createTaskSchema), taskController.create);

router.patch("/:id", validate(updateTaskSchema), taskController.update);

router.delete("/:id", validate(taskIdSchema), taskController.remove);

export default router;