import { connection } from ".."

export const editUserById = async (id:string, name:string, nickname:string): Promise<any> => {
    try{
       const result = await connection.raw(`
        UPDATE TodoListUser
        SET name = "${name}", nickname = "${nickname}"     
        WHERE id = "${id}"
        `)
        return result[0][0]
    }
    catch(error){
        console.log(error.sqlMessage || error.message)
    }
}
