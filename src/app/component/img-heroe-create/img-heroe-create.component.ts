import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { Imagen } from '../../interfaces/imagen.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImgHeroe } from '../../interfaces/img-heroe.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-img-heroe-create',
  templateUrl: './img-heroe-create.component.html',
  styleUrl: './img-heroe-create.component.css'
})
export class ImgHeroeCreateComponent {


  idHeroe! : any;
  heroe: Heroe = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: '',
    _id: '0',
  };

  Imagenes!: Imagen[];
  img: Imagen = {
    descripcion: '',
    url: '',
    _id: '0',
  };

  selectedImgId: string | null = null;

  imgHeroe: ImgHeroe = {
    heroes_id: this.heroe,
    imagenes_id: this.img,
    _id: '0',
  };


  resultado!: any;
  accion: string = 'Mensaje';
  mensaje: string = '';

  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mongoDBService: MongoDbService,
    private fb: FormBuilder
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.idHeroe = params['id'];
      // console.log("ID HEROE ", this.idHeroe);
    });
  }

  async ngOnInit(){
    this.form = this.fb.group({
      selectedImg : [this.imgHeroe.imagenes_id, Validators.required],
    });

    await this.cargarHeroeBD();
    await this.cargarImgBD();
  }

  async cargarHeroeBD(){
    await this.mongoDBService
    .getHeroe(this.idHeroe)
    .toPromise()
    .then((data: any) => {
      this.heroe = data.resp;
      this.imgHeroe.heroes_id = this.heroe;
      // console.log("HEROE ", this.heroe.nombre);
    });
    // console.log("ImgHeroe", this.imgHeroe)
  }

  async cargarImgBD(){
    await this.mongoDBService
    .getGaleria()
    .toPromise()
    .then((data: any) => {
      this.Imagenes = data.resp;
      // console.log("IMAGENES ", this.Imagenes.descripcion);
    });
  }

  selectImg(Img: Imagen): void {
    this.form.get('selectedImg')?.setValue(Img._id);
    this.img = Img;
    this.imgHeroe.imagenes_id = this.img;
  }

  isSelected(Img: Imagen): boolean {
    return this.form.get('selectedImg')?.value === Img._id;
  }

  async guardarImgHeroe(){
    // console.log("GUARDAR IMAGEN", this.imgHeroe);
    await this.mongoDBService.crudImgHeroes(this.imgHeroe, "insertar").subscribe(
      (res: any) => {
        this.resultado = res;

        // console.log("RESULTADO NUEVO ", this.resultado);

        if (this.resultado.Ok == true) {
          Swal.fire({
            icon: 'success',
            title: 'GUARDADO EXITOSAMENTE',
            text: this.resultado.msg,
          });

          this.accion = 'Mensaje';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);

          const url = `/img-heroe/${this.idHeroe}`;

          this.router.navigate([url]);
        }else{

          this.accion = 'Error: ';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);
        }
      }, (error: any) => {
        Swal.fire({
          icon: 'warning',
          title: 'ADVERTENCIA',
          text: error.error.msg,
        });

        console.error("ERROR ", error)
      }
    );
  }

}
