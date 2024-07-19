import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';
import { Heroe } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroe-edit',
  templateUrl: './heroe-edit.component.html',
  styleUrl: './heroe-edit.component.css'
})
export class HeroeEditComponent {

  idHeroe! : any;
  heroe : Heroe = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: '',
    _id: '0',
  };

  resultado!: any;
  accion: string = 'Mensaje';
  mensaje: string = '';

  myForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataBD: MongoDbService,
    private fb: FormBuilder
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.idHeroe = params['id'];
      // console.log("ID HEROE ", this.idHeroe);

      if (this.idHeroe !== "nuevo") {
        this.cargarHeroeBD();
      }
    });
  }

  // Inicializamos el formulario
  ngOnInit() {
    this.myForm = this.fb.group({
      _id: [{value: this.heroe._id, disabled: true}, Validators.required],
      nombre: [this.heroe.nombre, Validators.required],
      bio: [this.heroe.bio, Validators.required],
      img: [this.heroe.img, Validators.required],
      aparicion: [this.heroe.aparicion, Validators.required],
      casa: [this.heroe.casa, Validators.required]
    });
  }

  async cargarHeroeBD(){
    await this.dataBD
    .getHeroe(this.idHeroe)
    .toPromise()
    .then((data: any) => {
      this.heroe = data.resp;

      // Inyectamos los valores al formulario
      this.myForm.patchValue({
        _id: this.heroe._id,
        nombre: this.heroe.nombre,
        bio: this.heroe.bio,
        img: this.heroe.img,
        aparicion: this.heroe.aparicion,
        casa: this.heroe.casa,
      });
      // console.log("HEROE ", this.heroe);
    });
  }

  guardarHeroe(){
    if (this.myForm.valid) {
      const formValues = this.myForm.value;
      this.heroe.nombre = formValues.nombre;
      this.heroe.bio = formValues.bio;
      this.heroe.img = formValues.img;
      this.heroe.aparicion = formValues.aparicion;
      this.heroe.casa = formValues.casa;
    }
    // console.log("GUARDAR HEROE", this.heroe);

    if (this.idHeroe == 'nuevo') {
      this.nuevoHeroe();
    }else{
      this.actualizarHeroe();
    }
  }

  async nuevoHeroe(){
    await this.dataBD.crudHeroes(this.heroe, "insertar").subscribe(
      (res: any) => {
        this.resultado = res;

        // console.log("RESULTADO NUEVO ", this.resultado);

        if (this.resultado.Ok == true) {
          Swal.fire({
            icon: 'success',
            title: 'CREADO EXITOSAMENTE',
            text: this.resultado.msg,
          });

          this.accion = 'Mensaje';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);

          this.router.navigate(['/heroes']);
        }else{

          this.accion = 'Error: ';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);
        }
      }, (error: any) => console.error("ERROR ", error)
    );
  }

  actualizarHeroe(){
    this.dataBD.crudHeroes(this.heroe, "editar").subscribe(
      (res: any) => {
        this.resultado = res;

        // console.log("RESULTADO ACTUALIZAR ", this.resultado);

        if(this.resultado.Ok == true){
          Swal.fire({
            icon: 'info',
            title: 'ACTUALIZADO',
            text: this.resultado.msg,
          });

          this.accion = 'Mensaje';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);

          this.router.navigate(['/heroes']);

        } else {

          this.accion = 'Error: ';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);
        }
      },
      (error: any) => console.error("ERROR ", error)
    );
  }

}
