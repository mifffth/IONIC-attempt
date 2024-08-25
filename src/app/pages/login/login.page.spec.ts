
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router'; // Import Router
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule // Added comma
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router); // Updated to use inject
    component = fixture.componentInstance;
  }));

  it('should create form on Init', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined(); // Use lowercase 'login'
  });

  it('should go to home page on login', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'login'
  });

  it('should go to register', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'login'
  });
});

