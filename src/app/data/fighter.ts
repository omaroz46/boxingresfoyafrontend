import { BoxingClub } from "./boxing-club"


export class Fighter {
    public id! : number
    public name  = ''
    public weightClass  = ''
    public fightRecord  = ''
    public boxingClub : BoxingClub | undefined
  }