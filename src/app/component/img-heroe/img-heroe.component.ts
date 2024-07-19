import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';
import { ImgHeroe } from '../../interfaces/img-heroe.interface';
import { Heroe } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-img-heroe',
  templateUrl: './img-heroe.component.html',
  styleUrl: './img-heroe.component.css'
})
export class ImgHeroeComponent {

  ImgHeroes!: ImgHeroe[];
  idHeroe! : string;
  heroe: Heroe = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: '',
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
      this.idHeroe = params['id'];
      // console.log("ID HEROE - IMG ", this.idHeroe);
    });
  }

  async ngOnInit(){
    await this.cargarHeroeBD();
    await this.getImgHeroesBD();
  }

  async cargarHeroeBD(){
    await this.mongoDBService
    .getHeroe(this.idHeroe)
    .toPromise()
    .then((data: any) => {
      this.heroe = data.resp;
      // console.log("HEROE ", this.heroe.nombre);
    });
  }


  async getImgHeroesBD(){
    await this.mongoDBService
    .getImgXIdHeroe(this.idHeroe)
    .toPromise() // Convertimos el observable a promesa
    .then((data: any) => {
      this.ImgHeroes = data.resp;
      // console.log("DATOS ", this.ImgHeroes);
    });
  }

  insertarImgHeroe(){
    this.router.navigate(['/img-heroe-create', this.idHeroe]);
  }

  eliminarImgHeroe(imgHeroe: any){
    // console.log("Eliminar ", imgHeroe)
    this.mongoDBService.crudImgHeroes(imgHeroe, "eliminar").subscribe(
      (res: any) => {
        this.unResultado = res;

        if (this.unResultado.Ok == true){
          Swal.fire({
            title: 'ELIMINADO',
            text: "Imagen de heroe eliminada",
            icon: "success"
          });

          this.accion = 'Mensaje';
          this.mensaje = 'Imagen Heroe Eliminado';
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
