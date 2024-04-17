import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { AppConfigService } from '@nx-sample/app-config';
import { API_URL } from '@nx-sample/http-client';
import { errorHandlingInterceptor } from '@nx-sample/error-handler';
import { environment } from '../environments/environment';
import { provideRouterStore } from '@ngrx/router-store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

interface AppConfig {
  type: 'web' | 'terminal';
}

function initializeAppFactory(configService: AppConfigService<AppConfig>) {
  return () => configService.fetchConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
    provideStore(),
    provideEffects(),
    provideRouterStore(),
    !environment.production ? provideStoreDevtools() : [],
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: initializeAppFactory,
    },
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
  ],
};
