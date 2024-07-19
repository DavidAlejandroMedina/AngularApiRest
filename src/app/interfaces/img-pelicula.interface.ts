import { Imagen } from "./imagen.interface";
import { Pelicula } from "./pelicula.interface";

export interface ImgPelicula {
  _id: string;
  peliculas_id: Pelicula;
  imagenes_id: Imagen;
};
