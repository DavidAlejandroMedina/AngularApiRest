import { Component } from '@angular/core';
import { MongoDbService } from '../../services/mongo-db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { Casting } from '../../interfaces/casting.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-casting-detail',
  templateUrl: './casting-detail.component.html',
  styleUrl: './casting-detail.component.css'
})
export class CastingDetailComponent {

  tipo: string = '';
  id: string = '';
  castings!: Casting[];

  heroe: Heroe = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: '',
    _id: '0',
  };
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
    private mongoDBService: MongoDbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.tipo = params['tipo'];
      this.id = params['id'];
      // console.log("TIPO ", this.tipo);
      // console.log("ID ", this.id);
    });
  }

  async ngOnInit(){
    if (this.tipo !== "heroe") {
      await this.cargarPeliculaBD();
      await this.cargarCastingXIdPeliculaBD();
    } else {      
      await this.cargarHeroeBD();
      await this.cargarCastingXIdHeroeBD();
    }
  }

  async cargarHeroeBD(){
    await this.mongoDBService
    .getHeroe(this.id)
    .toPromise()
    .then((data: any) => {
      this.heroe = data.resp;
      // console.log("HEROE ", data);
    });
  }

  async cargarPeliculaBD(){
    await this.mongoDBService
    .getPelicula(this.id)
    .toPromise()
    .then((data: any) => {
      this.pelicula = data.resp;
      // console.log("PELICULA ", data);
    });
  }

  async cargarCastingXIdHeroeBD(){
    await this.mongoDBService
    .getCastXIdHeroe(this.id)
    .toPromise()
    .then((data: any) => {
      this.castings = data.resp;
      // console.log("CASTING Heroe ", this.castings);
    });
  }

  async cargarCastingXIdPeliculaBD(){
    await this.mongoDBService
    .getCastXIdPelicula(this.id)
    .toPromise()
    .then((data: any) => {
      this.castings = data.resp;
      // console.log("CASTING Pelicula", this.castings);
    });
  }

  insertarCasting(){
    this.router.navigate(['/casting-insert', this.tipo, this.id]);
  }

  eliminarCasting(casting: any){ 
    console.log("Eliminar ", casting)
    this.mongoDBService.crudCasting(casting, "eliminar").subscribe(
      (res: any) => {
        this.unResultado = res;

        if (this.unResultado.Ok == true){
          Swal.fire({
            title: 'ELIMINADO',
            text: "Relación con casting eliminada",
            icon: "success"
          });

          this.accion = 'Mensaje';
          this.mensaje = 'Relación Casting Eliminada';
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
