import BaseDataBase from '../src/data/BaseDatabase'

export class MySqlSetup extends BaseDataBase{
    public async createTable(): Promise<void>{
        try{
           await BaseDataBase.connection.raw(`
            CREATE TABLE TodoListUser (
                id VARCHAR(255) PRIMARY KEY, 
                name VARCHAR(255) NULL, 
                nickname VARCHAR(255) UNIQUE NOT NULL, 
                email VARCHAR(255) UNIQUE NOT NULL
            );`)

            await BaseDataBase.connection.raw(`
            CREATE TABLE TodoListTask (
                id VARCHAR(255) PRIMARY KEY, 
                title VARCHAR(255) NOT NULL, 
                description TEXT NOT NULL, 
                status VARCHAR(255) NOT NULL DEFAULT "to_do",
                limit_date DATE NOT NULL,
                creator_user_id varchar(255) NOT NULL,
                FOREIGN KEY (creator_user_id) REFERENCES TodoListUser(id)
            )`)

            await BaseDataBase.connection.raw(`
            CREATE TABLE TodoListResponsibleUserTaskRelation (
                task_id VARCHAR(255),
                responsible_user_id VARCHAR(255),
                FOREIGN KEY (task_id) REFERENCES TodoListTask(id),
                FOREIGN KEY (responsible_user_id) REFERENCES TodoListUser(id)
            )`)

            console.log("Setup completed!")
        }
        catch(e){
            throw new Error(e.sqlMessage || e.message)
        }
        
    }
}
new MySqlSetup().createTable()