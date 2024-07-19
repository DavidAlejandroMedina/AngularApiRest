import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPeliculaCreateComponent } from './img-pelicula-create.component';

describe('ImgPeliculaCreateComponent', () => {
  let component: ImgPeliculaCreateComponent;
  let fixture: ComponentFixture<ImgPeliculaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgPeliculaCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgPeliculaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
