
import { CreateHistoriqueDto, Historique, UpdateHistoriqueDto } from "../types/Historique";
import { CreateTacheDto, Tache, UpdateTacheDto } from "../types/Tache";
import { CreateUserDto, UpdateUserDto, User } from "../types/User";

export interface IRepository<>{
    create(date : CreateTacheDto):Promise<Tache>
    findAll():Promise<Tache[]>
    findById(id:number):Promise<Tache | null>
    update(id:number , data: UpdateTacheDto):Promise<Tache>
    delete(id:number):Promise<boolean>
}

export interface IUserRepository{
    create(date : CreateUserDto):Promise<User>
    findAll():Promise<User[]>
    findById(id:number):Promise<User | null>
    findByEmail(email:string):Promise<User | null>
    update(id:number , data: UpdateUserDto):Promise<User | null>
    delete(id:number):Promise<User | null>
}

export interface IHistoriqueRepository{
    create(data:CreateHistoriqueDto):Promise<Historique>
    findByTacheId(tacheId: number):Promise<Historique[]>
    findAll():Promise<Historique[]>
    findById(id:number):Promise<Historique | null>
    delete(id:number):Promise<boolean>
    update(id:number , data: UpdateHistoriqueDto):Promise<Historique | null>
}