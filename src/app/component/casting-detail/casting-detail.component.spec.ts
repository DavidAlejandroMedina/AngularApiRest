import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingDetailComponent } from './casting-detail.component';

describe('CastingDetailComponent', () => {
  let component: CastingDetailComponent;
  let fixture: ComponentFixture<CastingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
