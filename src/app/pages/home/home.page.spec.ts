
import { HomePage } from './home.page';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router'; // Import Router
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule // Added comma
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router); // Updated to use inject
    component = fixture.componentInstance;
  }));

  it('should go to pickup-calls', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.goToPickupCalls();
    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']); // Use lowercase 'Home'
  });

  it('should go to new pickup-call on create pickup-call', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.newPickupCall();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'Home'
  });
});

