export class Movie {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public dateReleased: string,
    public favoriteId?: string
  ) {}
}
