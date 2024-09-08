import { Address } from "src/app/model/address/Address";

export class UserRegister {
    email: string = '';
    password: string = '';
    name: string = '';
    phone: string = '';

    address?: Address;
}