import { Component } from '@angular/core';
import { MongoDbService } from '../../services/mongo-db.service';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent {
  Heroes!: Heroe[];

  unResultado!: any;
  accion: string = 'Mensaje';
  mensaje: string = '';

  constructor(private mongoDBService: MongoDbService, private router: Router ) { }

  async ngOnInit(){
    await this.getHeroesBD();
  }

  async getHeroesBD(){
    await this.mongoDBService
    .getHeroes()
    .toPromise() // Convertimos el observable a promesa
    .then((data: any) => {
      this.Heroes = data.resp;
      // console.log("DATOS ", this.Heroes);
    });
  }

  editarHeroe(id: any){
    this.router.navigate(['/heroe-edit', id]);
  }

  eliminarHeroe(heroe: any){
    this.mongoDBService.crudHeroes(heroe, "eliminar").subscribe(
      (res: any) => {
      this.unResultado = res;

      if (this.unResultado.Ok == true){
        Swal.fire({
          title: 'ELIMINADO',
          text: "Heroe Eliminado",
          icon: "success"
        });

        this.accion = 'Mensaje';
        this.mensaje = 'Heroe Eliminado';
        setTimeout(() => (this.mensaje = ''), 3000);

        this.getHeroesBD();

      } else {

        Swal.fire({
          icon : 'info',
          title : 'información',
          text : this.unResultado.msg,
        });

        this.accion = 'Error: ';
        this.mensaje = this.unResultado.msg;
        setTimeout(() => (this.mensaje = ''), 3000);
      }

    },
    (error : any) => {
      console.error("ERROR ", error);
    });

  }

  editarFoto(id: string){
    this.router.navigate(['/img-heroe', id]);
  }
}
