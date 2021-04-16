import { TaskInputDTO } from "../business/entities/Task";
import BaseDatabase from "./BaseDatabase";

export class TaskDatabase extends BaseDatabase{
    
    private static TABLE_NAME = "TodoListTask"

    public async createTask(id: string, Task: TaskInputDTO, convertedDate: Date){
        try{
            await BaseDatabase.connection
            .insert({ 
                id: id,
                title: Task.title,
                description: Task.description,
                limitDate: convertedDate,
                creatorUserId: Task.creatorUserId
            })
            .into(TaskDatabase.TABLE_NAME)
        }
        catch(error){
            console.log(error.sqlMessage || error.message)
        }
    }
}