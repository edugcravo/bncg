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

  scrollTo(rota: any) {
    this.router.navigate(['/home']).then(() => {
      const contatoElement = document.getElementById(rota);
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

}
