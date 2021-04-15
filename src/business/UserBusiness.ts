import { UserInputDTO } from "./entities/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { Authenticator } from "./services/Authenticator";

export class UserBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private authenticator: Authenticator,
      private userDatabase: UserDatabase,
   ) { }

    public async createUser(user: UserInputDTO) {
        const id = this.idGenerator.generate();

        await this.userDatabase.createUser(
            id,
            user
        );

        const accessToken = this.authenticator.generateToken({
            id      
        });

        return accessToken;
    }
   public async getUserById(id: string) {
        const userData = await this.userDatabase.getUserById(
            id
        );

        if(!userData){
            let  errorCode = 404        
            throw new Error("Id não encontrado!")
        }
    
        return userData;
    }
    public async editUserById(id: string, name: string, nickname: string){

        if( !name || !nickname ){
            let errorCode = 404
            throw new Error("Preencha todos os campos e tente novamente")
         }  
    }
}