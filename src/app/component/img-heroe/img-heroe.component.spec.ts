import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgHeroeComponent } from './img-heroe.component';

describe('ImgHeroeComponent', () => {
  let component: ImgHeroeComponent;
  let fixture: ComponentFixture<ImgHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgHeroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
