import {NgModule, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { OnlineStatusModule } from 'ngx-online-status';

// NgRx
import {ActionReducer, MetaReducer, StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {localStorageSync} from "ngrx-store-localstorage";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {EffectsModule} from "@ngrx/effects";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {CookieService} from "ngx-cookie-service";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {environment} from "../environments/environment";

// Setting user details on localstorage
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['userCenter'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    OnlineStatusModule,
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Naiparq',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
