export class UserWithJWT {
  constructor(
    public firstname: string,
    public lastname: string,
    public username: string,
    public id: string,
    public jwt: string
  ) {}
}
