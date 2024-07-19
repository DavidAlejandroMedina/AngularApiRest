import { Component } from '@angular/core';
import { MongoDbService } from '../../services/mongo-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {

  Imagenes!: any[];

  constructor(
    private mongoDBService: MongoDbService,
    private router: Router
  ) { }

  async ngOnInit(){
    await this.getImagenesBD();
  }

  async getImagenesBD(){
    await this.mongoDBService
    .getGaleria()
    .toPromise() // Convertimos el observable a promesa
    .then((data: any) => {
      this.Imagenes = data.resp;
      // console.log("DATOS ", this.Imagenes);
    });
  }

  editarImg(id: any){
    this.router.navigate(['/img-edit', id]);
  }
}
