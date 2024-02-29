import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../autentica/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  usuarioLogado: any = false;
  admin: any = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.verificaAdmin();
    this.verificarQualRota();
  }

  checkLoginStatus() {
    this.authService.getLoginStatus().subscribe(logado => {
      this.usuarioLogado = logado;
      this.authService.getUsername().subscribe((data: any) => {
        this.usuarioLogado = true;
      });

    });
  }

  verificaAdmin() {
    this.admin = false;
    this.authService.getAdmin().subscribe((data: any) => {
      this.admin = data.admin;
    });
  }

  scrollToContato() {
    this.router.navigate(['/home']).then(() => {
      const contatoElement = document.getElementById('contato');
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'instant' });
      }
    });
  }


  redirecionaHome() {
    this.router.navigate(['/home']);
  }

  deslogar() {
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
      if (result.isConfirmed) {
        this.authService.logout();
      } else if (result.isDenied) {
        return;
      }
    });
  }

  redirecionarParaWhatsapp() {
    const numeroWhatsapp = '5541999999999';
    const mensagem = 'Olá, gostaria de saber mais sobre os serviços da empresa';
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  rota: any = false;

  verificarQualRota() {
    if (this.router.url === '/cadastro') {
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
