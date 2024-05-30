import { BoxingClub } from "./boxing-club"


export class Fighter {
    public id! : number
    public name : string = ''
    public weightClass : string = ''
    public fightRecord : string = ''
    public boxingClub : BoxingClub | undefined
  }