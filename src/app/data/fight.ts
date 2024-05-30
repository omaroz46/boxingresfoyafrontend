import { Event } from "./event"

export class Fight {
    public id! : number
    public date : Date | undefined
    public location : string = ''
    public opponent : string = ''
    public result : string = ''
    public event : Event | undefined
  }