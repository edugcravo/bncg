import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  redirecionarParaWhatsapp() {
    const numeroWhatsapp = '5541999999999';
    const mensagem = 'Olá, gostaria de saber mais sobre os serviços da empresa';
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  scrollTo(rota: any) {
    this.router.navigate(['/home']).then(() => {
      const contatoElement = document.getElementById(rota);
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'instant' });
      }
    });
  }

  scrollToCadastro(){
    this.router.navigate(['/cadastro']).then(() => {
      const contatoElement = document.getElementById('cadastro');
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'instant' });
      }
    });
  
  }

}
