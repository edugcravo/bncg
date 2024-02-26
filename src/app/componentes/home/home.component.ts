import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
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
}
