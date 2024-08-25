
import { RegisterPage } from './register.page';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router'; // Import Router
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('LoginPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule // Added comma
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router); // Updated to use inject
    component = fixture.componentInstance;
  }));

  it('should go to home page on register', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'login'
  });

  it('should go to register', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'login'
  });
});

