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

  @Output() redirecionamento = new EventEmitter<string>();

  constructor(private router:Router, private sharedService: SharedService) { 

  }

  ngOnInit() {
  }

  redireciona(){
    this.router.navigate(['/home']);
  }

}
