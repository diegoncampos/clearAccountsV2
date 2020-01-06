export class User{
    email: string;
    password: string;
    name?: string;
    constructor() {
        this.email = "";
        this.password = "";
    }
}