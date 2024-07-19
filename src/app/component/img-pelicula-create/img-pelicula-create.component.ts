import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImgPelicula } from '../../interfaces/img-pelicula.interface';
import { Imagen } from '../../interfaces/imagen.interface';
import { Pelicula } from '../../interfaces/pelicula.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-img-pelicula-create',
  templateUrl: './img-pelicula-create.component.html',
  styleUrl: './img-pelicula-create.component.css'
})
export class ImgPeliculaCreateComponent {


  idPelicula! : any;
  pelicula: Pelicula = {
    titulo: '',
    descripcion: '',
    fecha_lanzamiento: '',
    img: '',
    _id: '0',
  };

  Imagenes!: Imagen[];
  img: Imagen = {
    descripcion: '',
    url: '',
    _id: '0',
  };

  selectedImgId: string | null = null;

  imgPelicula: ImgPelicula = {
    peliculas_id: this.pelicula,
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
      this.idPelicula = params['id'];
      // console.log("ID PELICULA ", this.idPelicula);
    });
  }

  async ngOnInit(){
    this.form = this.fb.group({
      selectedImg : [this.imgPelicula.imagenes_id, Validators.required],
    });

    await this.cargarPeliculaBD();
    await this.cargarImgBD();
  }

  async cargarPeliculaBD(){
    await this.mongoDBService
    .getPelicula(this.idPelicula)
    .toPromise()
    .then((data: any) => {
      this.pelicula = data.resp;
      this.imgPelicula.peliculas_id = this.pelicula;
      // console.log("PELICULA ", this.pelicula.titulo);
    });
    // console.log("ImgPelicula", this.imgPelicula)
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
    this.imgPelicula.imagenes_id = this.img;
  }

  isSelected(Img: Imagen): boolean {
    return this.form.get('selectedImg')?.value === Img._id;
  }

  async guardarImgHeroe(){
    // console.log("GUARDAR IMAGEN", this.imgPelicula);
    await this.mongoDBService.crudImgPelicula(this.imgPelicula, "insertar").subscribe(
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

          const url = `/img-pelicula/${this.idPelicula}`;

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
