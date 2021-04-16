import { UserInputDTO } from "../business/entities/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{

    private static TABLE_NAME = "TodoListUser"

    public async createUser(
        id: string,
        user: UserInputDTO
    ): Promise<any>{
        try{
            await BaseDatabase.connection
                .insert({
                    id: id,   
                    name: user.name,
                    email: user.email,
                    nickname: user.nickname,
                })
            .into(UserDatabase.TABLE_NAME)
        }
        catch(error){
            console.log(error.sqlMessage || error.message)
        }
    }

    public async getUserById(id: string): Promise<any>{
        try{
        const result = await BaseDatabase.connection.raw(`
            SELECT id, nickname FROM '${UserDatabase.TABLE_NAME}' 
            WHERE id = '${id}'
        `)
            return result[0][0]
        }
        catch(error){
            console.log(error.sqlMessage || error.message)
        }
    }
    
    public async editUserById(id: string, name: string, nickname: string): Promise<any>{

        try{
           const result = await BaseDatabase.connection.raw(`
                UPDATE '${UserDatabase.TABLE_NAME}'
                SET name = '${name}', nickname = '${nickname}'     
                WHERE id = '${id}'
            `)
            return result[0][0]
        }
        catch(error){
            console.log(error.sqlMessage || error.message)
        }
    }
}