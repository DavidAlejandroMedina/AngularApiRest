import { Heroe } from "./heroe.interface";
import { Imagen } from "./imagen.interface";

export interface ImgHeroe {
  _id: string;
  heroes_id: Heroe;
  imagenes_id: Imagen;
};
