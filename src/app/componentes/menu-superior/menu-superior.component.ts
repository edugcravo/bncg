import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  scrollToContact() {
    const contatoElement = document.getElementById('contato');
    if (contatoElement) {
      contatoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToService() {
    const serviceElement = document.getElementById('servicos');
    if (serviceElement) {
      serviceElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  constructor(private router:Router, private sharedService: SharedService) { 

  }

  ngOnInit() {
  }

  redirecionaHome(){
    this.router.navigate(['/home']);
  }
}
