import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { FavorecidoComponent } from './componentes/favorecido/favorecido.component';
import { MenuSuperiorComponent } from './componentes/menu-superior/menu-superior.component';
import { HomeComponent } from './componentes/home/home.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';



const APP_ROUTES: Routes = [
  { path:'', redirectTo:'/home',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'favorecido', component: FavorecidoComponent},
  { path: 'menu', component: MenuSuperiorComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cadastro', component: CadastroComponent}
  

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);/*Parametro é a constante declarada a cima */