import { connection } from ".."

export const getUserById = async(id: string) =>{
    try{
    const result = await connection.raw(`
    SELECT id, nickname FROM TodoListUser 
    WHERE id = '${id}'
    `)
        return result[0][0]
    }
    catch(error){
        console.log(error.sqlMessage || error.message)
    }
}