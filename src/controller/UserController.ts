import { Request, Response } from "express";
import { UserInputDTO } from "../business/entities/User";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
   new IdGenerator(),
   new Authenticator(),
   new UserDatabase(),
);

export class UserController {
   public async signup(req: Request, res: Response) {
      let errorCode: number = 400

      try {
         const input: UserInputDTO = {
            name: req.body.name,
            email: req.body.email,
            nickname: req.body.nickname,
         }

         const token = await userBusiness.createUser(input);

         res.status(200).send({ token });

      } catch (error) {
         res
            .status(errorCode || 400)
            .send({ error: error.message });
      }
   }
   public async getUserById(req: Request, res: Response){
      let errorCode: number = 400
      
      try {
         const {id} = req.params
         
         const userData = await userBusiness.getUserById(id)

         res.status(200).send({ userData });

      } catch (error) {
         res
            .status(errorCode || 400)
            .send({ error: error.message });
      }
   }
   public async editUserById(req: Request, res: Response){
      let errorCode: number = 400

      try{
         const {id} = req.params
         const {name, nickname} = req.body
         await userBusiness.editUserById(id, name, nickname)
         
         res.status(200).send("Editado com sucesso!")
      }
      catch(error){
         res.status(errorCode).send({
            message: error.message
         })
      }
   }
}