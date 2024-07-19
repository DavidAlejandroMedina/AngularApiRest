import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPeliculaComponent } from './img-pelicula.component';

describe('ImgPeliculaComponent', () => {
  let component: ImgPeliculaComponent;
  let fixture: ComponentFixture<ImgPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgPeliculaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
