import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecaComponent } from './meca.component';

describe('MecaComponent', () => {
  let component: MecaComponent;
  let fixture: ComponentFixture<MecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
