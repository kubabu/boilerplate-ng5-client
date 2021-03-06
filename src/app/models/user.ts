export class User {
    id: number;
    name: string;
    startupUri: string;
    role: string;
    password: string;

    public constructor(init?: Partial<User>) {
      Object.assign(this, init);
  }
}
