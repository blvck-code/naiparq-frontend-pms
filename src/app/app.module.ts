import {inject, InjectionToken, NgModule, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";

// NgRx
import {ActionReducer, MetaReducer, StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {localStorageSync} from "ngrx-store-localstorage";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {EffectsModule} from "@ngrx/effects";

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
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Naiparq',
      maxAge: 25,
      logOnly: !isDevMode()
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
