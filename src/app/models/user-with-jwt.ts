export class UserWithJWT {
  constructor(
    public firstname: string,
    public lastname: string,
    public username: string,
    public id: string,
    public _jwt: string,
    public _jwtExpirationDate: Date
  ) {}

  get jwt() {
    if (!this._jwt || new Date() > this._jwtExpirationDate) {
      return null;
    }
    return this._jwt;
  }
}
