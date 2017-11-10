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
import { CaminhoesComponent } from './caminhoes/caminhoes.component';
import { ViagensComponent } from './viagens/viagens.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AcoesRapidasDashboardComponent } from './acoes-rapidas-dashboard/acoes-rapidas-dashboard.component';
import * as firebase from "firebase";
import { TypeaheadModule } from 'ngx-bootstrap';
import { EditarcaminhaoComponent } from './editarcaminhao/editarcaminhao.component';
import { MotoristaComponent } from './motorista/motorista.component';
import { EditarmotoristaComponent } from './editarmotorista/editarmotorista.component';
import { RemoverPostoComponent } from './remover-posto/remover-posto.component';
import { EditarpostoComponent } from './editarposto/editarposto.component';
import { PostosManagementComponent } from './postos-management/postos-management.component';

const routes: Routes = [
    { path: 'register', component: RegisterPageComponent },
    { path: 'all-in-one', component: AllInOnePageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: 'postos', component: PostosComponent, canActivate: [LoggedInGuard]},
    { path: 'caminhoes', component: CaminhoesComponent, canActivate: [LoggedInGuard]},
    { path: 'motoristas', component: MotoristaComponent, canActivate: [LoggedInGuard]},
    { path: 'viagens', component: ViagensComponent, canActivate: [LoggedInGuard]},
    { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [LoggedInGuard]},
    { path: '', component: HomePageComponent },
    { path: 'postoManagement', component: PostosManagementComponent, canActivate: [LoggedInGuard]},

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
        CaminhoesComponent,
        ViagensComponent,
        ConfiguracoesComponent,
        AcoesRapidasDashboardComponent,
        EditarcaminhaoComponent,
        MotoristaComponent,
        EditarmotoristaComponent,
        RemoverPostoComponent,
        EditarpostoComponent,
        PostosManagementComponent
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
        RouterModule.forRoot(routes),
        TypeaheadModule.forRoot()
    ],
    providers: [AuthService, LoggedInGuard, GoogleMapsAPIService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
