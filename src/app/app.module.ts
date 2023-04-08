import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TokenInterceptor } from './interceptor/token.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamService } from './services/team.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiService } from './services/ui.service';
import { TourriderService } from './services/tourrider.service';
import { RiderService } from './services/rider.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { EtappeService } from './services/etappe.service';
import { HeadlineService } from './services/headline.service';
import { ClassificationsService } from './services/stageclassifications.service';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { PredictionScoreService } from './services/prediction-score.service';
import { LoginModule } from "./components/login/login.module";

registerLocaleData(localeNl);

@NgModule({
    declarations: [AppComponent],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        { provide: LOCALE_ID, useValue: 'nl-NL' },
        TeamService,
        UiService,
        TourriderService,
        AuthService,
        RiderService,
        EtappeService,
        HeadlineService,
        ClassificationsService,
        PredictionScoreService],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireAuthModule, LoginModule]
})
export class AppModule { }
