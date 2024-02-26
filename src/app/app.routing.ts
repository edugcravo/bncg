import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { FavorecidoComponent } from './componentes/favorecido/favorecido.component';
import { MenuSuperiorComponent } from './componentes/menu-superior/menu-superior.component';
import { HomeComponent } from './componentes/home/home.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { PropostaComponent } from './componentes/proposta/proposta.component';
import { PinComponent } from './componentes/pin/pin.component';
import { EmitenteComponent } from './componentes/emitente/emitente.component';
import { AuthGuard } from './componentes/autentica/AuthGuard';
import { ListaDePropostasComponent } from './componentes/lista-de-propostas/lista-de-propostas.component';



const APP_ROUTES: Routes = [
  { path:'', redirectTo:'/home',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'favorecido', component: FavorecidoComponent, canActivate: [AuthGuard]},
  { path: 'menu', component: MenuSuperiorComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'proposta', component: PropostaComponent, canActivate: [AuthGuard]},
  { path: 'pin', component: PinComponent},
  { path: 'emitente', component: EmitenteComponent, canActivate: [AuthGuard]},
  { path: 'lista-de-propostas', component: ListaDePropostasComponent, canActivate: [AuthGuard]},
];



export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);/*Parametro é a constante declarada a cima */
