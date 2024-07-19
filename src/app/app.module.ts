import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroeEditComponent } from './component/heroe-edit/heroe-edit.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesListComponent } from './component/heroes-list/heroes-list.component';
import { ImgHeroeComponent } from './component/img-heroe/img-heroe.component';
import { GaleriaComponent } from './component/galeria/galeria.component';
import { ImgEditComponent } from './component/img-edit/img-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PeliculaListComponent } from './component/pelicula-list/pelicula-list.component';
import { PeliculaEditComponent } from './component/pelicula-edit/pelicula-edit.component';


import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ImgHeroeCreateComponent } from './component/img-heroe-create/img-heroe-create.component';
import { MatButtonModule } from '@angular/material/button';
import { ImgPeliculaComponent } from './component/img-pelicula/img-pelicula.component';
import { ImgPeliculaCreateComponent } from './component/img-pelicula-create/img-pelicula-create.component';
import { CastingComponent } from './component/casting/casting.component';
import { CastingDetailComponent } from './component/casting-detail/casting-detail.component';
import { CastingInsertComponent } from './component/casting-insert/casting-insert.component';
registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,
    HeroeEditComponent,
    HomeComponent,
    NavbarComponent,
    HeroesListComponent,
    ImgHeroeComponent,
    GaleriaComponent,
    ImgEditComponent,
    PeliculaListComponent,
    PeliculaEditComponent,
    ImgHeroeCreateComponent,
    ImgPeliculaComponent,
    ImgPeliculaCreateComponent,
    CastingComponent,
    CastingDetailComponent,
    CastingInsertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormField,
    // MatHint,
    MatLabel,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    // provideClientHydration()
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
