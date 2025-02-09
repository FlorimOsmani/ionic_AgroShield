import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerceelRegistrerenPage } from './perceel-registreren.page';

describe('PerceelRegistrerenPage', () => {
  let component: PerceelRegistrerenPage;
  let fixture: ComponentFixture<PerceelRegistrerenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerceelRegistrerenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
