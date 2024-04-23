import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), 
    provideAnimationsAsync(),
    provideAnimations(), 
    HashLocationStrategy, 

    importProvidersFrom(HttpClientModule),

    provideHttpClient(
      // withInterceptors([tokenInterceptor])
    ), provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
