
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router'; // Import Router
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterPageModule } from './register.module';

describe('LoginPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        RegisterPageModule
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

  it('should create register form on page initialization', () => {
    fixture.detectChanges();
    expect(component.registerForm).not.toBeUndefined();
  
});

  it('should go to register', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['home']); // Use lowercase 'login'
  });

  


});

