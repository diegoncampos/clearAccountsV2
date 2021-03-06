import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';

import { SelectFromListPage } from './pages/modals/select-from-list/select-from-list.page'

import { environment } from '../environments/environment';

import { HttpClientModule, HttpClient } from  '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SelectFromListPage],
  entryComponents: [SelectFromListPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SocialSharing,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
