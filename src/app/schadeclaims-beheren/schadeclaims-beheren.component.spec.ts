import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchadeclaimsBeherenComponent } from './schadeclaims-beheren.component';

describe('SchadeclaimsBeherenComponent', () => {
  let component: SchadeclaimsBeherenComponent;
  let fixture: ComponentFixture<SchadeclaimsBeherenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchadeclaimsBeherenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchadeclaimsBeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
