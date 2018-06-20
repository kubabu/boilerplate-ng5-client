export class UserViewModel {
    id: number;
    name: string;
    startupUri: string;
    role: string;
    tabs: string[];

    public constructor(init?: Partial<UserViewModel>) {
      Object.assign(this, init);
  }
}
