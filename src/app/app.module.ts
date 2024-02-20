import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FavorecidoComponent } from './componentes/favorecido/favorecido.component';
import { MenuSuperiorComponent } from './componentes/menu-superior/menu-superior.component';
import { HomeComponent } from './componentes/home/home.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { PropostaComponent } from './componentes/proposta/proposta.component';
import { PinComponent } from './componentes/pin/pin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FavorecidoComponent,
    MenuSuperiorComponent,
    HomeComponent,
    CadastroComponent,
    ContatoComponent,
    RodapeComponent,
    PropostaComponent,
    PinComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
