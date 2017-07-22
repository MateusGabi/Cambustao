import { GoogleMapsAPIService } from './services/google-maps-api.service';
import { LoggedInGuard } from './shared/logged-in-guard';
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {firebaseConfig} from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AuthService} from "app/shared/auth.service";
import {LoginUserComponent} from "app/login-user/login-user.component";
import {DisplayUserComponent} from "app/display-user/display-user.component";
import {RegisterUserComponent} from "app/register-user/register-user.component";
import {AlertModule} from "ngx-bootstrap";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./pages/home-page.component";
import {RegisterPageComponent} from "./pages/register-page.component";
import {AllInOnePageComponent} from "./pages/all-in-one-page.component";
import {LoginPageComponent} from "./pages/login-page.component";
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { PostosComponent } from './postos/postos.component';
import { MapaComponent } from './mapa/mapa.component';
import { CaminhoesComponent } from './caminhoes/caminhoes.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { ViagensComponent } from './viagens/viagens.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';

const routes: Routes = [
    { path: 'register', component: RegisterPageComponent },
    { path: 'all-in-one', component: AllInOnePageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: 'postos', component: PostosComponent, canActivate: [LoggedInGuard]},
    { path: 'caminhoes', component: CaminhoesComponent, canActivate: [LoggedInGuard]},
    { path: 'motoristas', component: MotoristasComponent, canActivate: [LoggedInGuard]},
    { path: 'viagens', component: ViagensComponent, canActivate: [LoggedInGuard]},
    { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [LoggedInGuard]},
    { path: '', component: HomePageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        AllInOnePageComponent,
        LoginPageComponent,
        DashboardPageComponent,
        PostosComponent,
        MapaComponent,
        CaminhoesComponent,
        MotoristasComponent,
        ViagensComponent,
        ConfiguracoesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, "Cambustao"),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routes)
    ],
    providers: [AuthService, LoggedInGuard, GoogleMapsAPIService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
