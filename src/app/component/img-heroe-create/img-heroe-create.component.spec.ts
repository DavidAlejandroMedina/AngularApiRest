import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgHeroeCreateComponent } from './img-heroe-create.component';

describe('ImgHeroeCreateComponent', () => {
  let component: ImgHeroeCreateComponent;
  let fixture: ComponentFixture<ImgHeroeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgHeroeCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgHeroeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
