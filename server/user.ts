export class User {
    public readonly id: any;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly emailAddress: string;
    public readonly password: string;
    constructor(id, firstName, lastName, emailAddress, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
}