import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRendezVousComponent } from './details-rendez-vous.component';

describe('DetailsRendezVousComponent', () => {
  let component: DetailsRendezVousComponent;
  let fixture: ComponentFixture<DetailsRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRendezVousComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
