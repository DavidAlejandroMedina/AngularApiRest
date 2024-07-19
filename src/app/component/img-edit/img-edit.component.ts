import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';
import { Imagen } from '../../interfaces/imagen.interface';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-img-edit',
  templateUrl: './img-edit.component.html',
  styleUrl: './img-edit.component.css'
})
export class ImgEditComponent implements OnInit{

  idImg! : any;
  img : Imagen = {
    descripcion: '',
    url: '',
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
      this.idImg = params['id'];
      // console.log("ID Imagen ", this.idImg);

      if (this.idImg !== "nuevo") {
        this.cargarImgBD();
      }
    });
  }

  // Inicializamos el formulario
  ngOnInit() {
    this.myForm = this.fb.group({
      _id: [{value: this.img._id, disabled: true}, Validators.required],
      descripcion: [this.img.descripcion, Validators.required],
      url: [this.img.url, Validators.required]
    });
  }

  async cargarImgBD(){
    await this.mongoDBService
    .getImg(this.idImg)
    .toPromise()
    .then((data: any) => {
      this.img = data.resp;
      // Inyectamos los valores al formulario
      this.myForm.patchValue({
          _id: this.img._id,
          descripcion: this.img.descripcion,
          url: this.img.url,
      });
      // console.log("IMAGEN ", this.img);
    });
  }

  guardarImg(){
    if (this.myForm.valid) {
      const formValues = this.myForm.value;
      this.img.descripcion = formValues.descripcion;
      this.img.url = formValues.url;
    }
    // console.log("GUARDAR IMAGEN", this.img);
    if (this.idImg == 'nuevo') {
      this.nuevaImg();
    }else{
      this.actualizarImg();
    }
  }

  async nuevaImg(){
    await this.mongoDBService.crudImagenes(this.img, "insertar").subscribe(
      (res: any) => {
        this.resultado = res;

        // console.log("RESULTADO NUEVO ", this.resultado);

        if (this.resultado.Ok == true) {
          Swal.fire({
            icon: 'success',
            title: 'CREADA EXITOSAMENTE',
            text: this.resultado.msg,
          });

          this.accion = 'Mensaje';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);

          this.router.navigate(['/galeria']);
        }else{

          this.accion = 'Error: ';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);
        }
      }, (error: any) => console.error("ERROR ", error)
    );
  }

  actualizarImg(){
    this.mongoDBService.crudImagenes(this.img, "editar").subscribe(
      (res: any) => {
        this.resultado = res;

        console.log("RESULTADO ACTUALIZAR ", this.resultado);

        if(this.resultado.Ok == true){
          Swal.fire({
            icon: 'info',
            title: 'ACTUALIZADA',
            text: this.resultado.msg,
          });

          this.accion = 'Mensaje';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);

          this.router.navigate(['/galeria']);

        } else {

          // this.accion = 'Error: ';
          this.mensaje = this.resultado.msg;
          setTimeout(() => (this.mensaje = ''), 3000);
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'warning',
          title: 'ADVERTENCIA',
          text: error.error.msg,
        });

        console.error("ERROR", error)
      }
    );
  }
}
