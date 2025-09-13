import { Etat } from "@prisma/client"
import { User } from "./User"


export interface Tache {
    id : number,
    titre : string,
    description: string | null,
    etat : Etat,
    dateCreation : Date,
    dateUpdate : Date,
    userId: number,
    user?: User
}

export interface CreateTacheDto{
    titre : string,
    description?: string,
    etat?: Etat,
    userId: number
}

export interface UpdateTacheDto{
    titre : string,
    description?: string ,
    etat?: Etat
}