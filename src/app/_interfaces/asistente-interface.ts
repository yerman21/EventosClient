import { UserInterface } from './user-interface';

export interface AsistenteInterface {
    users_id:number,
    evento_id:number,
    check_anfitrion:number,
    check_invitado:number,
    hora_check_asist:Date,
    estado:number,
    user:UserInterface
}
