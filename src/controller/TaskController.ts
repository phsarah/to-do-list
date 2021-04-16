import { Request, Response } from "express";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { TaskBusiness } from "../business/TaskBusiness";
import { TaskDatabase } from "../data/TaskDatabase";
import { TaskInputDTO } from "../business/entities/Task";

const taskBusiness = new TaskBusiness(
   new IdGenerator(),
   new Authenticator(),
   new TaskDatabase(),
);

export class TaskController {
   public async createTask(req: Request, res: Response) {
      let errorCode: number = 400

      try {
         const input: TaskInputDTO = {
            title: req.body.title,
            description: req.body.description,
            limitDate: req.body.limitDate,
            creatorUserId: req.body.creatorUserId,
        }
        await taskBusiness.createTask(input)

        res.status(200).send("Tarefa adicionada!")

        } catch (error) {
         res
            .status(errorCode || 400)
            .send({ error: error.message });
      }
   }
}