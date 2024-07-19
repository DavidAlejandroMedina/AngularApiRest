import { Component } from '@angular/core';
import { MongoDbService } from '../../services/mongo-db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Casting } from '../../interfaces/casting.interface';
import { Heroe } from '../../interfaces/heroe.interface';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-casting-insert',
  templateUrl: './casting-insert.component.html',
  styleUrl: './casting-insert.component.css'
})
export class CastingInsertComponent {

  id: string = '';
  tipo: string = '';
  // castings!: Casting[];
  heroes!: Heroe[];
  peliculas!: Pelicula[];
  element: any

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
  casting: Casting = {
    peliculas_id: this.pelicula,
    heroes_id: this.heroe,
    __v: '0',
    _id: '0',
  };
  
  resultado!: any;
  accion: string = 'Mensaje';
  mensaje: string = '';

  form: FormGroup = new FormGroup({}); 

  constructor(
    private mongoDBService: MongoDbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.tipo = params['tipo'];
    });
  }

  async ngOnInit(){
    this.form = this.fb.group({
        selectedCasting: [this.element, Validators.required],
    });

    if (this.tipo === 'heroe') {
      await this.cargarHeroeBD(); 
      await this.cargarPeliculasBD();
    } else {
      await this.cargarPeliculaBD();
      await this.cargarHeroesBD();
    }
  }

  selectCasting(element: any): void {
    this.form.get('selectedCasting')?.setValue(element._id);
    if (this.tipo === 'heroe') {
      this.pelicula = element;
      this.casting.peliculas_id = this.pelicula;
    } else {
      this.heroe = element;
      this.casting.heroes_id = this.heroe;
    }
  }

  isSelected(element: any): boolean {
    return this.form.get('selectedCasting')?.value === element._id;
  }

  async cargarHeroeBD(){
    await this.mongoDBService
    .getHeroe(this.id)
    .toPromise()
    .then((data: any) => {
      this.heroe = data.resp;
      this.casting.heroes_id = this.heroe;
      // console.log("HEROE ", this.heroe.nombre);
    });
  }

  async cargarHeroesBD(){
    await this.mongoDBService
    .getHeroes()
    .toPromise()
    .then((data: any) => {
      this.heroes = data.resp;
      // console.log("HEROES ", this.heroes);
    });
  }

  async cargarPeliculaBD(){
    await this.mongoDBService
    .getPelicula(this.id)
    .toPromise()
    .then((data: any) => {
      this.pelicula = data.resp;
      this.casting.peliculas_id = this.pelicula;
      // console.log("PELICULA ", this.pelicula.titulo);
    });
  }

  async cargarPeliculasBD(){
    await this.mongoDBService
    .getPeliculas()
    .toPromise()
    .then((data: any) => {
      this.peliculas = data.resp;
      // console.log("PELICULAS ", this.peliculas);
    });
  }

  async guardarCasting(){
    console.log("CASTING ", this.casting);
    await this.mongoDBService.crudCasting(this.casting, "insertar").subscribe(
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

          const url = `/casting-detail/${this.tipo}/${this.id}`;

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
