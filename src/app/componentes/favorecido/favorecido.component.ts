import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavorecidoService } from 'src/app/services/favorecido.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-favorecido',
  templateUrl: './favorecido.component.html',
  styleUrls: ['./favorecido.component.css']
})
export class FavorecidoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private favoreciService: FavorecidoService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id:[0],
      favorecido: ['', Validators.required],
      cpf_cnpj: ['', Validators.required]
    });
  }


  cadastrar() {
    if (this.formulario.valid) {
      this.favoreciService.cadastraFavorecido(this.formulario.value).subscribe((data: any) => {
        if(data.status == 200){
          Swal.fire({
            title: 'Favorecido cadastrado com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          //resetar form
          this.formulario.reset();
         }
      })
      console.log(this.formulario.value);
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
    }
  }
}
