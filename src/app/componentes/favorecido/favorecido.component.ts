import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableSortFn } from 'ng-zorro-antd/table';
import { FavorecidoService } from 'src/app/services/favorecido.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-favorecido',
  templateUrl: './favorecido.component.html',
  styleUrls: ['./favorecido.component.css']
})
export class FavorecidoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private favorecidoService: FavorecidoService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id:[0],
      favorecido: ['', Validators.required],
      cpf_cnpj: ['', Validators.required]
    });

    this.listarFavorecidos()
  }


  cadastrar() {
    if (this.formulario.valid) {
      this.favorecidoService.cadastraFavorecido(this.formulario.value).subscribe((data: any) => {
        if(data.status == 200){
          Swal.fire({
            title: 'Favorecido cadastrado com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          //resetar form
          this.formulario.reset();
          this.listarFavorecidos();
         }
      })
    } else {
      // Marque os campos como tocados para exibir os erros
      this.formulario.markAllAsTouched();
    }
  }

  favorecidos: any;

  listarFavorecidos(){
    this.favorecidoService.retornaFavorecidos().subscribe((data: any) => {
      this.favorecidos = data.result;
      console.log(data);
    })
  }

  editando: any = false;

  retornaPorId(id: number){
    this.favorecidoService.retornaPorId(id).subscribe((data: any) => {
      console.log(data)
      this.formulario.patchValue(data.result);
      this.editando = true;
      //deixar botao editando ao inves de cadastrar

    })

  }

  editar(){
    this.favorecidoService.editaFavorecido(this.formulario.value).subscribe((data: any) => {
      console.log(data)
      this.listarFavorecidos();
      this.editando = false;
      this.formulario.reset();

    })
  }
}
