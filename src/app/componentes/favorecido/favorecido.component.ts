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
      numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
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

    //retirar traços do cep
    let cep = this.formulario.value.cep;
    cep = cep.replace(/\-/g, '');
    this.formulario.controls['cep'].setValue(cep);


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
  favorecidoPaginado: any[] = [];

  listarFavorecidos(){
    this.favorecidoService.retornaFavorecidos().subscribe((data: any) => {
      console.log(data)
      for(let item of data.result){
        console.log(item)
        if(item.cpf_cnpj.length < 14){
          console.log('if')
          item.cpf_cnpj = item.cpf_cnpj.replace(/^(\d{3})(\d)/, '$1.$2');
          item.cpf_cnpj = item.cpf_cnpj.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
          item.cpf_cnpj = item.cpf_cnpj.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
        } else {
          console.log('else')
          item.cpf_cnpj = item.cpf_cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
          item.cpf_cnpj = item.cpf_cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
          item.cpf_cnpj = item.cpf_cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
          item.cpf_cnpj = item.cpf_cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1,2})$/, '$1.$2.$3/$4-$5');
        }
      }

      this.favorecidos = data.result;

      this.favorecidoPaginado = this.paginarDados(this.favorecidos, 1, this.pageSize)
    })
  }

  editando: any = false;

  retornaPorId(id: number){

    

    this.favorecidoService.retornaPorId(id).subscribe((data: any) => {
      console.log(data.result.cpf_cnpj)
     // colocar pontos e traços no cpf ou cnpj
     console.log(data.result.cpf_cnpj.length)
     if(data.result.cpf_cnpj.length < 14){
      console.log('if')
      data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/^(\d{3})(\d)/, '$1.$2');
      data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
    } else {
      console.log('else')
      data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
      data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1,2})$/, '$1.$2.$3/$4-$5');
    }
      console.log(data.result.cpf_cnpj)
      data.result.cep = data.result.cep.replace(/(\d{5})(\d)/, '$1-$2');


      this.formulario.patchValue(data.result);
      this.editando = true;
      //deixar botao editando ao inves de cadastrar

    })

  }

  editar(){

     //retirar pontos e traços do cpf ou cnpj
     let cpf_cnpj = this.formulario.value.cpf_cnpj;
     cpf_cnpj = cpf_cnpj.replace(/\./g, '');
     cpf_cnpj = cpf_cnpj.replace(/\-/g, '');
     cpf_cnpj = cpf_cnpj.replace(/\//g, '');
     this.formulario.controls['cpf_cnpj'].setValue(cpf_cnpj);
 
     //retirar traços do cep
     let cep = this.formulario.value.cep;
     cep = cep.replace(/\-/g, '');
     this.formulario.controls['cep'].setValue(cep);

    this.favorecidoService.editaFavorecido(this.formulario.value).subscribe((data: any) => {
      this.listarFavorecidos();
      this.editando = false;
      this.formulario.reset();

      Swal.fire({
        title: 'Favorecido editado com sucesso!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })

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


  applyCepMask(event: any) {
    let value = event.target.value;
    // aplicar amscara de cpf ou cnpj
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    event.target.value = value;
  }


  // Propriedades da tabela e da paginação
  currentPage = 1;
  pageSize = 5;


  paginarDados(data: any[], page: number, pageSize: number): any[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.favorecidoPaginado = this.paginarDados(this.favorecidos, pageIndex, this.pageSize);
  }
}
