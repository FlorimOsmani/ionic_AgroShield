import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PercelenRaadplegenComponent } from './percelen-raadplegen.component';

describe('PercelenRaadplegenComponent', () => {
  let component: PercelenRaadplegenComponent;
  let fixture: ComponentFixture<PercelenRaadplegenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PercelenRaadplegenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PercelenRaadplegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
