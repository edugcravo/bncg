import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FavorecidoComponent } from './componentes/favorecido/favorecido.component';
import { MenuSuperiorComponent } from './componentes/menu-superior/menu-superior.component';
import { HomeComponent } from './componentes/home/home.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { PropostaComponent } from './componentes/proposta/proposta.component';
import { PinComponent } from './componentes/pin/pin.component';
import { EmitenteComponent } from './componentes/emitente/emitente.component';
import { AuthInterceptor } from './services/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ListaDePropostasComponent } from './componentes/lista-de-propostas/lista-de-propostas.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { NovoUsuarioComponent } from './componentes/novoUsuario/novoUsuario.component';
import { EditarPropostaComponent } from './componentes/editar-proposta/editar-proposta.component';


registerLocaleData(en);

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
    PinComponent,
    EmitenteComponent,
    ListaDePropostasComponent,
    UsuariosComponent,
    NovoUsuarioComponent,
    EditarPropostaComponent

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSpinModule,
    NzMessageModule,
    NzTableModule,
    NzDividerModule,
    NzPaginationModule,
    MatMenuModule,
    MatIconModule,
    NzDrawerModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
