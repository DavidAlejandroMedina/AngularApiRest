import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingInsertComponent } from './casting-insert.component';

describe('CastingInsertComponent', () => {
  let component: CastingInsertComponent;
  let fixture: ComponentFixture<CastingInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastingInsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastingInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
