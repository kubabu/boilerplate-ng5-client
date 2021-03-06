import { Injectable } from '@angular/core';
import { SidenavItem } from 'app/models/sidenav-item';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { SidebarMappingConfiguration } from 'app/config/sidebar-mapping-config';
import { RolesService } from 'app/services/auth/roles-service';


@Injectable()
export class SidebarMappingService {

  constructor(
    private mappingConfig: SidebarMappingConfiguration,
    private tokenStore: AuthenticationStoreService,
    private rolesConfig: RolesService,
  ) { }

  public getSidenavItems(isAuthenticated: boolean): SidenavItem[] {
    if (!isAuthenticated) {
      return this.getItemsNotAuth();
    } else {
      const role = this.tokenStore.getToken().user.role;
      return this.getItemsForRole(role);
    }
  }

  getItemsForRole(role: string): SidenavItem[] {

    const items = [
      new SidenavItem({routerLink: '', caption: 'Zalogowano: ' + role}), // todo: put login here
    ];

    if (this.rolesConfig.isUser(role)) {
      this.mappingConfig.userSidenavItems.forEach(element => {
        items.push(element);
      });
    }

    if (this.rolesConfig.isAdmin(role)) {
      this.mappingConfig.adminSidenavItems.forEach(element => {
        items.push(element);
      });
    }

    if (role === 'dev') {
      this.mappingConfig.develSidenavItems.forEach(element => {
        items.push(element);
      });
    }

    this.mappingConfig.authorizedSidenavItemsEnd.forEach(element => {
      items.push(element);
    });

    return items;
  }

  getItemsNotAuth(): SidenavItem[] {
    return this.mappingConfig.unauthorizedSidenavItems;
  }

}
