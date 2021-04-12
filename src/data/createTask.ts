import { connection } from '..'

export const createTask = async (Task: any) => {

    try{
        await connection
        .insert({ 
            title: Task.title,
            description: Task.description,
            limitDate: Task.limitDate,
            creatorUserId: Task.creatorUserId
        })
        .into("TodoListTask")
    }
    catch(error){
        console.log(error.sqlMessage || error.message)
    }
}

