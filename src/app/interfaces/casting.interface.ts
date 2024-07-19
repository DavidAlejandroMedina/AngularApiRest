import { Heroe } from "./heroe.interface";
import { Pelicula } from "./pelicula.interface";

export interface Casting {
  _id: string;
  heroes_id: Heroe;
  peliculas_id: Pelicula;
  __v: string;
};
