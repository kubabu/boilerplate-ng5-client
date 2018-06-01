export class SidenavItem {
    public routerLink: string;
    public caption: string;
    public icon: string;

    public constructor(init?: Partial<SidenavItem>) {
        Object.assign(this, init);
    }
}
