import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationConfiguration } from 'app/config/auth-config';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';

@Injectable()
export class AuthNavigateService {
  private _launchUrl: string;

  constructor(
    private router: Router,
    private authConfig: AuthenticationConfiguration,
    private authStore: AuthenticationStoreService,
  ) { }


    navigateAfterLogin() {
      const token = this.authStore.getToken();
      if (token != null) {
        const startupUri = token.user.startupUri;
        if (startupUri != null && startupUri !== '') {
          this.router.navigate([startupUri]);     // configured url is more important than one from route
        } else if (this._launchUrl != null) {
          this.router.navigate([this._launchUrl]); // go where you came from
        } else {
          this.router.navigate(['/']);              // go to main page
        }
      }
    }

    navigateToLoginUrl() {
      this.router.navigate([this.authConfig.loginRoute]);
    }

    // browser URL that user entered with
    setLaunchUrl(launchUrl: string) {
      if (launchUrl.startsWith('/login')) {
        this._launchUrl = '/';  // dont redirect to login after login
      } else {
        this._launchUrl = launchUrl;
      }
    }

}
