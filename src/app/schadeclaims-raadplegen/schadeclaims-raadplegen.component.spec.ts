import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchadeclaimsRaadplegenComponent } from './schadeclaims-raadplegen.component';

describe('SchadeclaimsRaadplegenComponent', () => {
  let component: SchadeclaimsRaadplegenComponent;
  let fixture: ComponentFixture<SchadeclaimsRaadplegenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchadeclaimsRaadplegenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchadeclaimsRaadplegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
