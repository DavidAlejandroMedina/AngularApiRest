import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { HeroesListComponent } from './component/heroes-list/heroes-list.component';
import { HeroeEditComponent } from './component/heroe-edit/heroe-edit.component';
import { ImgHeroeComponent } from './component/img-heroe/img-heroe.component';
import { GaleriaComponent } from './component/galeria/galeria.component';
import { ImgEditComponent } from './component/img-edit/img-edit.component';
import { PeliculaListComponent } from './component/pelicula-list/pelicula-list.component';
import { PeliculaEditComponent } from './component/pelicula-edit/pelicula-edit.component';
import { ImgHeroeCreateComponent } from './component/img-heroe-create/img-heroe-create.component';
import { ImgPeliculaComponent } from './component/img-pelicula/img-pelicula.component';
import { ImgPeliculaCreateComponent } from './component/img-pelicula-create/img-pelicula-create.component';
import { CastingComponent } from './component/casting/casting.component';
import { CastingDetailComponent } from './component/casting-detail/casting-detail.component';
import { CastingInsertComponent } from './component/casting-insert/casting-insert.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesListComponent},
  { path: 'heroe-edit/:id', component: HeroeEditComponent },
  { path: 'galeria', component: GaleriaComponent},
  { path: 'img-edit/:id', component: ImgEditComponent},
  { path: 'peliculas', component: PeliculaListComponent},
  { path: 'pelicula-edit/:id', component: PeliculaEditComponent},
  { path: 'img-heroe/:id', component: ImgHeroeComponent },
  { path: 'img-heroe-create/:id', component: ImgHeroeCreateComponent },
  { path: 'img-pelicula/:id', component: ImgPeliculaComponent},
  { path: 'img-pelicula-create/:id', component: ImgPeliculaCreateComponent},
  { path: 'casting/:id', component: CastingComponent },
  { path: 'casting-detail/:tipo/:id', component: CastingDetailComponent },
  { path: 'casting-insert/:tipo/:id', component: CastingInsertComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
