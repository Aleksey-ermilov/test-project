
export interface IReadableUser {
    readonly email: string;
    readonly name: string;
    readonly group: string;
    readonly course: string;
    readonly specialty: string;
    // readonly password: string;
    readonly role: string;
    readonly avatar: string;
    token?: string;
}
