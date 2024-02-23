import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmitenteService } from 'src/app/services/emitente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-emitente',
  templateUrl: './emitente.component.html',
  styleUrls: ['./emitente.component.scss']
})
export class EmitenteComponent implements OnInit{

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private emitenteService: EmitenteService){
    this.formulario = this.formBuilder.group({
      id:[0],
      emitente: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      cep: ['', Validators.required],
      telefone: ['', Validators.required],
      nome_contato: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.listarFavorecidos()
  }

  carregando: boolean = false;

  cadastrar(){
    // retirar pontos e traços do cpf ou cnpj
    let cpf_cnpj = this.retiraPontos(this.formulario.value.cpf_cnpj);
    this.formulario.controls['cpf_cnpj'].setValue(cpf_cnpj)

    //retirar traços do cep
    let cep = this.retiraPontos(this.formulario.value.cep);
    this.formulario.controls['cep'].setValue(cep);

    //transformar numero em string
    let numero = this.formulario.value.numero.toString();
    this.formulario.controls['numero'].setValue(numero);

    console.log(this.formulario.value)
    this.carregando = true;
    if (this.formulario.valid) {
      this.emitenteService.cadastrarEmitente(this.formulario.value).subscribe((data: any) => {
        console.log(data);
        if(data.data == 200){
          this.carregando = false;
          Swal.fire({
            title: 'Emitente cadastrado com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          //resetar form
          this.formulario.reset();
        }
      });
    } else {
      // Marque os campos como tocados para exibir os erros

      this.formulario.markAllAsTouched();
    }
  }

  emitente: any;
  emitentePaginado: any[] = [];

  listarFavorecidos(){
    this.emitenteService.retornaEmitente().subscribe((data: any) => {
      this.emitente = data.result;
      // colocar pontos e traços no cpf ou cnpj
      //multiplicar dados por 10 para simular uma lista grande


      this.emitentePaginado = this.paginarDados(this.emitente, 1, this.pageSize)
      for(let item of this.emitente){
        if(item.cpf_cnpj.length <= 14){
          item.cpf_cnpj = item.cpf_cnpj.replace(/(\d{3})(\d)/, '$1.$2');
          item.cpf_cnpj = item.cpf_cnpj.replace(/(\d{3})(\d)/, '$1.$2');
          item.cpf_cnpj = item.cpf_cnpj.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
          item.cpf_cnpj = item.cpf_cnpj.replace(/(\d{2})(\d)/, '$1.$2');
          item.cpf_cnpj = item.cpf_cnpj.replace(/(\d{3})(\d)/, '$1.$2');
          item.cpf_cnpj = item.cpf_cnpj.replace(/(\d{3})(\d)/, '$1/$2');
          item.cpf_cnpj = item.cpf_cnpj.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      }
    }
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

  editando: any = false;

  retornaPorId(id: number){
    this.emitenteService.retornaPorId(id).subscribe((data: any) => {
      console.log(data)

      // colocar pontos e traços no cpf ou cnpj
      if(data.result.cpf_cnpj.length <= 14){
        data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/(\d{3})(\d)/, '$1.$2');
        data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/(\d{3})(\d)/, '$1.$2');
        data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/(\d{2})(\d)/, '$1.$2');
        data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/(\d{3})(\d)/, '$1.$2');
        data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/(\d{3})(\d)/, '$1/$2');
        data.result.cpf_cnpj = data.result.cpf_cnpj.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      }

      // colocar traços no cep
      data.result.cep = data.result.cep.replace(/(\d{5})(\d)/, '$1-$2');

      this.formulario.patchValue(data.result);
      this.editando = true;

    })
  }

  editar(){
    // retirar pontos e traços do cpf ou cnpj
    let cpf_cnpj = this.retiraPontos(this.formulario.value.cpf_cnpj);
    this.formulario.controls['cpf_cnpj'].setValue(cpf_cnpj)

    //retirar traços do cep
    let cep = this.retiraPontos(this.formulario.value.cep);
    this.formulario.controls['cep'].setValue(cep);
    this.emitenteService.editaEmitente(this.formulario.value).subscribe((data: any) => {
      console.log(data)
      Swal.fire({
        title: 'Emitente editado com sucesso!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      this.listarFavorecidos();
      this.editando = false;
      this.formulario.reset();

    })
  }

  retiraPontos(event: any){
    let value = event
    value = value.replace(/\./g, '');
    value = value.replace(/\-/g, '');
    value = value.replace(/\//g, '');
    return  value;
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
    this.emitentePaginado = this.paginarDados(this.emitente, pageIndex, this.pageSize);
  }
}
