import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../autentica/auth.service';


@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {


  constructor(private router:Router, private sharedService: SharedService, private authService: AuthService) {

  }

  usuarioLogado: any = false;
  admin: any = false;

  ngOnInit() {
    this.verificaUsuarioLogado()
    this.verificaAdmin()
  }

  verificaUsuarioLogado(){
    localStorage.getItem('token') ? this.usuarioLogado = true : this.usuarioLogado = false;
    this.atualizaAdminStatus();
  }

  verificaAdmin(){
    this.atualizaAdminStatus();
  }

  scrollToContato() {
    this.router.navigate(['/home']).then(() => {
      const contatoElement = document.getElementById('contato');
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  scrollToService() {
    this.router.navigate(['/home']).then(() => {
      const contatoElement = document.getElementById('servicos');
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  redirecionaHome(){
    this.router.navigate(['/home']);
  }

  deslogar(){
    this.authService.logout();
  }

  atualizaAdminStatus() {
    localStorage.getItem('ad') ? this.admin = true : this.admin = false;
  }
}
