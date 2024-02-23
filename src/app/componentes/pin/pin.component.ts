import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.loginService.login(this.formulario.value).then((data: any) => {
        console.log(data);
        if(data.access_token){
         this.router.navigate(['/proposta']);
        }else{
          return
        }

      })
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
    }
  }

}
