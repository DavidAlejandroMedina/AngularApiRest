import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pelicula } from '../../interfaces/pelicula.interface';

@Component({
  selector: 'app-pelicula-edit',
  templateUrl: './pelicula-edit.component.html',
  styleUrl: './pelicula-edit.component.css'
})
export class PeliculaEditComponent {

  idPelicula! : any;
  pelicula : Pelicula = {
    titulo: '',
    descripcion: '',
    fecha_lanzamiento: '',
    img: '',
    _id: '0',
  };

  resultado!: any;
  accion: string = 'Mensaje';
  mensaje: string = '';

  myForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mongoDBService: MongoDbService,
    private fb: FormBuilder
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.idPelicula = params['id'];
      // console.log("ID PELICULA ", this.idPelicula);

      if (this.idPelicula !== "nuevo") {
        this.cargarPeliculaBD();
      }
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      _id: [{value: this.pelicula._id, disabled: true},  Validators.required],
      titulo: [this.pelicula.titulo, Validators.required],
      descripcion: [this.pelicula.descripcion, Validators.required],
      fecha_lanzamiento: [this.pelicula.fecha_lanzamiento, Validators.required],
      img: [this.pelicula.img, Validators.required]
    });
  }

  async cargarPeliculaBD(){
    await this.mongoDBService
    .getPelicula(this.idPelicula)
    .toPromise() // Convertimos el observable a promesa
    .then((data: any) => {
      this.pelicula = data.resp;

      this.myForm.patchValue({
        _id: this.pelicula._id,
        titulo: this.pelicula.titulo,
        descripcion: this.pelicula.descripcion,
        fecha_lanzamiento: this.pelicula.fecha_lanzamiento,
        img: this.pelicula.img,
      });
      // console.log("PELICULA ", this.pelicula);
    });
  }

  async guardarPelicula(){
    if (this.myForm.valid) {
      const formValues = this.myForm.value;
      this.pelicula.titulo = formValues.titulo;
      this.pelicula.descripcion = formValues.descripcion;
      this.pelicula.fecha_lanzamiento = formValues.fecha_lanzamiento;
      this.pelicula.img = formValues.img;
    }
    
    if (this.idPelicula === "nuevo"){
      await this.mongoDBService.crudPeliculas(this.pelicula, "insertar").subscribe(
        (res: any) => {
          this.resultado = res;
          console.log("RESULTADO ", this.resultado);
          if (this.resultado.Ok == true){
            Swal.fire({
              icon: 'success',
              title: 'CREADA EXITOSAMENTE',
              text: this.resultado.msg,
            });

            this.accion = 'Mensaje';
            this.mensaje = 'Pelicula Guardada';
            setTimeout(() => (this.mensaje = ''), 3000);

            this.router.navigate(['/peliculas']);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'ADVERTENCIA',
              text: this.resultado.msg,
            });

            this.accion = 'Error: ';
            this.mensaje = this.resultado.msg;
            setTimeout(() => (this.mensaje = ''), 3000);
          }
        }
      ), (error: any) => {
        console.error("ERROR ", error);
      };
    } else {
      await this.mongoDBService.crudPeliculas(this.pelicula, "editar").subscribe(
        (res: any) => {
          this.resultado = res;
          // console.log("RESULTADO ", this.resultado);

          if (this.resultado.Ok == true){
            Swal.fire({
              icon: 'info',
              title: 'ACTUALIZADA',
              text: this.resultado.msg,
            });

            this.accion = 'Mensaje';
            this.mensaje = 'Pelicula Editada';
            setTimeout(() => (this.mensaje = ''), 3000);

            this.router.navigate(['/peliculas']);
          }
        }
      ), (error: any) => {
        console.error("ERROR ", error);
      };
    }
  }
}
