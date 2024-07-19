import { Component } from '@angular/core';
import { MongoDbService } from '../../services/mongo-db.service';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pelicula-list',
  templateUrl: './pelicula-list.component.html',
  styleUrl: './pelicula-list.component.css'
})
export class PeliculaListComponent {

  Peliculas!: Pelicula[];
  unResultado!: any;
  accion: string = 'Mensaje';
  mensaje: string = '';

  constructor( private mongoDBService: MongoDbService, private router: Router ) { }

  async ngOnInit(){
    await this.getPeliculasBD();
  }

  async getPeliculasBD(){
    await this.mongoDBService
    .getPeliculas()
    .toPromise() // Convertimos el observable a promesa
    .then((data: any) => {
      this.Peliculas = data.resp;
    });
  }

  editarPelicula(id: any){
    this.router.navigate(['/pelicula-edit', id]);
  }

  eliminarPelicula(pelicula: any){
    this.mongoDBService.crudPeliculas(pelicula, "eliminar").subscribe(
      (res: any) => {
      this.unResultado = res;

      if (this.unResultado.Ok == true){
        Swal.fire({
          title: 'ELIMINADA',
          icon: "success",
          text : this.unResultado.msg,
        });

        this.accion = 'Mensaje';
        this.mensaje = 'Pelicula Eliminada';
        setTimeout(() => (this.mensaje = ''), 3000);

        this.getPeliculasBD();

      } else {

        Swal.fire({
          icon : 'info',
          title : 'Información',
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
    this.router.navigate(['/img-pelicula', id]);
  }

}
