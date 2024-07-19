import { Component } from '@angular/core';
import { ImgPelicula } from '../../interfaces/img-pelicula.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';
import { Pelicula } from '../../interfaces/pelicula.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-img-pelicula',
  templateUrl: './img-pelicula.component.html',
  styleUrl: './img-pelicula.component.css'
})
export class ImgPeliculaComponent {

  ImgPeliculas!: ImgPelicula[];
  idPelicula! : string;
  pelicula: Pelicula = {
    titulo: '',
    descripcion: '',
    fecha_lanzamiento: '',
    img: '',
    _id: '0',
  };

  unResultado!: any;
  accion: string = 'Mensaje';
  mensaje: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mongoDBService: MongoDbService,
  ){
    this.activatedRoute.params.subscribe(params => {
      this.idPelicula = params['id'];
      // console.log("ID PELICULA - IMG ", this.idPelicula);
    });
  }

  async ngOnInit(){
    await this.cargarPeliculaBD();
    await this.getImgPeliculasBD();
  }

  async cargarPeliculaBD(){
    await this.mongoDBService
    .getPelicula(this.idPelicula)
    .toPromise()
    .then((data: any) => {
      this.pelicula = data.resp;
      // console.log("PELICULA ", this.pelicula.titulo);
    });
  }

  async getImgPeliculasBD(){
    await this.mongoDBService
    .getImgXIdPelicula(this.idPelicula)
    .toPromise() // Convertimos el observable a promesa
    .then((data: any) => {
      this.ImgPeliculas = data.resp;
      // console.log("DATOS ", this.ImgPeliculas);
    });
  }

  insertarImgPelicula(){
    this.router.navigate(['/img-pelicula-create', this.idPelicula]);
  }

  eliminarImgPelicula(imgPelicula: any){
    // console.log("Eliminar ", imgPelicula)
    this.mongoDBService.crudImgPelicula(imgPelicula, "eliminar").subscribe(
      (res: any) => {
        this.unResultado = res;

        if (this.unResultado.Ok == true){
          Swal.fire({
            title: 'ELIMINADO',
            text: "Imagen de película eliminada",
            icon: "success"
          });

          this.accion = 'Mensaje';
          this.mensaje = 'Imagen Pelicula Eliminada';
          setTimeout(() => (this.mensaje = ''), 3000);

        this.ngOnInit();

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
}
