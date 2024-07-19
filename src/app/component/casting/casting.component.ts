import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';

@Component({
  selector: 'app-casting',
  templateUrl: './casting.component.html',
  styleUrl: './casting.component.css'
})
export class CastingComponent {

  tipo: string = '';

  elementos: any = [];

  constructor(
    private mongoDBService: MongoDbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.tipo = params['id'];
      // console.log("TIPO ", this.tipo);

      if (this.tipo !== "heroe") {
        this.cargarPeliculasBD();
      } else {      
        this.cargarHeroesBD();
      }
    });
  }

  async cargarHeroesBD(){
    await this.mongoDBService
    .getHeroes()
    .toPromise()
    .then((data: any) => {
      this.elementos = data.resp;
      // console.log("DATA ", data);
    });
  }

  async cargarPeliculasBD(){
    await this.mongoDBService
    .getPeliculas()
    .toPromise()
    .then((data: any) => {
      this.elementos = data.resp;
      // console.log("DATA ", data);
    });
  }

  obtenerCasting(id: string){
    this.router.navigate(['/casting-detail', this.tipo, id]);
  }
}
