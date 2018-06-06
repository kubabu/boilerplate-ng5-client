export class User {
    id: number;
    name: string;
    startupUri: string;

    public constructor(init?: Partial<User>) {
      Object.assign(this, init);
  }
}
