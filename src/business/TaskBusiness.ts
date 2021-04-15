import { TaskDatabase } from "../data/TaskDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { Authenticator } from "./services/Authenticator";
import { TaskInputDTO } from "../business/entities/Task";

export class TaskBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private authenticator: Authenticator,
      private taskDatabase: TaskDatabase,
   ) { }

    public async createTask(Task: TaskInputDTO){
        const id = this.idGenerator.generate()

        const [day, month, year] = Task.limitDate.split("/")
        const convertedDate: Date = new Date(`${year}-${month}-${day}`)

        await this.taskDatabase.createTask(
            id,
            Task,
            convertedDate, 
        )
    }
}