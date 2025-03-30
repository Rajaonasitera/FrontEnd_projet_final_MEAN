import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReparationsComponent } from './liste-reparations.component';

describe('ListeReparationsComponent', () => {
  let component: ListeReparationsComponent;
  let fixture: ComponentFixture<ListeReparationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeReparationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
