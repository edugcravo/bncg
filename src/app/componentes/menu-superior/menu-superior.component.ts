import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../autentica/auth.service';
import Swal from 'sweetalert2'


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
    //verifica se ta logado

    this.authService.getLoginStatus().subscribe(logado => {
      this.usuarioLogado = logado;

    this.authService.getUsername().subscribe((data: any) => {
      console.log(data)
      if(data.username){
        this.usuarioLogado = true;
      }
    });
  })
    this.verificaAdmin()
    this.verificarQualRota()
  }



  verificaAdmin(){
    this.authService.getAdmin().subscribe((data: any) => {
      console.log(data)
      this.admin = data.admin;
    })
  }

  scrollToContato() {
    this.router.navigate(['/home']).then(() => {
      const contatoElement = document.getElementById('contato');
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'instant' });
      }
    });
  }

  scrollToService() {
    this.router.navigate(['/home']).then(() => {
      const contatoElement = document.getElementById('servicos');
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior:  'instant'});
      }
    });
  }

  redirecionaHome(){
    this.router.navigate(['/home']);
  }

  deslogar(){
    Swal.fire({
      title: "Deseja sair?",
      showDenyButton: true,
      confirmButtonText: "Sair",
      denyButtonText: `Cancelar`,
      customClass: {
        confirmButton: "botao-sair",
        denyButton: "botao-cancelar"
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.logout();
        
      } else if (result.isDenied) {
        return;
      }
    });

  }


  redirecionarParaWhatsapp() {
    // Número de telefone do WhatsApp (substitua pelo seu número)
    const numeroWhatsapp = '5541999999999';
    // Mensagem pré-pronta
    const mensagem = 'Olá, gostaria de saber mais sobre os serviços da empresa';

    // Cria o link para o WhatsApp com o número e a mensagem
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

    // Redireciona para o WhatsApp
    window.open(url, '_blank');
  }

  rota: any = false;

  verificarQualRota(){
    if(this.router.url === '/cadastro'){
      this.rota = true;
    }
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
