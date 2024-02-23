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
      cpf_cnpj: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      cep: ['', Validators.required],
    });

    this.listarFavorecidos()
  }


  cadastrar() {
    //retirar pontos e traços do cpf ou cnpj
    let cpf_cnpj = this.formulario.value.cpf_cnpj;
    cpf_cnpj = cpf_cnpj.replace(/\./g, '');
    cpf_cnpj = cpf_cnpj.replace(/\-/g, '');
    cpf_cnpj = cpf_cnpj.replace(/\//g, '');
    this.formulario.controls['cpf_cnpj'].setValue(cpf_cnpj);

    console.log(this.formulario.value);

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
          //definir o cep como a opcao disabled
          // this.formulario.controls['cep'].setValue("");
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

  applyCpfCnpjMask(event: any) {
    let value = event.target.value;
    // aplicar amscara de cpf ou cnpj
    if (value.length <= 14) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1/$2');
      value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    event.target.value = value;

  }
}
