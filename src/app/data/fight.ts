import { Event } from "./event"

export class Fight {
    public id! : number
    public date! : Date
    public location  = ''
    public opponent  = ''
    public result  = ''
    public event : Event | undefined
  }