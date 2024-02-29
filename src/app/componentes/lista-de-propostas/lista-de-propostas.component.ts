import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaService } from 'src/app/services/carta.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-de-propostas',
  templateUrl: './lista-de-propostas.component.html',
  styleUrls: ['./lista-de-propostas.component.scss']
})
export class ListaDePropostasComponent implements OnInit{

    constructor(private cartaService: CartaService, private sharedService: SharedService, private router: Router) { 

    }

    ngOnInit() {
      this.listarPropostas();


    }

    proposta: any;
    propostaPaginada: any = [];

    listarPropostas(){

      // formatar valor

      this.cartaService.retornaCartas().subscribe((data: any) => {
        this.proposta = data?.result;

        for(let item of this.proposta){
          item.valor = item.valor.replace(/\D/g, "");
          item.valor = item.valor.replace(/(\d)(\d{2})$/, "$1,$2");
          item.valor = item.valor.replace(/(?=(\d{3})+(\D))\B/g, ".");

          item.valorCobrado = item.valorCobrado.replace(/\D/g, "");
          item.valorCobrado = item.valorCobrado.replace(/(\d)(\d{2})$/, "$1,$2");
          item.valorCobrado = item.valorCobrado.replace(/(?=(\d{3})+(\D))\B/g, ".");
        }

        this.propostaPaginada = this.paginarDados(this.proposta, 1, this.pageSize)
      });
    }

    retornarPropostaPorId(id: any){
      // mandar os dados e baixar arquivo
      this.cartaService.retornaPropostaPorId(id).subscribe((data: any) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Carta fiança.pdf'; // Nome que o arquivo terá ao ser baixado
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }

    retornaCertificadoPorId(id: any){
      // mandar os dados e baixar arquivo
      this.cartaService.retornaCertificadoPorId(id).subscribe((data: any) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Certificado.pdf'; // Nome que o arquivo terá ao ser baixado
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }

    currentPage = 1;
    pageSize = 5;


  paginarDados(data: any[], page: number, pageSize: number): any[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.propostaPaginada = this.paginarDados(this.proposta, pageIndex, this.pageSize);
  }

  excluirCarta(id: any){
    Swal.fire({
      title: 'Tem certeza que deseja excluir essa proposta?',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
      customClass: {
        confirmButton: "botao-sair",
        denyButton: "botao-cancelar"
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartaService.excluirCartaPorId(id).subscribe((data: any) => {
          this.listarPropostas();
        });
      }
    
    })
  }
}
