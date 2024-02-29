import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-lista-de-propostas',
  templateUrl: './lista-de-propostas.component.html',
  styleUrls: ['./lista-de-propostas.component.scss']
})
export class ListaDePropostasComponent implements OnInit{

    constructor(private cartaService: CartaService) { 

    }

    ngOnInit() {
      this.listarPropostas();


    }

    proposta: any;
    propostaPaginada: any = [];

    listarPropostas(){
      this.cartaService.retornaCartas().subscribe((data: any) => {
        this.proposta = data?.result;

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
}
