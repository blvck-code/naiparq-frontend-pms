import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { BrowserTracing } from '@sentry/tracing';

import { AppModule } from './app.module';

Sentry.init({
  dsn: 'https://f235b6ca9165418d8714ca798826bd3d@o4504598114598912.ingest.sentry.io/4504598117154816',
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: ['localhost', 'http:localhost:4200'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((success) => console.log(`Bootstrap success`))
  .catch((err) => console.error(err));
