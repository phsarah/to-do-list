import { TaskInputDTO } from "../business/entities/Task";
import BaseDataBase from "./BaseDatabase";

export class TaskDatabase extends BaseDataBase{
    
    private static TABLE_NAME = "TodoListTask"

    public async createTask(id: string, Task: TaskInputDTO, convertedDate: Date){
        try{
            await BaseDataBase.connection
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