import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS_MONGODB } from '../config/url.servicios';
import { map } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { Imagen } from '../interfaces/imagen.interface';
import { Pelicula } from '../interfaces/pelicula.interface';
import { ImgHeroe } from '../interfaces/img-heroe.interface';
import { ImgPelicula } from '../interfaces/img-pelicula.interface';

@Injectable({
  providedIn: 'root'
})
export class MongoDbService {

  constructor(public http: HttpClient) { }


  getHeroes(): any{
    let url = `${URL_SERVICIOS_MONGODB}/heroes`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATOS ", data)
        return data;
      })
    );
  }

  // Heroe Individual
  getHeroe(id: string): any{
    let url = `${URL_SERVICIOS_MONGODB}/heroes/${id}`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATO HEROE ", data);
        return data;
      })
    )
  };

  crudHeroes(heroe: Heroe, accion: string): any{

    if (accion == "eliminar"){
      let url = `${URL_SERVICIOS_MONGODB}/heroes/${heroe._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          // console.log("HEROE ELIMINADO ", data);
          return data;
        })
      );
    }

    if (accion == "insertar"){
      let parametros = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/heroes';

      parametros = parametros.append('nombre', heroe.nombre);
      parametros = parametros.append('bio', heroe.bio);
      parametros = parametros.append('img', heroe.img);
      parametros = parametros.append('aparicion', heroe.aparicion);
      parametros = parametros.append('casa', heroe.casa);

      // Se crea un objeto con los datos del heroe para evitar la inyección de código
      const body = {
        nombre : heroe.nombre,
        bio: heroe.bio,
        img: heroe.img,
        aparicion: heroe.aparicion,
        casa: heroe.casa,
      };

      // console.log("BODY 2 ", body);

      return this.http.post(url, body).pipe(
        map((data) => {
          // console.log("HEROE INSERTADO ", data);
          return data;
        })
      );
    }

    if (accion == "editar"){
      let parametros = new HttpParams();
      let url = `${URL_SERVICIOS_MONGODB}/heroes/${heroe._id}`;

      parametros = parametros.append('nombre', heroe.nombre);
      parametros = parametros.append('bio', heroe.bio);
      parametros = parametros.append('img', heroe.img);
      parametros = parametros.append('aparicion', heroe.aparicion);
      parametros = parametros.append('casa', heroe.casa);

      const body = {
        nombre : heroe.nombre,
        bio: heroe.bio,
        img: heroe.img,
        aparicion: heroe.aparicion,
        casa: heroe.casa,
      };

      // console.log("BODY ", body);

      return this.http.put(url, body).pipe(
        map((data) => {
          // console.log("HEROE EDITADO ", data);
          return data;
        })
      );
    }
  }


  // Galería de Imágenes
  getGaleria(): any{
    let url = `${URL_SERVICIOS_MONGODB}/imagenes`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATOS ", data)
        return data;
      })
    );
  }

  // Imagen Individual
  getImg(id: string): any{
    let url = `${URL_SERVICIOS_MONGODB}/imagenes/${id}`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATO IMAGEN ", data);
        return data;
      })
    )
  }

  // Editar y Crear Imágenes
  crudImagenes(img: Imagen, accion: string): any{

    if (accion == "insertar"){
      let parametros = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/imagenes';

      parametros = parametros.append('descripcion', img.descripcion);
      parametros = parametros.append('url', img.url);

      // Inyección de código
      const body = {
        descripcion : img.descripcion,
        url : img.url,
      };

      // console.log("BODY 2 ", body);

      return this.http.post(url, body).pipe(
        map((data) => {
          // console.log("IMAGEN INSERTADA", data);
          return data;
        })
      );
    }

    if (accion == "editar"){
      let parametros = new HttpParams();
      let url = `${URL_SERVICIOS_MONGODB}/imagenes/${img._id}`;

      parametros = parametros.append('descripcion', img.descripcion);
      parametros = parametros.append('url', img.url);

      const body = {
        descripcion : img.descripcion,
        url : img.url,
      };

      // console.log("BODY ", body);

      return this.http.put(url, body).pipe(
        map((data) => {
          // console.log("IMAGEN EDITADA", data);
          return data;
        })
      );
    }
  }


  // Peliculas
  getPeliculas(): any{
    let url = `${URL_SERVICIOS_MONGODB}/peliculas`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATOS ", data)
        return data;
      })
    );
  }

  // Pelicula individual
  getPelicula(id: string): any{
    let url = `${URL_SERVICIOS_MONGODB}/peliculas/${id}`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATO PELICULA ", data);
        return data;
      })
    )
  }

  // Crear, editar y eliminar Peliculas
  crudPeliculas(pelicula: Pelicula, accion: string): any{

    if (accion == "insertar"){
      let parametros = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/peliculas';

      parametros = parametros.append('titulo', pelicula.titulo);
      parametros = parametros.append('descripcion', pelicula.descripcion);
      parametros = parametros.append('fecha_lanzamiento', pelicula.fecha_lanzamiento);
      parametros = parametros.append('img', pelicula.img);

      const body = {
        titulo : pelicula.titulo,
        descripcion : pelicula.descripcion,
        fecha_lanzamiento : pelicula.fecha_lanzamiento,
        img : pelicula.img,
      };

      // console.log("BODY 2 ", body);

      return this.http.post(url, body).pipe(
        map((data) => {
          // console.log("PELICULA INSERTADA", data);
          return data;
        })
      );
    }

    if (accion == "editar"){
      let parametros = new HttpParams();
      let url = `${URL_SERVICIOS_MONGODB}/peliculas/${pelicula._id}`;

      parametros = parametros.append('titulo', pelicula.titulo);
      parametros = parametros.append('descripcion', pelicula.descripcion);
      parametros = parametros.append('fecha_lanzamiento', pelicula.fecha_lanzamiento);
      parametros = parametros.append('img', pelicula.img);

      const body = {
        titulo : pelicula.titulo,
        descripcion : pelicula.descripcion,
        fecha_lanzamiento : pelicula.fecha_lanzamiento,
        img : pelicula.img,
      };

      // console.log("BODY ", body);

      return this.http.put(url, body).pipe(
        map((data) => {
          // console.log("PELICULA EDITADA", data);
          return data;
        })
      );
    }

    if (accion == "eliminar"){
      let url = `${URL_SERVICIOS_MONGODB}/peliculas/${pelicula._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          // console.log("PELICULA ELIMINADA", data);
          return data;
        })
      );
    }
  }


  // Imagenes de Heroes individuales
  getImgXIdHeroe(id : string): any{
    let url = `${URL_SERVICIOS_MONGODB}/imgHeroes/heroe/${id}`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATOS ", data)
        return data;
      })
    );
  }

  // Crear y eliminar Imagenes de Heroes
  crudImgHeroes(imgHeroe: ImgHeroe, accion: string): any{

    if (accion == "insertar"){
      let parametros = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/imgHeroes';

      const heroe = imgHeroe.heroes_id._id;
      const img = imgHeroe.imagenes_id._id;

      parametros = parametros.append('heroes_id', heroe);
      parametros = parametros.append('imagenes_id', img);

      const body = {
        heroes_id : heroe,
        imagenes_id : img,
      };

      // console.log("BODY 2 ", body);

      return this.http.post(url, body).pipe(
        map((data) => {
          // console.log("IMAGEN INSERTADA", data);
          return data;
        })
      );
    }

    if (accion == "eliminar"){
      let url = `${URL_SERVICIOS_MONGODB}/imgHeroes/${imgHeroe._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          // console.log("IMAGEN ELIMINADA", data);
          return data;
        })
      );
    }
  }


  //  Imagenes de Peliculas individuales
  getImgXIdPelicula(id : string): any{
    let url = `${URL_SERVICIOS_MONGODB}/imgPeliculas/pelicula/${id}`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATOS ", data)
        return data;
      })
    );
  }

  // Crear y eliminar Imagenes de Heroes
  crudImgPelicula(imgPelicula: ImgPelicula, accion: string): any{

    if (accion == "insertar"){
      let parametros = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/imgPeliculas';

      const pelicula = imgPelicula.peliculas_id._id;
      const img = imgPelicula.imagenes_id._id;

      parametros = parametros.append('peliculas_id', pelicula);
      parametros = parametros.append('imagenes_id', img);

      const body = {
        peliculas_id : pelicula,
        imagenes_id : img,
      };

      // console.log("BODY 2 ", body);

      return this.http.post(url, body).pipe(
        map((data) => {
          // console.log("IMAGEN INSERTADA", data);
          return data;
        })
      );
    }

    if (accion == "eliminar"){
      let url = `${URL_SERVICIOS_MONGODB}/imgPeliculas/${imgPelicula._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          // console.log("IMAGEN ELIMINADA", data);
          return data;
        })
      );
    }
  }


  // Casting por Id Heroe
  getCastXIdHeroe(id : string): any{
    let url = `${URL_SERVICIOS_MONGODB}/casting/heroe/${id}`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATOS ", data)
        return data;
      })
    );
  }

  // Casting por Id Pelicula
  getCastXIdPelicula(id : string): any{
    let url = `${URL_SERVICIOS_MONGODB}/casting/pelicula/${id}`;

    return this.http.get(url).pipe(
      map((data) => {
        // console.log("DATOS ", data)
        return data;
      })
    );
  }

  // Crear y eliminar Casting Heroe
  crudCasting(casting: any, accion: string): any{

    if (accion == "insertar"){
      let parametros = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/casting';

      const heroe = casting.heroes_id._id;
      const pelicula = casting.peliculas_id._id;

      parametros = parametros.append('heroes_id', heroe);
      parametros = parametros.append('peliculas_id', pelicula);

      const body = {
        heroes_id : heroe,
        peliculas_id : pelicula,
      };

      // console.log("BODY 2 ", body);

      return this.http.post(url, body).pipe(
        map((data) => {
          // console.log("CASTING INSERTADO", data);
          return data;
        })
      );
    }

    if (accion == "eliminar"){
      let url = `${URL_SERVICIOS_MONGODB}/casting/${casting._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          // console.log("CASTING ELIMINADO", data);
          return data;
        })
      );
    }
  }

}
