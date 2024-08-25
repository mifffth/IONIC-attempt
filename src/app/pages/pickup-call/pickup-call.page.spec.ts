import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PickupCallPage } from './pickup-call.page';
import { Router } from '@angular/router'; // Import Router
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('PickupCallPage', () => {
  let component: PickupCallPage;
  let fixture: ComponentFixture<PickupCallPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupCallPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule // Added comma
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PickupCallPage);
    router = TestBed.get(Router); // Updated to use inject
    component = fixture.componentInstance;
  }));

  it('should go to homepage', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.newPickupCall();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'PickupCall'
  });
});

