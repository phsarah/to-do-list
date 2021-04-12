import express, { Express, Request, Response } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import {createUser} from './data/createUser'
import { getUserById } from "./data/getUserById";
import { editUserById } from "./data/editUserById";
import {createTask} from "./data/createTask"
dotenv.config();

export const connection = knex({
   client: "mysql",
   connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME
   }
})

const app: Express = express();
app.use(express.json());
app.use(cors())


app.post('/user/create', async(req: Request, res: Response) => {   
   let errorCode: number = 400

   const {name, nickname, email} = req.body
   try{
      await createUser(
         name,
         nickname, 
         email
      )    

      res.status(200).send("Usuário criado com sucesso!")
   }
   catch(error){
      res.status(errorCode).send({
         message: error.message
      })
   }
});


app.get('/user/:id', async(req: Request, res: Response) => {
   let errorCode: number = 400
   try{
      const {id} = req.params
      const user = await getUserById(id)

      if(!user){
         errorCode = 404
         throw new Error("Id não encontrado!")
      }
   res.status(200).send(user)
   }
   catch(error){
      res.status(errorCode).send({
         message: error.message
      })
   }
});



app.post('/user/edit/:id', async (req: Request, res: Response) => {
   let errorCode: number = 400
   try{
      const {id} = req.params
      const {name, nickname} = req.body
      await editUserById(id, name, nickname)
      if( !name || !nickname){
         errorCode = 404
         throw new Error("Preencha todos os campos e tente novamente")
      }
      res.status(200).send()
   }
   catch(error){
      res.status(errorCode).send({
         message: error.message
      })
   }
});


app.put("/task", async(req: Request, res: Response): Promise<any> => {
   let errorCode: number = 400
   try{
     const {title, description, dateBody, creatorUserId} = req.body
      const [day, month, year] = dateBody.split("/")
      const limitDate: Date = new Date(`${year}-${month}-${day}`)
      await createTask({
         title, 
         description, 
         limitDate, 
         creatorUserId
      })     
      res.status(200).send("Tarefa adicionada!")
   }
   catch(error){
      res.status(errorCode).send({
         message: error.message
      })
   }
});

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
});
