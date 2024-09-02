import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from 'src/store/AppStoreModule';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { LoadingComponent } from './components/loading/loading.component';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],

  imports: [
    BrowserModule, 
    StoreDevtoolsModule.instrument({maxAge: 25}), 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ...AppStoreModule
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
